'use client'

import '../../styles/globals.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
    let router = useRouter()

    async function login() {
      let inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll(".userInp")
      let username= inputs[0].value
      let password = inputs[1].value

      if (username !="" && password !="") {
        fetch("http://localhost:4000/auth", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(data => {
          if (data.error == true) {
            alert("Usuário ou senha incorretos")
          }else {
            document.cookie = `token=${data.jwtToken}; Path=/; Secure; SameSite=Strict;`
            router.push(`../../${data.user.username}`)
          }
        })
        
      }
    }

  return (
    <>
        <nav className='globalNavigation'>
          <h3 style={{cursor:"pointer"}} onClick={() => router.push("/")}>Rate Programming Languages</h3>
          <div className='navLinksContainer'>
            <Link className='navLinks' href="/register" >Registrar-se</Link>
            <Link className='navLinks' href="/login">Entrar</Link>
          </div>
        </nav>

      <section>
        <div className='userLog'>
          <h1 className='title'>Login</h1>
          <form target=''>
            <input className='userInp' type="text" id='userName' name='userName' placeholder='Name' />
            <input className='userInp' type="password" id='userPass' name='userPass' placeholder='Senha' />

            <button type="button" onClick={login}>Entrar</button>
            <p className='test'></p>
          </form>
        </div>
      </section>
    </>
  )
}
