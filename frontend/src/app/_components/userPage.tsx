'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import ItemRank from './items/itemRank'
import UserNormalPage from './items/userNormalPage'
import VotePage from './VotePage'

export default function UserPage({username, email, password} : {username: string, email: string, password: string}) {
    type itemInfo = {
        id : number,
        title : string,
        image : string
    }
    
    const router = useRouter()
    const [isVoting, setIsVoting] = React.useState<boolean>(false)

    async function logOut() {
        document.cookie = `token=; Path=/; Secure; SameSite=Strict;Max-Age=-1;`
        router.push("/login")
    }

    function changePage() {
        if (isVoting == false) {
            setIsVoting(true)
        }else{
            setIsVoting(false)
        }
    }

    return (
        <main>
            <nav className="globalNavigation">
                <h2>Rate Programming Languages</h2>
                <div className='userInfo'>
                    <section>
                        <span>{username.toUpperCase()}</span>
                        <span>{email}</span>
                    </section>
                    <button className='navBtns' type="submit" onClick={logOut}>Sair</button>
                </div>
            </nav>

            {
                isVoting ? <VotePage username={username} changePage={changePage} /> : <UserNormalPage changePage={changePage} />
            }
        </main>
    )
}