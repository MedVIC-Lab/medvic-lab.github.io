import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import fm, { FrontMatterResult } from 'front-matter';

const generateMembersPlugin = (): Plugin => {
  return {
    name: 'generate-members',
    buildStart() {
      const peopleDir = path.join(__dirname, '../pages/people');
      const outputFilePath = path.join(__dirname, '../public/assets/members.json');

      const members: Array<{ avatar: string; name: string; title: string; links: Array<{ icon: string; link: string }>; bio: string; link: string }> = [];

      fs.readdirSync(peopleDir).forEach(file => {
        const filePath = path.join(peopleDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = fm(fileContent);

        const links = (data.attributes.links || []).map((link: { icon?: string; link?: string }) => ({
          icon: link.icon || '',
          link: link.link || ''
        }));

        members.push({
          avatar: data.attributes.avatar || '',
          name: data.attributes.name || '',
          title: data.attributes.title || '',
          bio: data.attributes.bio || '',
          role: data.attributes.role || '',
          links,
          link: `/pages/people/${file.replace('.md', '')}`
        });
      });

      fs.writeFileSync(outputFilePath, JSON.stringify(members, null, 2));
      console.log('Members list generated successfully.');
    }
  };
};

export default generateMembersPlugin;