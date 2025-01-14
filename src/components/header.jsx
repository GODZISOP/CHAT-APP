import React from 'react'
import { Link, Navigate } from 'react-router-dom';

const Header = () => {
  return (
    <>
    <div className='fixed h-16 w-full bg-black px-12 text-white flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Chat-App</h1>
        <div className='flex justify-center items-center gap-10 text-[18px] font-semibold'>
            <Link to={'/home'}>HOME</Link>
            <Link to={'/messages'}>MESSAGES</Link>
            <Link to={'/users'}>USERS</Link>
            <Link to={'/login'}>
            <button onClick={()=>Navigate('/login')}>
            LOGOUT

            </button>
            </Link>


        </div>
        <div>
            <Link className='text-xl' to={'/profile'}>Profile</Link>
        </div>
    </div>
    </>
  )
}

export default Header;