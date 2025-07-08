import React from 'react'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

function LeftSideBar() {
  useGetOtherUsers()

  const {otherUsers} = useSelector((store)=>store.user)
  console.log(otherUsers)
  return (
    <div>
      {/* {
        otherUsers.map((user, index)=>{
          return <div>

          </div>
        })
      } */}
    </div>
  )
}

export default LeftSideBar
