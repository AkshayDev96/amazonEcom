import React from 'react'
import AdminAuth from '../../components/auth/AuthAdmin'
import NavLayout from '../../components/layout/NavLayout'
import ImageUploader from '../../components/helpers/ImageController'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

const profile = () => {
    const [fields,setFields]=React.useState({firstName:'',lastName:'',email:'',password:''})
    const [seen,setSeen] = React.useState('password')
    const [isLoading,setLoading] = React.useState(true)
    const [image,setImage] = React.useState({})
    React.useEffect(async()=>{
    let data = JSON.parse(localStorage.getItem("userdata"))
        await fetch(`${process.env.api}/admin/get`,{
            headers:{
                Authorization:`Bearer ${data?data.token:''}`
            }
        }).then((d)=>d.json()).then((result)=>{
            if(result && result.success){
                setFields({
                    firstName:result?.data.firstName,
                    lastName:result?.data.lastName,
                    email:result?.data.email,
                    password:result?.data.password
                })
                setImage(result?.data?.pic)
            }else if(result && !result.success){
                console.log(result.error)
            }
            setLoading(false)
        }).catch((err)=>console.log(err),setLoading(false))
    },[])
    
    
    const UpdateDB=(tmp)=>{
        let data = JSON.parse(localStorage.getItem("userdata"))
        axios({
            method: 'put',
            url:`${process.env.api}/admin/update`,
            data:tmp,
            headers:{Authorization:`Bearer ${data?data.token:''}`,'Content-Type': 'application/json'}
        }).then(({data})=>{
            if(data && data.success){
                setImage(tmp?.pic)
                toast.success(data.message)
            }else{
                toast.error(data.error)
            }
        }).catch((e)=>{toast.error('something went wrong!');console.log(e)})
    }

    const change=(e)=>{
        setFields({
            ...fields,
            [e.target.id]:e.target.value
        })
    }

    const isValid=()=>{
        for(let v in fields){
            if(!fields[v] || fields[v].toString().trim()===''){
                return false
            }
        }
        return true
    }

    const submit = (e)=>{
        e.preventDefault()
        if(isValid()){
            UpdateDB(fields)
        }else{
            toast.error("All fields are required!")
        }
    }

    return (
        <AdminAuth>
        <NavLayout/>
        <ToastContainer/>
            <div className="container">
                <Link href="/admin"><a><i className="glyphicon glyphicon-menu-left"></i> <span className="fa fa-home"></span>Home</a></Link>
                    <h4>Profile details</h4>
                <div className="row">
                    <div className="col-lg-6">
                    {!isLoading?
                        (<form onSubmit={submit}>
                            <div className="form-group">
                                <img src={(image.url!==undefined)?image.url:'/avatar.png'} style={{width:100,height:100}} className="img-circle" alt="profile image" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pic">Change picture:</label>
                              <ImageUploader image={image} setImage={(pic)=>UpdateDB({pic})}  />
                            </div>
                            <div className="form-group row">
                                <div className="col-md-6">
                                    <label htmlFor="fname">First name:</label>
                                     <input type="text" id="firstName" onChange={change} placeholder="First name" value={fields?fields.firstName:''} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                <label htmlFor="lname">Last name:</label>
                                    <input type="text" id="lastName" onChange={change} placeholder="Last name" value={fields?fields.lastName:''} className="form-control" />
                                </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="email">Email:</label>
                                   <input type="email" disabled id="email"  className="form-control" value={fields?fields.email:''} placeholder="email address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Password:</label>
                                <div className="input-group">
                                <input type={seen} id="password" className="form-control" onChange={change} value={fields?fields.password:''} placeholder="password" />
                                <div className="input-group-addon btn btn-default" onClick={()=>setSeen((seen==='password')?'text':'password')}><span className={(seen==='password')?'glyphicon glyphicon-eye-open':'glyphicon glyphicon-eye-close'}></span></div>
                                </div>
                            </div>
                            <input type='submit' value="Update" className="btn btn-md" style={{background:'linear-gradient(to bottom,#f7dfa5,#f0c14b)',border:'1px solid #999'}}/>
                        </form>)
                    :<p>Loading data</p>}
                    </div>
                </div>
            </div>
        </AdminAuth>
    )
}

export default profile
