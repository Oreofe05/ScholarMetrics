import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function AssignmentTracker() {
  // Form state
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");

    // Search assignment
    const [search, setSearch] =
    useState("");

    // Filter by status
    const [statusFilter, setStatusFilter] =
    useState("All");

    // Filter by priority
    const [priorityFilter, setPriorityFilter] =
    useState("All");

  // Persist assignments in localStorage so data survives page refreshes
  const [assignments, setAssignments] = useLocalStorage(
    "assignments",
    []
  );

  // Dashboard statistics
  const totalAssignments = assignments.length;

  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  ).length;

  const pendingAssignments = assignments.filter(
    (assignment) => !assignment.completed
  ).length;

  // Assignment is considered overdue if its deadline has passed
  // and it has not been marked as completed
  const overdueAssignments = assignments.filter(
    (assignment) =>
      !assignment.completed &&
      new Date(assignment.deadline) < new Date()
  ).length;

    // Assignment Progress
    const completionPercentage =
    totalAssignments === 0
        ? 0
        : Math.round(
            (completedAssignments /
            totalAssignments) *
            100
        );

  // Create a new assignment and save it
  const addAssignment = () => {
    // Prevent submission if required fields are missing
    if (!title || !course || !deadline) {
      alert("Fill all fields");
      return;
    }

    const newAssignment = {
      id: Date.now(), // Simple unique identifier
      title,
      course,
      deadline,
      priority,
      completed: false,
    };

    setAssignments([
      ...assignments,
      newAssignment,
    ]);

    // Reset form after successful submission
    setTitle("");
    setCourse("");
    setDeadline("");
    setPriority("Medium");
  };

  // Toggle assignment completion status
  const toggleComplete = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              completed: !assignment.completed,
            }
          : assignment
      )
    );
  };

  // Remove assignment from the list after confirmation
  const deleteAssignment = (id) => {
    if (
      !window.confirm(
        "Delete this assignment?"
      )
    ) {
      return;
    }

    setAssignments((prev) =>
      prev.filter(
        (assignment) =>
          assignment.id !== id
      )
    );
  };
    
    // Calculate Days Remaining
    const getDaysRemaining = (deadline) => {
    const today = new Date();

    const dueDate = new Date(deadline);

    const difference =
        dueDate - today;

    return Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
    );
    };


