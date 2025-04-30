import React, { useState, useEffect, useRef } from "react";
import Login from "./Login";
import PasswordTable from "./PasswordTable";
import DetailView from "./DetailView";

function App() {
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [selected, setSelected] = useState(null);

  // timeout 機制
  const timerRef = useRef(null);

  // 登出邏輯
  const handleLogout = () => {
    setData(null);
    setFileName("");
    setMasterPassword("");
    setSelected(null);
  };

  // 只要登入後才啟動 timeout
  useEffect(() => {
    if (!data) return;

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        handleLogout();
        alert("閒置超過 10 分鐘，自動登出。");
      }, 10 * 60 * 1000); // 10分鐘
    };

    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [data]);

  if (!data) {
    return (
      <Login
        onLogin={(data, fileName, password) => {
          setData(data);
          setFileName(fileName);
          setMasterPassword(password);
        }}
      />
    );
  }

  if (selected) {
    return (
      <DetailView
        item={selected}
        fileName={fileName}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <PasswordTable
      data={data}
      fileName={fileName}
      masterPassword={masterPassword}
      onLogout={handleLogout}
      onSelect={(item) => setSelected(item)}
    />
  );
}

export default App;