"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {

  const [show, setShow] = useState()
  // const showNav 
  return (
    <div className='w-10/12 mx-auto container py-7'>
      <nav className='flex flex-row justify-between items-center'>
      <Link href="/" > 
      <Image className='hidden md:block' src="/tastduty-logo.svg" alt='' width={150} height={150}/>
      <Image className='block md:hidden' src="/logo-mobile.svg" alt='' width={45} height={45}/>
      </Link>

      <div className='flex gap-3 lg:gap-6'>
        <Link className=' hover:text-purple-600' href="/createtask" >New Task</Link>
        <Link className=' hover:text-purple-600' href="/alltask" >All Task</Link>
      </div>

      </nav>
    </div>
  )
}

export default Navbar