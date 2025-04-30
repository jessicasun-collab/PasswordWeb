import React, { useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { exportPasswords, importPasswords } from "../utils/storage";

export default function ImportExportDialog({ open, mode, passwords, setPasswords, onClose, password }) {
  const fileInput = useRef();

  const handleExport = () => {
    exportPasswords(passwords);
    onClose();
  };

  const handleImport = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const arr = await importPasswords(file, password);
    if (arr) setPasswords(arr);
    onClose();
  };

  return (
    <Dialog open={!!open} onClose={onClose}>
      <DialogTitle>{mode === "export" ? "匯出資料" : "匯入資料"}</DialogTitle>
      <DialogContent>
        {mode === "export"
          ? <Typography>匯出所有密碼資料為加密 JSON 檔</Typography>
          : <Typography>匯入本地 JSON 檔案（會覆蓋原資料）</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        {mode === "export"
          ? <Button variant="contained" onClick={handleExport}>匯出</Button>
          : <>
              <input
                type="file"
                accept=".json"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={handleImport}
              />
              <Button variant="contained" onClick={() => fileInput.current.click()}>選擇檔案</Button>
            </>
        }
      </DialogActions>
    </Dialog>
  );
}