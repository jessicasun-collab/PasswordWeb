import React, { useState } from "react";
function Login({ onLogin, error }) {
  const [pw, setPw] = useState("");
  return (
    <div className="login-box">
      <h2>請輸入主密碼</h2>
      <input
        type="password"
        placeholder="主密碼"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      <button onClick={() => onLogin(pw)}>登入</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
export default Login;