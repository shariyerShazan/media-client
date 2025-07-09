import React from "react";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import useGetAllPost from "../hooks/useGetAllPost";
import {
  setCurrentPage,
  setLimit,
} from "../redux/post.slice";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";

function HomePage() {
  useGetAllPost();
  const dispatch = useDispatch();

  const { posts, currentPage, totalPages , limit, viewMode } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  // ✅ Filtered Posts based on viewMode
  const filteredPosts =
    viewMode === 'recent'
      ? posts
      : posts.filter((post) =>
          user?.followings?.some((f) => f._id === post.postedBy._id)
        );

  return (
    <div className="grid grid-cols-14 gap-6 h-screen">
      
      {/* Left Sidebar */}
      <div className="col-span-3 mt-6 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-favone/60 scrollbar-track-transparent">
        <LeftSideBar />
      </div>

      <div></div> {/* Spacer for center */}

      {/* Center Feed */}
      <div className="col-span-6 overflow-y-scroll h-screen pr-4">
        <h2 className="text-lg text-center text-favone font-extrabold mt-3 py-2 px-5 border-b-2 border-favone/50">
          Showing: {viewMode === "recent" ? "Recent Posts" : "Following Posts"} ({filteredPosts.length})
        </h2>

        <div className="grid grid-cols-1 gap-10">
          {filteredPosts.map((post, index) => (
            <Feed key={index} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <div className="join my-6 flex justify-center gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            className="join-item btn bg-favone/60 hover:bg-favone/70"
          >
            «
          </button>
          <button className="join-item btn bg-favone/60">
            Current Page: {currentPage}
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            className="join-item btn bg-favone/60 hover:bg-favone/70"
          >
            »
          </button>
          <button className="join-item px-4 py-2 border-favone border-1 rounded-md">
            Total pages: {totalPages}
          </button>

          <select
            value={limit}
            onChange={(e) => {
              dispatch(setLimit(Number(e.target.value)));
              dispatch(setCurrentPage(1));
            }}
            className="border-1 border-favone rounded-md px-3"
          >
            <option value={10}>Limit : 10</option>
            <option value={20}>Limit : 20</option>
            <option value={50}>Limit : 50</option>
          </select>
        </div>
      </div>

      <div></div> {/* Spacer for center */}

      {/* Right Sidebar */}
      <div className="col-span-3 mt-4 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-favone/60 scrollbar-track-transparent">
        <RightSideBar />
      </div>
    </div>
  );
}

export default HomePage;
