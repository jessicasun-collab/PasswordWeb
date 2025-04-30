import React, { useState } from "react";
function PasswordTable({ passwords, setPasswords, onSave }) {
  const [editing, setEditing] = useState(null);
  const [entry, setEntry] = useState({ system: "", username: "", website: "", password: "", remark: "" });
  const handleEdit = idx => {
    setEditing(idx);
    setEntry(passwords[idx]);
  };
  const handleSaveEdit = () => {
    const newPwds = passwords.slice();
    newPwds[editing] = entry;
    setPasswords(newPwds);
    onSave(newPwds);
    setEditing(null);
  };
  const handleAdd = () => {
    setPasswords([...passwords, entry]);
    onSave([...passwords, entry]);
    setEntry({ system: "", username: "", website: "", password: "", remark: "" });
  };
  const handleDelete = idx => {
    const newPwds = passwords.slice();
    newPwds.splice(idx, 1);
    setPasswords(newPwds);
    onSave(newPwds);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>系統</th>
            <th>用戶名稱</th>
            <th>網站</th>
            <th>密碼</th>
            <th>備註</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((pwd, idx) => (
            editing === idx ? (
              <tr key={idx}>
                <td><input value={entry.system} onChange={e => setEntry({ ...entry, system: e.target.value })} /></td>
                <td><input value={entry.username} onChange={e => setEntry({ ...entry, username: e.target.value })} /></td>
                <td><input value={entry.website} onChange={e => setEntry({ ...entry, website: e.target.value })} /></td>
                <td><input value={entry.password} onChange={e => setEntry({ ...entry, password: e.target.value })} /></td>
                <td><input value={entry.remark} onChange={e => setEntry({ ...entry, remark: e.target.value })} /></td>
                <td>
                  <button onClick={handleSaveEdit}>儲存</button>
                  <button onClick={() => setEditing(null)}>取消</button>
                </td>
              </tr>
            ) : (
              <tr key={idx}>
                <td>{pwd.system}</td>
                <td>{pwd.username}</td>
                <td>{pwd.website}</td>
                <td>{pwd.password}</td>
                <td>{pwd.remark}</td>
                <td>
                  <button onClick={() => handleEdit(idx)}>編輯</button>
                  <button onClick={() => handleDelete(idx)}>刪除</button>
                </td>
              </tr>
            )
          ))}
          <tr>
            <td><input value={entry.system} onChange={e => setEntry({ ...entry, system: e.target.value })} /></td>
            <td><input value={entry.username} onChange={e => setEntry({ ...entry, username: e.target.value })} /></td>
            <td><input value={entry.website} onChange={e => setEntry({ ...entry, website: e.target.value })} /></td>
            <td><input value={entry.password} onChange={e => setEntry({ ...entry, password: e.target.value })} /></td>
            <td><input value={entry.remark} onChange={e => setEntry({ ...entry, remark: e.target.value })} /></td>
            <td>
              <button onClick={handleAdd}>新增</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default PasswordTable;