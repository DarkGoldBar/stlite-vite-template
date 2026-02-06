🌐 Language:
[English](./README.md) | [中文](./README.zh-CN.md)

# stlite-vite-template

A specialized template designed to integrate **stlite** with **Vite** for building **Streamlit-driven Web Applications**.

* **Seamless Transformation**: Port existing Streamlit projects to an stlite-based Web version with simple build commands.
* **Vite Integration**: Leverages Vite’s asset-loading mechanisms to support **Hot Module Replacement (HMR)**—updating `.py` files will trigger instant UI refreshes during development.

## Project Overview

**Note**: All mandatory Python dependencies must be manually listed in the `requirements.txt` file for correct resolution by the stlite runtime.

### Directory Structure (`src/`)

* `backend/`: The core directory for your Streamlit project logic.
* `assets/`: Resource directory for static files (images, data, etc.) utilized by the Streamlit app.
* `app.py`: The standard entry point for local execution (via `streamlit run`).
* `app_async.py`: A Top-Level Await (TLA) compatible version of `app.py`.
* `main.js`: The primary build script. If you modify the naming or location of the `backend` or `assets` directories, ensure the loading logic here is updated accordingly.

## Production Build

Install Node.js dependencies and generate the production-ready Web bundle:

```bash
npm install
npm run build
npm run preview
```

* **`build`**: Compiles the stlite Web application into static assets.
* **`preview`**: Serves the build output locally for verification.
* **Output**: The default production bundle is generated in the `dist/` directory.

## Development

### Environment Setup

Install the necessary Python and Node.js dependencies:

```bash
pip install -r requirements.txt
npm install
```

### Local Streamlit Development

Launch the application using the standard Streamlit runtime for debugging:

```bash
streamlit run src/app.py
```

### Local Web Development Mode

Launch the Vite development server to preview the stlite/Wasm implementation:

```bash
npm run dev
```