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
import { useApp } from "../context/AppContext";
import { getClassification } from "../utils/classification";

import { Download, Trash2, GraduationCap } from "lucide-react";

function CGPATracker() {
  const [scale, setScale] = useState(5);

  const [courseCode, setCourseCode] = useState("");
  const [courseUnit, setCourseUnit] = useState("");
  const [grade, setGrade] = useState("A");
  const [search, setSearch] = useState("");

  const [semesters, setSemesters] = useLocalStorage("semesters", [
    {
      id: Date.now(),
      courses: [],
    },
  ]);

  const [editingCourse, setEditingCourse] = useState(null);

  const [activeSemester, setActiveSemester] = useLocalStorage(
    "activeSemester",
    null
  );

  const [editingSemester, setEditingSemester] = useState(null);

  const { setCgpa } = useApp();

  useEffect(() => {
    if (!activeSemester && semesters.length > 0) {
      setActiveSemester(semesters[0].id);
    }
  }, [activeSemester, semesters, setActiveSemester]);

  const gradePoints =
    scale === 5
      ? { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 }
      : { A: 4, B: 3, C: 2, D: 1, F: 0 };

  const currentSemester =
    semesters.find((semester) => semester.id === activeSemester) ||
    semesters[0];

  const courses = currentSemester?.courses || [];

  const semesterData = semesters.map((semester, index) => ({
    name: semester.customName || `Semester ${index + 1}`,
    gpa: Number(
      calculateSemesterGPA(semester.courses, gradePoints).toFixed(2)
    ),
  }));

  const semesterGPA = calculateSemesterGPA(courses, gradePoints).toFixed(2);

  const calculatedCGPA = calculateCGPA(semesters, gradePoints);

  useEffect(() => {
    setCgpa(calculatedCGPA);
  }, [calculatedCGPA, setCgpa]);

  const classification = getClassification(calculatedCGPA, scale);

  const totalUnits = courses.reduce((sum, course) => sum + course.unit, 0);

  const highestScore =
    courses.length > 0
      ? Math.max(...courses.map((course) => gradePoints[course.grade]))
      : 0;

  const lowestScore =
    courses.length > 0
      ? Math.min(...courses.map((course) => gradePoints[course.grade]))
      : 0;

  const numberOfA = courses.filter((course) => course.grade === "A").length;

  const totalQualityPoints = courses.reduce(
    (sum, course) => sum + gradePoints[course.grade] * course.unit,
    0
  );

  const addCourse = () => {
    if (!courseCode || !courseUnit) {
      alert("Fill all fields");
      return;
    }

    if (editingCourse) {
      setSemesters((prev) =>
        prev.map((semester) =>
          semester.id === activeSemester
            ? {
                ...semester,
                courses: semester.courses.map((course) =>
                  course.courseCode === editingCourse.courseCode
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
    } else {
      setSemesters((prev) =>
        prev.map((semester) => {
          if (semester.id !== activeSemester) {
            return semester;
          }

          const exists = semester.courses.some(
            (course) => course.courseCode === courseCode
          );

          if (exists) {
            alert("Course already exists");
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

  const deleteCourse = (courseCode) => {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === activeSemester
          ? {
              ...semester,
              courses: semester.courses.filter(
                (course) => course.courseCode !== courseCode
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

    setSemesters((prev) => [...prev, newSemester]);
    setActiveSemester(newSemester.id);
  };

  const deleteSemester = (id) => {
    if (!window.confirm("Delete this semester?")) {
      return;
    }

    setSemesters((prev) => {
      const updated = prev.filter((semester) => semester.id !== id);

      if (updated.length === 0) {
        return prev;
      }

      if (activeSemester === id) {
        setActiveSemester(updated[0].id);
      }

      return updated;
    });
  };

  const renameSemester = (id, newName) => {
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
    if (!window.confirm("Clear all courses for this semester?")) return;
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
    <div className="min-h-screen bg-slate-50/60 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Academic Tracker
              </h1>
              <p className="text-xs text-slate-500">
                Monitor your semester progress and cumulative GPA
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs transition-all cursor-pointer"
            >
              <Download size={14} className="text-slate-500" />
              Export CSV
            </button>

            <button
              onClick={clearCourses}
              className="inline-flex items-center gap-2 bg-white border border-rose-100 text-rose-600 hover:bg-rose-50 hover:border-rose-200 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs transition-all cursor-pointer"
            >
              <Trash2 size={14} className="text-rose-500" />
              Clear Semester
            </button>
          </div>
        </div>

        {/* Semester Navigation */}
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

        {/* Top Summary Cards */}
        <StatsCards
          gpa={semesterGPA}
          cgpa={calculatedCGPA}
          totalUnits={totalUnits}
          classification={classification}
        />

        {/* GPA Trend Section */}
        <div className="space-y-6">
          {/* Full Width Trend Chart */}
          <GPAChart semesterData={semesterData} scale={scale} />

          {/* Configuration and Scores side-by-side beneath the Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GPAConfig scale={scale} setScale={setScale} />
            <SemesterStats
              highestScore={highestScore}
              lowestScore={lowestScore}
              totalQualityPoints={totalQualityPoints}
              numberOfA={numberOfA}
            />
          </div>
        </div>

        {/* Course Management Section */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Course Management
              </h2>
              <p className="text-xs text-slate-400">
                Add, edit, and organize your courses for this semester
              </p>
            </div>

            <div className="w-full sm:w-64">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </div>

          {/* Form */}
          <AddCourseForm
            courseCode={courseCode}
            setCourseCode={setCourseCode}
            courseUnit={courseUnit}
            setCourseUnit={setCourseUnit}
            grade={grade}
            setGrade={setGrade}
            addCourse={addCourse}
            editingCourse={editingCourse}
          />

          {/* Table */}
          <CourseTable
            courses={courses.filter((course) =>
              course.courseCode.toLowerCase().includes(search.toLowerCase())
            )}
            deleteCourse={deleteCourse}
            editCourse={handleEditCourse}
          />
        </div>

      </div>
    </div>
  );
}

export default CGPATracker;