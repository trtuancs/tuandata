import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from '../astro-theme-resume/src/utils/remarkReadingTime.js';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeExternalLinks from 'rehype-external-links';
import expressiveCode from 'astro-expressive-code';
import { expressiveCodeOptions } from '../astro-theme-resume/src/site.config.js';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://tuandata.com',
  integrations: [
	expressiveCode(expressiveCodeOptions),
	tailwind({applyBaseStyles: false}), 
	sitemap(), 
	mdx(), 
	icon(), 
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