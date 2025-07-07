import React from 'react'
import { Outlet } from 'react-router'
import RightSideBar from '../components/RightSideBar'
import LeftSideBar from '../components/LeftSideBar'

function MainLayout() {
  return (
    <div className="flex h-screen w-[90%] mx-auto overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[20%] h-full border-r overflow-hidden">
        <LeftSideBar />
      </div>

      {/* Main Content */}
      <div className="w-[60%] h-full overflow-y-scroll px-4">
        <Outlet />
      </div>

      {/* Right Sidebar */}
      <div className="w-[20%] h-full border-l overflow-hidden">
        <RightSideBar />
      </div>
    </div>
  )
}

export default MainLayout
