'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
    let router = useRouter()

    async function createUser() {
      let inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll(".userInp")
      let username= inputs[0].value
      let email=inputs[1].value
      let is_Admin=false
      let password
      if (username !="" && email !="" && email.includes("@aluno.feliz.ifrs.edu.br")) {
          if (inputs[2].value==inputs[3].value && inputs[2].value!="" && inputs[3].value!="") {
            password = inputs[2].value

            await fetch("http://localhost:4000/register", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({username, email, password, is_Admin})
            })
            .then(res => res.json())
            .then(data => {
              if (data.exists) {
                alert("Nome de usuário ou email já existentes")
              }else{
                document.cookie = `token=${data.jwtToken}; Path=/; Secure; SameSite=Strict;`
                router.push(`../../${data.user.username}`)
              }
            })
          }
        }else{
          alert("Informações inválidas. O email deve ser do domínio @aluno.feliz.ifrs.edu.br")
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

      
      <div className='userLog'>
        <h1 className='title'>Criar Conta</h1>
        <form target=''>
          <input className='userInp' type="text" id='userName' name='userName' placeholder='Name' />
          <input className='userInp' type="email" id='userEmail' name='userEmail' placeholder='E-mail' />
          <input className='userInp' type="password" id='userPass' name='userPass' placeholder='Senha' />
          <input className='userInp' type="password" id='userConfirm' name='userConfirm' placeholder='Confirmar senha' />

          <button type="submit" onClick={createUser}>Enviar</button>
        </form>
      </div>
      
    </>
  )
}
