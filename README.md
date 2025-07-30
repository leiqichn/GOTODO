# GOTODO

> 四象限法 TODO 管理 Chrome 插件  
> Eisenhower Matrix TODO Chrome Extension

---

## 项目简介 | Introduction

GOTODO 是一个基于四象限法（重要紧急矩阵/Eisenhower Matrix）的 TODO 管理 Chrome 插件，帮助你高效管理任务，聚焦真正重要的事情。支持任务添加、优先级分类、象限视图、日视图、任务排序等功能。

GOTODO is a Chrome extension for managing your tasks using the Eisenhower Matrix (Important/Urgent Quadrant). It helps you focus on what really matters. Features include task add/edit, priority classification, quadrant view, day view, and task sorting.

---

## 主要功能 | Features

- 添加 TODO（名称、描述、优先级、截止时间）
- 四象限法分类（重要紧急、重要不紧急、紧急不重要、不重要不紧急）
- 总览模式（列表）与日模式（象限图）切换
- TODO 项上下移动排序
- 本地持久化存储（无需账号）
- 简洁美观的界面

---

## 安装与使用 | Installation & Usage

1. **打包构建**
   ```bash
   npm install
   npm run build
   ```
2. **加载插件**
   - 打开 Chrome，访问 `chrome://extensions/`
   - 开启“开发者模式”
   - 点击“加载已解压的扩展程序”，选择 `dist` 目录
   - 完成！点击 GOTODO 图标即可使用

---

## 开发与构建 | Development & Build

- 开发预览：
  ```bash
  npm run dev
  # 访问 http://localhost:5173 预览页面
  ```
- 构建打包：
  ```bash
  npm run build
  # 生成 dist 目录，供 Chrome 加载
  ```

---

## 技术栈 | Tech Stack

- React 18
- TypeScript
- Vite 4
- Chrome Extension Manifest V3

---

## 目录结构 | Directory Structure

```
GOTODO/
├─ public/           # 静态资源（如 icon.png）
├─ src/              # 源码
│  ├─ components/    # 组件
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ storage.ts
│  └─ types.ts
├─ manifest.json     # 插件清单
├─ index.html        # 入口页面
├─ package.json
├─ vite.config.ts
└─ README.md
```

---

## 贡献 | Contributing

欢迎 PR 和 Issue！如有建议或 bug，欢迎提交。

Pull requests and issues are welcome!

---

## 许可证 | License

[MIT License](./LICENSE) 