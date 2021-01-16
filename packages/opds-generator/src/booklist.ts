interface IBookList {
  baseUrl: String;
  type: String;
  kind: String;
  title: String;
  updated: Date;
  books: IBook[];
}

export const root = ({
  baseUrl,
  type,
  kind,
  title,
  updated,
  books,
}: IBookList) => {
  return `
  <?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xmlns:dc="http://purl.org/dc/terms/"
      xmlns:opds="http://opds-spec.org/2010/catalog">
  <id>urn:uuid:433a5d6a-0b8c-4933-af65-4ca4f02763eb</id>

  <link rel="self"    
        href="${baseUrl}/${type}.xml"
        type="application/atom+xml;profile=opds-catalog;kind=${kind}"/>
  <link rel="start"  
        href="${baseUrl}/root.xml"
        type="application/atom+xml;profile=opds-catalog;kind=navigation"/>

  <title>${title}</title>
  <updated>${updated}</updated>
  <author>
    <name>Spec Writer</name>
    <uri>http://opds-spec.org</uri>
  </author> 

  ${books.map(item => book(item)).join('')}
</feed>
`.trim();
};

interface IBook {
  title: String;
  uuid: String;
  authors: IAuthor[];
  updated: Date;
  isbn: String;
  language: String;
  issued: Date;
  publisher: String;
  coverfilename: String;
  description: Date;
  coverFilename: String;
  files: IBookFile[];
  settings: Settings;
}

interface Settings {
  filePath: string;
  coverPath: string;
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
  isbn,
  language,
  publisher,
  coverfilename,
  issued,
  description,
  files,
  settings: { coverPath, filePath },
}: IBook) => {
  return `
      <entry>
      <title>${title}</title>
      <id>urn:uuid:${uuid}</id>
      ${authors
        .map(
          author => `
      <author>
        <name>${author.name}</name>
        <uri>http://opds-spec.org/authors/21285</uri>
      </author>
      `
        )
        .join('')}
      <updated>${updated}</updated>
      <dc:identifier>urn:isbn:${isbn}</dc:identifier>
      <dc:publisher>${publisher}</dc:publisher>
      <dc:language>${language}</dc:language>
      <dc:issued>${issued}</dc:issued>
      <content type="text">${description}</content>
      <link rel="http://opds-spec.org/image"    
            href="${coverPath}/${coverfilename}"
            type="image/jpeg"/>
        
      ${files.map(
        file => `
        <link rel="http://opds-spec.org/acquisition/buy"
              href="${filePath}/${file.filename}"
              type="${file.filetype}">
        </link>
        `
      )}
   </entry>
      `;
};
