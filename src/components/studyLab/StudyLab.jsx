import { useState } from "react";
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

function StudyLab() {
  // Form State
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [examDate, setExamDate] = useState("");

  // Upload Selection State
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Search, Filter & Sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Edit Course State
  const [editingCourse, setEditingCourse] = useState(null);

  // App Context
  const { uploadedCourses, setUploadedCourses } = useApp();

  // ===============================
  // Add New Course
  // ===============================
  const addCourse = () => {
    if (!courseName.trim() || !courseCode.trim()) {
      alert("Please fill in all required course fields.");
      return;
    }

    const newCourse = {
      id: Date.now(),
      courseCode,
      courseName,
      examDate,
      createdAt: new Date().toISOString(),
      materials: [],
      generatedTopics: [],
      analysis: [],
      wordCount: 0,
      estimatedPages: 0,
      estimatedHours: 0,
      difficulty: "Not analyzed",
    };

    setUploadedCourses((prev) => [...prev, newCourse]);

    setCourseName("");
    setCourseCode("");
    setExamDate("");
  };

  // ===============================
  // Upload & Analyze Materials
  // ===============================
  const uploadMaterials = async () => {
    if (!selectedCourse) {
      alert("Please select a course to upload materials for.");
      return;
    }

    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    const uploadedMaterialData = selectedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));

    const analyses = [];

    for (const file of selectedFiles) {
      if (file.type === "application/pdf") {
        try {
          const pdfData = await extractPDFText(file);
          const analysis = analyzeMaterial(pdfData.fullText, pdfData.pages);

          analyses.push({
            fileName: file.name,
            ...analysis,
            progress: initializeProgress(analysis.chapters),
          });
        } catch (error) {
          console.error("PDF Parsing Error:", error);
        }
      }
    }

    const generatedTopics = selectedFiles.map((file) =>
      file.name.replace(/\.(pdf|doc|docx|ppt|pptx)$/i, "")
    );

    const totalHours = analyses.reduce(
      (sum, item) => sum + item.estimatedHours,
      0
    );

    const totalPages = analyses.reduce(
      (sum, item) => sum + item.estimatedPages,
      0
    );

    let difficulty = "Easy";
    if (totalPages >= 25) difficulty = "Medium";
    if (totalPages >= 60) difficulty = "Hard";

    setUploadedCourses((prev) =>
      prev.map((course) =>
        String(course.id) === String(selectedCourse)
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
              analysis: [...(course.analysis || []), ...analyses],
              studyPlan: generateStudyPlan(
                analyses.flatMap((a) => a.chapters),
                course.examDate
              ),
              difficulty,
              estimatedHours: totalHours,
            }
          : course
      )
    );

    setSelectedFiles([]);
    setSelectedCourse("");
    alert("Materials analyzed successfully!");
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
    return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
  };

  // ===============================
  // Chapter Progress Toggle
  // ===============================
  const toggleChapterProgress = (courseId, reportIndex, chapterIndex) => {
    setUploadedCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;

        const updatedAnalysis = course.analysis.map((report, rIndex) => {
          if (rIndex !== reportIndex) return report;

          return {
            ...report,
            progress: report.progress.map((chapter, cIndex) =>
              cIndex === chapterIndex
                ? { ...chapter, completed: !chapter.completed }
                : chapter
            ),
          };
        });

        return {
          ...course,
          analysis: updatedAnalysis,
        };
      })
    );
  };

  // Filter & Search Logic
  const filteredCourses = uploadedCourses.filter((course) => {
    const matchesSearch =
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      filter === "All" ? true : course.difficulty === filter;

    return matchesSearch && matchesDifficulty;
  });

  // Sorting Logic
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "Exam Date":
        return new Date(a.examDate) - new Date(b.examDate);

      case "Difficulty": {
        const order = { Easy: 1, Medium: 2, Hard: 3, "Not analyzed": 0 };
        return order[b.difficulty] - order[a.difficulty];
      }

      case "Study Hours":
        return b.estimatedHours - a.estimatedHours;

      case "Newest":
      default:
        return b.id - a.id;
    }
  });

  // Update & Delete Helpers
  const updateCourse = (updatedCourse) => {
    setUploadedCourses((prev) =>
      prev.map((course) =>
        course.id === updatedCourse.id
          ? {
              ...course,
              courseCode: updatedCourse.courseCode,
              courseName: updatedCourse.courseName,
              examDate: updatedCourse.examDate,
            }
          : course
      )
    );
    setEditingCourse(null);
  };

  const deleteCourse = (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    setUploadedCourses((prev) =>
      prev.filter((course) => course.id !== courseId)
    );
  };

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
          Upload course materials, generate custom study schedules, track chapter progress, and stay on top of upcoming exams.
        </p>
      </div>

      {/* Analytics & Overview Section */}
      <section className="space-y-6">
        <StudyDashboard uploadedCourses={uploadedCourses} />
        <StudyOverview uploadedCourses={uploadedCourses} />
      </section>

      {/* Master Timetable Section */}
      <section className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <MasterTimetable timetable={timetable} />
      </section>

      {/* Course & Material Management Section */}
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

      {/* Uploaded Courses List & Filtering Section */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">Your Courses</h2>
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
          updateCourse={updateCourse}
          deleteCourse={deleteCourse}
        />
      </section>
    </div>
  );
}

export default StudyLab;