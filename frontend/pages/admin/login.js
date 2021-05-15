import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

const login = () => {

    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')

    const submit=(e)=>{
        e.preventDefault()
        if(email.trim()!='' && email.trim()!=''){
            console.table({email,password})
        }
    }

    return (
        <>
        <div className="container">
            <Head>
                <title>Login - Amazon</title>
            </Head>
            <div className="row">
                <div className="col-md-12 text-center loginBox">
                  <a><Link href='/'><Image
                        src="/amazonlogo.png"
                        alt="Picture of the author"
                        width={150}
                        height={60} /></Link></a>
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
                <span className="pt-3">By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</span>            
                </div>
            </div>
        </div>
        <div className="a-divider-inner"></div>
        </>
    )
}

export default login
