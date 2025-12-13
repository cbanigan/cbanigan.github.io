# Colin Banigan's Portfolio Website

My personal website. If you're here, this is just a project I made way back when so I can easily showcase my work. This README is mostly for me.

## 🏗️ Tech Stack

- **Static Site Generator**: Eleventy (11ty)
- **Template Engine**: Nunjucks (.njk files)
- **Styling**: Custom CSS
- **Language**: TypeScript for utility scripts
- **Build Process**: TypeScript compilation + Eleventy + custom post-build script

## 📁 Project Structure

```
├── pages/                # Source templates (.njk files)
│   ├── index.njk         # Homepage
│   ├── about.njk         # About page
│   ├── resume.njk        # Resume page
│   └── projects/         # Project pages
├── _includes/            # Reusable template components
├── _images/              # Static images and assets
├── _videos/              # Video files
├── style/                # CSS stylesheets
├── scripts/              # TypeScript utility scripts
├── _site/                # Generated build output (auto-created)
└── _resume/              # Resume PDF files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cbanigan/cbanigan.github.io.git
   cd cbanigan.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server with live reloading:

```bash
npm run dev
```

This will:
- Compile TypeScript files
- Start Eleventy in serve mode with watch functionality
- Serve the site at `http://localhost:8080` (default Eleventy port)

### Building for Production

Build the static site for deployment:

```bash
npm run build
```

This will:
- Compile TypeScript files
- Run Eleventy to generate static HTML
- Execute the post-build script to rename extensionless files to `.html`

The built site will be available in the `_site/` directory.

### Other Available Scripts

- `npm run serve` - Start development server without watch mode
- `npm run compile-ts` - Compile TypeScript files only
- `npm run postbuild` - Run the post-build file renaming script

## 🌐 Site Features

- **Homepage**: Introduction and overview
- **About**: Detailed background, experience, and personal information
- **Projects**: Showcase of personal projects
- **Resume**: Full resume page with a link to the PDF version
- **Responsive Design**: Mobile-friendly layout with custom CSS animations

## 📦 Deployment

This site is configured for deployment to GitHub Pages. The built files in `_site/` can be deployed directly to any static hosting service.

## 📄 License

This project is licensed under the MIT License.
