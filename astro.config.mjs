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
			head: [
				{
					tag: 'script',
					attrs: {
						src: '/mmp-docs/password-protection.js',
						defer: true,
					},
				},
			],
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
				label: 'Product Management',
				items: [
					{ label: 'Overview', slug: 'product-management' },
					{ label: 'SOP Overview', slug: 'product-management/sop-overview' },
					{ label: 'Team Structure & Resources', slug: 'product-management/team-structure-resources' },
					{ label: 'Client Submission Portal', slug: 'product-management/client-submission-portal' },
					{ label: 'Feature Request Process', slug: 'product-management/feature-request-process' },
					{ label: 'Development Workflow', slug: 'product-management/development-workflow' },
					{ label: 'Release Process', slug: 'product-management/release-process' },
					{ label: 'Testing & Deployment Pipeline', slug: 'product-management/testing-deployment-pipeline' },
					{ label: 'Frameworks & Tools', slug: 'product-management/frameworks-and-tools' },
					{ label: 'Resources', slug: 'product-management/resources' },
				],
			},
				{
					label: 'Reference',
					items: [
						{ label: 'Makefile Commands', slug: 'reference/makefile' },
						{ label: 'Server Structure', slug: 'reference/server-structure' },
					],
				},
				{
					label: 'Security Incidences',
					items: [
						{
							label: '01/21/2026',
							items: [
								{ label: 'Incident Response', slug: 'security/01-21-2026/incident-response' },
								{ label: 'Rotation Checklist', slug: 'security/01-21-2026/rotation-checklist' },
							],
						},
					],
				},
			],
		}),
	],
});
