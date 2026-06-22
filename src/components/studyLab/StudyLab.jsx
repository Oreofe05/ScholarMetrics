import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

function StudyLab() {


  const [courseName, setCourseName] =
    useState("");

  const [courseCode, setCourseCode] =
    useState("");

  const [uploadedCourses, setUploadedCourses] =
    useLocalStorage(
      "uploadedCourses",
      []
    );

    const [selectedCourse, setSelectedCourse] =
  useState("");

  const [selectedFiles, setSelectedFiles] =
    useState([]);

  const addCourse = () => {

    if (
      !courseName ||
      !courseCode
    ) {
      alert("Fill all fields");
      return;
    }

    const newCourse = {
    id: Date.now(),
    courseCode,
    courseName,

    materials: [],

    generatedTopics: [],

    difficulty: "",

    estimatedHours: 0,
  };

    setUploadedCourses([
      ...uploadedCourses,
      newCourse,
    ]);

    setCourseName("");
    setCourseCode("");
  };

  return (
    <div className="space-y-6">

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

          <button
            onClick={addCourse}
            className="
            bg-indigo-600
            text-white
            rounded-lg
            px-4
            py-3
            "
          >
            Add Course
          </button>

        </div>

      </div>

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
              value={course.id}
            >
              {course.courseCode}
            </option>
          )
        )}
      </select>

      <input
        type="file"
        multiple
        accept="
          .pdf,
          .doc,
          .docx,
          .ppt,
          .pptx
        "
        onChange={(e) =>
          setSelectedFiles(
            [...e.target.files]
          )
        }
        className="w-full border p-3 rounded-lg"
      />

    </div>

      <div className="bg-white p-6 rounded-2xl shadow">

        <h3 className="text-xl font-bold mb-4">
          Uploaded Courses
        </h3>

        {uploadedCourses.length === 0 ? (
          <p className="text-gray-500">
            No courses uploaded yet
          </p>
        ) : (
          <div className="space-y-3">

            {uploadedCourses.map(
              (course) => (
                <div
                  key={course.id}
                  className="
                  border
                  rounded-xl
                  p-4
                  "
                >
                  <h4 className="font-bold">
                    {course.courseCode}
                  </h4>

                  <p>
                    {course.courseName}
                  </p>
                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default StudyLab;