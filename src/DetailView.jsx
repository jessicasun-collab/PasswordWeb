import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function DetailView({ item, fileName, onBack }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState("");

  if (!item) return null;

  // 複製到剪貼簿並顯示提示
  const handleCopy = (label, value) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(""), 1200);
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
      <div className="card"
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #0001",
          padding: "36px 24px",
          width: 350,
          maxWidth: "95vw",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
          <button
            onClick={onBack}
            style={{
              border: "none",
              background: "none",
              color: "#007aff",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              marginRight: 8,
              padding: 0,
            }}
          >
            &lt; {fileName}
          </button>
        </div>
        <div
          style={{
            borderRadius: 12,
            background: "#f7f7fa",
            padding: "18px 16px",
            marginBottom: 18,
            textAlign: "center",
          }}
        >
          <h3 style={{ fontWeight: 700, fontSize: 22, margin: 0 }}>{item.system}</h3>
        </div>
        <div
          className="mb-2 text-muted"
          style={{
            fontSize: "1.05em",
            cursor: "pointer",
            borderBottom: "1px solid #eee",
            padding: "12px 0",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => handleCopy(t("username"), item.username)}
        >
          <span style={{ color: "#888", fontSize: 15 }}>{t("username")}</span>
          <span style={{ color: "#222", fontSize: 17, fontWeight: 500 }}>
            {item.username}
            {copied === t("username") && (
              <span style={{ color: "#007aff", fontSize: 15, marginLeft: 8 }}>{t("copied")}</span>
            )}
          </span>
        </div>
        <div
          className="mb-2 text-muted"
          style={{
            fontSize: "1.05em",
            cursor: "pointer",
            borderBottom: "1px solid #eee",
            padding: "12px 0",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => handleCopy(t("password"), item.password)}
        >
          <span style={{ color: "#888", fontSize: 15 }}>{t("password")}</span>
          <span style={{ color: "#222", fontSize: 17, fontWeight: 500 }}>
            {item.password}
            {copied === t("password") && (
              <span style={{ color: "#007aff", fontSize: 15, marginLeft: 8 }}>{t("copied")}</span>
            )}
          </span>
        </div>
        <div
          className="mb-2 text-muted"
          style={{
            fontSize: "1.05em",
            cursor: "pointer",
            borderBottom: "1px solid #eee",
            padding: "12px 0",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => handleCopy(t("website"), item.website)}
        >
          <span style={{ color: "#888", fontSize: 15 }}>{t("website")}</span>
          <span style={{ color: "#222", fontSize: 17, fontWeight: 500 }}>
            {item.website}
            {copied === t("website") && (
              <span style={{ color: "#007aff", fontSize: 15, marginLeft: 8 }}>{t("copied")}</span>
            )}
          </span>
        </div>
        <div
          className="mb-2 text-muted"
          style={{
            fontSize: "1.05em",
            cursor: "pointer",
            padding: "12px 0",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => handleCopy(t("remark"), item.remark)}
        >
          <span style={{ color: "#888", fontSize: 15 }}>{t("remark")}</span>
          <span style={{ color: "#222", fontSize: 17, fontWeight: 500 }}>
            {item.remark}
            {copied === t("remark") && (
              <span style={{ color: "#007aff", fontSize: 15, marginLeft: 8 }}>{t("copied")}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DetailView;