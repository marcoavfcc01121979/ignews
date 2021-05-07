import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss';

import { signIn, signout, useSession } from 'next-auth/client'

export function SignInButton() {
    const [session] = useSession();

    return session ? (
        <button 
            type="button"
            className={styles.signInButton}  
            onClick={() => signout()}  
        >
            <FaGithub color="#84d361" />
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button 
            type="button"
            className={styles.signInButton}    
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    )
}