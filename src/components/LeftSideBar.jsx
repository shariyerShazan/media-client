import React from 'react';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/apiEndPoints';
import { setUser } from '../redux/user.slice';
import { toast } from 'react-toastify';

function LeftSideBar() {
  useGetOtherUsers();

  const dispatch = useDispatch();
  const { user, otherUsers } = useSelector((store) => store.user);

  const handleFollow = async (userId) => {
    try {
      const res = await axios.patch(
        `${USER_API_END_POINT}/follow/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast(res.data.message)
        dispatch(setUser(res.data.updatedUser)); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-favone font-bold text-lg text-center'>Suggested for you</h2>
      {otherUsers?.map((u, index) => {
        const isFollowing = user?.followings.includes(u._id); 

        return (
          <div key={index} className='flex flex-col border-t-2 border-favone/50 p-2 rounded'>
            <div className='flex items-center gap-2'>
              <img
                className='w-10 h-10 rounded-full object-cover border-2 border-favone'
                src={u?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s"}
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
            <button
              onClick={() => handleFollow(u._id)}
              className={`mt-2 btn w-full  ${
                isFollowing ? 'bg-gray-700 hover:bg-gray-900 text-white' : 'text-black bg-favone/60 hover:bg-favone/80'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default LeftSideBar;
