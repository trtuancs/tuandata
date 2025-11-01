# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog focused on Data Engineering and programming content, primarily in Vietnamese. The site is built as a static site and deployed to https://tuandata.com.

## Development Commands

- `npm run dev` - Start development server with type checking watch mode
- `npm start` - Start development server (alias for `astro dev`)
- `npm run build` - Type check and build the site for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Format code with Prettier and fix ESLint issues

## Architecture

### Content Management

Blog posts are stored in `src/content/post/` as MDX/Markdown files with the following schema:
- **title**: Max 60 characters
- **description**: 50-160 characters
- **publishDate**: Required date field
- **updatedDate**: Optional
- **coverImage**: Optional with src and alt
- **draft**: Boolean (default false)
- **tags**: Array of strings, automatically deduplicated and lowercased
- **ogImage**: Optional custom OG image

Posts are processed with custom remark/rehype plugins:
- `remarkReadingTime` - Automatically calculates reading time and adds `minutesRead` to frontmatter
- `remarkUnwrapImages` - Unwraps images from paragraph tags
- `rehypeExternalLinks` - Adds target="_blank" and security attributes to external links

### Configuration

- `src/site.config.ts` - Central configuration for site metadata, menu links, and Expressive Code settings
  - Site locale is `vi-VN` (Vietnamese)
  - Menu items: Home, Blog, Profile, Social
  - Code syntax highlighting uses 'solarized-light' theme

- `tailwind.config.js` - Tailwind configuration with custom color system using HSL CSS variables
  - Uses Comfortaa font family throughout
  - Custom breakpoints: tablet (640px), laptop (1024px), desktop (1280px)
  - Includes typography and aspect-ratio plugins

### Routing Structure

- `/` - Homepage (src/pages/index.astro)
- `/blog/[...page]` - Paginated blog listing
- `/blog/[slug]` - Individual blog post
- `/tags/` - Tag listing page
- `/tags/[tag]/[...page]` - Paginated posts by tag
- `/profile` - Profile page
- `/social` - Social links page
- `/rss.xml` - RSS feed

### Layouts

- `BaseLayout.astro` - Base template with common HTML structure
- `BlogPost.astro` - Layout for individual blog posts with TOC support

### Key Integrations

- **MDX** - Enhanced Markdown support
- **Tailwind CSS** - Utility-first styling (base styles disabled via `applyBaseStyles: false`)
- **Expressive Code** - Syntax highlighting for code blocks
- **Sitemap** - Auto-generated sitemap
- **Partytown** - Performance optimization for third-party scripts (Google Analytics)
- **astro-icon** - Icon system

### Utilities

Located in `src/utils/`:
- `remarkReadingTime.ts` - Custom remark plugin for reading time calculation
- `generateToc.ts` - Table of contents generation
- `post.ts` - Post-related utilities
- `date.ts` - Date formatting with Vietnamese locale
- `tailwind.ts` - Tailwind utility helpers

### Styling Approach

The site uses a custom HSL-based color system defined in CSS variables. Tailwind is configured to use these variables rather than default colors. Custom fonts (Comfortaa family) are loaded from `public/fonts/`.

## Important Notes

- The site is configured for Vietnamese locale (`vi-VN`)
- All external links automatically open in new tabs with security attributes
- Images in Markdown are automatically unwrapped from paragraph tags for better styling control
- The build process includes TypeScript checking before compilation
