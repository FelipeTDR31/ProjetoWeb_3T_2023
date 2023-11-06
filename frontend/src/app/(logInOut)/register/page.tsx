'use client'

import { redirect } from 'next/navigation'

export default function Home() {


    async function createUser() {
      let inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll(".userIp")
      let name=inputs[0].value
      let email=inputs[1].value
      let password
      if (inputs[2].value==inputs[3].value) {
        password = inputs[2].value
      }
      const user = await fetch("http://localhost:4000/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})
    })
      const json = await user.json()
      console.log(json)

      redirect("/[user]")
    }

  return (
    <section>
      <div className='userLog'>
        <h1 className='title'>Rate Languages</h1>
        <form action="">
          <input className='userInp' type="text" id='userName' name='userName' placeholder='Name' />
          <input className='userInp' type="email" id='userEmail' name='userEmail' placeholder='E-mail' />
          <input className='userInp' type="password" id='userPass' name='userPass' placeholder='Senha' />
          <input className='userInp' type="password" id='userConfirm' name='userConfirm' placeholder='Confirmar senha' />

          <button type="submit" onClick={createUser}>Enviar</button>
        </form>
      </div>
    </section>
  )
}
