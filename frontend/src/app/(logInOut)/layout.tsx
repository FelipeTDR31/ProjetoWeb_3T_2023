import React from "react";
import "../styles/globals.scss";

export default function logLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
   return(
    <>
        {children}
    </>
   )
}