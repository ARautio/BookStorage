import { MetadataProps } from '../types/index';

/**
 * Parse author from authors field
 * @param authors author list
 * @returns Authors
 */
const parseAuthor = (authors: any): string[] => {
  const authorString = authors[0]._;
  return authorString.split(',').map((author: string) => author.trim());
};

/**
 * Parse date
 * @param dates
 * @returns creation date
 */
const parseDate = (dates: any[]): Date | undefined => {
  const date = dates[0] ? dates[0] : undefined;
  if (typeof date === 'object') {
    return new Date(date._);
  }
  return date !== undefined ? new Date(date) : undefined;
};

/**
 * Parse ISBN number
 * @param identifiers All identifiers
 * @returns isbn number string
 */
const parseISBN = (identifiers: any): string | undefined => {
  const isbnIdent = identifiers.find(
    (ident: any) => ident['$']['opf:scheme'] === 'ISBN'
  );
  return isbnIdent?._;
};

/**
 * Cover path
 * @param meta metadata
 * @param manifest manifest
 * @returns cover path
 */
const parseCoverPath = (meta: any, manifest: any): string | undefined => {
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

/**
 * Parses metadata
 * @param metadata metadata from the
 * @returns Structured metadata
 */
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
