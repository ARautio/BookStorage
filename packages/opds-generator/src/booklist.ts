interface Settings {
  name: String;
  bookPath: String;
  coverPath: String;
}

interface IBookList {
  id: String;
  baseUrl: String;
  url: String;
  title: String;
  updated: Date;
  books: IBook[];
}

export const root = ({
  id,
  baseUrl,
  url,
  title,
  updated,
  books,
}: IBookList) => {
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom"
      xmlns:dc="http://purl.org/dc/terms/"
      xmlns:opds="http://opds-spec.org/2010/catalog">
  <id>${id}</id>

  <title>${title}</title>
  <updated>${updated}</updated>
  <author>
    <name>ODPS Generator</name>
    <uri>https://github.com/ARautio/BookStorage/tree/main/packages/opds-generator</uri>
  </author>

  <link rel="self"    
    href="${baseUrl}/${url}.xml"
    type="application/atom+xml;profile=opds-catalog;kind=navigation"/>
  <link rel="start"  
    href="${baseUrl}"
    type="application/atom+xml;profile=opds-catalog;kind=navigation"/>

  ${books.map(item => book(item)).join('')}
</feed>
`.trim();
};

interface IBook {
  title: String;
  uuid: String;
  authors: IAuthor[];
  updated: Date;
  coverfilename: String;
  description: Date;
  coverFilename: String;
  files: IBookFile[];
  settings: Settings;
}

interface IAuthor {
  name: String;
}

interface IBookFile {
  filename: String;
  filetype: String;
}

const book = ({
  title,
  uuid,
  authors,
  updated,
  coverfilename,
  description,
  files,
  settings: { coverPath, bookPath },
}: IBook) => {
  return `
      <entry>
      <title>${title}</title>
      <id>book:${uuid}</id>
      ${authors
        .map(
          author => `
      <author>
        <name>${author.name}</name>
      </author>
      `
        )
        .join('')}
      <updated>${updated}</updated>
      <content type="text">${description}</content>
      <link rel="http://opds-spec.org/image"    
            href="${coverPath}/${coverfilename}"
            type="image/jpeg"/>
      <link rel="http://opds-spec.org/image/thumbnail"    
            href="${coverPath}/${coverfilename}"
            type="image/jpeg"/>       
      ${files.map(
        file => `
        <link rel="http://opds-spec.org/acquisition"
              href="${bookPath}/${file.filename}"
              type="${file.filetype}">
        </link>
        `
      )}
   </entry>
      `;
};
