import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { FiPlusSquare } from "react-icons/fi";
import { NavLink, useNavigate } from 'react-router';
import { MdLogout } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/apiEndPoints';

function LeftSideBar() {
    const navigate = useNavigate()

    const sideBarItems = [
        {name : "Home" , icon : <FaHome size={20}/> , to: "/"},
        {name : "Search" , icon : <IoSearch size={20}/> , to: "/"},
        {name : "Messages" , icon : <TiMessages size={20}/> , to: "/messgae"},
        {name : "Notifications" , icon : <MdNotificationsNone size={20}/> , to: "/"},
        {name : "Create" , icon : <FiPlusSquare size={20}/> , to: "/"},
        {name : "Profile" , icon : (<div>
<img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" className='rounded-full object-cover w-10 h-10' alt="" />
        </div>) , to: "/"},
         {name : "Logout" , icon : <MdLogout size={20}/> , to: "/logout"},
    ]

    const handleLogout = async ()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout` ,
                {withCredentials: true}
            )
        if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate("/login");
              }
            } catch (error) {
              const errMsg = error.response?.data?.message || "Something went wrong";
              toast.warn(errMsg);
            }}
  return (
    <div className='border-r-3 min-h-screen border-gray-200  '>
        <h3 className='font-bold text-3xl py-4 mx-5'>Media<span className='text-red-500'>Up</span></h3>
        <div className='flex flex-col gap-2  p-4'>
            {
                sideBarItems.map((data, index)=>{
                    if(data.name === "Logout"){
                        return <NavLink onClick={handleLogout}  className={`flex gap-2 items-center p-4 hover:bg-favone/30 rounded-md `} key={index}>
                        {data.icon} <span className='text-lg font-bold'>{data.name}</span>
                      </NavLink>
                    }
                   return  <NavLink to={data?.to || null} className={({isActive})=>`flex gap-2 items-center p-4 hover:bg-favone/30 rounded-md ${isActive? "": ""}`} key={index}>
                      {data.icon} <span className='text-lg font-bold'>{data.name}</span>
                    </NavLink>
                })
            }
        </div>
    </div>
  )
}

export default LeftSideBar

