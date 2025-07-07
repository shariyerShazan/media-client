import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { POST_API_END_POINT } from '../utils/apiEndPoints'

function CreatePost() {
  const [caption, setCaption] = useState("")
  const [postImage, setPostImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!postImage) {
      toast.error("Please select an image!")
      return
    }

    const formData = new FormData()
    formData.append("caption", caption)
    formData.append("postImage", postImage)

    try {
      const res = await axios.post(`${POST_API_END_POINT}/new-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success("Post created successfully!")
        setCaption("")
        setPostImage(null)
        setPreview(null)
        e.target.reset()
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create post.")
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        setPostImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-[85vh]  px-4 gap-10">
      
      {/* 👉 Left Side - Info & Images */}
      <div className="hidden lg:flex flex-col justify-center items-start w-[40%] space-y-6">
        <h2 className="text-4xl font-bold text-favone">Share your moments</h2>
        <p className="text-gray-600">
          Upload your photo and write a caption to share with your friends.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80"
            alt="preview-1"
            className="rounded-lg shadow-md object-cover w-full h-36"
          />
          <img
            src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8="
            alt="preview-2"
            className="rounded-lg shadow-md object-cover w-full h-36"
          />
          <img
            src="https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw="
            alt="preview-3"
            className="rounded-lg shadow-md object-cover w-full h-36"
          />
          <img
            src="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg"
            alt="preview-4"
            className="rounded-lg shadow-md object-cover w-full h-36"
          />
        </div>
      </div>

      {/* 👉 Right Side - Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-favone ">Create New Post</h2>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-800 ">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full cursor-pointer text-sm border border-gray-300 rounded-md file:bg-favone file:text-white file:px-4 file:py-2 file:font-semibold file:rounded-md file:border-none hover:file:bg-favone/90"
          />
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-xl border border-gray-200 shadow"
              />
            </div>
          )}
        </div>

        {/* Caption Input */}
        <div>
          <label className="block font-medium text-gray-800 mb-1">Caption</label>
          <textarea
            rows="4"
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-favone/50 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer w-full bg-favone hover:bg-favone/90 text-white font-semibold py-2.5 rounded-md shadow transition-all"
        >
          Share Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
