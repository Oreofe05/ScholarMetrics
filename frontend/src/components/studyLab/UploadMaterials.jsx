import { useApp } from "../../context/AppContext";

function UploadMaterials({
  selectedCourse,
  setSelectedCourse,
  selectedFiles,
  setSelectedFiles,
  uploadMaterials,
}) {
  const { uploadedCourses } = useApp();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Upload Course Materials
      </h2>

      {/* Course Selection */}
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      >
        <option value="">Select Course</option>

        {uploadedCourses.map((course) => (
          <option
            key={course.id}
            value={String(course.id)}
          >
            {course.courseCode} - {course.courseName}
          </option>
        ))}
      </select>

      {/* Single File Upload */}
      <input
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        onChange={(e) =>
          setSelectedFiles(
            e.target.files ? [e.target.files[0]] : []
          )
        }
        className="w-full border rounded-lg p-3"
      />

      {/* Selected File */}
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">
            Selected File
          </h4>

          <div className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2">
            <span>{selectedFiles[0].name}</span>

            <span className="text-sm text-gray-500">
              {(selectedFiles[0].size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </div>
      )}

      <button
        onClick={uploadMaterials}
        disabled={!selectedCourse || selectedFiles.length === 0}
        className={`mt-6 w-full rounded-lg py-3 font-semibold transition-colors ${
          !selectedCourse || selectedFiles.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        Upload & Analyze Material
      </button>
    </div>
  );
}

export default UploadMaterials;