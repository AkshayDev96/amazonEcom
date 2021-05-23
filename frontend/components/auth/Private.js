import { Router } from 'next/router'
import React from 'react'
import {Logout} from './auth'

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
          {isLoading?'':children}  
        </>
    )
}
export default Private
