import React, { useState, useRef } from "react";
import { decryptData } from "./core/encryption";
import { useTranslation } from "react-i18next";

function Login({ onLogin }) {
  const { t, i18n } = useTranslation();
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 控制密碼顯示狀態
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
    const selectedLanguage = e.target.value;
    // 反轉語言：選擇中文時切換到英文，選擇英文時切換到中文
    const newLanguage = selectedLanguage === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLanguage);
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
      <div
        className="card"
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #0001",
          padding: "40px 32px",
          width: 350,
          maxWidth: "90vw",
        }}
        
        >{/* 語言切換文字 */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <span
            onClick={() => {
              const newLanguage = i18n.language === "zh" ? "en" : "zh";
              i18n.changeLanguage(newLanguage);
            }}
            style={{
              color: "#007aff",
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              transition: "color 0.2s",
            }}
          >
            {i18n.language === "zh" ? "English" : "中文"}
          </span>
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
              accept=".enc" // 只接受 .enc 文件
            />
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, fontSize: 18, marginBottom: 8, display: "block" }}>
            {t("master_password")}
          </label>
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
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
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" // 禁用自動填充
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 40, // 向左移動，避免與 macOS 鑰匙圖示重疊
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: 18,
                color: "#888",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        {error && (
          <div
            className="text-danger"
            style={{ marginBottom: 18, textAlign: "center", fontSize: 15 }}
          >
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