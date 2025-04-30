import React, { useState, useRef } from "react";
import { decryptData } from "./core/encryption";
import { useTranslation } from "react-i18next";

function Login({ onLogin }) {
  const { t, i18n } = useTranslation();
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleLogin = async () => {
    if (!file || !password) {
      setError(t("file_and_password_required"));
      return;
    }
    try {
      const fileContent = await file.text();
      const decrypted = await decryptData(fileContent, password);
      const data = JSON.parse(decrypted);
      onLogin(data, file.name, password);
    } catch (e) {
      setError(t("file_or_password_error") + e.message);
    }
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="card" style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px #0001",
        padding: "40px 32px",
        width: 350,
        maxWidth: "90vw",
      }}>
        {/* 語言切換選單 */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <select
            value={i18n.language}
            onChange={handleLanguageChange}
            style={{
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 15,
              border: "1px solid #e0e0e6",
              background: "#f7f7fa",
              cursor: "pointer"
            }}
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>
        <h2
          style={{
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: 1,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          {t("app_title")}
        </h2>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, fontSize: 18, marginBottom: 8, display: "block" }}>
            {t("select_file")}
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              type="button"
              className="btn"
              style={{
                border: "none",
                background: "#f1f1f4",
                borderRadius: 8,
                padding: "10px 18px",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 1px 2px #0001",
                transition: "background 0.2s",
              }}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              {t("choose_file")}
            </button>
            <span style={{ marginLeft: 14, color: "#888", fontSize: 15 }}>
              {file ? file.name : t("not_selected")}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, fontSize: 18, marginBottom: 8, display: "block" }}>
            {t("master_password")}
          </label>
          <input
            type="password"
            className="form-control"
            style={{
              width: "100%",
              border: "1px solid #e0e0e6",
              borderRadius: 8,
              padding: "12px 14px",
              fontSize: 17,
              background: "#f7f7fa",
              outline: "none",
              marginTop: 2,
              marginBottom: 0,
              boxSizing: "border-box",
            }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-danger" style={{ marginBottom: 18, textAlign: "center", fontSize: 15 }}>
            {error}
          </div>
        )}
        <button
          className="btn"
          style={{
            width: "100%",
            background: "#007aff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "13px 0",
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: 1,
            boxShadow: "0 2px 8px #007aff22",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={handleLogin}
        >
          {t("login")}
        </button>
      </div>
    </div>
  );
}

export default Login;