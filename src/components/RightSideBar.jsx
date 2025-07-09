import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../redux/post.slice';
import { FaRegSnowflake } from "react-icons/fa6";
import { SlUserFollowing } from "react-icons/sl";

function RightSideBar() {
  const dispatch = useDispatch();
  const { viewMode } = useSelector((store) => store.post);

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-favone font-bold text-lg text-center'>Post View Mode</h2>

     <div className='pt-5 border-t-2 border-favone w-full'>
     <button
        onClick={() => dispatch(setViewMode('recent'))}
        className={`btn w-full ${viewMode === 'recent' ? 'bg-favone/70' : 'border-2 border-favone hover:bg-favone/20'}`}
      >
        <FaRegSnowflake /> Recent Posts
      </button>

     </div>
     <div className='  w-full'>
     <button
        onClick={() => dispatch(setViewMode('following'))}
        className={`btn w-full ${viewMode === 'following' ? 'bg-favone/70' : 'border-2 border-favone hover:bg-favone/20'}`}
      >
        <SlUserFollowing /> Following Posts
      </button>
     </div>
    </div>
  );
}

export default RightSideBar;
