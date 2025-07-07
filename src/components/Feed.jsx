import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { MdCancelPresentation } from "react-icons/md";
import { Link } from "react-router";
// import { useSelector } from "react-redux";
import { GoCommentDiscussion } from "react-icons/go";
// import useGetAllPost from "../hooks/useGetAllPost";
// import { useSelector } from "react-redux";

function Feed({post}) {

  const [liked, setLiked] = useState(false);
  
  
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
          <Link to={`/profile/${post?.postedBy?._id}`} className="text-md font-bold hover:text-green-600">{post?.postedBy?.email || ""}</Link>
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
          <button onClick={() => setLiked(!liked)}>
            {liked ? (
              <FaHeart size={22} className="text-red-500 cursor-pointer" />
            ) : (
              <FaRegHeart size={22} className="cursor-pointer"/>
            )}
          </button>
            <Link to={`comment/${post._id}`}>
            <GoCommentDiscussion size={22}/>
            </Link>
        </div>
        <button>
          <IoBookmarks className="cursor-pointer" size={22} />
        </button>
      </div>

      {/* Like Count */}
      <p className="text-sm text-gray-800 font-semibold">{post?.likes} Likes</p>

      {/* Comment Input */}
      <form className="relative mt-3">
        <input
          type="text"
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
