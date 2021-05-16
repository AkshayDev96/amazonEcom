import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

const login = () => {

    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [errorMsg,setErrorMsg] = React.useState('')
    const [msg,setMsg] = React.useState('')

    const submit=(e)=>{
        e.preventDefault()
        if(email.trim()!='' && email.trim()!=''){
            setMsg('')
            setErrorMsg('')
            
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"email":email,"password":password});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        }

        fetch("http://localhost:5000/api/admin/login", requestOptions)
        .then((d)=>d.json())
        .then(result =>{
            if(result && result.success){
                setMsg(result.message)
            }else if(result && !result.success){
                setErrorMsg(result.error)
            }
        }).catch(error =>{
            console.log('err',error)
        });
        }
    }

    return (
        <>
        <div className="container" style={{marginBottom:20}}>
            <Head>
                <title>Login - Amazon</title>
            </Head>
            <div className="row">
                <div className="col-md-12 text-center loginBox">
                  <Link  href='/'>
                     <a>
                    <Image
                        src="/amazonlogo.png"
                        alt="Picture of the author"
                        width={130}
                        height={50} />
                        <span style={{position:'absolute',top:10,marginLeft:-10,color:'#000'}}>.in</span>
                    </a>
                        </Link>
                </div>
            </div>
            {/* form */}
            <div className="row box">
                <div className="signbox mb-2">
                <h3>Member login</h3>
                <form onSubmit={submit}>
                    <div className="mb-3 form-group">
                        <label htmlFor="email">Email:</label>
                        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="form-control form-control-sm" />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="password">Password:</label>
                        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} id="password" className="form-control form-control-sm" />
                    </div>
                    <div className="mb-3">
                        <input type='submit' value="Login" className="btn btn-sm btn-block" style={{background:'linear-gradient(to bottom,#f7dfa5,#f0c14b)',border:'1px solid #999'}}/>
                    </div>
                </form>
                    <br />
                <span className="m-3">Only for members of Amazon.</span>  
                {errorMsg?<p className="alert alert-danger alert-sm" role="alert">{errorMsg}</p>:null}          
                {msg?<p className="alert alert-success alert-sm" role="alert">{msg}</p>:null}          
                </div>
            </div>
        </div>
        <div className="a-divider-inner"></div>
        </>
    )
}

export default login
