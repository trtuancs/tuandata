import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeExternalLinks from 'rehype-external-links';
import astroExpressiveCode from 'astro-expressive-code';
import partytown from '@astrojs/partytown'

// import { expressiveCodeOptions } from './src/site.config';
import icon from 'astro-icon';


export default defineConfig({
  site: 'https://tuandata.com',
  integrations: [
  astroExpressiveCode({
    themes: ['solarized-light']
    // expressiveCodeOptions
  }),
	tailwind({applyBaseStyles: false}), 
	sitemap(), 
	mdx(), 
	icon(), 
  partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  }),
  ],
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    rehypePlugins: [[rehypeExternalLinks, {
      target: '_blank',
      rel: ['nofollow, noopener, noreferrer']
    }]],
    remarkRehype: {
      footnoteLabelProperties: {
        className: ['']
      }
    }
  },
  prefetch: true,
  output: 'static'
});