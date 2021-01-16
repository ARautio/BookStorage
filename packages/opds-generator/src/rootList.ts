interface IRoot {
  baseDir: String;
  updated: Date;
}

export const root = ({ baseDir = '/opds-catalog', updated }: IRoot) => {
  const rootList: [IRootEntry] = [
    {
      title: 'Popular books',
      type: 'http://opds-spec.org/sort/popular',
      link: `${baseDir}/popular.xml`,
      updated: new Date(),
      description: 'Yeah popular',
    },
  ];

  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <id>urn:uuid:2853dacf-ed79-42f5-8e8a-a7bb3d1ae6a2</id>
    <link rel="self"  
          href="${baseDir}/root.xml"
          type="application/atom+xml;profile=opds-catalog;kind=navigation"/>
    <link rel="start"
          href="${baseDir}/root.xml"
          type="application/atom+xml;profile=opds-catalog;kind=navigation"/>
    <title>OPDS Catalog Root Example</title>
    <updated>${updated}</updated>
    <author>
      <name>Spec Writer</name>
      <uri>http://opds-spec.org</uri>
    </author>
    ${rootList.join('\n')}
  </feed>
  `;
};

interface IRootEntry {
  title: String;
  type: String;
  link: String;
  updated: Date;
  description: String;
}

export const rootEntry = ({
  title,
  type,
  link,
  updated,
  description,
}: IRootEntry) => {
  return `
  <entry>
    <title>${title}</title>
    <link rel=${type}
          href=${link}
          type="application/atom+xml;profile=opds-catalog;kind=acquisition"/>
    <updated>${updated}</updated>
    <id>urn:uuid:d49e8018-a0e0-499e-9423-7c175fa0c56e</id>
    <content type="text">${description}</content>
  </entry>
  `;
};
