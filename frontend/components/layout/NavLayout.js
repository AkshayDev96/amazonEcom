import React from 'react'
import Link from 'next/link'

const Nav = () => {
    return (
      <nav class="navbar navbar-inverse" style={{borderRadius:0,padding:4}}>
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img alt="Brand" src="/amazonlogoblack.png" style={{marginTop:-8}} width="136" height="36"/>
          </a>
        </div>
      </div>
    </nav>
    )
}

export default Nav
