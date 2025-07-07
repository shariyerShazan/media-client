import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState:{
        posts: [],
        currentPage: 1 ,
        totalPages : 1 ,
        totalPosts : 1 ,
        limit: 10
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
    }
})
export const {setPosts , setCurrentPage , setTotalPages , setTotalPosts , setLimit} = postSlice.actions 
export default postSlice.reducer