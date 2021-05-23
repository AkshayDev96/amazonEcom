import React from 'react'
import NavLayout from '../../components/layout/NavLayout'
import AdminAuth from '../../components/auth/AuthAdmin'
import Link from 'next/link'
import ImageUploader from '../../components/helpers/ImageController'
import axios from 'axios'
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

const manageCategory = () => {
    const [categories,setCategories] = React.useState([])
    const [loader,setLoader] = React.useState(true)
    const [submit,setSubmit] = React.useState(false)
    const [name,setName] = React.useState('')
    const [image,setImage] = React.useState({})
    const [isUpdate,setUpdate] = React.useState(false)
    const [id,setId] = React.useState('')

    React.useEffect(()=>{
        let data = JSON.parse(localStorage.getItem("userdata"))
        axios({
            method: 'get',
            url:`${process.env.api}/admin/categories/get`,
            headers:{Authorization:`Bearer ${data?data.token:''}`,'Content-Type': 'application/json'}
        }).then(({data})=>{
            setLoader(false)
            if(data && data.success){
               let v = data.data.map(obj=> ({ ...obj, checked: false }))
               setCategories(v)
            }else{
                toast.error('something went wrong!')
            }
        }).catch((e)=>{toast.error('something went wrong!');console.log(e);setLoader(false)})
    },[])

    const UpdateDB=(e)=>{
        e.preventDefault()
        setSubmit(true)
        var body = JSON.stringify({"name":name,"logo":image});
        let data = JSON.parse(localStorage.getItem("userdata"))
        
        var config = {
          method: isUpdate?'put':'post',
          url: `${process.env.api}/admin/category/${!isUpdate?'add':`update/${id}`}`,
          headers: { 
            'Authorization': `Bearer ${data?data.token:''}`, 
            'Content-Type': 'application/json'
          },
          data : body
        }
        
        axios(config)
        .then(({data})=>{
            setSubmit(false)
            if(data && data.success){
                toast.success(data?.message)
                data.data.checked=false
                if(isUpdate){
                    let val = categories.findIndex((v)=>v._id===id)
                    categories[val]=data.data
                    disableUpdate()
                }else{
                setCategories([data.data,...categories])
                }
                setImage({})
                setName('')
            }else{
                toast.error('something went wrong!')
            }
        }).catch((error)=>{
            setSubmit(false)
            toast.error('something went wrong!')
          console.log(error);
        });
        
    }

    const delCategory=(id)=>{
        let data = JSON.parse(localStorage.getItem("userdata"))
        var config = {
          method: 'delete',
          url: `${process.env.api}/admin/category/delete/${id}`,
          headers: { 
            'Authorization': `Bearer ${data?data.token:''}`, 
            'Content-Type': 'application/json'
          }
        }
        axios(config)
        .then(({data})=>{
            if(data && data.success){
                toast.success(data?.message)
                setCategories(categories.filter((v)=>v._id!=id))
            }else{
                toast.error('something went wrong!')
            }
        }).catch((error)=>{
            toast.error('something went wrong!')
          console.log(error);
        })
    }

    const enableUpdate=(data)=>{
        setUpdate(true)
        setName(data.name)
        setImage(data.logo)
        setId(data._id)
    }

    const disableUpdate=()=>{
        setUpdate(false)
        setName('')
        setImage({})
        setId('')
    }

    const checkAll=()=>{
        let v = categories.map(obj=> ({ ...obj, checked:!obj.checked }))
        setCategories(v)
    }

    const ViewAll=()=>(
        <div style={{maxHeight:300,overflowY:'auto'}}>
            <table className="table table-hover table-responsive text-left">
          <thead><tr>
                <th width="50">
                    <button className='btn btn-xs btn-danger' onClick={checkAll}>Select All</button>
                </th>
                <th width="80">Sno.</th>
                <th width="80">Logo</th>
                <th width="300">Name</th>
                <th width="200">Created At</th>
                <th width="200">Updated At</th>
                <th colSpan="2">Action</th>
            </tr></thead>
            <tbody>
            {categories.map((c,i)=>(
                <tr key={i}>
                <td><input type="checkbox" value={c._id} checked={c.checked?'checked':''} onChange={()=>{}} /></td>
                <td>{i+1}</td>
                <td>
                {<img src={c.logo?.thumbnailUrl} style={{width:50,height:50}} className="img-circle" alt={"image"} />}
                </td>
                <td>{c.name}</td>
                <td>{moment(c.createdAt).fromNow()} - {moment(new Date(c.createdAt)).format('DD/MM/YYYY')} - {new Date(c.createdAt).toLocaleTimeString()}</td>
                <td>{moment(c.updatedAt).fromNow()} - {moment(new Date(c.updatedAt)).format('DD/MM/YYYY')} - {new Date(c.updatedAt).toLocaleTimeString()}</td>
                <td><button className="btn btn-xs btn-info" onClick={()=>enableUpdate(c)} ><span className="fa fa-pencil"></span></button></td>
                <td><button className="btn btn-xs btn-danger" onClick={()=>delCategory(c._id)}><span className="fa fa-trash"></span></button></td>
              </tr>
            ))}
            
            </tbody>
        </table>
        </div>
    )

   


    return (
        <AdminAuth>
            <NavLayout />
            <div className="container">
                <div className="row">
                <ToastContainer/>
                <Link href="/admin"><a><i className="glyphicon glyphicon-menu-left"></i> <span className="fa fa-home"></span>Home</a></Link>

                  <div className="col-lg-12">
                    <div className="col-md-6">
                    {/* form-starts */}
                    <form className="form-group" onSubmit={UpdateDB}>
                        <div className="form-group">
                        <label>Category name:</label>{' '}
                        <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className="form-control" placeholder="Category name"/>{' '}
                        </div>
                        {' '}
                        <div className="form-group">
                            <ImageUploader image={image} setImage={setImage}/>{" "}
                            {image.url?<img src={image.url} style={{width:100,height:100,marginTop:4}} className="img-circle" alt={"image"} />:null}
                        </div> 
                        {!isUpdate?
                        <input type='submit' value={submit?'Adding...':'Add'} disabled={!image.url || name.toString().trim()==='' || submit}  className="btn btn-sm btn-block" style={{width:100,background:'linear-gradient(to bottom,#f7dfa5,#f0c14b)',border:'1px solid #999'}}/>
                        :(
                            <div className="row">
                                <div className="col-xs-3">
                                <input type='submit' value={submit?'updating...':'Update'} disabled={!image.url || name.toString().trim()==='' || submit}  className="btn btn-sm btn-block" style={{width:100,background:'linear-gradient(to bottom,#f7dfa5,#f0c14b)',border:'1px solid #999'}}/>
                                </div>
                                <div className="col-xs-3">
                                <input type='button' onClick={disableUpdate} value={'Cancel update'} disabled={submit} className="btn btn-sm btn-block btn-default" style={{width:100}}/>
                                </div>
                            </div>
                        )}
                        
                    </form>
                    {/* form-ends */}
                    </div>
                  </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                    {/* view list starts */}
                    <h4>All categories</h4>
                    <span className="text-left">Total categories: {categories.length}</span>
                    {loader?<Loader
                        type="ThreeDots"
                        color="rgb(243, 168, 71)"
                        height={100}
                        width={100}
                    />:<ViewAll/>}
                    {/* view list ends */}
                    </div>
                </div>
            </div>
        </AdminAuth>
    )
}

export default manageCategory
