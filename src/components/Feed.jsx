import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { MdCancelPresentation } from "react-icons/md";
import { Link } from "react-router";
import { IoMdInformationCircleOutline } from "react-icons/io";
import axios from "axios";
import { POST_API_END_POINT } from "../utils/apiEndPoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


function Feed({post}) {

  const { user } = useSelector((state) => state.user); 
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id));
  const [likeCount , setLikeCount] = useState(post?.likes?.length)

  const handleLike = async ()=>{
  try {
      const res = await axios.post(`${POST_API_END_POINT}/like-unlike/${post._id}` , null , {withCredentials: true})
      if(res.data.success){
          toast(res.data.message)
          setLikeCount(res.data.likesCount)
          setLiked(!liked)
      }
  } catch (error) {
    console.log(error)
  }
  }

  const handleComment = async (e)=>{
    e.preventDefault()
    const text = e.target.comment.value
try {
  const res = await axios.post(`${POST_API_END_POINT}/add-comment/${post._id}` , {text} , {withCredentials: true})
  if(res.data.success){
    e.target.reset()
      toast(res.data.message)
  }
} catch (error) {
  console.log(error)
}
  }
  
  
  return (
    <div className=" bg-white shadow-md hover:shadow-2xl rounded-lg  p-4 my-5 border-favone border-1
    ">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={`${post?.postedBy?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s"}`}
            alt=""
          />
          <Link to={`/othersProfile/${post?.postedBy?._id}`} className="text-md font-bold hover:text-green-600">{post?.postedBy?.email || ""}</Link>
        </div>
        {/* Options modal */}
        <button
        className="cursor-pointer"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <HiDotsVertical size={20} />
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <button className="btn bg-red-500 text-white hover:bg-red-600">
              Unfollow
            </button>
            <div className="modal-action">
              <form method="dialog">
                <button className="cursor-pointer">
                  <MdCancelPresentation size={25} />
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Caption */}
      <p className="text-sm text-gray-700 mb-3 ">
        <span className="text-left">{post?.caption.slice(0, 250)}</span> <br />
        <span className="font-bold text-right">- {post?.postedBy?.fullName || ""}</span>
      </p>

      {/* Post Image */}
      <img
        className="rounded-lg object-cover w-full h-96 mb-3"
        src={post?.postImage}
        alt="Post"
      />

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-5 items-center">
          <button onClick={() => handleLike()}>
            {liked ? (
              <FaHeart size={22} className="text-red-500 cursor-pointer" />
            ) : (
              <FaRegHeart size={22} className="cursor-pointer"/>
            )}
          </button>
            <Link to={`post/${post._id}`}>
            <IoMdInformationCircleOutline size={22}/>
            </Link>
        </div>
        <button>
          <IoBookmarks className="cursor-pointer" size={22} />
        </button>
      </div>

      {/* Like Count */}
      <p className="text-sm text-gray-800 font-semibold">{likeCount} Likes</p>

      {/* Comment Input */}
      <form onSubmit={handleComment} className="relative mt-3">
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          className="w-full p-2 border-b border-favone/40 outline-none pr-10"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
        >
          <LuSendHorizontal className="cursor-pointer" size={20} />
        </button>
      </form>
    </div>
  );
}

export default Feed;
