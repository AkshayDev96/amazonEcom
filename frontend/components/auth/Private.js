import { Router } from 'next/router'
import React from 'react'
import {Logout} from './auth'
import Loader from "react-loader-spinner";

const Private = ({children}) => {
    const [isLoading,setLoading] = React.useState(true)
    React.useEffect(async () => {
        let data = JSON.parse(localStorage.getItem("userdata"))
       await fetch(`${process.env.api}/user-route`,{
            headers:{
                Authorization:`Bearer ${data?data.token:''}`
            }
        }).then((res)=>{
            if (res.status === 401) {
             Logout(()=> Router.push('/admin/login'))
            }
            if(res.ok) setLoading(false)
        }).catch((err)=>console.log(err))
    }, [])
    return (
        <>
          {isLoading?
            <div className="text-center" style={{marginTop:150}}>
            <Loader
            type="Grid"
            color="rgb(243, 168, 71)"
            height={100}
            width={100}/>
            </div>
            :children}  
        </>
    )
}
export default Private
