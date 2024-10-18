# medvic-lab.github.io

MedVIC Lab website

## Development

Look at the [Content documentation](https://content.nuxt.com/) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

### Development Server

Start the development server on localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Contributing

### Add yourself

To add yourself to the MedVIC Lab website, follow these steps:

1. **Create a Markdown file:**

   - Navigate to the `pages/people` directory.
   - Create a new Markdown file named after yourself, e.g., `elhabian.md`.

2. **Add frontmatter to your Markdown file:**

   - Include the following frontmatter at the top of your file:

     ```markdown
     ---
     layout: person
     name: "Your Name"
     title: "Your Title"
     role: one of: "PhD Student", "MS Student", "Staff", "Researcher", "Alumni"
     bio: "A brief bio about yourself."
     avatar: "https://example.com/your-avatar.png" # Replace with the Local/Global URL to your avatar image
     links:
       - icon: "github"
         link: "https://github.com/yourusername" # Replace with your GitHub profile link
       (possible icons: 'discord', 'facebook', 'github', 'instagram', 'linkedin', 'mastodon', 'npm', 'slack', 'twitter', 'x', 'youtube')
     ---
     ```

3. **Add content to your Markdown file:**

   - Below the frontmatter, add any additional information about yourself, such as your research interests, publications, and projects.

     ```markdown
     # About Your Name

     Your research interests, publications, and projects.
     ```

4. **Commit and push your changes:**

   - Create a new branch for your changes

     ```bash
     git switch -c [branch-name]
     ```

   - Commit your new Markdown file to the repository and push your changes.

     ```bash
     git add pages/people/your-file.md
     git commit -m "Add profile for Your Name"
     git push origin [branch-name]
     ```

5. **Generate the members list:**

   - Run the build command to generate the `members.json` file and build the VitePress site.

     ```bash
     yarn build
     ```

6. **Preview your changes:**
   - Locally preview the production build to ensure your profile appears correctly.
     ```bash
     npm run preview
     ```

By following these steps, you can add yourself to the MedVIC Lab website and ensure your profile is displayed correctly.
