/**
 * Load the latest @stlite/browser distribution from CDN.
 * Note: Ensure compatibility between the @stlite version and the target Streamlit release.
 */
import { mount } from 'https://cdn.jsdelivr.net/npm/@stlite/browser/build/stlite.min.js'
const cssUrl = 'https://cdn.jsdelivr.net/npm/@stlite/browser/build/stlite.min.css'
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = cssUrl;
document.head.appendChild(link);

/**
 * Bulk import Python backend modules.
 * Glob pattern targets all .py files in the ./backend directory.
 */
const pythonModules = import.meta.glob("./backend/**/*.py", {
  query: "?raw",
  import: "default",
  eager: true,
});

/**
 * Load static assets and resource files utilized by the Python environment.
 */
const assetsModules = import.meta.glob('./assets/**/*', { 
  query: '?url',
  import: 'default',
  eager: true,  
});

/**
 * Map asset paths to the Virtual File System (VFS).
 * Normalizes paths to align stlite's runtime environment with standard Streamlit execution.
 */
const assetsMap = Object.entries(assetsModules).reduce((acc, [path, url]) => {
  const key = 'src/' + path.replace(/^\.\//, '');
  acc[key] = { url: url };
  return acc;
}, {});

const files = { ...pythonModules, ...assetsMap }

/**
 * Entry point configuration for Top-Level Await enabled versions.
 */
import app_py from './app_async.py?raw'
files['app.py'] = app_py

/**
 * Parse requirements.txt to resolve Python dependencies.
 */
import requirements_txt from '../requirements.txt?raw'
const requirements = requirements_txt
  .split(/\r?\n/)
  .map(s => s.replace(/\s#.*$/, '').trim())
  .filter(Boolean)

/**
 * Initialize and mount the stlite application.
 */
mount(
  {
    requirements: requirements,
    entrypoint: "app.py",
    files: files,
    streamlitConfig: {
      "global.disableWidgetStateDuplicationWarning": true,
      "server.fileWatcherType": "none",  // Workaround: https://github.com/whitphx/stlite/issues/1493
      "server.websocketPingInterval": 60,
      "server.disconnectedSessionTTL": 180,
    }
  },
  document.getElementById("app")
);