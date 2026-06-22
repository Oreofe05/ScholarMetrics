function UploadMaterial({
  materials,
  setMaterials,
}) {

  const handleUpload = (e) => {

    const files =
      Array.from(e.target.files);

    const uploaded =
      files.map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      }));

    setMaterials([
      ...materials,
      ...uploaded,
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Upload Course Materials
      </h2>

      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx"
        onChange={handleUpload}
      />

    </div>
  );
}

export default UploadMaterial;