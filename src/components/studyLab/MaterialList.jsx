function MaterialList({
  materials,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Uploaded Materials
      </h2>

      {materials.length === 0 ? (
        <p>No materials uploaded</p>
      ) : (
        <ul className="space-y-2">

          {materials.map(
            (material) => (
              <li
                key={material.id}
                className="border p-3 rounded-lg"
              >
                {material.name}
              </li>
            )
          )}

        </ul>
      )}

    </div>
  );
}

export default MaterialList;