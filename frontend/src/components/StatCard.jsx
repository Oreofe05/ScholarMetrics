function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        {title}
      </h3>

      <h1 className="text-3xl font-bold">
        {value}
      </h1>
    </div>
  );
}

export default StatCard;