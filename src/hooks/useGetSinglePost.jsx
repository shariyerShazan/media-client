import axios from "axios";
import { useEffect } from "react";
import { POST_API_END_POINT } from "../utils/apiEndPoints";
import { useDispatch} from "react-redux";
import { setSinglePost } from "../redux/post.slice";

const useGetSinglePost = (postId) => {
    const dispatch = useDispatch();
    // console.log(postId)
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get(`${POST_API_END_POINT}/get-postById/${postId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSinglePost(res.data.post))
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllPost();
    }, [dispatch , postId]); 
};

export default useGetSinglePost;
