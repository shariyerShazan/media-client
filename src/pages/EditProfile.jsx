import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../utils/apiEndPoints";
import { setUser } from "../redux/user.slice";
import axios from "axios";
import { useNavigate } from "react-router";

function EditProfile() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(user.fullName || "");
  const [bio, setBio] = useState(user.bio || "");
  const [gender, setGender] = useState(user.gender || "");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("bio", bio);
      formData.append("gender", gender);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const res = await axios.patch(`${USER_API_END_POINT}/edit-profile`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate(`/profile/${user._id}`)
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-favone">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Email (read-only) */}
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="font-semibold">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="font-semibold">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Profile Picture */}
        <div>
          <label className="font-semibold">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="btn bg-favone/70 hover:bg-favone/90 text-black font-bold"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
