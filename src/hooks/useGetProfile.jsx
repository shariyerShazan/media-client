import axios from 'axios'
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/apiEndPoints'
import { useDispatch } from 'react-redux'
import { setUserProfile } from '../redux/user.slice'


const useGetProfile = (userId) => {
    const dispatch = useDispatch()
  useEffect(()=>{
    if (!userId) return
           const fetchUserData = async ()=>{
try {
    const res = await axios.get(`${USER_API_END_POINT}/get-profile/${userId}` , {withCredentials: true})
    if(res.data.success){
        dispatch(setUserProfile(res.data.user))
    }
} catch (error) {
    console.log(error)
}
           }
           fetchUserData()
  }, [userId , dispatch])
}

export default useGetProfile
