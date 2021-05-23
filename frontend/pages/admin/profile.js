import React from 'react'
import AdminAuth from '../../components/auth/AuthAdmin'
import NavLayout from '../../components/layout/NavLayout'
import ImageUploader from '../../components/helpers/ImageController'

const profile = () => {
    const [fields,setFields]=React.useState({firstName:'',lastName:'',email:'',password:'',pic:''})
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
                setFields(result.data?result.data:'')
            }else if(result && !result.success){
                console.log(result.error)
            }
            setLoading(false)
        }).catch((err)=>console.log(err),setLoading(false))
    },[]) 

    const change=(e)=>{
        setFields({
            ...fields,
            [e.target.id]:e.target.value
        })
    }

    const submit = (e)=>{
        e.preventDefault()

    }

    return (
        <AdminAuth>
        <NavLayout/>
            <div className="container">
                    <h4>Profile details</h4>
                <div className="row">
                    <div className="col-lg-6">
                    {!isLoading?
                        (<form onSubmit={submit}>
                            <div className="form-group">
                                <img src={image.url?image.url:'/avatar.png'} style={{width:100,height:100}} className="img-circle" alt="profile image" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pic">Change picture:</label>
                              <ImageUploader image={image} setImage={setImage} />
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
