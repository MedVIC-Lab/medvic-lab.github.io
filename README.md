# medvic-lab.github.io

MedVIC Lab website

## Development

Look at the [Content documentation](https://content.nuxt.com/) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

### Development Server

Start the development server on localhost:3000

```bash
yarn dev
```

### Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

## Contributing

You should make a branch on github for any changes. This should be merged into main using a pull request. If you are unfamiliar with this process, please reference the official [Github Documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

### Add Yourself

To add yourself to the MedVIC Lab website, follow these steps:

1. **Create a Markdown file:**
   - Navigate to the `pages/people` directory.
   - Create a new Markdown file named after yourself, e.g., `john-doe.md`.

2. **Add frontmatter to your Markdown file:**
   - Include the following frontmatter at the top of your file:

     ```markdown
     ---
     layout: person
     name: "Your Name"
     title: "Your Title" # e.g., "PhD Student", "MS Student", "Staff", "Researcher", "Alumni"
     bio: "A brief bio about yourself."
     avatar: "your-avatar.png" # Replace with the URL to your avatar image
     links:
       - icon: "github"
         link: "https://github.com/yourusername" # Replace with your GitHub profile link
       - icon: "twitter"
         link: "https://twitter.com/yourusername" # Replace with your Twitter profile link
       - icon: "website"
         link: "https://yourwebsite.com" # Replace with your personal website link
     ---
     ```

     Note: images should be added to `/public/assets/images/people/`

3. **Add content to your Markdown file:** (WORK IN PROGRESS)
   - Below the frontmatter, add any additional information about yourself, such as your research interests, publications, and projects.

     ```markdown
     # About Your Name

     Your research interests, publications, and projects.
     ```

4. **Commit and push your changes:**
   - Commit your new Markdown file to the repository and push your changes.

     ```bash
     git add pages/people/your-file.md
     git commit -m "Add profile for Your Name"
     git push origin [branch name]
     ```

5. **Generate the members list:**
   - Run the build command to generate the `members.json` file and build the VitePress site.

     ```bash
     yarn build
     ```

6. **Preview your changes:**
   - Locally preview the production build to ensure your profile appears correctly.

     ```bash
     yarn preview
     ```

### Add Publications

To add a publication to the MedVIC Lab website, follow these steps:

1. **Create a Markdown file:**
   - Navigate to the `pages/publications` directory.
   - Create a new Markdown file named after your publication, e.g., `example-publication.md`.

2. **Add frontmatter to your Markdown file:**
   - Include the following frontmatter at the top of your file:

     ```markdown
     ---
     title: "Publication Title"
     authors: "Author1, Author2"
     conference: "Conference Name"
     year: "Year"
     link: "https://example.com/publication-link" # Optional: Replace with the URL to the publication
     image:
       src: "example.png"
       alt: "Example Alt Text"
     ---
     ```

     Note: images should be added to `/public/assets/images/publications/`

3. **Add content to your Markdown file:** (WORK IN PROGRESS)
   - Below the frontmatter, add any additional information about the publication.

     ```markdown
     # Publication Title

     Abstract or additional information about the publication.
     ```

4. **Commit and push your changes:**
   - Commit your new Markdown file to the repository and push your changes.

     ```bash
     git add pages/publications/your-file.md
     git commit -m "Add publication: Publication Title"
     git push origin [branch name]
     ```

5. **Generate the publications list:**
   - Run the build command to generate the `publications.json` file and build the VitePress site.

     ```bash
     yarn build
     ```

6. **Preview your changes:**
   - Locally preview the production build to ensure your publication appears correctly.

     ```bash
     yarn preview
     ```

### Add Projects

To add a project to the MedVIC Lab website, follow these steps:

1. **Create a Markdown file:**
   - Navigate to the `pages/projects` directory.
   - Create a new Markdown file named after your project, e.g., `example-project.md`.

2. **Add frontmatter to your Markdown file:**
   - Include the following frontmatter at the top of your file:

     ```markdown
     ---
     layout: Project
     name: "Project Name"
     organizations:
       - name: "Organization1"
         link: "https://example.com/organization1" # Optional: Replace with the URL to the organization
       - name: "Organization2"
         link: "https://example.com/organization2" # Optional: Replace with the URL to the organization
     ongoing: true # Set to false if the project is not ongoing
     grantLink: "https://example.com/grant" # Optional: Replace with the URL to the grant
     image:
       src: "example.png"
       alt: "Example alt text"
     ---
     ```

     Note: images should be added to `/public/assets/images/projects/`

3. **Add content to your Markdown file:**
   - Below the frontmatter, add any additional information about the project.

     ```markdown
     ## subheading1 (ex: Project Goals)

     Lorem Ipsum blah blah...
     ```

     This supports (or should support) all markdown syntax.

4. **Commit and push your changes:**
   - Commit your new Markdown file to the repository and push your changes.

     ```bash
     git add pages/projects/your-file.md
     git commit -m "Add project: Project Name"
     git push origin [branch name]
     ```

5. **Generate the projects list:**
   - Run the build command to generate the `projects.json` file and build the VitePress site.

     ```bash
     yarn build
     ```

6. **Preview your changes:**
   - Locally preview the production build to ensure your project appears correctly.

     ```bash
     yarn preview
     ```

By following these steps, you can add yourself, publications, and projects to the MedVIC Lab website and ensure they are displayed correctly.
