import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState:{
        posts: [],
        currentPage: 1 ,
        totalPages : 1 ,
        totalPosts : 1 ,
        limit: 10 ,
        singlePost : null ,
         viewMode: 'recent'
    },
    reducers: {
        setPosts:(state , action)=>{
            state.posts = action.payload
        },
        setCurrentPage:(state , action)=>{
            state.currentPage = action.payload
        },
        setTotalPages:(state , action)=>{
            state.totalPages = action.payload
        },
        setTotalPosts:(state , action)=>{
            state.totalPosts = action.payload
        },
        setLimit:(state , action)=>{
            state.limit = action.payload
        },
        setSinglePost : (state , action)=>{
            state.singlePost = action.payload
        },setViewMode: (state, action) => {
            state.viewMode = action.payload;
          }
    }
})
export const {setPosts , setCurrentPage , setTotalPages , setTotalPosts , setLimit , setSinglePost , setViewMode} = postSlice.actions 
export default postSlice.reducer