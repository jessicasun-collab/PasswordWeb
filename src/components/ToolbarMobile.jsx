import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ToolbarMobile({
  onNew, onExport, onImport, onChangePassword, onLogout, setSearch
}) {
  return (
    <Paper sx={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
      display: "flex", flexDirection: "column", alignItems: "stretch", p: 1
    }} elevation={3}>
      <TextField
        placeholder="搜尋..."
        size="small"
        sx={{ mb: 1 }}
        onChange={e => setSearch(e.target.value)}
      />
      <BottomNavigation showLabels>
        <BottomNavigationAction label="新增" icon={<AddIcon />} onClick={onNew} />
        <BottomNavigationAction label="匯出" icon={<ImportExportIcon />} onClick={onExport} />
        <BottomNavigationAction label="匯入" icon={<ImportExportIcon />} onClick={onImport} />
        <BottomNavigationAction label="換密碼" icon={<LockResetIcon />} onClick={onChangePassword} />
        <BottomNavigationAction label="登出" icon={<LogoutIcon />} onClick={onLogout} />
      </BottomNavigation>
    </Paper>
  );
}