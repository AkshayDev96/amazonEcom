import React from 'react'
import Link from 'next/link'
import NavLayout from '../../components/layout/NavLayout'
import AdminAuth from '../../components/auth/AuthAdmin'

const index = () => {
    const menus=[
        {title:'Manage category',logo:'/category.png',url:'/admin/managecategory'},
        {title:'Manage subcategory',logo:'/subcategory.png',url:'/admin/managecategory'},
        {title:'Manage product category',logo:'/productCategory.png',url:'/admin/managecategory'},
        {title:'Manage product',logo:'/product.png',url:'/admin/managecategory'}
    ]
    return (
        <AdminAuth>
        <NavLayout/>
            <div className="container">
                <h4>Welcome to admin dashboard</h4>
                <div className="row">
                {
                    menus.map((menu,i)=>(
                        <Link href={menu.url} key={i}>
                        <a>
                        <div className="col-md-4" >
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <img style={{float:'left',height:50,width:60,paddingRight:10}} src={menu.logo} alt="" />
                                    <p style={{fontSize:17,marginTop:10}}>{menu.title}</p>
                                </div>
                            </div>
                        </div>
                        </a>
                        </Link>
                    ))
                }
                </div>
            </div>
        </AdminAuth>
    )
}

export default index
