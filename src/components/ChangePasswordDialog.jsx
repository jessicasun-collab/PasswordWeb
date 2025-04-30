import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";
import { loadConfig, saveConfig, hashPassword, generateSalt } from "../utils/config";
import { loadPasswords, savePasswords } from "../utils/storage";

export default function ChangePasswordDialog({ open, onClose, oldPassword, setSnackbar }) {
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [error, setError] = useState("");

  const handleChange = () => {
    if (!newPw || newPw.length < 6) {
      setError("主密碼至少 6 碼");
      return;
    }
    if (newPw !== newPw2) {
      setError("兩次密碼不一致");
      return;
    }
    // 重新加密所有密碼
    const all = loadPasswords(oldPassword);
    savePasswords(all, newPw);
    // 更新 config
    const cfg = loadConfig();
    const salt = generateSalt();
    cfg.masterPasswordHash = hashPassword(newPw, salt);
    cfg.saltForHash = salt;
    saveConfig(cfg);
    setSnackbar("主密碼已變更，下次請用新密碼登入");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>變更主密碼</DialogTitle>
      <DialogContent>
        <TextField
          label="新主密碼"
          type="password"
          fullWidth
          value={newPw}
          onChange={e => setNewPw(e.target.value)}
          sx={{ mt: 1 }}
        />
        <TextField
          label="再次輸入"
          type="password"
          fullWidth
          value={newPw2}
          onChange={e => setNewPw2(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Typography variant="caption" color="text.secondary">
          忘記密碼無法找回，請牢記！
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={handleChange}>儲存</Button>
      </DialogActions>
    </Dialog>
  );
}