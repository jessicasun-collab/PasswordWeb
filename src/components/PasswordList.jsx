import React from "react";
import { Card, CardContent, Typography, IconButton, Box, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function PasswordList({ passwords, search, onEdit, onDelete }) {
  const [showPwIdx, setShowPwIdx] = useState(-1);
  const filtered = passwords.filter(item =>
    Object.values(item).some(
      val => val && val.toLowerCase().includes((search || "").toLowerCase())
    )
  );

  return (
    <Box sx={{ mt: 2 }}>
      {filtered.map((item, idx) => (
        <Card key={idx} sx={{ mb: 2 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{item.system}</Typography>
              <Box>
                <IconButton size="small" onClick={() => onEdit(item, idx)}><EditIcon /></IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete(idx)}><DeleteIcon /></IconButton>
              </Box>
            </Stack>
            <Typography variant="body2">用戶名稱：{item.username}</Typography>
            <Typography variant="body2">網站：{item.website}</Typography>
            <Stack direction="row" alignItems="center">
              <Typography variant="body2" sx={{ flex: 1 }}>
                密碼：{showPwIdx === idx ? item.password : "●●●●●●"}
              </Typography>
              <IconButton size="small" onClick={() => setShowPwIdx(showPwIdx === idx ? -1 : idx)}>
                <ContentCopyIcon sx={{ opacity: 0 }} />
                <span style={{ fontSize: 18 }}>{showPwIdx === idx ? "🙈" : "👁️"}</span>
              </IconButton>
              <IconButton size="small" onClick={() => { navigator.clipboard.writeText(item.password || ""); }}>
                <ContentCopyIcon />
              </IconButton>
            </Stack>
            <Typography variant="body2">備註：{item.remark}</Typography>
          </CardContent>
        </Card>
      ))}
      <Typography variant="caption" color="text.secondary">
        共 {filtered.length} 筆
      </Typography>
    </Box>
  );
}