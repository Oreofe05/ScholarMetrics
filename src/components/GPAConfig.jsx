function GPAConfig({
  scale,
  setScale,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        GPA Configuration
      </h2>

      <select
        value={scale}
        onChange={(e) =>
          setScale(Number(e.target.value))
        }
        className="w-full border p-3 rounded-lg"
      >
        <option value={5}>
          5 Point Scale
        </option>

        <option value={4}>
          4 Point Scale
        </option>
      </select>
    </div>
  );
}

export default GPAConfig;