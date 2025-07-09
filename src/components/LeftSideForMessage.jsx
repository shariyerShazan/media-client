import React from 'react';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

function LeftSideForMessage() {
  useGetOtherUsers();

  const {  otherUsers } = useSelector((store) => store.user);

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-favone font-bold text-lg text-center'>Suggested for you</h2>
      {otherUsers?.map((u, index) => (
        <div
          key={index}
          className='flex flex-col border-t-2 border-favone/50 p-1 rounded'
        >
          <div className='flex items-center gap-2'>
            <img
              className='w-10 h-10 rounded-full object-cover border-2 border-favone'
              src={
                u?.profilePicture ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s'
              }
              alt='Profile'
            />
            <div>
              <Link
                className='hover:text-green-500 font-bold'
                to={`/othersProfile/${u._id}`}
              >
                {u?.email}
              </Link>
              <p className='text-sm text-gray-600'>{u?.fullName}</p>
            </div>
          </div>

          <Link
            to={`/message/${u?._id}`}
            className='mt-1 btn w-full bg-favone/60 hover:bg-favone/80 text-black text-sm'
          >
            Message
          </Link>
        </div>
      ))}
    </div>
  );
}

export default LeftSideForMessage;
