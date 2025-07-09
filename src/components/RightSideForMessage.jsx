import React from 'react';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector} from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';
import { Link } from 'react-router';

function RightSideForMessage() {
  useGetOtherUsers();

  const { userProfile, user } = useSelector((store) => store.user);

  useGetProfile(user._id);

  if (!userProfile?.followings || userProfile.followings.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>You haven't followed anyone yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 ">
      <h2 className="text-center font-bold text-favone text-xl ">People you followed</h2>

      {userProfile.followings.map((followedUser, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 border-t-2 pt-1 rounded-md  justify-between  border-b border-favone/50"
        >
          <div className="flex items-center gap-2">
            <img
              src={followedUser.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksR3Lt2Iy2rlmUKvJmc27GcXpe297gINhTA&s"}
              alt="profile"
              className="w-10 h-10 rounded-full border border-favone object-cover"
            />
            <div>
              <p className="font-bold text-gray-800">{followedUser?.email}</p>
              <p className="text-sm text-gray-600">{followedUser?.fullName}</p>
            </div>
          </div>

          <Link
            to={`/message/${followedUser?._id}`}
            className="btn bg-favone/60 hover:bg-favone/80 text-black text-sm w-full"
          >
            Message
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RightSideForMessage;
