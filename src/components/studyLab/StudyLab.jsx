import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

function StudyLab() {
const [courseName, setCourseName] =
useState("");

const [examDate, setExamDate] =
  useState("");

const [courseCode, setCourseCode] =
useState("");

const [selectedCourse, setSelectedCourse] =
useState("");

const [selectedFiles, setSelectedFiles] =
useState([]);

const [uploadedCourses, setUploadedCourses] =
useLocalStorage(
"uploadedCourses",
[]
);

// Add new course
const addCourse = () => {
if (
!courseName.trim() ||
!courseCode.trim()
) {
alert("Fill all fields");
return;
}


  const newCourse = {
    id: Date.now(),
    courseCode,
    courseName,
    examDate,

    materials: [],

    generatedTopics: [],

    difficulty: "",

    estimatedHours: 0,

    examDate: "",

    daysRemaining: 0,
  };

setUploadedCourses([
  ...uploadedCourses,
  newCourse,
]);

setCourseName("");
setCourseCode("");
setExamDate("");

};

// Upload materials
const uploadMaterials = () => {
  if (!selectedCourse) {
    alert("Select a course");
    return;
  }

  if (selectedFiles.length === 0) {
    alert("Choose files");
    return;
  }

  // Store file information
  const uploadedMaterialData =
    selectedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

  // Generate topics from filenames
  const generatedTopics =
    selectedFiles.map((file) =>
      file.name
        .replace(".pdf", "")
        .replace(".doc", "")
        .replace(".docx", "")
        .replace(".ppt", "")
        .replace(".pptx", "")
    );

  // Simple difficulty estimation
  let difficulty = "Easy";

  if (generatedTopics.length >= 5) {
    difficulty = "Medium";
  }

  if (generatedTopics.length >= 10) {
    difficulty = "Hard";
  }

  // Estimate reading hours
  const estimatedHours =
    generatedTopics.length * 2;

  setUploadedCourses((prev) =>
    prev.map((course) =>
      String(course.id) ===
      String(selectedCourse)
        ? {
            ...course,

            materials: [
              ...(course.materials || []),
              ...uploadedMaterialData,
            ],

            generatedTopics: [
              ...(course.generatedTopics || []),
              ...generatedTopics,
            ],

            difficulty,

            estimatedHours,
          }
        : course
    )
  );

  setSelectedFiles([]);
  setSelectedCourse("");

  alert(
    "Materials analyzed successfully"
  );
};

const calculateDaysRemaining = (
  examDate
) => {
  if (!examDate) return 0;

  const today =
    new Date();

  const exam =
    new Date(examDate);

  const difference =
    exam - today;

  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
};

return ( <div className="space-y-6">

```
  {/* Add Course */}

  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="text-2xl font-bold mb-4">
      Study Lab
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

      <input
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) =>
          setCourseCode(
            e.target.value
          )
        }
        className="border p-3 rounded-lg"
      />

      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) =>
          setCourseName(
            e.target.value
          )
        }
        className="border p-3 rounded-lg"
      />

      <input
        type="date"
        value={examDate}
        onChange={(e) =>
          setExamDate(e.target.value)
        }
        className="border p-3 rounded-lg"
      />

      <button
        onClick={addCourse}
        className="bg-indigo-600 text-white rounded-lg px-4 py-3"
      >
        Add Course
      </button>

    </div>
  </div>

  {/* Upload Materials */}

  <div className="bg-white p-6 rounded-2xl shadow">

    <h3 className="text-xl font-bold mb-4">
      Upload Course Materials
    </h3>

    <select
      value={selectedCourse}
      onChange={(e) =>
        setSelectedCourse(
          e.target.value
        )
      }
      className="w-full border p-3 rounded-lg mb-4"
    >
      <option value="">
        Select Course
      </option>

      {uploadedCourses.map(
        (course) => (
          <option
            key={course.id}
            value={String(
              course.id
            )}
          >
            {course.courseCode} -{" "}
            {course.courseName}
          </option>
        )
      )}
    </select>

    <input
      type="file"
      multiple
      accept=".pdf,.doc,.docx,.ppt,.pptx"
      onChange={(e) =>
        setSelectedFiles(
          Array.from(
            e.target.files || []
          )
        )
      }
      className="w-full border p-3 rounded-lg"
    />

    <button
      onClick={uploadMaterials}
      className="mt-4 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
    >
      Upload Materials
    </button>

  </div>

  {/* Uploaded Courses */}

  <div className="bg-white p-6 rounded-2xl shadow">

    <h3 className="text-xl font-bold mb-4">
      Uploaded Courses
    </h3>

    {uploadedCourses.length === 0 ? (
      <p className="text-gray-500">
        No courses uploaded yet
      </p>
    ) : (
      <div className="space-y-4">

        {uploadedCourses.map(
          (course) => {
            const materials =
              course.materials ||
              [];

            return (
              <div
                key={course.id}
                className="border rounded-xl p-4"
              >
                <h4 className="font-bold">
                  {
                    course.courseCode
                  }
                </h4>

                <p>
                  {
                    course.courseName
                  }
                </p>

                  <p className="text-blue-600 font-medium">
                    Difficulty:
                    {" "}
                    {course.difficulty || "Not analyzed"}
                  </p>

                  <p className="text-green-600 font-medium">
                    Estimated Hours:
                    {" "}
                    {course.estimatedHours || 0}
                  </p>

                <p className="text-blue-600 font-semibold">
                  Exam in:
                  {" "}
                  {calculateDaysRemaining(
                    course.examDate
                  )} days
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Materials:
                  {" "}
                  {
                    materials.length
                  }
                </p>

                {materials.length >
                  0 && (
                  <ul className="mt-2 text-sm space-y-1">
                    {materials.map(
                      (
                        material,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          📄{" "}
                          {
                            material.name
                          }
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            );
          }
        )}

      </div>
    )}

  </div>

</div>

);
}

export default StudyLab;
