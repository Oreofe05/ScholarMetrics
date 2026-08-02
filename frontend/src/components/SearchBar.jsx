function SearchBar({
  search,
  setSearch,
}) {
  return (
    <input
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search course..."
      className="w-full p-3 border rounded"
    />
  );
}

export default SearchBar;