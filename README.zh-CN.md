🌐 Language:
[English](./README.md) | [中文](./README.zh-CN.md)

# stlite-vite-template

一个用于结合 **stlite** 与 **Vite** 构建 **Streamlit Web 应用** 的模板。
- 简单的构建命令将原有streamlit项目移动到基于Stlite的Web版本。
- 使用Vite的import加载所有文件，更新.py文件可以触发HMR。

## 项目概览

`requirements.txt`文件中必须手动记录运行必须的python包

`src`目录文件用途
- `backend`: streamlit项目目录
- `assets`: streamlit项目的资源目录
- `app.py`: 执行`streamlit run`的入口文件
- `app_async.py`: `app.py`对应的Top Level Async版本。
- `main.js`: 主要构建脚本，如果需要修改backend或者assets目录，需要修改对应的加载项。

## 生产构建

安装 Node.js 依赖并生成 Web 打包产物：

```bash
npm install
npm run build
npm run preview
```

- `build`命令：编译 stlite Web 应用
- `preview`命令：在本地预览构建结果
- 默认产物为`dist`目录


## 开发

安装所需依赖：

```bash
pip install -r requirements.txt
npm install
```

### 本地 Streamlit 开发
使用标准 Streamlit 运行时启动应用：

```bash
streamlit run src/app.py
```

### 本地 Web 开发模式

启动前端开发服务器：

```bash
npm run dev
```