import React from 'react'
import Image from 'next/image'
import Head from 'next/head'

const Signup = () => {

    return (
        <>
        <div className="container">
            <Head>
                <title>Sign-In - Amazon</title>
            </Head>
            <div className="row">
                <div className="col-md-12 text-center SignupBox">
                    <Image
                        src="/amazonlogo.png"
                        alt="Picture of the author"
                        width={150}
                        height={60} />
                </div>
            </div>
            {/* form */}
            <div className="row box">
                <div className="signbox mb-2">
                <h3>Sign-In</h3>
                <form>
                    <div className="mb-3 form-group">
                        <label htmlFor="box">Email or mobile phone number</label>
                        <input type='text' id="box" className="form-control form-control-sm" />
                    </div>
                    <div className="mb-3">
                        <input type='submit' value="Continue" className="btn btn-sm btn-block" style={{background:'linear-gradient(to bottom,#f7dfa5,#f0c14b);',border:'1px solid #999'}}/>
                    </div>
                </form>
                <span className="pt-3">By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</span>            
                </div>
                <br />
                <div className="separator">New to Amazon?</div>
                <button style={{marginTop:3,background:'linear-gradient(to bottom,#f7f8fa,#e7e9ec)',border:'1px solid #999'}} className="btn btn-default btn-sm btn-block">Create your Amazon account</button>
            </div>
        </div>
        <div class="a-divider-inner"></div>
        </>
    )
}

export default Signup
