import React, { useState } from "react";

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
      "https://script.google.com/macros/s/AKfycbyUAIoFPfV1ETxyJjIS5TP-3LvPn-qVSZdxcylRbuZ3sdi70rwThnWpd4wfRfNs4cfL/exec";

    const formData = new FormData();
    formData.append("Name", event.target.elements.name.value);
    formData.append("Title", event.target.elements.title.value);
    formData.append("Description", event.target.elements.description.value);
    formData.append("TestData", event.target.elements.testData.value);
    formData.append("Date", currentDate);
    formData.append("Type", event.target.elements.type.value);
    if (imageUrl) {
      formData.append("Screenshot", imageUrl);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Success:", data);
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
    <div className="max-w-lg mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Bug Report Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" name="name" placeholder="Name" required />
        <input className="w-full p-2 border rounded" name="title" placeholder="Title" required />
        <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" required />
        
       
        <input className="w-full p-2 border rounded" type="file" name="screenshot" accept="image/*" onChange={handleFileUpload} />
        {uploadingImage && <p className="text-blue-600">Uploading...</p>}
        {imageUrl && <p className="text-green-600">Image uploaded successfully!</p>}

        <textarea className="w-full p-2 border rounded" name="testData" placeholder="Test Data" />
        <input className="w-full p-2 border rounded bg-gray-200" type="date" name="date" value={currentDate} readOnly />
        <select className="w-full p-2 border rounded" name="type" required>
          <option value="bug">Bug</option>
          <option value="create">Create</option>
          <option value="improve">Improve</option>
          <option value="remove">Remove</option>
          <option value="reduce">Reduce</option>
        </select>

       
        <button
          className={`w-full text-white p-2 rounded transition ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          type="submit"
          disabled={loading}
          >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {successMessage && <p className="text-green-600 font-bold text-center">{successMessage}</p>}

      </form>
    </div>
  );
};

export default BugReportForm;
