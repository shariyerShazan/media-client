import axios from 'axios'
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/apiEndPoints'
import { useDispatch } from 'react-redux'

import { setReceiver } from '../redux/message.slice'


const useGetReceiverSet = (userId) => {
    const dispatch = useDispatch()
  useEffect(()=>{
    if (!userId) return
           const fetchUserData = async ()=>{
try {
    const res = await axios.get(`${USER_API_END_POINT}/get-profile/${userId}` , {withCredentials: true})
    if(res.data.success){
        dispatch(setReceiver(res.data.user))
    }
} catch (error) {
    console.log(error)
}
           }
           fetchUserData()
  }, [userId , dispatch])
}

export default useGetReceiverSet
