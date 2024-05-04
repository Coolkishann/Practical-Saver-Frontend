import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const BlogItem = ({ selectedBlog, setSelectedBlog, allBlogs, setAllBlogs }) => {
  const [password, setPassword] = useState('');
  const [showHello, setShowHello] = useState(false);

  const handleCheckPassword = () => {
    if (password === 'll') {
      setShowHello(true);
    } else {
      toast.error('Incorrect password!');
    }
  };

  const createBlog = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/blogs`,
        selectedBlog
      );

      if (response.status === 201) {
        const newBlog = response.data;
        setAllBlogs([...allBlogs, newBlog]);
        setSelectedBlog({
          subject: "",
          blogHead: "",
          blogData: "",
        });
        toast.success("Practical saved successfully");
      } else {
        toast.error("Failed to save practical");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {!showHello && (
        <>
        <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
      <input 
      type="password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      id="pass" 
      className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
      />
     <button 
      onClick={handleCheckPassword} 
      className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
      Check Password
      </button>
    </div>
</div>
      </>
      )}
    
      {showHello && (
        <div id="h">
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Save New Practical</h2>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
            <select
              id="subject"
              name="subject"
              value={selectedBlog.subject}
              onChange={(e) =>
                setSelectedBlog({ ...selectedBlog, subject: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select Subject</option>
              <option value="IoT">IOT</option>
              <option value="TOC">TOC</option>
              <option value="AAD">AAD</option>
              <option value="ANDR">ANDR</option>
            </select>
            <label
              htmlFor="blogHead"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Practical Aim :
            </label>
            <input
              type="text"
              id="blogHead"
              name="blogHead"
              value={selectedBlog.blogHead}
              onChange={(e) =>
                setSelectedBlog({ ...selectedBlog, blogHead: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <label
              htmlFor="blogData"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Code :
            </label>
            <textarea
              id="blogData"
              name="blogData"
              rows="4"
              cols="50"
              value={selectedBlog.blogData}
              onChange={(e) =>
                setSelectedBlog({ ...selectedBlog, blogData: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            ></textarea>
            <button
              onClick={createBlog}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <NavLink to="/blogs">
              <button className="bg-blue-500 ml-8 text-white px-4 py-2 rounded">
                See All Practical
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogItem;
