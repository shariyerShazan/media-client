import React from 'react'
import { Link } from 'react-router'
import { IoMdPhotos } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
// import { RiMoneyRupeeCircleFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

function ProfileLayout() {

    const {userProfile , user } = useSelector((store)=> store.user)


    // console.log(userProfile)
  return (
    <div className='mt-4'>
        <div className='flex items-center justify-center gap-6'>
        <div>
            <img className='w-52 h-52 rounded-full border-5 border-favone'  src={"https://media.licdn.com/dms/image/v2/D4D03AQFkWpDyt1kmHQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1708681895016?e=2147483647&v=beta&t=loidE7YrQeSEt4ByGWkPf3PVNk1qPK3lW1v0HObXA6c"} alt="" />
        </div>
        <div className='flex flex-col gap-2'>
            <div className='flex gap-3'>
                <p className='text-3xl text-bold '>{userProfile?.email}</p>
                {
                    (userProfile?._id !== user._id) ? <button className='btn bg-favone/70 hover:bg-favone/90'>
                    Follow
                </button> :<button className='btn bg-favone/70 hover:bg-favone/90'>
                    Edit Profile
                </button>
                }
          { (userProfile?._id !== user._id) && <Link className='btn bg-favone/70 hover:bg-favone/90' to={"/message"}>Message</Link>}
            </div>
            <div className='flex gap-4'>
             <p className='text-gray-700 font-bold'>  <span className='text-gray-950 font-extrabold'>{userProfile?.posts?.length}</span> Posts </p> 
             <p className='text-gray-700 font-bold'>  <span className='text-gray-950 font-extrabold'>{userProfile?.followers?.length}</span> Followers </p> 
             <p className='text-gray-700 font-bold'>  <span className='text-gray-950 font-extrabold'>{userProfile?.followings?.length}</span> Following </p> 
        </div>
            <div>
                <p className='text-xl font-bold text-favone'>{userProfile?.fullName}</p>
                <p className='text-gray-700'>{userProfile?.bio}</p>
            </div>
            
            
        </div>
        

        </div>
        <div>
        <div className='mt-8 flex justify-center items-center py-6 btn bg-favone/70 hover:bg-favone/90 cursor-auto '>
                <p><IoMdPhotos size={40}/></p>
            </div>
            <div className=' flex flex-wrap justify-center items-center gap-2 mt-4'>
               { userProfile?.posts?.map((post , index)=>{
                return <Link key={index} to={`/post/${post._id}`} className='group relative border-4 rounded-md border-favone'>
                <img className='w-80 h-80 rounded-md group-hover:opacity-30' src={post.postImage} alt="" />
                <div className=' hidden group-hover:block absolute top-1/2 right-1/3'>
                <p className='flex items-center gap-2 font-extrabold'>
                    <FaRegHeart size={18}/> {post.likes.length} Likes
                </p>
                <p className='flex items-center gap-2 font-extrabold'>
                    <GoCommentDiscussion size={18}/> {post.comments.length} Comments
                </p>
                </div>

                </Link>
               })
               }
            </div>
        </div>
    </div>
  )
}

export default ProfileLayout
