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

      <select
        value={selectedCourse}
        onChange={(e) =>
          setSelectedCourse(e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-4"
      >
        <option value="">
          Select Course
        </option>

        {uploadedCourses.map((course) => (
          <option
            key={course.id}
            value={String(course.id)}
          >
            {course.courseCode} - {course.courseName}
          </option>
        ))}

      </select>

      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        onChange={(e) =>
          setSelectedFiles(
            Array.from(e.target.files || [])
          )
        }
        className="w-full border rounded-lg p-3"
      />

      {selectedFiles.length > 0 && (

        <div className="mt-4">

          <h4 className="font-semibold mb-2">
            Selected Files
          </h4>

          <ul className="space-y-2">

            {selectedFiles.map((file) => (

              <li
                key={file.name}
                className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2"
              >

                <span>{file.name}</span>

                <span className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>

              </li>

            ))}

          </ul>

        </div>

      )}

      <button
        onClick={uploadMaterials}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-semibold"
      >
        Upload & Analyze Materials
      </button>

    </div>
  );
}

export default UploadMaterials;