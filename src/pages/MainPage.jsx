import React, { useState } from "react";
import { Box, Snackbar } from "@mui/material";
import PasswordList from "../components/PasswordList";
import PasswordEditor from "../components/PasswordEditor";
import ToolbarMobile from "../components/ToolbarMobile";
import ImportExportDialog from "../components/ImportExportDialog";
import ChangePasswordDialog from "../components/ChangePasswordDialog";
import { loadPasswords, savePasswords } from "../utils/storage";

export default function MainPage({ loginInfo, onLogout }) {
  const [passwords, setPasswords] = useState(loadPasswords(loginInfo.password) || []);
  const [editing, setEditing] = useState(null);
  const [showImportExport, setShowImportExport] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);
  const [snackbar, setSnackbar] = useState("");
  const [search, setSearch] = useState("");

  const handleEdit = (item, idx) => setEditing({ ...item, idx });
  const handleSave = (item, idx) => {
    let arr = [...passwords];
    if (typeof idx === "number") arr[idx] = item;
    else arr.push(item);
    setPasswords(arr);
    savePasswords(arr, loginInfo.password);
    setEditing(null);
    setSnackbar("已儲存");
  };
  const handleDelete = idx => {
    let arr = passwords.filter((_, i) => i !== idx);
    setPasswords(arr);
    savePasswords(arr, loginInfo.password);
    setSnackbar("已刪除");
  };

  return (
    <Box sx={{ pb: 9, maxWidth: 600, mx: "auto" }}>
      <PasswordList
        passwords={passwords}
        search={search}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ToolbarMobile
        onNew={() => setEditing({})}
        onExport={() => setShowImportExport("export")}
        onImport={() => setShowImportExport("import")}
        onChangePassword={() => setShowChangePw(true)}
        onLogout={onLogout}
        setSearch={setSearch}
      />
      <PasswordEditor
        open={!!editing}
        item={editing}
        onSave={handleSave}
        onClose={() => setEditing(null)}
      />
      <ImportExportDialog
        open={!!showImportExport}
        mode={showImportExport}
        passwords={passwords}
        setPasswords={arr => { setPasswords(arr); savePasswords(arr, loginInfo.password); }}
        onClose={() => setShowImportExport(false)}
        password={loginInfo.password}
      />
      <ChangePasswordDialog
        open={showChangePw}
        onClose={() => setShowChangePw(false)}
        oldPassword={loginInfo.password}
        setSnackbar={setSnackbar}
      />
      <Snackbar
        open={!!snackbar}
        message={snackbar}
        autoHideDuration={2000}
        onClose={() => setSnackbar("")}
      />
    </Box>
  );
}