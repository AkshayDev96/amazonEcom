import React from 'react'
import Router from 'next/router'
import PrivateUi from './Private'

const AdminAuth = ({children}) => {

  React.useEffect(()=>{
    if(process.browser){
      let d = JSON.parse(localStorage.getItem("userdata"))
      if(!d){
        Router.push('/admin/login')
      }
    }
  },[])

    return <PrivateUi>{children}</PrivateUi>
}

export default AdminAuth
