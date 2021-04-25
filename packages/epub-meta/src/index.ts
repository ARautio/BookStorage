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
    const filename = Object.keys(await zip.entries()).find(name =>
      name.includes('opf')
    );
    if (filename !== undefined) {
      const file = await zip.entryData(filename);
      const data = await parseStringPromise(file.toString());
      this.metadata = utils.parseMeta(data);
    } else {
      throw Error(`Metadata file couldnt be found for file ${this.filepath}`);
    }
  }

  async getCover() {
    if (this.metadata === undefined) {
      throw Error(`Load file data first for file ${this.filepath}`);
    }
    if (this.metadata.coverPath === undefined) {
      throw Error(`${this.filepath} doesnt have a cover`);
    }
    const zip = new zipFile.async({ file: this.filepath });
    try {
      const filename = Object.keys(await zip.entries()).find(name =>
        name.includes(this.metadata?.coverPath || '')
      );
      if (filename !== undefined) {
        const file = await zip.entryData(filename);
        return { file, mimetype: mime.lookup(this.metadata.coverPath) };
      } else {
        throw Error(`Book cover file couldnt be found for ${this.filepath}`);
      }
    } catch (e) {
      throw Error(`Book cover file couldnt be found for ${this.filepath}`);
    }
  }
}

export default EPub;
