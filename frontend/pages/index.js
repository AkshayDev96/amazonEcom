import React from 'react'
import Link from 'next/link'

const index = () => {
    return (
        <div>
            <h1>Web</h1>
            <ul>
                <li><Link href='/admin/login'>Go to admin Login</Link></li>
                <li><Link href='/admin/signup'>Go to admin sign-up</Link></li>
                <li><Link href='/signup'>Go to user sign-up</Link></li>
                <li><Link href='/login'>Go to user login</Link></li>
            </ul>
        </div>
    )
}

export default index
