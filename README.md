🌐 Language:
[English](./README.md) | [中文](./README.zh-CN.md)

# stlite-vite-template

A technical template for building **Streamlit Web applications** using **stlite** and **Vite**.
Place your Streamlit source code inside the `backend` directory, then generate a browser‑ready build with a single command.

---

## Project Overview

This project separates Python application logic from the frontend build workflow:

* `backend/` — Streamlit Python source code
* Vite — Bundles the stlite Web runtime
* npm scripts — Provide development and production build workflows

This template is suitable for developers who want to convert existing Streamlit apps into static web deployments.

---

## Python Environment Setup

Install required dependencies:

```bash
pip install -r requirements.txt
```

* All Python libraries must be declared in this file. The web version downloads dependencies based on it during loading.
* The Streamlit version should match the one used by `stlite@browser`.

---

## Local Streamlit Development

Run the application using the standard Streamlit runtime:

```bash
streamlit run app.py
```

* The web build loads `app_async.py`. If you change the entry file, update both entry points to keep behavior consistent.

---

## Web Development Mode (Vite Dev Server)

Start the frontend development server:

```bash
npm run dev
```

* File update logic is applied when the server starts.
* After modifying Python files, restart the dev server.

---

## Production Build

Install Node.js dependencies and generate the web bundle:

```bash
npm install
npm run build
npm run preview
```

* `build`: Compile the stlite web application
* `preview`: Preview the production build locally
* Output directory defaults to `dist`

---

## Custom Python Code Directory

Modify the value in `config.js`:

```js
export default {
  backendDir: 'myPythonFolder',
}
```
