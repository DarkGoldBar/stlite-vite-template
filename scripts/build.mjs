import { build_files } from './build_functions.mjs';
import config from '../config.js';

const { backendDir } = config;

console.log(`backend_folder=${backendDir}`);

build_files(backendDir);