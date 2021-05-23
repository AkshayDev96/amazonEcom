import React from 'react'
import Router from 'next/router'

const AdminAuth = ({children}) => {
  React.useEffect(()=>{
    if(process.browser){
      let d = JSON.parse(localStorage.getItem("userdata"))
      if(d){
        Router.push('/admin')
      }
    }
  },[])

    return <React.Fragment>{children}</React.Fragment>
}

export default AdminAuth
