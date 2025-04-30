import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function PasswordTable({ data, fileName, masterPassword, onLogout, onSelect }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("system");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = data
    .filter(item =>
      [item.system, item.username, item.website, item.remark]
        .some(field => field && field.includes(search))
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });

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
          width: 370,
          maxWidth: "95vw",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontWeight: 600, fontSize: 17, color: "#222" }}>
            {t("file")}: {fileName}
          </div>
          <button
            style={{
              background: "#f1f1f4",
              border: "none",
              borderRadius: 8,
              padding: "7px 16px",
              fontSize: 15,
              fontWeight: 500,
              color: "#d00",
              cursor: "pointer",
              boxShadow: "0 1px 2px #0001",
            }}
            onClick={onLogout}
          >
            {t("logout")}
          </button>
        </div>
        <div style={{ marginBottom: 18, color: "#888", fontSize: 15, textAlign: "right" }}>
          {t("total_count", { count: filtered.length })}
        </div>
        <input
          style={{
            width: "100%",
            border: "1px solid #e0e0e6",
            borderRadius: 8,
            padding: "12px 14px",
            fontSize: 16,
            background: "#f7f7fa",
            outline: "none",
            marginBottom: 18,
            boxSizing: "border-box",
          }}
          placeholder={t("search_placeholder")}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div>
          {filtered.length === 0 && (
            <div style={{ color: "#bbb", textAlign: "center", padding: "32px 0" }}>{t("no_data")}</div>
          )}
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="apple-list-item"
              style={{
                marginBottom: 14,
                cursor: "pointer",
              }}
              onClick={() => onSelect && onSelect(item, idx)}
            >
              <div style={{ fontWeight: 700, fontSize: 17, color: "#222" }}>{item.system}</div>
              <div style={{ color: "#888", fontSize: 15, marginTop: 2 }}>{item.username}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PasswordTable;