import React from 'react'
import ProfileLayout from '../components/ProfileLayout'
import { useParams } from 'react-router'
import useGetProfile from '../hooks/useGetProfile'

function OthersProfile() {
    const { id } = useParams()
    // console.log(id)
     useGetProfile(id)
  
  return (
    <div>
      <ProfileLayout />
    </div>
  )
}

export default OthersProfile
