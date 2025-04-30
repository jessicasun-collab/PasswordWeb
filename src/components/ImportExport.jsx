import React from "react";
function ImportExport({ masterPassword, setPasswords }) {
  const handleExport = fmt => {
    window.open(`/api/export?masterPassword=${encodeURIComponent(masterPassword)}&fmt=${fmt}`);
  };
  const handleImport = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("masterPassword", masterPassword);
    fetch("/api/import", { method: "POST", body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.success) window.location.reload();
        else alert("匯入失敗：" + (data.error || ""));
      });
  };
  return (
    <div>
      <button onClick={() => handleExport("json")}>匯出 JSON</button>
      <button onClick={() => handleExport("csv")}>匯出 CSV</button>
      <input type="file" accept=".csv,.json" onChange={handleImport} />
    </div>
  );
}
export default ImportExport;