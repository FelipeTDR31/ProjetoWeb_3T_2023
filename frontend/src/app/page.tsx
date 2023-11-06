'use client'

import Link from 'next/link';

export default function Home() {
    
  return (
      <>
        <nav>
          <h3>Rate Programming Languages</h3>
          <Link href="/register">Registrar-se</Link>
          <Link href="/login">Entrar</Link>
        </nav>
        
        <main>
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
