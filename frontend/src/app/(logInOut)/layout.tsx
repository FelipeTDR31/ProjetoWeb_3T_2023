import React from "react";
import "../styles/globals.css";

export default function logLayout( children : React.ReactNode) {
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