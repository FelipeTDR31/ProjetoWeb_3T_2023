import React from "react";
import "../styles/globals.scss";

export default function logLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
   return(
    <>
        <main>
            <img src="" alt="" />
        </main>

        <aside>
            {children}
        </aside>
        
    </>
   )
}