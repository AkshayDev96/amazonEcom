import React from 'react'
import Link from 'next/link'
import {Logout} from '../auth/auth'
const Nav = () => {
  const [user,setUser]=React.useState('')
  React.useEffect(()=>{
    let d = JSON.parse(localStorage.getItem("userdata"))
      setUser(d?d.user:'')
  },[])

 

    return (
      <nav className="navbar navbar-inverse" style={{background:'#131921',borderRadius:0,borderColor:'#131921'}}>
      <div className="container-fluid">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">
           <img alt="Brand" src="/amazonlogoblack.png" style={{marginTop:-3}} width="136" height="36"/>
          </a>
        </div>
    
        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            {/* <li><a style={{color:'white'}} href="#">Deliver to Akshay <span class="sr-only">(current)</span></a></li> */}
          </ul>
          <div className="col-md-6 offset-md-4">
          <div className="input-group" style={{marginTop:10,zIndex:10}}>
                <div className="input-group-btn search-panel">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    	<span id="search_concept">All</span> <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                      <li><a href="#contains">Example 1</a></li>
                      <li><a href="#its_equal">Example 2</a></li>
                      <li><a href="#greather_than">Example 3</a></li>
                      <li><a href="#less_than">Example 4</a></li>
                      <li className="divider"></li>
                      <li><a href="#all">All</a></li>
                    </ul>
                </div>
                <input type="hidden" name="search_param" value="all" id="search_param"/>         
                <input type="text" className="form-control" name="x" placeholder="Search"/>
                <span className="input-group-btn">
                    <button className="btn btn-default" style={{background:'#f3a847',borderColor:'#f3a847'}} type="button"><span className="glyphicon glyphicon-search"></span></button>
                </span>
            </div>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" style={{color:'#fff',fontSize:14,lineHeight:'14px'}} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{user?<span style={{fontSize:12}}>Hello {user.firstName}</span>:null} <br /> Account & List <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link  href="/admin/profile"><a>View Profile</a></Link></li>
                <li role="separator" className="divider"></li>
                <li onClick={Logout}><Link href="/admin/login"><a>Sign out</a></Link></li>
              </ul>
            </li>
          </ul>
        </div>
        {/* <!-- /.navbar-collapse --> */}
      </div>
      {/* <!-- /.container-fluid --> */}
    </nav>
    )
}

export default Nav
