function CourseFilter({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-4">

      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="border rounded-lg p-3 flex-1"
      />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        className="border rounded-lg p-3"
      >
        <option>All</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value)
        }
        className="border rounded-lg p-3"
      >
        <option>Newest</option>
        <option>Exam Date</option>
        <option>Difficulty</option>
        <option>Study Hours</option>
      </select>

    </div>
  );
}

export default CourseFilter;