"use client";

import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";
import { addTweet } from "../services/Web3Services";

export default function NewTweet(){

    const[text, setText] = useState("");
    const [message, setMessage] = useState("");
    const {push} =useRouter();

    useEffect(() =>{
        const wallet = localStorage.getItem("wallet");
        if(!wallet)
            push("/");
    },[])
    
    function btnPublishClick(){
        setMessage("Enviando sua mensagem para blockchain. aguarde");
        addTweet(text)
            .then(result =>{
                setText("");
                setMessage("Mensagem enviada... atualizando chat");
            })
            .catch(err =>{
                setMessage(err.message);
                console.error(err);
            })
    }

    return (      
        <>
            <div className="top">
                <div className="left">
                    <img src="https://play-lh.googleusercontent.com/Bo4rO8Za7_DmkT0jeyG59rMlhAqPCyVJqxeMX1mTBohUHkpvCu4pMykh3FXjM5On1Hwe" className="brand"/>
                </div>
                <h1>Bem vindo ao MessageX</h1>
                <p>compartilhe sua mensagens em nosso app</p>
                <textarea className="form-control my-3" value={text} onChange={evt => setText(evt.target.value)}>
                </textarea>
                <div>
                    <input type="button" onClick={btnPublishClick} className="btn btn-primary" value="Enviar"/>
                </div>
                <p className="message">{message}</p>                  
            </div>
                
            
        </>
    )
}
