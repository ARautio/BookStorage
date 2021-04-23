import zipFile from 'node-stream-zip';
import { parseStringPromise } from 'xml2js';
import mime from 'mime-types';

import * as utils from './utils';
import { MetadataProps } from '../types/index';

class EPub {
  filepath: string;
  metadata: MetadataProps | undefined;
  cover: any;

  constructor(filepath: string) {
    this.filepath = filepath;
    this.metadata = undefined;
    this.cover = null;
  }

  async load() {
    const zip = new zipFile.async({ file: this.filepath });
    const file = await zip.entryData('OEBPS/content.opf');
    const data = await parseStringPromise(file.toString());
    this.metadata = utils.parseMeta(data);
  }

  async getCover() {
    if (this.metadata === undefined) {
      throw Error('Load file data first');
    }
    if (this.metadata.coverPath === undefined) {
      throw Error('This book doesnt have cover');
    }
    const zip = new zipFile.async({ file: this.filepath });
    const file = await zip.entryData(`OEBPS/${this.metadata.coverPath}`);
    return { file, mimetype: mime.lookup(this.metadata.coverPath) };
  }
}

export default EPub;
