import React, { useState } from 'react'
import { Link } from 'react-router'
import { IoMdPhotos } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { IoBookmarks } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/user.slice';
import { USER_API_END_POINT } from '../utils/apiEndPoints';
import axios from 'axios';

function ProfileLayout() {
  const { userProfile , user } = useSelector((store)=> store.user)
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('posts');
  const [followers , setFollowers] = useState(userProfile.followers.length)

  const handleFollow = async (userId) => {
    try {
      const res = await axios.patch(
        `${USER_API_END_POINT}/follow/${userId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.updatedUser)); 
        
      }
      if(res.data.isFollow){
        setFollowers(followers + 1)
      }else{
        setFollowers(followers - 1)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isFollowing = user.followings.includes(userProfile._id);

  return (
    <div className='mt-4'>
      <div className='flex items-center justify-center gap-6'>
        <div>
          <img className='w-52 h-52 rounded-full border-5 border-favone'  
            src={userProfile?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s"} 
            alt="" 
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex  gap-3 '>
            <p className='text-3xl text-bold '>{userProfile?.email}</p>
            {
              (userProfile?._id !== user._id) ?
                <button
                  onClick={() => handleFollow(userProfile._id)}
                  className={` btn   ${
                    isFollowing ? 'bg-gray-700 hover:bg-gray-900 text-white' : 'text-black bg-favone/60 hover:bg-favone/80'
                  }`}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                :
                <Link to={"/profile/edit"} className='btn bg-favone/70 hover:bg-favone/90'>
                  Edit Profile
                </Link>
            }
            { (userProfile?._id !== user._id) && <Link className='btn bg-favone/70 hover:bg-favone/90' to={"/message"}>Message</Link>}
          </div>
          <div className='flex gap-4'>
            <p className='text-gray-700 font-bold'>  
              <span className='text-gray-950 font-extrabold'>{userProfile?.posts?.length}</span> Posts 
            </p> 
            <p className='text-gray-700 font-bold'>  
              <span className='text-gray-950 font-extrabold'>{followers}</span> Followers 
            </p> 
            <p className='text-gray-700 font-bold'>  
              <span className='text-gray-950 font-extrabold'>{userProfile?.followings?.length}</span> Following 
            </p> 
          </div>
          <div>
            <p className='text-xl font-bold text-favone'>{userProfile?.fullName}</p>
            <p className='text-gray-700 w-96'>{userProfile?.bio?.slice(0 , 150)}</p>
          </div>
        </div>
      </div>

      {/* Tabs: Photos and Bookmarks */}
      <div className={`${(userProfile._id === user._id) && "grid grid-cols-2"} w-full  mt-8`}>
        <div 
          onClick={() => setActiveTab('posts')}
          className={`flex justify-center items-center py-6 cursor-pointer btn ${activeTab === 'posts' ? 'bg-favone/70 hover:bg-favone/80' : 'hover:bg-favone/20'}`}
        >
          <IoMdPhotos size={40}/>
        </div>
        {
          (userProfile._id === user._id) &&  
          <div
            onClick={() => setActiveTab('favourites')}
            className={`flex justify-center items-center py-6 cursor-pointer btn ${activeTab === 'favourites' ? 'bg-favone/70 hover:bg-favone/80' : 'hover:bg-favone/20'}`}
          >
            <IoBookmarks size={40}/>
          </div>
        }
      </div>

      {/* Content Section */}
      <div className='flex flex-wrap justify-center items-center gap-2 mt-4'>
        {
          activeTab === 'posts' &&
          userProfile?.posts?.map((post , index) => (
            <Link key={index} to={`/post/${post._id}`} className='group relative border-4 rounded-md border-favone'>
              <img className='w-80 h-80 rounded-md group-hover:opacity-30' src={post?.postImage} alt="" />
              <div className='hidden group-hover:block absolute top-1/2 right-1/3'>
                <p className='flex items-center gap-2 font-extrabold'>
                  <FaRegHeart size={18}/> {post?.likes?.length} Likes
                </p>
                <p className='flex items-center gap-2 font-extrabold'>
                  <GoCommentDiscussion size={18}/> {post?.comments?.length} Comments
                </p>
              </div>
            </Link>
          ))
        }
        {
          activeTab === 'favourites' &&
          userProfile?.favouritePost?.map((post, index) => (
            <Link key={index} to={`/post/${post._id}`} className='group relative border-4 rounded-md border-favone'>
              <img className='w-80 h-80 rounded-md group-hover:opacity-30' src={post.postImage} alt="" />
              <div className='hidden group-hover:block absolute top-1/2 right-1/3'>
                <p className='flex items-center gap-2 font-extrabold'>
                  <FaRegHeart size={18}/> {post?.likes?.length} Likes
                </p>
                <p className='flex items-center gap-2 font-extrabold'>
                  <GoCommentDiscussion size={18}/> {post?.comments?.length} Comments
                </p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default ProfileLayout;
