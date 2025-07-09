import React from 'react'
// import LeftSideBar from '../components/LeftSideBar'
import { Outlet } from 'react-router'
import RightSideForMessage from '../components/RightSideForMessage'
import LeftSideForMessage from '../components/LeftSideForMessage'

function MessageHome() {
  return (
    <div className='grid grid-cols-12 gap-6 mt-6'>
       <div className='col-span-3'>
       <LeftSideForMessage />
       </div>
       <div  className='col-span-6'>
       <Outlet />
       </div>
       <div className='col-span-3'>
        <RightSideForMessage />
       </div>
    </div>
  )
}

export default MessageHome
