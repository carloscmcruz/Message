"use client";

import Head from "next/head";
import { doLogin } from "./services/Web3Services";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const {push} = useRouter();
  const [message, setMessage] = useState("");

  function btnLoginClick(){
    setMessage("Conectando com a MetaMask... aguarde")
    doLogin()
    .then(wallet => push("../timeline"))
    .catch(err => {
      console.error(err);
      setMessage(err.message);
    })
     }
  return (
    <>
      <Head>
        <title> Message | Login</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="https://play-lh.googleusercontent.com/Bo4rO8Za7_DmkT0jeyG59rMlhAqPCyVJqxeMX1mTBohUHkpvCu4pMykh3FXjM5On1Hwe" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">MessageX</h1>
            <p className="lead">Nossa rede social descentralizada</p>
            <p className="lead mb-3">Autentique-se com sua carteira, escreva suas mensagens e atualize-se com as novidades do momento.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={btnLoginClick} >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLyH6WN6ULgENCGPkQDYo3Yv7IZXfcUi8mAQ&usqp=CAU" width="64" className="mb-3"/>
                Conectar com a MetaMask.
              </button>
              
            </div>
            <p className="message" >{message}</p>
          </div> 
        </div>
      </div>
    
    </>
  );
}
