import { MetadataProps } from '../types/index';

/**
 * Get string from either string or object
 * @param value either string or object
 * @returns string
 */
const getString = (value: { _: string } | string | undefined) => {
  return typeof value === 'string' ? value : value?._;
};

/**
 * Parse title
 * @param title title xml
 * @returns title of the book
 */
const parseTitle = (title: any): string | undefined => {
  const singleTitle = Array.isArray(title) ? title[0] : title;
  return getString(singleTitle);
};

/**
 * Parse author from authors field
 * @param authors author list
 * @returns Authors
 */
const parseAuthor = (authors: any): string[] => {
  const author = Array.isArray(authors) ? authors[0] : authors;
  const authorString = getString(author);
  return authorString !== undefined
    ? authorString.split(',').map((author: string) => author.trim())
    : [];
};

/**
 * Parse date
 * @param dates
 * @returns creation date
 */
const parseDate = (dates: any[] = []): Date | undefined => {
  const date = !!dates[0] ? dates[0] : undefined;
  const dateString = getString(date);
  return dateString !== undefined ? new Date(dateString) : undefined;
};

/**
 * Parse ISBN number
 * @param identifiers All identifiers
 * @returns isbn number string
 */
const parseISBN = (identifiers: any): string | undefined => {
  try {
    const isbnIdent = identifiers.find((ident: any) => {
      const identifier = getString(ident);
      if (typeof ident === 'string') {
        return identifier?.includes('ISBN');
      }
      return ident['$']['opf:scheme'] === 'ISBN';
    });
    return getString(isbnIdent);
  } catch (e) {
    throw Error(`Couldnt parse ISBN from ${identifiers.toString()}`);
  }
};

/**
 * Cover path
 * @param meta metadata
 * @param manifest manifest
 * @returns cover path
 */
const parseCoverPath = (
  meta: any = [],
  manifest: any = [],
  rest?: any
): string | undefined => {
  const coverMetaName = meta.find(
    (metaItem: any) => metaItem?.$?.name === 'cover'
  );
  if (coverMetaName === undefined) {
    return undefined;
  }
  const coverItem = manifest.find((item: any) => {
    return (
      item?.$?.id === coverMetaName?.$?.content ||
      item?.$?.href === coverMetaName?.$?.content
    );
  });
  if (coverItem !== undefined) {
    return coverItem?.$?.href;
  } else {
    const backupCoverItem = manifest.find((item: any) => {
      return item?.$?.id?.includes('cover') || item?.$?.href?.includes('cover');
    });
    if (backupCoverItem === undefined) {
      console.log(rest);
    }
    return backupCoverItem?.$?.href;
  }
};

/**
 * Get manigest
 * @param manifest Manifest object
 * @returns manifest list array
 */
const getManifest = (manifest: any = {}): object[] => {
  const manifestKey = Object.keys(manifest).find(item => item.includes('item'));
  return !!manifestKey ? manifest[manifestKey] : [];
};

/**
 * Parses metadata
 * @param metadata metadata from the
 * @returns Structured metadata
 */
export const parseMeta = (metadata: any): MetadataProps => {
  const data = metadata?.package?.metadata[0];
  const manifest = getManifest(metadata?.package?.manifest[0]);
  return {
    title: parseTitle(data['dc:title']),
    author: parseAuthor(data['dc:creator']),
    date: parseDate(data['dc:date']),
    isbn: parseISBN(data['dc:identifier']),
    coverPath: parseCoverPath(data.meta, manifest),
  };
};
