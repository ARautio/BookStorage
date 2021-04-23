import { MetadataProps } from './index';

const parseAuthor = (authors: any) => {
  const authorString = authors[0]._;
  return authorString.split(',').map((author: string) => author.trim());
};

const parseDate = (dates: any[]) => {
  const date = dates[0] ? dates[0] : undefined;
  if (typeof date === 'object') {
    return new Date(date._);
  }
  return date !== undefined ? new Date(date) : undefined;
};

const parseISBN = (identifiers: any) => {
  const isbnIdent = identifiers.find(
    (ident: any) => ident['$']['opf:scheme'] === 'ISBN'
  );
  return isbnIdent?._;
};

const parseCoverPath = (meta: any, manifest: any) => {
  const coverMetaName = meta.find(
    (metaItem: any) => metaItem['$']['name'] === 'cover'
  );
  const coverItem = manifest.find(
    (item: any) => item['$'].id === coverMetaName['$']['content']
  );
  if (coverItem !== undefined) {
    return coverItem['$'].href;
  }
  return undefined;
};

export const parseMeta = (metadata: any): MetadataProps => {
  const data = metadata?.package?.metadata[0];
  const manifest = metadata?.package?.manifest[0].item;
  return {
    title: data['dc:title'],
    author: parseAuthor(data['dc:creator']),
    date: parseDate(data['dc:date']),
    isbn: parseISBN(data['dc:identifier']),
    coverPath: parseCoverPath(data.meta, manifest),
  };
};

export const parseCover = (epub: any) => {
  return epub;
};
