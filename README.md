# medvic-lab.github.io

MedVIC Lab website

## Development

Look at the official [VitePress documentation](https://vitepress.dev/) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

### Development Server

Start the development server on localhost:5173

```bash
yarn dev
```

### Production

Build the application for production:

```bash
yarn build
```

Locally preview production build: (port 4173)

```bash
yarn preview
```

## Contributing

You should make a branch on github for any changes. This should be merged into main using a pull request. If you are unfamiliar with this process, please reference the official [Github Documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

### Add Yourself

To add yourself to the MedVIC Lab website, follow these steps:

1. **Create a Markdown file:**
   - Navigate to the `pages/people` directory.
   - Create a new Markdown file named after yourself, e.g., `doe_john.md`.
     - Ensure that this is in the format: `lastname_firstname`.

2. **Add frontmatter to your Markdown file:**
   - Include the following frontmatter at the top of your file:

     ```markdown
     ---
     layout: person
     name: "Your Name"
     role: "PhD Student", "MS Student", "Staff", "Researcher", "Alumni"
     title: "Your Title"
     bio: "A brief bio about yourself."
     avatar: "lastname_firstname.png" # Replace with the URL to your avatar image
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
     Additional note: the image should be a SQUARE aspect ratio, or else it may appear warped.

     Please use the format lastname_firstname.md when creating your markdown file.

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

5. **Preview your changes:**
   - Locally preview the production build to ensure your profile appears correctly. You can also use `yarn dev` for active development.

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
     layout: publication
     title: "Publication Title"
     authors: "Author1, Author2"
     conference: "Conference Name"
     year: "Year"
     links:
      archive: "example.com" (optional)
      code: "example.com" (optional)
      publisher: "example.com" (optional)
      pdf: "example.com" (optional)
      video: "example.com" (optional)
     image:
       src: "example.png"
       alt: "Example Alt Text"
     ---
     ```

     Note: images should be added to `/public/assets/images/publications/`.
     Additional note: Images should be *graphical abstracts* and should not contain captions.

3. **Add content to your Markdown file:** (WORK IN PROGRESS)
   - Below the frontmatter, add any additional information about the publication.

    For example:
     ```markdown
     # Paper title

     ## Abstract

     Blah Blah this is the abstract.

     ## Citation

     Instructions/code block for citation

     ## Acknowledgements

     This work is funded by blah blah organization
     ```

4. **Commit and push your changes:**
   - Commit your new Markdown file to the repository and push your changes.

     ```bash
     git add pages/publications/your-file.md
     git commit -m "Add publication: Publication Title"
     git push origin [branch name]
     ```

5. **Preview your changes:**
   - Locally preview the production build to ensure your publication appears correctly. You can also use `yarn dev` for active development.

     ```bash
     yarn preview
     ```

### Add Projects (WORK IN PROGRESS)

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

5. **Preview your changes:**
   - Locally preview the production build to ensure your project appears correctly. You can also use `yarn dev` for active development.

     ```bash
     yarn preview
     ```

### Adding new pages

To add any page, simply put a markdown file in the `pages` directory. You can reference this as you would any other file. Reference the [VitePress documentation](https://vitepress.dev/) for specific details about layouts, styling, etc.

### Adding custom components

Reference the [official component documentation](https://vitepress.dev/guide/using-vue#using-components) for adding custom Vue components to the repository and files.
