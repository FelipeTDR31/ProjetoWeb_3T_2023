'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
    let router = useRouter()

    async function login() {
      let inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll(".userInp")
      let username= inputs[0].value
      let password = inputs[1].value

      const user = await fetch("http://localhost:4000/auth", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
    })
      const json = await user.json()
      console.log(json)
      document.cookie = `token=${json.jwtToken}; Path=/; Secure; SameSite=Strict;`
      router.push(`../../${json.user.username}`)
    }

  return (
    <section>
      <div className='userLog'>
        <h1 className='title'>Rate Languages</h1>
        <form target=''>
          <input className='userInp' type="text" id='userName' name='userName' placeholder='Name' />
          <input className='userInp' type="password" id='userPass' name='userPass' placeholder='Senha' />

          <button type="button" onClick={login}>Enviar</button>
          <p className='test'></p>
        </form>
      </div>
    </section>
  )
}
