import { useState, useEffect, useCallback } from "react";
import { useApp } from "../../context/AppContext";
import StudyDashboard from "./StudyDashboard";
import { extractPDFText } from "../../utils/pdfExtractor";
import { analyzeMaterial } from "../../utils/analyzeMaterial";
import AddCourse from "./AddCourse";
import UploadMaterials from "./UploadMaterials";
import UploadedCourses from "./UploadedCourses";
import { generateStudyPlan } from "../../utils/generateStudyPlan";
import StudyOverview from "./StudyOverview";
import { initializeProgress } from "../../utils/progressUtils";
import CourseFilter from "./CourseFilter";
import MasterTimetable from "./MasterTimetable";
import { generateTimetable } from "../../utils/generateTimetable";
import { BookOpen, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";
import { uploadMaterial } from "../../services/materialService";


import {
  getCourses,
  createCourse,
  updateCourse as updateCourseAPI,
  deleteCourse,
} from "../../services/courseService";

function StudyLab() {

  // ===============================
  // Route Params
  // ===============================
  const { courseId } = useParams();

  // ===============================
  // App Context
  // ===============================
  const {
    uploadedCourses,
    setUploadedCourses,
  } = useApp();

  // ===============================
  // Form State
  // ===============================
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [examDate, setExamDate] = useState("");

  const [units, setUnits] = useState(3);
  const [semester, setSemester] = useState("First");
  const [level, setLevel] = useState("300");
  // ===============================
  // Upload Selection State
  // ===============================
  const [selectedCourse, setSelectedCourse] = useState(courseId || "");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // ===============================
  // Search / Filter / Sorting
  // ===============================
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // ===============================
  // Edit State
  // ===============================
  const [editingCourse, setEditingCourse] = useState(null);

  // ===============================
  // Load Courses
  // ===============================
  const loadCourses = useCallback(async () => {
    try {
      const data = await getCourses();
      setUploadedCourses(data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  }, [setUploadedCourses]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // ===============================
  // Active Course
  // ===============================
  //const activeCourse = uploadedCourses.find(
    //(course) => String(course.id) === String(courseId)
  //);

  // ===============================
  // Auto Select Course
  // ===============================
  useEffect(() => {
    if (courseId) {
      setSelectedCourse(courseId);
    }
  }, [courseId]);
  // ===============================
// Add New Course
// ===============================
const addCourse = async () => {
  try {
    if (!courseCode.trim() || !courseName.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    await createCourse({
      courseCode,
      courseName,
      units: 3,
      semester: "First",
      level: "300",
      examDate,
    });

    await loadCourses();

    setCourseCode("");
    setCourseName("");
    setExamDate("");

  } catch (error) {
    console.error("Failed to create course:", error);
  }
};

// ===============================
// Upload & Analyze Materials
// ===============================
const uploadMaterials = async () => {
  if (!selectedCourse) {
    alert("Please select a course.");
    return;
  }

  if (selectedFiles.length === 0) {
    alert("Please select at least one file.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("courseId", selectedCourse);
    formData.append("file", selectedFiles[0]);

    await uploadMaterial(formData);

    // Reload courses so new materials appear
    await loadCourses();

    // Reset form
    setSelectedFiles([]);

    if (!courseId) {
      setSelectedCourse("");
    }

    alert("Materials uploaded successfully!");

  } catch (error) {
    console.error("Upload failed:", error);

    alert("Failed to upload materials.");
  } 
};
 // ===============================
// Exam Countdown Calculation
// ===============================
const calculateDaysRemaining = (date) => {
  if (!date) return 0;

  const today = new Date();
  const exam = new Date(date);

  today.setHours(0, 0, 0, 0);
  exam.setHours(0, 0, 0, 0);

  const difference = exam.getTime() - today.getTime();

  return Math.max(
    0,
    Math.ceil(difference / (1000 * 60 * 60 * 24))
  );
};

// ===============================
// Chapter Progress Toggle
// ===============================
const toggleChapterProgress = (
  courseId,
  reportIndex,
  chapterIndex
) => {
  setUploadedCourses((prev) =>
    prev.map((course) => {
      if (course.id !== courseId) return course;

      const updatedAnalysis = course.analysis.map(
        (report, rIndex) => {
          if (rIndex !== reportIndex) return report;

          return {
            ...report,
            progress: report.progress.map(
              (chapter, cIndex) =>
                cIndex === chapterIndex
                  ? {
                      ...chapter,
                      completed: !chapter.completed,
                    }
                  : chapter
            ),
          };
        }
      );

      return {
        ...course,
        analysis: updatedAnalysis,
      };
    })
  );
};

// ===============================
// Filter & Search
// ===============================
const filteredCourses = uploadedCourses.filter((course) => {

  const matchesSearch =
    (course.courseCode || "")
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
    (course.courseName || "")
      .toLowerCase() 
      .includes(searchTerm.toLowerCase());

  const matchesDifficulty =
    filter === "All"
      ? true
      : course.difficulty === filter;

  return matchesSearch && matchesDifficulty;

});

// ===============================
// Sorting
// ===============================
const sortedCourses = [...filteredCourses].sort((a, b) => {

  switch (sortBy) {

    case "Exam Date":
      return new Date(a.examDate) - new Date(b.examDate);

    case "Difficulty": {

      const order = {
        Easy: 1,
        Medium: 2,
        Hard: 3,
        "Not analyzed": 0,
      };

      return order[b.difficulty] - order[a.difficulty];
    }

    case "Study Hours":
      return (b.estimatedHours || 0) - (a.estimatedHours || 0);

    case "Newest":
    default:
      return (
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
      );

  }

});

// ===============================
// Update Course
// ===============================
const handleUpdateCourse = async (updatedCourse) => {
  try {
    await updateCourseAPI(updatedCourse.id, updatedCourse);

    await loadCourses();

    setEditingCourse(null);

  } catch (error) {
    console.error(error);
  }
};

// ===============================
// Delete Course
// ===============================
const removeCourse = async (courseId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {

    await deleteCourse(courseId);

    await loadCourses();

  } catch (error) {

    console.error("Failed to delete course:", error);

  }

};

// ===============================
// Timetable
// ===============================
const timetable = generateTimetable(uploadedCourses);
  
  return (
  <div className="max-w-7xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
    {/* Header Section */}
    <div className="border-b border-slate-200/80 pb-5">
      <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase mb-1">
        <Sparkles size={16} />
        <span>Academic Workspace</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        Study Lab
      </h1>

      <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-2xl">
        Upload course materials, generate custom study schedules, track chapter
        progress, and stay on top of upcoming exams.
      </p>
    </div>

    {/* Analytics & Overview */}
    <section className="space-y-6">
      <StudyDashboard uploadedCourses={uploadedCourses} />
      {/*<StudyOverview uploadedCourses={uploadedCourses} />*/}
    </section>

    {/* Master Timetable */}
    <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
      <MasterTimetable uploadedCourses={uploadedCourses} />
    </section>

    {/* Course & Material Management */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
        <AddCourse
          courseCode={courseCode}
          setCourseCode={setCourseCode}
          courseName={courseName}
          setCourseName={setCourseName}
          examDate={examDate}
          setExamDate={setExamDate}
          addCourse={addCourse}
        />
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
        <UploadMaterials
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          uploadMaterials={uploadMaterials}
        />
      </div>
    </section>

    {/* Uploaded Courses */}
    <section className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-800">
            Your Courses
          </h2>
        </div>
      </div>

      <CourseFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <UploadedCourses
        uploadedCourses={sortedCourses}
        calculateDaysRemaining={calculateDaysRemaining}
        toggleChapterProgress={toggleChapterProgress}
        editingCourse={editingCourse}
        setEditingCourse={setEditingCourse}
        updateCourse={handleUpdateCourse}
        deleteCourse={removeCourse}
      />
    </section>
  </div>
);
}
export default StudyLab;
