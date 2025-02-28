import React, { useState } from "react";
import { CloudUpload, CheckCircle, Loader2, XCircle } from "lucide-react";
import logo from "../assets/logo.png";

const BugReportForm = () => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [description, setDescription] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "suggestions-images");
    data.append("cloud_name", "dquo71wwj");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dquo71wwj/image/upload", {
        method: "POST",
        body: data,
      });

      const uploadImage = await response.json();
      setImageUrl(uploadImage.url);
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-100">
  <div className="max-w-md w-full p-4 bg-white shadow-lg rounded-md border border-gray-200 overflow-auto">

    {/* Logo */}
    <div className="flex justify-center mb-3">
      <img src={logo} alt="Nearz Logo" className="w-24 animate-fadeIn" />
    </div>

    <h1 className="text-xl font-semibold mb-3 text-center text-gray-800">App Improvment Suggestions</h1>

    <form className="space-y-3">
      {/* Name Field */}
      <input className="w-full h-10 p-2 border rounded" name="name" placeholder="Name" required />

      {/* Title Field */}
      <input className="w-full h-10 p-2 border rounded" name="title" placeholder="Title" required />

      {/* Description */}
      <textarea className="w-full h-18 p-2 border rounded" name="description" placeholder="Describe the issue..." maxLength={500} required />

      {/* File Upload */}
      <div className="border-dashed border-2 rounded-md p-3 text-center cursor-pointer hover:bg-gray-50">
        <label className="cursor-pointer">
          <CloudUpload className="mx-auto text-gray-400" />
          <span className="block text-sm text-gray-500">Click to upload or drag & drop</span>
          <input className="hidden" type="file" accept="image/*" onChange={handleFileUpload} />
        </label>
        {uploadingImage && <p className="text-blue-600 text-center">Uploading...</p>}
      </div>

      {/* Image Preview */}
      {imageUrl && (
        <div className="relative mt-2">
          <img src={imageUrl} alt="Screenshot" className="w-full h-auto rounded-md shadow-sm" />
          <button onClick={() => setImageUrl("")} className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md">
            <XCircle className="text-red-500" />
          </button>
        </div>
      )}

      {/* Test Data */}
      <textarea className="w-full h-16 p-2 border rounded" name="testData" placeholder="Test Data (optional)" />

      {/* Date */}
      <input className="w-full h-10 px-3 border rounded bg-gray-200" type="date" name="date" value={currentDate} readOnly />

      {/* Type */}
      <select className="w-full h-10 px-3 border rounded" name="type" required>
        <option value="bug">🐞 Bug</option>
        <option value="create">✨ Create</option>
        <option value="improve">📈 Improve</option>
        <option value="remove">❌ Remove </option>
        <option value="reduce">📉 Reduce </option>
      </select>

      {/* Priority */}
      <select className="w-full h-10 px-3 border rounded" name="priority" required>
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
        <option value="critical">🚨 Critical</option>
      </select>

      {/* Submit */}
      <button className="w-full h-10 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold">
        <CheckCircle />
        Submit
      </button>
    </form>
  </div>
</div>

  );
};

export default BugReportForm;
