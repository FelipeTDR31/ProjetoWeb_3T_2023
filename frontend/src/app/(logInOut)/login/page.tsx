'use client'
import "../../globals.css"

export default function Home(){
    async function logIn(){
        
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
    
              <button type="submit" onClick={logIn}>Enviar</button>
            </form>
          </div>
        </section>
      )
}