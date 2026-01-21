// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://my-marketing-pro.github.io',
	base: '/mmp-docs',
	integrations: [
		starlight({
			title: 'My Marketing Pro',
			description: 'Developer documentation for My Marketing Pro web application',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/my-marketing-pro/mmp-webapp'
				}
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Local Development', slug: 'getting-started/local-development' },
						{ label: 'Database Setup', slug: 'getting-started/database' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'Overview', slug: 'architecture/overview' },
						{ label: 'Database Structure', slug: 'architecture/database-structure' },
						{ label: 'File Organization', slug: 'architecture/file-organization' },
					],
				},
				{
					label: 'Workflows',
					items: [
						{ label: 'Git Workflow', slug: 'workflows/git' },
						{ label: 'Development Workflow', slug: 'workflows/development' },
						{ label: 'Deployment', slug: 'workflows/deployment' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Makefile Commands', slug: 'reference/makefile' },
						{ label: 'Server Structure', slug: 'reference/server-structure' },
					],
				},
			],
		}),
	],
});
