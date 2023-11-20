'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './styles/globals.scss'


export default function Home() {
  const router = useRouter()
    
  return (
      <>
        <nav className='globalNavigation'>
          <h3 style={{cursor:"pointer"}} onClick={() => router.push("/")}>Rate Programming Languages</h3>
          <div className='navLinksContainer'>
            <Link className='navLinks' href="/register" >Registrar-se</Link>
            <Link className='navLinks' href="/login">Entrar</Link>
          </div>
        </nav>
        
        <main className='presentation'>
            <p>
              Descrição do Trabalho:

              Este trabalho de programação envolve a criação de uma plataforma web semelhante ao Tinder, mas com um foco exclusivo na avaliação de linguagens de programação. A ideia é proporcionar aos desenvolvedores e entusiastas de programação uma maneira divertida e envolvente de descobrir, aprender e compartilhar informações sobre diferentes linguagens de programação.
            </p>
            <p>
              Programador: Felipe Gomes
            </p>
        </main>
      </>
    )
}
