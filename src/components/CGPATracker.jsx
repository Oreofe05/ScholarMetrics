import { useState, useEffect } from "react";
import AddCourseForm from "./AddCourseForm";
import CourseTable from "./CourseTable";

function CGPATracker() {
  const [scale, setScale] = useState(5);

  const [courseCode, setCourseCode] = useState("");
  const [courseUnit, setCourseUnit] = useState("");
  const [grade, setGrade] = useState("A");

  const [courses, setCourses] = useState(()=>{
    const savedCourses = localStorage.getItem("courses");

    return savedCourses ? JSON.parse(savedCourses) : [];
  })
  
  const clearCourses = () => {
    setCourses([]);
    localStorage.removeItem("courses");
  }

  useEffect(() =>{
    localStorage.setItem("courses", JSON.stringify(courses));

  }, [courses]);

  const gradePoints =
  scale === 5
    ? {
        A: 5,
        B: 4,
        C: 3,
        D: 2,
        E: 1,
        F: 0,
      }
    : {
        A: 4,
        B: 3,
        C: 2,
        D: 1,
        F: 0,
      };
  const addCourse = () => {

    const courseExists = courses.some(
    (course) => course.courseCode === courseCode
  );

  if (courseExists) {
    alert("Course already exists");
    return;
  }

  if (!courseCode || !courseUnit) {
    alert("Please fill in all fields");
    return;
  }

  const newCourse = {
    courseCode,
    unit: Number(courseUnit),
    grade,
  };

  setCourses([...courses, newCourse]);

  setCourseCode("");
  setCourseUnit("");
  setGrade("A");
  console.log(newCourse);
};

const deleteCourse = (courseCodeToDelete) => {
  const updatedCourses = courses.filter(
    (course) => course.courseCode !== courseCodeToDelete
  );

  setCourses(updatedCourses);
};

const calculateGPA = () => {

  if (courses.length === 0) {
    return "0.00";
  }

  let totalQualityPoints = 0;
  let totalUnits = 0;

  courses.forEach((course) => {

    totalQualityPoints +=
      gradePoints[course.grade] *
      course.unit;

    totalUnits += course.unit;

  });

  return (
    totalQualityPoints / totalUnits
  ).toFixed(2);
};
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          GPA Configuration
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Select Grading Scale
            </label>

            <select
              value={scale}
              onChange={(e) =>
                setScale(Number(e.target.value))
              }
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                transition-all
              "
            >
              <option value={5}>
                5 Point Scale
              </option>

              <option value={4}>
                4 Point Scale
              </option>
            </select>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-slate-500 text-sm">
              Current Scale
            </p>

            <h3 className="text-3xl font-bold text-indigo-600">
              {scale}.0
            </h3>
          </div>

        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-6">
    <p className="text-indigo-100">Semester GPA</p>
    <h2 className="text-5xl font-bold">
      {calculateGPA()}
    </h2>
  </div>

  <AddCourseForm
  courseCode={courseCode}
  setCourseCode={setCourseCode}
  courseUnit={courseUnit}
  setCourseUnit={setCourseUnit}
  grade={grade}
  setGrade={setGrade}
  addCourse={addCourse}
  />

</div>
  <CourseTable
  courses={courses}
  deleteCourse={deleteCourse}
/>
<br />
<button
  onClick={clearCourses}
  className="bg-red-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-red-700 transition"
>
  Clear All Courses
</button>
  
  </div>
  );
}

export default CGPATracker;