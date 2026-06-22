import { useState, useEffect } from "react";
import AddCourseForm from "./AddCourseForm";
import CourseTable from "./CourseTable";
import SemesterTabs from "./SemesterTabs";
import GPAChart from "./GPAChart";
import GPAConfig from "./GPAConfig";
import StatsCards from "./StatsCards";
import SearchBar from "./SearchBar";
import SemesterStats from "./SemesterStats";
import useLocalStorage from "../hooks/useLocalStorage";

import {
calculateSemesterGPA,
calculateCGPA,
} from "../utils/gpaCalculations";

import { exportAllSemestersCSV } from "../utils/csvExport";

import { getClassification }
from "../utils/classification";

function CGPATracker() {
const [scale, setScale] = useState(5);

const [courseCode, setCourseCode] = useState("");
const [courseUnit, setCourseUnit] = useState("");
const [grade, setGrade] = useState("A");
const [search, setSearch] = useState("");

const [semesters, setSemesters] = useLocalStorage(
"semesters",
[
{
id: Date.now(),
courses: [],
},
]
);

const [editingCourse, setEditingCourse] =
  useState(null);

const [activeSemester, setActiveSemester] =
useLocalStorage(
"activeSemester",
null
);

const [editingSemester, setEditingSemester] =
useState(null);

useEffect(() => {
if (!activeSemester && semesters.length > 0) {
setActiveSemester(semesters[0].id);
}
}, [activeSemester, semesters, setActiveSemester]);

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

const currentSemester =
semesters.find(
(semester) =>
semester.id === activeSemester
) || semesters[0];

const courses =
currentSemester?.courses || [];

const semesterData = semesters.map(
(semester, index) => ({
name:
semester.customName ||
`Semester ${index + 1}`,
gpa: Number(
calculateSemesterGPA(
semester.courses,
gradePoints
).toFixed(2)
),
})
);

const semesterGPA =
calculateSemesterGPA(
courses,
gradePoints
).toFixed(2);


const cgpa = calculateCGPA(
semesters,
gradePoints
);

const classification =
  getClassification(cgpa, scale);

const totalUnits = courses.reduce(
(sum, course) =>
sum + course.unit,
0
);

const highestScore =
  courses.length > 0
    ? Math.max(
        ...courses.map(
          (course) =>
            gradePoints[course.grade]
        )
      )
    : 0;

const lowestScore =
  courses.length > 0
    ? Math.min(
        ...courses.map(
          (course) =>
            gradePoints[course.grade]
        )
      )
    : 0;

const numberOfA =
  courses.filter(
    (course) => course.grade === "A"
  ).length;

const numberOfB =
  courses.filter(
    (course) => course.grade === "B"
  ).length;

const numberOfC =
  courses.filter(
    (course) => course.grade === "C"
  ).length;

const numberOfD =
  courses.filter(
    (course) => course.grade === "D"
  ).length;

const numberOfF =
  courses.filter(
    (course) => course.grade === "F"
  ).length;


const totalQualityPoints =
  courses.reduce(
    (sum, course) =>
      sum +
      gradePoints[course.grade] *
        course.unit,
    0
  );

const addCourse = () => {
  if (!courseCode || !courseUnit) {
    alert("Fill all fields");
    return;
  }

  // EDIT MODE
  if (editingCourse) {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === activeSemester
          ? {
              ...semester,
              courses: semester.courses.map(
                (course) =>
                  course.courseCode ===
                  editingCourse.courseCode
                    ? {
                        courseCode,
                        unit: Number(courseUnit),
                        grade,
                      }
                    : course
              ),
            }
          : semester
      )
    );

    setEditingCourse(null);
  }

  // ADD MODE
  else {
    setSemesters((prev) =>
      prev.map((semester) => {
        if (
          semester.id !== activeSemester
        ) {
          return semester;
        }

        const exists =
          semester.courses.some(
            (course) =>
              course.courseCode ===
              courseCode
          );

        if (exists) {
          alert(
            "Course already exists"
          );
          return semester;
        }

        return {
          ...semester,
          courses: [
            ...semester.courses,
            {
              courseCode,
              unit: Number(courseUnit),
              grade,
            },
          ],
        };
      })
    );
  }

  setCourseCode("");
  setCourseUnit("");
  setGrade("A");
};

const handleEditCourse = (course) => {
  setCourseCode(course.courseCode);
  setCourseUnit(course.unit);
  setGrade(course.grade);
  setEditingCourse(course);
};


const deleteCourse = (
courseCode
) => {
setSemesters((prev) =>
prev.map((semester) =>
semester.id === activeSemester
? {
...semester,
courses:
semester.courses.filter(
(course) =>
course.courseCode !==
courseCode
),
}
: semester
)
);
};

const addSemester = () => {
const newSemester = {
id: Date.now(),
courses: [],
};


setSemesters((prev) => [
  ...prev,
  newSemester,
]);

setActiveSemester(
  newSemester.id
);


};

const deleteSemester = (id) => {
if (
!window.confirm(
"Delete this semester?"
)
) {
return;
}


setSemesters((prev) => {
  const updated =
    prev.filter(
      (semester) =>
        semester.id !== id
    );

  if (updated.length === 0) {
    return prev;
  }

  if (activeSemester === id) {
    setActiveSemester(
      updated[0].id
    );
  }

  return updated;
});


};

const renameSemester = (
id,
newName
) => {
setSemesters((prev) =>
prev.map((semester) =>
semester.id === id
? {
...semester,
customName: newName,
}
: semester
)
);
};

const clearCourses = () => {
setSemesters((prev) =>
prev.map((semester) =>
semester.id === activeSemester
? {
...semester,
courses: [],
}
: semester
)
);
};

const exportCSV = () => {
  exportAllSemestersCSV(semesters);
};

return (
  <div className="min-h-screen bg-slate-100 py-4 sm:py-6 md:py-10 px-3 sm:px-4">
    <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">

      <SemesterTabs
        semesters={semesters}
        activeSemester={activeSemester}
        setActiveSemester={setActiveSemester}
        editingSemester={editingSemester}
        setEditingSemester={setEditingSemester}
        renameSemester={renameSemester}
        deleteSemester={deleteSemester}
        addSemester={addSemester}
      />

      <GPAChart
        semesterData={semesterData}
        scale={scale}
      />

      <GPAConfig
        scale={scale}
        setScale={setScale}
      />

      <StatsCards
      gpa={semesterGPA}
      cgpa={cgpa}
      totalUnits={totalUnits}
      classification={classification}
    />

   <SemesterStats
      highestScore={highestScore}
      lowestScore={lowestScore}
      totalQualityPoints={totalQualityPoints}
      numberOfA={numberOfA}
    />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <AddCourseForm
        courseCode={courseCode}
        setCourseCode={setCourseCode}
        courseUnit={courseUnit}
        setCourseUnit={setCourseUnit}
        grade={grade}
        setGrade={setGrade}
        addCourse={addCourse}
      />

      <CourseTable
  courses={courses.filter(
    (course) =>
      course.courseCode
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  )}
  deleteCourse={deleteCourse}
  editCourse={handleEditCourse}
/>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={exportCSV}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Export CSV
        </button>

        <button
          onClick={clearCourses}
          className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Clear Semester
        </button>
      </div>

    </div>
  </div>
);}

export default CGPATracker;