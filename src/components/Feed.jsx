import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { AiOutlineComment } from "react-icons/ai";
import { IoBookmarks } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { MdCancelPresentation } from "react-icons/md";
import CommentModal from "./CommentModal";

function Feed() {
  const [liked, setLiked] = useState(true);
  

  return (
    <div className="w-96 mx-auto ">
      <div>
        {/* profile of poster */}
        <div className="flex items-center justify-between gap-3">
       <div className="flex gap-2 items-center">
       <img
            className="w-10 h-10 rounded-full object-cover "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s"
            alt=""
          />
          <p className="text-lg font-bold">shazan.@gmail.com</p>
       </div>

          {/* modal */}
          <button
            className="cursor-pointer"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <HiDotsVertical size={20} />
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
             <button className="btn bg-favone/80 hover:bg-favone">
              Unfollow
             </button>
              <div className="modal-action">
              <form method="dialog">
                  <button className="cursor-pointer ">
                    <MdCancelPresentation size={25}/>
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        {/* caption */}
        <div>
  <p className="my-2 text-gray-600">caption Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, fugiat adipisci tempora debitis hic accusantium architecto vel eos rem enim nostrum error et esse sint. Hic libero, voluptate mollitia in ratione aperiam dolore iure unde aliquam quod officia, adipisci illum aliquid quasi ipsum, cumque modi accusamus temporibus nobis a corporis?</p> <span>-<span className="text-lg text-gray-900 font-bold">Shazan</span></span>
        </div>

        {/* post image */}
        <div>
          <img
            className="h-96 w-full rounded-md my-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s"
            alt=""
          />
        </div>
        {/* like comment favourite btn */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button className="cursor-pointer">
              {liked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
            </button>

             <div>
             <CommentModal />
             </div>
          {/* bookmark */}
          </div>
          <div>
            <button className="cursor-pointer">
              <IoBookmarks size={25} />
            </button>
          </div>
        </div>
        <div className="my-1">
          <span>1000</span> Likes
        </div>
        {/* comment */}
        <div className="relative mt-2">
          <form action="">
          <input
            className="p-2 outline-none border-favone/40 border-b-1 w-full"
            type="text"
            name="comment"
            placeholder="Add comment here..."
          />
          <button type="submit" className=" absolute top-1/5 right-4 cursor-pointer hover:scale-105">
            <LuSendHorizontal size={20} />
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feed;
