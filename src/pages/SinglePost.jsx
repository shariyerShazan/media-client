import React from 'react';
import useGetSinglePost from '../hooks/useGetSinglePost';
import { Link, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';

function SinglePost() {
  const { postId } = useParams();
  useGetSinglePost(postId);

  const { singlePost } = useSelector((state) => state.post);

  if (!singlePost) {
    return <p className="text-center py-10 text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row max-w-6xl mx-auto mt-10 gap-2  px-4">
      
      {/* Left Side - Post Details */}
      <div className="flex flex-col space-y-4 flex-[1_1_50%]  p-6 rounded-lg shadow-xl border-y-4 border-favone">
        <div className="flex items-center gap-3 mb-3">
          <img
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
            src={singlePost.postedBy?.profilePicture || "https://via.placeholder.com/150"}
            alt={singlePost.postedBy?.fullName || "User"}
          />
          <div>
            <Link
              to={`/othersProfile/${singlePost.postedBy?._id}`}
              className="font-semibold text-lg hover:text-green-600"
            >
              {singlePost.postedBy?.email || "No Email"}
            </Link>
            <p className="text-sm text-gray-500">{singlePost.postedBy?.fullName}</p>
          </div>
        </div>

        <p className="text-gray-700 text-md">{singlePost.caption.slice(0,200)}</p>

        <img
          className="w-full h-[400px] object-cover rounded-md shadow-sm border border-gray-200"
          src={singlePost.postImage}
          alt="Post"
        />

        <p className="flex items-center gap-2 mt-2 text-pink-600 font-semibold">
          <FaHeart /> {singlePost.likes?.length || 0} Likes
        </p>
      </div>

      {/* Right Side - Comments */}
      <div className="flex flex-col flex-[1_1_50%] border-y-4 border-favone p-6 rounded-lg shadow-md max-h-[600px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
          Comments ({singlePost.comments?.length || 0})
        </h2>

        {singlePost.comments?.length === 0 && (
          <p className="text-gray-500 italic">No comments yet.</p>
        )}

        <div className="flex flex-col gap-2">
          {singlePost.comments.map((comment, index) => (
            <div
              key={index}
              className="flex items-start gap-4  p-3 rounded-lg hover:shadow-2xl"
            >
              <img
                src={comment?.commentedBy?.profilePicture || "https://via.placeholder.com/40"}
                alt={comment?.commentedBy?.fullName || "User"}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div>
                <Link
                  to={`/othersProfile/${comment?.commentedBy?._id}`}
                  className="font-semibold text-gray-800 hover:text-green-600"
                >
                  {comment?.commentedBy?.email || "No Email"}{" "}
                  <span className="text-sm text-gray-500">
                    ({comment?.commentedBy?.fullName || "No Name"})
                  </span>
                </Link>
                <p className="mt-1 text-gray-700 text-sm">{comment?.comment || comment?.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default SinglePost;
