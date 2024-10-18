import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { Plugin } from 'vite';

const generatePublicationsPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-generate-publications',
    buildStart() {
      const publicationsDir = path.join(__dirname, '../pages/publications');
      const outputFilePath = path.join(__dirname, '../public/assets/publications.json');

      const publications: Array<{ title: string; authors: string; conference: string; year: string; link: string; image: string }> = [];

      fs.readdirSync(publicationsDir).forEach(file => {
        const filePath = path.join(publicationsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = fm(fileContent);

        publications.push({
          title: data.attributes.title || '',
          authors: data.attributes.authors || '',
          conference: data.attributes.conference || '',
          year: data.attributes.year || '',
          link: data.attributes.link || `/pages/publications/${file.replace('.md', '')}`,
          image: data.attributes.image || ''
        });
      });

      fs.writeFileSync(outputFilePath, JSON.stringify(publications, null, 2));
      console.log('Publications list generated successfully.');
    }
  };
};

export default generatePublicationsPlugin;