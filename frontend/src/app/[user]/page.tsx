'use client'
import React, { useEffect, useState } from "react"
import AdminPage from "../_components/adminPage"
import UserPage from "../_components/userPage"
import { useRouter } from "next/navigation"

export default function Page({params} : {params : {user : string}}) {
    type userInfo = {
        username : string;
        email : string;
        password : string;
        is_Admin : boolean;
    }
    const [info, setInfo] = useState<userInfo>({
        "username" : "",
        "email" :"",
        "password": "",
        "is_Admin" : false
    })

    const router = useRouter()

    function getCookie(cookieName: string){
        var cookiestring  = document.cookie;
        var cookiearray = cookiestring.split(';');
        for(var i =0 ; i < cookiearray.length ; ++i){ 
            if(cookiearray[i].trim().match('^'+cookieName+'=')){ 
                return cookiearray[i].replace(`${cookieName}=`,'').trim();
            }
        } return null;
    }

    useEffect(() =>{
        const token = getCookie("token")
        if (token !== null) {
            let username = params.user
            fetch("http://localhost:4000/getUser", {
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify({ username })
            })
            .then(res => res.json())
            .then(data => setInfo(data))
            
            
        }else{
            router.push("/login")
        }
    })

    return(
        <>
            {
                info?.is_Admin ? (<AdminPage username={info.username} email={info.email} />) : (<UserPage username={info.username} password={info.password} email={info.email} />)
            }
        </>
    )
}