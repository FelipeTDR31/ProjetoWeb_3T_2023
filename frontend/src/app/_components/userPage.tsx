'use client'

import { useRouter } from 'next/navigation'

export default function UserPage({username, email, password} : {username: string, email: string, password: string}) {
    const router = useRouter()

    async function logOut() {
        document.cookie = `token=; Path=/; Secure; SameSite=Strict;Max-Age=-1;`
        router.push("/login")
    }

    return (
        <main>
            <nav>
                <h2>Rate Programming Languages</h2>
                <div>
                    <section>
                        <span>{username.toUpperCase()}</span>
                        <span>{email}</span>
                    </section>
                    <button type="submit" onClick={logOut}>Sair</button>
                </div>
            </nav>

            <p>ISSO É UM USUARIO NORMAL</p>
        </main>
    )
}