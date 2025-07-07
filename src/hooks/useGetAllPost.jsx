import axios from "axios";
import { useEffect } from "react";
import { POST_API_END_POINT } from "../utils/apiEndPoints";
import { setCurrentPage, setPosts, setTotalPages, setTotalPosts } from "../redux/post.slice";
import { useDispatch, useSelector } from "react-redux";

const useGetAllPost = () => {
    const dispatch = useDispatch();
  const { limit , currentPage} = useSelector((state) => state.post);


    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get(`${POST_API_END_POINT}/get-allpost?page=${currentPage}&limit=${limit}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setPosts(res.data.posts));
                    dispatch(setCurrentPage(res.data.currentPage));
                    dispatch(setTotalPages(res.data.totalPages));
                    dispatch(setTotalPosts(res.data.totalPosts));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllPost();
    }, [dispatch, currentPage, limit]); 
};

export default useGetAllPost;
