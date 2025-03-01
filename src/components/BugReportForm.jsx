import React, { useState } from "react";
import { CloudUpload, CheckCircle, Loader2, XCircle } from "lucide-react";
import logo from "../assets/logo.png";

const BugReportForm = () => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const url =
      "https://script.google.com/macros/s/AKfycby2O6cnw4rdKyfC12wZS5zEdOCbDPZdEmPUahqy0SUj_OZigooes2Q87tcvUqAynQu8/exec";

    const formData = new FormData(event.target);
    formData.append("Date", currentDate);
    if (imageUrl) {
      formData.append("Screenshot", imageUrl);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      await response.json();
      setSuccessMessage("Suggestion recorded. Thank you!");
      event.target.reset();
      setImageUrl("");
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white shadow-lg rounded-md border border-gray-200 overflow-auto">
        <div className="flex justify-center mb-3">
          <img src={logo} alt="Nearz Logo" className="w-24 animate-fadeIn" />
        </div>
        <h1 className="text-xl font-semibold mb-3 text-center text-gray-800">App Improvement Suggestions</h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input className="w-full h-10 p-2 border rounded" name="Name" placeholder="Name" required />
          <input className="w-full h-10 p-2 border rounded" name="Title" placeholder="Title" required />
          <textarea className="w-full h-18 p-2 border rounded" name="Description" placeholder="Describe the issue..." maxLength={500} required />

          <div className="border-dashed border-2 rounded-md p-3 text-center cursor-pointer hover:bg-gray-50">
            <label className="cursor-pointer">
              <CloudUpload className="mx-auto text-gray-400" />
              <span className="block text-sm text-gray-500">Click to upload or drag & drop</span>
              <input className="hidden" type="file" accept="image/*" onChange={handleFileUpload} />
            </label>
            {uploadingImage && <p className="text-blue-600 text-center">Uploading...</p>}
          </div>

          {imageUrl && (
            <div className="relative mt-2">
              <img src={imageUrl} alt="Screenshot" className="w-full h-auto rounded-md shadow-sm" />
              <button type="button" onClick={() => setImageUrl("")} className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md">
                <XCircle className="text-red-500" />
              </button>
            </div>
          )}

          <textarea className="w-full h-16 p-2 border rounded" name="TestData" placeholder="Test Data (optional)" />
          <input className="w-full h-10 px-3 border rounded bg-gray-200" type="date" name="Date" value={currentDate} readOnly />

          <select className="w-full h-10 px-3 border rounded" name="Type" required>
            <option value="bug">🐞 Bug</option>
            <option value="create">✨ Create</option>
            <option value="improve">📈 Improve</option>
            <option value="remove">❌ Remove</option>
            <option value="reduce">📉 Reduce</option>
          </select>

          <select className="w-full h-10 px-3 border rounded" name="Priority" required>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
            <option value="critical">🚨 Critical</option>
          </select>

          <button className="w-full h-10 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold" type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <CheckCircle />} {loading ? "Submitting..." : "Submit"}
          </button>

          {successMessage && <p className="text-green-600 font-bold text-center mt-2">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default BugReportForm;
