interface Settings {
  name: String;
  bookPath: String;
  coverPath: String;
}

interface IRoot {
  baseDir: String;
  updated: Date;
  options: IRootEntry[];
  settings: Settings;
}

export const root = ({
  baseDir = '/opds-catalog',
  updated,
  options,
  settings: { name },
}: IRoot) => {
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <id>OPDSRoot</id>
    <link rel="self"  
          href="${baseDir}/root.xml"
          type="application/atom+xml;profile=opds-catalog;kind=navigation"/>
    <link rel="start"
          href="${baseDir}/root.xml"
          type="application/atom+xml;profile=opds-catalog;kind=navigation"/>
    <title>${name}</title>
    <updated>${updated}</updated>
    <author>
      <name>ODPS Generator</name>
      <uri>https://github.com/ARautio/BookStorage/tree/main/packages/opds-generator</uri>
    </author>
    ${options.map(item => rootEntry(item)).join('\n')}
  </feed>
  `.trim();
};

interface IRootEntry {
  id: String;
  title: String;
  type: String;
  link: String;
  updated: Date;
  description: String;
}

export const rootEntry = ({
  id,
  title,
  type,
  link,
  updated,
  description,
}: IRootEntry) => {
  return `
  <entry>
    <title>${title}</title>
    <id>${id}</id>
    <link rel="${type}"
          href="${link}"
          type="application/atom+xml;profile=opds-catalog;kind=acquisition"/>
    <updated>${updated}</updated>
    <content type="text">${description}</content>
  </entry>
  `;
};
