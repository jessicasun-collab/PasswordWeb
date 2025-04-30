import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { loadConfig, saveConfig, hashPassword, generateSalt } from "../utils/config";

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showInit, setShowInit] = useState(false);
  const [initPw, setInitPw] = useState("");
  const [initPw2, setInitPw2] = useState("");

  const handleLogin = () => {
    const config = loadConfig();
    if (!config) {
      setError("請先初始化密碼管理器");
      setShowInit(true);
      return;
    }
    if (hashPassword(password, config.saltForHash) !== config.masterPasswordHash) {
      setError("主密碼錯誤");
      return;
    }
    onLogin({ password, config });
  };

  const handleInit = () => {
    if (!initPw || initPw.length < 6) {
      setError("請輸入至少 6 碼主密碼");
      return;
    }
    if (initPw !== initPw2) {
      setError("兩次密碼不一致");
      return;
    }
    const salt = generateSalt();
    const hash = hashPassword(initPw, salt);
    saveConfig({
      folder: "",
      dataFiles: ["main.enc"],
      masterPasswordHash: hash,
      saltForHash: salt
    });
    setShowInit(false);
    setPassword("");
    setError("");
    alert("初始化完成，請重新登入");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 3, width: 350 }}>
        <Typography variant="h5" gutterBottom>密碼管理 - 登入</Typography>
        <TextField
          label="主密碼"
          type="password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          autoFocus
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" fullWidth onClick={handleLogin}>登入</Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => setShowInit(true)}>初始化</Button>
      </Paper>

      <Dialog open={showInit} onClose={() => setShowInit(false)}>
        <DialogTitle>初始化密碼管理器</DialogTitle>
        <DialogContent>
          <TextField
            label="新主密碼"
            type="password"
            fullWidth
            sx={{ mt: 1 }}
            value={initPw}
            onChange={e => setInitPw(e.target.value)}
          />
          <TextField
            label="再次輸入主密碼"
            type="password"
            fullWidth
            sx={{ mt: 1 }}
            value={initPw2}
            onChange={e => setInitPw2(e.target.value)}
          />
          <Typography variant="caption" color="text.secondary">
            主密碼至少 6 碼，請牢記！忘記密碼無法找回。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInit(false)}>取消</Button>
          <Button onClick={handleInit}>初始化</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}