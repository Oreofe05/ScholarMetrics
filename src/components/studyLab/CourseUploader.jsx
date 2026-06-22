import { useState } from "react";

function CourseUploader({
  uploadedCourses,
  setUploadedCourses,
}) {
  const handleUpload = (e) => {
    const files = Array.from(
      e.target.files
    );

    setUploadedCourses((prev) => [
      ...prev,
      ...files,
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Upload Course Materials
      </h2>

      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx"
        onChange={handleUpload}
      />
    </div>
  );
}

export default CourseUploader;