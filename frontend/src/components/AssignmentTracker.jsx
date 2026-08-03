import { useState, useEffect } from "react";
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment as removeAssignment,
} from "../services/assignmentService";

import {
  CheckCircle2,
  Circle,
  Trash2,
  Plus,
  Search,
  Calendar,
  BookOpen,
  Check,
} from "lucide-react";

function AssignmentTracker() {
  // Form state
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Search & Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Backend data
  const [assignments, setAssignments] = useState([]);

  // Load assignments on page load
  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Dashboard statistics
  const totalAssignments = assignments.length;

  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  ).length;

  const pendingAssignments = assignments.filter(
    (assignment) => !assignment.completed
  ).length;

  const overdueAssignments = assignments.filter(
    (assignment) =>
      !assignment.completed &&
      new Date(assignment.deadline) < new Date()
  ).length;

  const completionPercentage =
    totalAssignments === 0
      ? 0
      : Math.round(
          (completedAssignments / totalAssignments) * 100
        );

  // Create Assignment
  const addAssignment = async (e) => {
    e.preventDefault();

    if (!title || !course || !deadline) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const newAssignment = await createAssignment({
        title,
        course,
        deadline,
        priority,
      });

      setAssignments((prev) => [...prev, newAssignment]);

      setTitle("");
      setCourse("");
      setDeadline("");
      setPriority("Medium");

    } catch (error) {
      console.error(error);
      alert("Failed to create assignment.");
    }
  };

  // Toggle Complete
  const toggleComplete = async (id) => {
    try {
      const assignment = assignments.find(
        (a) => a.id === id
      );

      const updated = await updateAssignment(id, {
        completed: !assignment.completed,
      });

      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === id ? updated : assignment
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  // Delete Assignment
  const deleteAssignment = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    try {
      await removeAssignment(id);

      setAssignments((prev) =>
        prev.filter((assignment) => assignment.id !== id)
      );

    } catch (error) {
      console.error(error);
    }
  };

  // Days Remaining
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(deadline);

    const difference = dueDate - today;

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  // Status Badge
  const getDeadlineStatus = (deadline, completed) => {
    if (completed) {
      return {
        text: "Completed",
        color:
          "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }

    const days = getDaysRemaining(deadline);

    if (days < 0) {
      return {
        text: "Overdue",
        color:
          "bg-rose-50 text-rose-700 border-rose-200",
      };
    }

    if (days === 0) {
      return {
        text: "Due Today",
        color:
          "bg-amber-50 text-amber-700 border-amber-200",
      };
    }

    if (days <= 2) {
      return {
        text: `${days}d left`,
        color:
          "bg-amber-50 text-amber-700 border-amber-200",
      };
    }

    if (days <= 7) {
      return {
        text: `${days}d left`,
        color:
          "bg-sky-50 text-sky-700 border-sky-200",
      };
    }

    return {
      text: `${days}d left`,
      color:
        "bg-slate-50 text-slate-600 border-slate-200",
    };
  };

  // Sort Assignments
  const sortedAssignments = [...assignments].sort(
    (a, b) => {
      const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      const priorityDiff =
        priorityOrder[b.priority] -
        priorityOrder[a.priority];

      if (priorityDiff !== 0)
        return priorityDiff;

      return (
        new Date(a.deadline) -
        new Date(b.deadline)
      );
    }
  );

  // Filter Assignments
  const filteredAssignments =
    sortedAssignments.filter((assignment) => {
      const matchesSearch =
        assignment.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        assignment.course
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Completed"
          ? assignment.completed
          : !assignment.completed;

      const matchesPriority =
        priorityFilter === "All"
          ? true
          : assignment.priority ===
            priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Assignment Tracker
          </h2>
          <p className="text-xs text-slate-500">
            Keep track of course deliverables, deadlines, and progress
          </p>
        </div>
      </div>

      {/* Assignment Creation Form */}
      <form onSubmit={addAssignment} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 text-sm p-2.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />

        <input
          type="text"
          placeholder="Course Code (e.g. CSC 401)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 text-sm p-2.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 text-sm p-2.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 text-sm p-2.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <button
          type="submit"
          className="sm:col-span-2 lg:col-span-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm p-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </form>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{totalAssignments}</p>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Completed</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{completedAssignments}</p>
        </div>

        <div className="bg-amber-50/60 border border-amber-100 p-4 rounded-xl">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{pendingAssignments}</p>
        </div>

        <div className="bg-rose-50/60 border border-rose-100 p-4 rounded-xl">
          <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Overdue</p>
          <p className="text-2xl font-bold text-rose-700 mt-1">{overdueAssignments}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-slate-700">Completion Progress</span>
          <span className="font-bold text-indigo-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 text-right">
          {completedAssignments} of {totalAssignments} assignments completed
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search title or course code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm pl-9 pr-3 py-2 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-2 rounded-xl focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-3 pt-1">
        {assignments.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl">
            <BookOpen size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-500">No assignments added yet</p>
            <p className="text-xs text-slate-400 mt-1">Use the form above to record upcoming course deliverables</p>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-slate-400">No assignments match your current search or filters</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => {
            const status = getDeadlineStatus(assignment.deadline, assignment.completed);

            return (
              <div
                key={assignment.id}
                className={`border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  assignment.completed
                    ? "bg-slate-50/50 border-slate-200/60 opacity-75"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                }`}
              >
                {/* Info Section */}
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(assignment.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    {assignment.completed ? (
                      <CheckCircle2 size={20} className="text-emerald-600" />
                    ) : (
                      <Circle size={20} />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={`font-semibold text-sm ${
                          assignment.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800"
                        }`}
                      >
                        {assignment.title}
                      </h3>
                      <span className="text-xs font-mono font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {assignment.course}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" />
                        Due: {assignment.deadline}
                      </span>

                      {/* Status & Priority Tags */}
                      <span className={`border px-2 py-0.5 rounded-full text-[10px] font-medium ${status.color}`}>
                        {status.text}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          assignment.priority === "High"
                            ? "bg-rose-100 text-rose-700"
                            : assignment.priority === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Controls */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => toggleComplete(assignment.id)}
                    className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      assignment.completed
                        ? "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    <Check size={13} />
                    {assignment.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                    title="Delete Assignment"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

export default AssignmentTracker;