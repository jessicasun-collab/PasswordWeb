import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material";

export default function PasswordEditor({ open, item, onSave, onClose }) {
  const [form, setForm] = useState({ system: "", username: "", website: "", password: "", remark: "" });
  useEffect(() => {
    setForm(item || { system: "", username: "", website: "", password: "", remark: "" });
  }, [item]);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth>
      <DialogTitle>{item && item.idx !== undefined ? "編輯紀錄" : "新增紀錄"}</DialogTitle>
      <DialogContent>
        <Stack gap={2} sx={{ mt: 1 }}>
          <TextField label="系統" name="system" value={form.system} onChange={handleChange} required />
          <TextField label="用戶名稱" name="username" value={form.username} onChange={handleChange} required />
          <TextField label="網站" name="website" value={form.website} onChange={handleChange} />
          <TextField label="密碼" name="password" value={form.password} onChange={handleChange} type="password" required />
          <TextField label="備註" name="remark" value={form.remark} onChange={handleChange} multiline />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={() => onSave(form, item && item.idx)}>儲存</Button>
      </DialogActions>
    </Dialog>
  );
}