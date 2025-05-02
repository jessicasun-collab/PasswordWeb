const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      password: "",
      authed: false,
      error: "",
      data: [],
      search: "",
      showAdd: false,
      showEdit: false,
      editIdx: null,
      editItem: { system: "", username: "", website: "", password: "", remark: "" },
      showPassword: false // 控制密碼顯示狀態
    };
  },
  computed: {
    filtered() {
      const k = this.search.trim().toLowerCase();
      if (!k) return this.data;
      return this.data.filter(item =>
        (item.system || "").toLowerCase().includes(k) ||
        (item.username || "").toLowerCase().includes(k) ||
        (item.website || "").toLowerCase().includes(k) ||
        (item.remark || "").toLowerCase().includes(k)
      );
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.error = "";
      if (!this.password) return;
      let r = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: this.password })
      });
      let d = await r.json();
      if (d.ok) {
        this.authed = true;
        this.load();
      } else {
        this.error = "主密碼錯誤或無資料檔";
      }
    },
    async load() {
      let r = await fetch("/api/load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: this.password })
      });
      let d = await r.json();
      if (d.ok) this.data = d.data;
      else this.data = [];
    },
    async saveAll() {
      let r = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: this.password, data: this.data })
      });
      let d = await r.json();
      if (d.ok) alert("儲存完成！");
      else alert("儲存失敗: " + d.error);
    },
    copyToClipboard(pw) {
      navigator.clipboard.writeText(pw);
      alert("已複製密碼");
    },
    showModal(item, idx) {
      this.showEdit = true;
      this.editIdx = idx;
      this.editItem = { ...item };
    },
    edit(idx) {
      this.showModal(this.data[idx], idx);
    },
    update() {
      if (this.editIdx == null) return;
      this.data[this.editIdx] = { ...this.editItem };
      this.showEdit = false;
      this.saveAll();
    },
    remove(idx) {
      if (!confirm("確定要刪除？")) return;
      this.data.splice(idx, 1);
      this.saveAll();
    },
    add() {
      this.data.push({ ...this.editItem });
      this.showAdd = false;
      this.saveAll();
    },
    closeModal() {
      this.showEdit = false;
      this.showAdd = false;
      this.editIdx = null;
      this.editItem = { system: "", username: "", website: "", password: "", remark: "" };
    },
    logout() {
      this.password = "";
      this.authed = false;
      this.data = [];
    },
    exportData() {
      const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "passwords.json";
      a.click();
    },
    importData() {
      this.$refs.importer.click();
    },
    onFileImport(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = evt => {
        try {
          const arr = JSON.parse(evt.target.result);
          if (Array.isArray(arr)) {
            if (confirm("匯入會覆蓋現有資料，確定？")) {
              this.data = arr;
              this.saveAll();
            }
          } else {
            alert("格式不正確");
          }
        } catch {
          alert("格式不正確");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    }
  }
}).mount("#app");