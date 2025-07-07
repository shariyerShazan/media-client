import React from "react";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import useGetAllPost from "../hooks/useGetAllPost";
import { setCurrentPage, setLimit } from "../redux/post.slice";

function HomePage() {
  useGetAllPost()
  const dispatch = useDispatch()

  const { posts  , currentPage ,totalPages , totalPosts , limit} = useSelector((state) => state.post);
  return (
    <div className="grid grid-cols-24 overflow-hidden">
      <div className="col-span-4">
        filter
      </div>
      <div className="col-span-20 overflow-y-scroll">
        <h2 className="text-lg text-center text-favone font-extrabold mt-3 py-2 px-5 border-b-2 border-favone/50">Total posts: {totalPosts}</h2>
        <div className="grid grid-cols-3 gap-10 ">
          {posts.map((post, index) => {
            return <Feed post={post} key={index} />;
          })}
        </div>
        <div className="join my-6 flex justify-center gap-2">
  <button disabled={currentPage <= 1} onClick={()=>dispatch(setCurrentPage(currentPage-1))} className="join-item btn bg-favone/60 hover:bg-favone/70">«</button>
  <button className="join-item btn bg-favone/60">Page no: {currentPage}</button>
  <button disabled={currentPage === totalPages} onClick={()=>dispatch(setCurrentPage(currentPage+1))} className="join-item btn bg-favone/60 hover:bg-favone/70">»</button>
  <button className="join-item px-4 py-2 border-favone border-1 rounded-md">Total pages: {totalPages}</button>

<select
  value={limit}
  onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
  className="border-1 border-favone rounded-md px-3"
>
  <option value={10}>Limit : 10</option>
  <option value={20}>Limit : 20</option>
  <option value={50}>Limit : 50</option>
</select>

</div>



      </div>
    </div>
  );
}

export default HomePage;
