import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './i18n';
import { Buffer } from "buffer";

// 將操作放在 import 語句之後
window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);