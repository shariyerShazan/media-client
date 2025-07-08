import axios from 'axios'
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/apiEndPoints'
import { useDispatch } from 'react-redux'
import {setOtherUsers } from '../redux/user.slice'

const useGetOtherUsers = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
        const fetchOtherUsers = async ()=>{
            const res = await axios.get(`${USER_API_END_POINT}/other-users` , {withCredentials: true})
            if(res.data.success){
                // console.log(res.data.otherUsers)
               dispatch(setOtherUsers(res.data.otherUsers))
            }
        }
        fetchOtherUsers()
  },[dispatch])
}

export default useGetOtherUsers
