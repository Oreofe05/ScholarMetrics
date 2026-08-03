import StudyPlan from "./StudyPlan";
import AITutor from "./AITutor";
import QuizGenerator from "./QuizGenerator";
import Flashcards from "./Flashcards";

import ProgressTracker from "./ProgressTracker";
import ExamReadiness from "./ExamReadiness";
import { calculateReadiness } from "../../utils/calculateReadiness";
import { useState } from "react";
import {
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";



function CourseCard({
  course,
  calculateDaysRemaining,
  toggleChapterProgress,
  editingCourse,
  setEditingCourse,
  updateCourse,
  deleteCourse,
}) {

  const materials = course.materials || [];

  const isEditing = editingCourse === course.id;
 
  const [editedCode, setEditedCode] = useState(course.courseCode);
  const [editedName, setEditedName] = useState(course.courseName);
  const [editedDate, setEditedDate] = useState(course.examDate);

  const readinessScore = calculateReadiness(
  course,
  calculateDaysRemaining(course.examDate)
);
    
  return (
    <div className="border rounded-2xl shadow-sm p-6 bg-white">

      {/* Header */}
        <div className="flex justify-between items-start">

        <div className="flex-1">

            {isEditing ? (

            <div className="space-y-3">

                <input
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                className="border rounded-lg p-2 w-full"
                />

                <input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border rounded-lg p-2 w-full"
                />

                <input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className="border rounded-lg p-2"
                />

            </div>

            ) : (

            <>
                <h3 className="text-xl font-bold">
                {course.courseCode}
                </h3>

                <p className="text-gray-600">
                {course.courseName}
                </p>
            </>

            )}

        </div>

        <div className="flex items-center gap-2">

            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
            {calculateDaysRemaining(course.examDate)} days left
            </span>

            {isEditing ? (

            <>
                <button
                onClick={() =>
                    updateCourse({
                    ...course,
                    courseCode: editedCode,
                    courseName: editedName,
                    examDate: editedDate,
                    })
                }
                className="p-2 rounded-lg hover:bg-green-100 transition"
                >
                <Save
                    size={20}
                    className="text-green-600"
                />
                </button>

                <button
                onClick={() => setEditingCourse(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                <X
                    size={20}
                    className="text-gray-600"
                />
                </button>

            </>

            ) : (

            <>
                <button
                onClick={() => setEditingCourse(course.id)}
                className="p-2 rounded-lg hover:bg-blue-100 transition"
                >
                <Pencil
                    size={20}
                    className="text-blue-600"
                />
                </button>

                <button
                    onClick={() => deleteCourse(course.id)}
                    className="p-2 rounded-lg hover:bg-red-100 transition"
                    >
                    <Trash2
                        size={20}
                        className="text-red-600"
                    />
                    </button>

            </>

            )}

        </div>

        </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Difficulty
          </p>

          <p className="font-bold text-blue-600">
            {course.difficulty || "Not analyzed"}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Reading Hours
          </p>

          <p className="font-bold text-green-600">
            {course.estimatedHours || 0}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Materials
          </p>

          <p className="font-bold">
            {materials.length}
          </p>
        </div>

      </div>

        {/* Exam Readiness */}
      <ExamReadiness
        score={readinessScore}
        />

      {/* Uploaded Files */}
      <div className="mt-6">

        <h4 className="font-semibold mb-3">
          Uploaded Files
        </h4>

        {materials.length > 0 ? (

          <ul className="space-y-2">

            {materials.map((material) => (

              <li
                key={material.id}
                className="bg-gray-100 rounded-lg px-4 py-2"
              >
                📄 {material.fileName}
              </li>

            ))}

          </ul>

        ) : (

          <p className="text-gray-500">
            No materials uploaded.
          </p>

        )}

      </div>

        {/* AI Study Plan */}
            {materials.map((material) => (
              material.studyPlan && (
                  <StudyPlan
                      key={material.id}
                      studyPlan={material.studyPlan.plan}
                  />
              )
          ))}

      {/* Analysis */}

      {materials.map((material) => (
  <div
    key={material.id}
    className="mt-8 border-t pt-6 space-y-6"
  >
    {/* Summary */}
    {material.summary && (
      <div>
        <h3 className="text-xl font-bold mb-2">
          AI Summary
        </h3>

        <div className="bg-slate-50 rounded-xl p-5">
          <p>{material.summary.summary}</p>
        </div>
      </div>
    )}

    {/* Study Plan */}
    {material.studyPlan && (
      <StudyPlan studyPlan={material.studyPlan.plan} />
    )}

    {/* Progress */}
    {material.progress && (
      <ProgressTracker
        progress={material.progress}
      />
    )}

    {/* Flashcards */}
    {material.flashcards?.length > 0 && (
      <Flashcards flashcards={material.flashcards} />
    )}

    {/* Quiz */}
    {material.quizQuestions?.length > 0 && (
      <QuizGenerator quizQuestions={material.quizQuestions} />
    )}

    {/* AI Tutor */}
    <AITutor material={material} />
  </div>
))}

    </div>
  );

}
export default CourseCard;