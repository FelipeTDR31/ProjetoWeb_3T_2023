'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import UserNormalPage from './items/userNormalPage'
import VotePage from './VotePage'
import EditUserInfo from './editUserInfo'

export default function UserPage({username, email, password} : {username: string, email: string, password: string}) {
    type itemInfo = {
        id : number,
        title : string,
        image : string
    }
    
    const router = useRouter()
    const [isVoting, setIsVoting] = React.useState<boolean>(false)
    const [isEditing, setIsEditing] = React.useState<boolean>(false)

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

    function editInfo() {
        if (isEditing==false) {
            setIsEditing(true)
        }else{
            setIsEditing(false)
        }
    }

    return (
        <main>
            <nav className="globalNavigation">
                <h2>Rate Programming Languages</h2>
                <div className='userInfo'>
                    <section>
                        <button className='voteBtn' type="button" style={{fontSize:"1rem", width:"8vw"}} onClick={editInfo}>Editar Conta</button>
                        <span>{username.toUpperCase()}</span>
                        <span>{email}</span>
                    </section>
                    <button className='navBtns' type="submit" onClick={logOut}>Sair</button>
                </div>
            </nav>

            {
                isVoting ? <VotePage username={username} changePage={changePage} /> : <UserNormalPage changePage={changePage} />
            }

            {
                isEditing ? <EditUserInfo username={username} /> : null
            }
        </main>
    )
}