// Assignment Deadline Status
    const getDeadlineStatus = (
    deadline
    ) => {
    const days =
        getDaysRemaining(deadline);

    if (days < 0)
        return {
        text: "Overdue",
        color:
            "bg-red-100 text-red-700",
        };

    if (days <= 2)
        return {
        text: `${days} day(s) left`,
        color:
            "bg-orange-100 text-orange-700",
        };

    if (days <= 7)
        return {
        text: `${days} day(s) left`,
        color:
            "bg-yellow-100 text-yellow-700",
        };

    return {
        text: `${days} day(s) left`,
        color:
        "bg-green-100 text-green-700",
    };
    };

    // Sort Assignments
    // High -> Medium -> Low
    // Then by nearest deadline
    // =========================
    const sortedAssignments =
    [...assignments].sort(
    (a, b) => {
      const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      const priorityDifference =
        priorityOrder[b.priority] -
        priorityOrder[a.priority];

      if (
        priorityDifference !== 0
      ) {
        return priorityDifference;
      }

      return (
        new Date(a.deadline) -
        new Date(b.deadline)
        );
    }
    );
    
    // Search & Filter Logic
    const filteredAssignments =
    sortedAssignments.filter(
    (assignment) => {

      const matchesSearch =
        assignment.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        assignment.course
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter ===
            "Completed"
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
    }
  );


  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Assignment Tracker
      </h2>

      {/* Assignment creation form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Course Code"
          value={course}
          onChange={(e) =>
            setCourse(e.target.value)
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
          className="border p-3 rounded-lg"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="border p-3 rounded-lg"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          onClick={addAssignment}
          className="
          bg-indigo-600
          text-white
          rounded-lg
          px-4
          py-3
          hover:bg-indigo-700
          "
        >
          Add Assignment
        </button>

      </div>

      {/* Assignment summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-blue-600 text-white p-5 rounded-2xl shadow">
          <h3 className="text-sm opacity-80">
            Total Assignments
          </h3>

          <p className="text-3xl font-bold">
            {totalAssignments}
          </p>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-2xl shadow">
          <h3 className="text-sm opacity-80">
            Completed
          </h3>

          <p className="text-3xl font-bold">
            {completedAssignments}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-2xl shadow">
          <h3 className="text-sm opacity-80">
            Pending
          </h3>

          <p className="text-3xl font-bold">
            {pendingAssignments}
          </p>
        </div>

        <div className="bg-red-600 text-white p-5 rounded-2xl shadow">
          <h3 className="text-sm opacity-80">
            Overdue
          </h3>

          <p className="text-3xl font-bold">
            {overdueAssignments}
          </p>
        </div>

      </div>

          {/* Search & Filters */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">

            <input
                type="text"
                placeholder="Search assignment..."
                value={search}
                onChange={(e) =>
                setSearch(e.target.value)
                }
                className="border p-3 rounded-lg"
            />

            <select
                value={statusFilter}
                onChange={(e) =>
                setStatusFilter(
                    e.target.value
                )
                }
                className="border p-3 rounded-lg"
            >
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
            </select>

            <select
                value={priorityFilter}
                onChange={(e) =>
                setPriorityFilter(
                    e.target.value
                )
                }
                className="border p-3 rounded-lg"
            >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>

            </div>

            {/* Progress Tracker */}

            <div className="bg-white p-5 rounded-2xl shadow mb-6">

            <div className="flex justify-between mb-2">

                <h3 className="font-bold">
                Assignment Progress
                </h3>

                <span className="font-bold text-indigo-600">
                {completionPercentage}%
                </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                className="
                bg-indigo-600
                h-4
                rounded-full
                transition-all
                duration-500
                "
                style={{
                    width: `${completionPercentage}%`,
                }}
                />

            </div>

            <p className="mt-3 text-sm text-gray-600">

                {completedAssignments}
                {" "}of{" "}
                {totalAssignments}
                {" "}assignments completed

            </p>

            </div>
      {/* Assignment list */}
      <div className="mt-6 space-y-3">

        {assignments.length === 0 ? (
          <p className="text-gray-500">
            No assignments added yet
          </p>
        ) : (
          filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="
              border
              rounded-xl
              p-4
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              "
            >
              <div>
                <h3 className="font-bold">
                  {assignment.title}
                </h3>

                <p>
                  {assignment.course}
                </p>

                <p className="text-sm text-gray-500">
                    Due:
                    {" "}
                    {assignment.deadline}
                    </p>

                    <div
                    className={`
                        inline-block
                        mt-2
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${
                        getDeadlineStatus(
                            assignment.deadline
                        ).color
                        }
                    `}
                    >
                    {
                        getDeadlineStatus(
                        assignment.deadline
                        ).text
                    }
                    </div>

                    <div
                    className={`
                        inline-block
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        mt-2
                        ${
                        assignment.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : assignment.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }
                    `}
                    >
                    {assignment.priority}
                    </div>

                    <div className="flex gap-2">

                  {/* Mark assignment as completed */}
                  <button
                    onClick={() =>
                      toggleComplete(
                        assignment.id
                      )
                    }
                    className="
                    bg-green-600
                    text-white
                    px-3
                    py-2
                    rounded-lg
                    "
                  >
                    Complete
                  </button>

                  {/* Permanently delete assignment */}
                  <button
                    onClick={() =>
                      deleteAssignment(
                        assignment.id
                      )
                    }
                    className="
                    bg-red-600
                    text-white
                    px-3
                    py-2
                    rounded-lg
                    "
                  >
                    Delete
                  </button>

                </div>
              </div>

              {/* Current assignment status */}
              <span
                className="
                bg-yellow-100
                text-yellow-700
                px-3
                py-1
                rounded-full
                text-sm
                "
              >
                {assignment.completed
                  ? "Completed"
                  : "Pending"}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default AssignmentTracker;