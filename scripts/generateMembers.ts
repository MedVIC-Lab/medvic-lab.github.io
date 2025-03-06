import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { Member } from './types';

// for whatever reason, the web icon must be imported as a string
const WEB_SVG_STRING = '<?xml version="1.0" encoding="iso-8859-1"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M256,0C114.62,0,0,114.62,0,256s114.62,256,256,256s256-114.62,256-256S397.38,0,256,0z M172.211,41.609c-24.934,27.119-44.68,66.125-56.755,111.992H49.749C75.179,102.741,118.869,62.524,172.211,41.609z M25.6,256c0-26.999,5.077-52.727,13.662-76.8h70.494c-4.608,24.294-7.356,49.963-7.356,76.8s2.748,52.506,7.347,76.8H39.262C30.677,308.727,25.6,283,25.6,256z M49.749,358.4h65.707c12.083,45.867,31.821,84.872,56.755,111.991C118.869,449.476,75.179,409.259,49.749,358.4z M243.2,485.188c-43.81-8.252-81.877-58.24-101.359-126.788H243.2V485.188zM243.2,332.8H135.74c-4.924-24.166-7.74-49.997-7.74-76.8s2.816-52.634,7.74-76.8H243.2V332.8z M243.2,153.6H141.841C161.323,85.052,199.39,35.063,243.2,26.812V153.6z M462.251,153.6h-65.707c-12.083-45.867-31.821-84.873-56.755-111.992C393.131,62.524,436.821,102.741,462.251,153.6z M268.8,26.812c43.81,8.252,81.877,58.24,101.359,126.788H268.8V26.812zM268.8,179.2h107.46c4.924,24.166,7.74,49.997,7.74,76.8s-2.816,52.634-7.74,76.8H268.8V179.2z M268.8,485.188V358.4h101.359C350.677,426.948,312.61,476.937,268.8,485.188z M339.789,470.391c24.934-27.127,44.672-66.125,56.755-111.991h65.707C436.821,409.259,393.131,449.476,339.789,470.391z M402.244,332.8c4.608-24.294,7.356-49.963,7.356-76.8s-2.748-52.506-7.347-76.8h70.494c8.576,24.073,13.653,49.801,13.653,76.8c0,27-5.077,52.727-13.662,76.8H402.244z"/></g></g></svg>';

const generateMembersPlugin = (): Plugin => {
  return {
    name: 'generate-members',
    buildStart() {
      const peopleDir = path.join(__dirname, '../pages/people');
      const outputFilePath = path.join(__dirname, '../public/assets/members.json');

      const members: Array<Member> = [];

      fs.readdirSync(peopleDir).forEach(file => {
        const filePath = path.join(peopleDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = fm(fileContent);

        const links = (data.attributes.links || []).map((link: { icon?: string | {}; link?: string }) => {
          
          const retVal = {
            icon: link.icon || '',
            link: link.link || '',
          }

          if (link.icon === "website") {
            retVal.icon = {
              svg: WEB_SVG_STRING,
            }
            retVal['ariaLabel'] = "Personal Website"
          }

          return retVal;
        });

        members.push({
          avatar: `../assets/images/people/${data.attributes.avatar}` || '',
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