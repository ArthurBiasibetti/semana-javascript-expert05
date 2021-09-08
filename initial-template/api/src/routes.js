import { logger } from "./logger.js";
import FileHelper from "./fileHelper.js";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDownloadsFolder = resolve(__dirname, '../', "downloads");

export default class Routes {
  io
  constructor(downloadsFolder = defaultDownloadsFolder) {
    this.downloadsFolder = downloadsFolder;
    this.fileHelper = FileHelper;
  }

  setSocketInstance(io) {
    this.io = io;
  }

  async defaultRoute(req, res) {
    res.end('Hello World');
  }

  async options(req, res) {
    res.writeHead(204);
    res.end('Hello World');
  }

  async post(req, res) {
    logger.info('post');
    res.end();
  }

  async get(req, res) {
    const files = await this.fileHelper.getFilesStatus(this.downloadsFolder);
    res.writeHead(200);
    res.end(JSON.stringify(files));
  }

  handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const chosen = this[req.method.toLowerCase()] || this.defaultRoute;

    return chosen.apply(this, [req, res]);
  }
}