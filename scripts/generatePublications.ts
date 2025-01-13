import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { Plugin } from 'vite';

type Publication = {
  title: string;
  authors: string;
  conference: string;
  year: string;
  image: string;
  link: string; // local file link
  links: {
    code?: string;
    publisher?: string;
    video?: string;
    pdf?: string;
    archive?: string;
  };
};

const generatePublicationsPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-generate-publications',
    buildStart() {
      const publicationsDir = path.join(__dirname, '../pages/publications');
      const outputFilePath = path.join(__dirname, '../public/assets/publications.json');

      const publications: Publication[] = [];

      fs.readdirSync(publicationsDir).forEach(file => {
        const filePath = path.join(publicationsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = fm(fileContent);

        publications.push({
          title: data.attributes.title || '',
          authors: data.attributes.authors || '',
          conference: data.attributes.conference || '',
          year: data.attributes.year || '',
          link: `/pages/publications/${file.replace('.md', '')}`,
          links: {
            code: data.attributes.links.code || '',
            publisher: data.attributes.links.publisher || '',
            video: data.attributes.links.video || '',
            pdf: data.attributes.links.pdf || '',
            archive: data.attributes.links.archive || ''
          },
          image: data.attributes.image || ''
        });
      });

      fs.writeFileSync(outputFilePath, JSON.stringify(publications, null, 2));
      console.log('Publications list generated successfully.');
    }
  };
};

export default generatePublicationsPlugin;