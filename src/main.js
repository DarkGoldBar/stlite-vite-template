import requirements_txt from '../requirements.txt?raw'
import app_py from '../app_async.py?raw'
import files from '../dist/files.json'

import { mount } from 'https://cdn.jsdelivr.net/npm/@stlite/browser/build/stlite.min.js'
const cssUrl = 'https://cdn.jsdelivr.net/npm/@stlite/browser/build/stlite.min.css'

const requirements = requirements_txt
  .split(/\r?\n/)
  .map(s => s.replace(/\s#.*$/, '').trim())
  .filter(Boolean)

files['app.py'] = app_py

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = cssUrl;
document.head.appendChild(link);

mount(
  {
    requirements: requirements,
    entrypoint: "app.py",
    files: files,
    streamlitConfig: {
      "global.disableWidgetStateDuplicationWarning": true,
      "server.fileWatcherType": "none",  // workaround: https://github.com/whitphx/stlite/issues/1493
      "server.websocketPingInterval": 60,
      "server.disconnectedSessionTTL": 180,
    }
  },
  document.getElementById("app")
);
