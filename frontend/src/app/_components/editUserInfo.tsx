'use client'

import React from "react"


export default function EditUserInfo({username} : {username: string}) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [changing, setChanging] = React.useState("password")

    function startChange(e : React.FormEvent) {
        setIsEditing(true)
        if (e.currentTarget.id === "changeName") {
            setChanging("name")
        }else if (e.currentTarget.id === "changePassword") {
            setChanging("password")
        }
    }
    async function changeInfo(e : React.FormEvent){
        let inputs : NodeListOf<HTMLInputElement> = document.querySelectorAll(".userInp")
        console.log(inputs)
        if (e.currentTarget.id === "btnPassword") {
            let oldPassword = inputs[0].value
            let newPassword = inputs[1].value
            let confirm = inputs[2].value
            console.log(oldPassword)
            console.log(newPassword)

            if (oldPassword != "" && newPassword != "" && confirm!="" && newPassword==confirm) {
                fetch("http://localhost:4000/editUser", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({password : oldPassword, newPassword: newPassword, username: username})
                })
                .then(res => res.json())
                .then(data =>{
                    if (data.error) {
                        alert("Nome de usuário já existente ou nome de usuário inválido")
                    }
                })
            }else{
                alert("Informações incorretas")
            }
        }else if(e.currentTarget.id === "btnName"){
            let oldName = inputs[0].value
            let newName = inputs[1].value

            if (oldName != "" && newName != "") {
                fetch("http://localhost:4000/editUser", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username : oldName, newUsername : newName})
                })
                .then(res => res.json())
                .then(data =>{
                    if (data.error) {
                        alert("Nome de usuário já existente ou nome de usuário inválido")
                    }else{
                        document.cookie = `token=; Path=/; Secure; SameSite=Strict;Max-Age=-1;`
                    }
                })
            }
        }
    }

    return (
        <>
            {
                isEditing ? 
                    changing=="password" ? 
                        <div className='editUserInfo'>
                            <form target="">
                                <input className='userInp' type="password" id='userName' name='userName' placeholder='Senha Antiga' />
                                <input className='userInp' type="password" id='userPass' name='userPass' placeholder='Nova Senha' />
                                <input className='userInp' type="password" id='userPass' name='userPass' placeholder='Confirmar Nova Senha' />
                                <button id="btnPassword" onClick={changeInfo}>Confirmar Troca</button>
                            </form>
                        </div>
                        :
                        <div className='editUserInfo'>
                            <form target="">
                                <input className='userInp' type="text" id='userName' name='userName' placeholder='Nome Antigo' />
                                <input className='userInp' type="text" id='userPass' name='userPass' placeholder='Novo Nome' />
                                <button id="btnName" onClick={changeInfo}>Confirmar Troca</button>
                            </form>
                        </div>
                :
                <div className='editUserInfo'>
                    <button type="button" id="changeName" onClick={startChange}>Trocar Nome</button>
                    <button type="button" id="changePassword" onClick={startChange}>Trocar Senha</button>
                </div>
            }
        </>
    )
}