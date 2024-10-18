import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { Plugin } from 'vite';

const generateProjectsPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-generate-projects',
    buildStart() {
      const projectsDir = path.join(__dirname, '../pages/projects');
      const outputFilePath = path.join(__dirname, '../public/assets/projects.json');

      const projects: Array<{ name: string; organizations: string; grantLink?: string; ongoing: boolean; link: string; image: string }> = [];

      fs.readdirSync(projectsDir).forEach(file => {
        const filePath = path.join(projectsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = fm(fileContent);

        const orgs = data.attributes.organizations.map((org: { name: string; link: string }) => ({
          name: org.name || '',
          link: org.link || ''
        }));

        projects.push({
          name: data.attributes.name || '',
          organizations: orgs,
          grantLink: data.attributes.grantLink || '',
          ongoing: data.attributes.ongoing || false,
          link: `/pages/projects/${file.replace('.md', '')}`,
          image: data.attributes.image || ''
        });
      });

      fs.writeFileSync(outputFilePath, JSON.stringify(projects, null, 2));
      console.log('Projects list generated successfully.');
    }
  };
};

export default generateProjectsPlugin;