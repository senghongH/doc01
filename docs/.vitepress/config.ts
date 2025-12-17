import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Tutorial',
  description: 'Programming Tutorials',
  base: '/doc01/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/doc01/favicon.svg' }],
  ],

  themeConfig: {
    search: {
      provider: 'local'
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        logo: '/favicon.svg',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          {
            text: 'Frontend',
            items: [
              { text: 'HTML', link: '/guide/html/' },
              { text: 'CSS', link: '/guide/css/' },
              { text: 'JavaScript', link: '/guide/javascript/' },
              { text: 'TypeScript', link: '/guide/typescript/' }
            ]
          },
          {
            text: 'Backend',
            items: [
              { text: 'Node.js', link: '/guide/nodejs/' },
              { text: 'Express', link: '/guide/express/' },
              { text: 'NestJS', link: '/guide/nestjs/' },
              { text: 'Hono', link: '/guide/hono/' },
              { text: 'Python', link: '/guide/python/' }
            ]
          },
          { text: 'AI', link: '/guide/ai/' },
          { text: 'Author', link: '/creator' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Fundamentals',
              items: [
                { text: 'Introduction', link: '/guide/' },
                { text: 'What is a Website?', link: '/guide/fundamentals/what-is-website' },
                { text: 'How the Web Works', link: '/guide/fundamentals/how-web-works' },
                { text: 'Web Development Overview', link: '/guide/fundamentals/web-development-overview' },
                { text: 'Getting Started', link: '/guide/fundamentals/getting-started' }
              ]
            },
            {
              text: 'Development Environment',
              items: [
                { text: 'Command Line Basics', link: '/guide/environment/command-line' },
                { text: 'Code Editors', link: '/guide/environment/code-editors' },
                { text: 'Package Managers', link: '/guide/environment/package-managers' }
              ]
            },
            {
              text: 'Essential Skills',
              items: [
                { text: 'Developer Tools', link: '/guide/skills/developer-tools' },
                { text: 'Version Control (Git)', link: '/guide/skills/version-control' },
                { text: 'Debugging Basics', link: '/guide/skills/debugging' },
                { text: 'APIs & Data Fetching', link: '/guide/skills/apis-data-fetching' },
                { text: 'Working with Forms', link: '/guide/skills/forms' },
                { text: 'JSON & Data Formats', link: '/guide/skills/json-data' },
                { text: 'Regular Expressions', link: '/guide/skills/regex' },
                { text: 'Web Storage', link: '/guide/skills/web-storage' }
              ]
            },
            {
              text: 'Best Practices',
              items: [
                { text: 'Responsive Design', link: '/guide/best-practices/responsive-design' },
                { text: 'Web Accessibility', link: '/guide/best-practices/web-accessibility' },
                { text: 'Web Performance', link: '/guide/best-practices/web-performance' },
                { text: 'Web Security', link: '/guide/best-practices/web-security' },
                { text: 'Browser Compatibility', link: '/guide/best-practices/browser-compatibility' },
                { text: 'SEO Basics', link: '/guide/best-practices/seo-basics' }
              ]
            },
            {
              text: 'Deployment',
              items: [
                { text: 'Web Hosting & Deployment', link: '/guide/deployment/web-hosting' }
              ]
            },
            {
              text: 'Tutorials',
              items: [
                { text: 'HTML', link: '/guide/html/' },
                { text: 'CSS', link: '/guide/css/' },
                { text: 'JavaScript', link: '/guide/javascript/' },
                { text: 'TypeScript', link: '/guide/typescript/' },
                { text: 'Node.js', link: '/guide/nodejs/' },
                { text: 'Express', link: '/guide/express/' },
                { text: 'NestJS', link: '/guide/nestjs/' },
                { text: 'Hono', link: '/guide/hono/' },
                { text: 'Python', link: '/guide/python/' },
                { text: 'AI & Machine Learning', link: '/guide/ai/' }
              ]
            }
          ],
          '/guide/html/': [
            {
              text: 'HTML Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/html/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Basics', link: '/guide/html/01-basics' },
                    { text: 'Text & Typography', link: '/guide/html/02-text' },
                    { text: 'Links & Images', link: '/guide/html/03-links-images' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Lists & Tables', link: '/guide/html/04-lists-tables' },
                    { text: 'Forms', link: '/guide/html/05-forms' },
                    { text: 'Semantic HTML', link: '/guide/html/06-semantic' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Media', link: '/guide/html/07-media' },
                    { text: 'Advanced Features', link: '/guide/html/08-advanced' }
                  ]
                }
              ]
            }
          ],
          '/guide/css/': [
            {
              text: 'CSS Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/css/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Basics', link: '/guide/css/01-basics' },
                    { text: 'Colors & Backgrounds', link: '/guide/css/02-colors' },
                    { text: 'Typography', link: '/guide/css/03-typography' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Box Model', link: '/guide/css/04-box-model' },
                    { text: 'Layout', link: '/guide/css/05-layout' },
                    { text: 'Flexbox', link: '/guide/css/06-flexbox' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Grid', link: '/guide/css/07-grid' },
                    { text: 'Responsive Design', link: '/guide/css/08-responsive' },
                    { text: 'Animations', link: '/guide/css/09-animations' },
                    { text: 'Advanced Techniques', link: '/guide/css/10-advanced' }
                  ]
                }
              ]
            }
          ],
          '/guide/javascript/': [
            {
              text: 'JavaScript Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/javascript/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Basics', link: '/guide/javascript/01-basics' },
                    { text: 'Control Flow', link: '/guide/javascript/02-control-flow' },
                    { text: 'Functions', link: '/guide/javascript/03-functions' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Arrays', link: '/guide/javascript/04-arrays' },
                    { text: 'Objects', link: '/guide/javascript/05-objects' },
                    { text: 'DOM Manipulation', link: '/guide/javascript/06-dom' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Async Programming', link: '/guide/javascript/07-async' },
                    { text: 'ES6+ Features', link: '/guide/javascript/08-es6' },
                    { text: 'OOP', link: '/guide/javascript/09-oop' },
                    { text: 'Advanced Patterns', link: '/guide/javascript/10-advanced' }
                  ]
                }
              ]
            }
          ],
          '/guide/typescript/': [
            {
              text: 'TypeScript Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/typescript/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Basics', link: '/guide/typescript/01-basics' },
                    { text: 'Functions', link: '/guide/typescript/02-functions' },
                    { text: 'Objects & Interfaces', link: '/guide/typescript/03-interfaces' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Classes', link: '/guide/typescript/04-classes' },
                    { text: 'Generics', link: '/guide/typescript/05-generics' },
                    { text: 'Type Manipulation', link: '/guide/typescript/06-type-manipulation' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Modules', link: '/guide/typescript/07-modules' },
                    { text: 'Decorators', link: '/guide/typescript/08-decorators' },
                    { text: 'Declaration Files', link: '/guide/typescript/09-declarations' },
                    { text: 'Advanced Patterns', link: '/guide/typescript/10-advanced' }
                  ]
                }
              ]
            }
          ],
          '/guide/nestjs/': [
            {
              text: 'NestJS Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/nestjs/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Getting Started', link: '/guide/nestjs/01-introduction' },
                    { text: 'Controllers', link: '/guide/nestjs/02-controllers' },
                    { text: 'Providers & Services', link: '/guide/nestjs/03-providers' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Modules', link: '/guide/nestjs/04-modules' },
                    { text: 'Middleware & Guards', link: '/guide/nestjs/05-middleware' },
                    { text: 'Pipes & Validation', link: '/guide/nestjs/06-pipes' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Database Integration', link: '/guide/nestjs/07-database' },
                    { text: 'Authentication', link: '/guide/nestjs/08-authentication' },
                    { text: 'Testing', link: '/guide/nestjs/09-testing' },
                    { text: 'Advanced Topics', link: '/guide/nestjs/10-advanced' }
                  ]
                }
              ]
            }
          ],
          '/guide/hono/': [
            {
              text: 'Hono Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/hono/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Getting Started', link: '/guide/hono/01-introduction' },
                    { text: 'Routing', link: '/guide/hono/02-routing' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Middleware', link: '/guide/hono/03-middleware' },
                    { text: 'Context API', link: '/guide/hono/04-context' },
                    { text: 'Validation', link: '/guide/hono/05-validation' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Testing', link: '/guide/hono/06-testing' },
                    { text: 'Deployment', link: '/guide/hono/07-deployment' },
                    { text: 'Advanced Topics', link: '/guide/hono/08-advanced' }
                  ]
                }
              ]
            }
          ],
          '/guide/nodejs/': [
            {
              text: 'Node.js Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/nodejs/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Getting Started', link: '/guide/nodejs/01-introduction' },
                    { text: 'Modules', link: '/guide/nodejs/02-modules' },
                    { text: 'File System', link: '/guide/nodejs/03-file-system' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Async Programming', link: '/guide/nodejs/04-async' },
                    { text: 'Events', link: '/guide/nodejs/05-events' },
                    { text: 'Streams', link: '/guide/nodejs/06-streams' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'HTTP Module', link: '/guide/nodejs/07-http' },
                    { text: 'NPM & Packages', link: '/guide/nodejs/08-npm' },
                    { text: 'Debugging', link: '/guide/nodejs/09-debugging' },
                    { text: 'Advanced Topics', link: '/guide/nodejs/10-advanced' }
                  ]
                }
              ]
            }
          ],
          '/guide/express/': [
            {
              text: 'Express.js Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/express/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Getting Started', link: '/guide/express/01-introduction' },
                    { text: 'Routing', link: '/guide/express/02-routing' },
                    { text: 'Middleware', link: '/guide/express/03-middleware' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Request & Response', link: '/guide/express/04-request-response' },
                    { text: 'Template Engines', link: '/guide/express/05-templates' },
                    { text: 'Static Files', link: '/guide/express/06-static-files' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Error Handling', link: '/guide/express/07-error-handling' },
                    { text: 'Authentication', link: '/guide/express/08-authentication' },
                    { text: 'Database Integration', link: '/guide/express/09-database' },
                    { text: 'Deployment', link: '/guide/express/10-deployment' }
                  ]
                }
              ]
            }
          ],
          '/guide/python/': [
            {
              text: 'Python Tutorial',
              items: [
                { text: 'Introduction', link: '/guide/python/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'Basics', link: '/guide/python/01-basics' },
                    { text: 'Control Flow', link: '/guide/python/02-control-flow' },
                    { text: 'Functions', link: '/guide/python/03-functions' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Data Structures', link: '/guide/python/04-data-structures' },
                    { text: 'Strings', link: '/guide/python/05-strings' },
                    { text: 'File I/O', link: '/guide/python/06-file-io' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Modules', link: '/guide/python/07-modules' },
                    { text: 'OOP', link: '/guide/python/08-oop' },
                    { text: 'Exceptions', link: '/guide/python/09-exceptions' },
                    { text: 'Advanced Topics', link: '/guide/python/10-advanced' }
                  ]
                }
              ]
            }
          ],
          '/guide/ai/': [
            {
              text: 'AI & Machine Learning',
              items: [
                { text: 'Introduction', link: '/guide/ai/' },
                {
                  text: 'Beginner',
                  collapsed: false,
                  items: [
                    { text: 'What is AI?', link: '/guide/ai/01-introduction' },
                    { text: 'ML Basics', link: '/guide/ai/02-ml-basics' },
                    { text: 'Python for AI', link: '/guide/ai/03-python-for-ai' },
                    { text: 'Your First Model', link: '/guide/ai/04-first-model' }
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Neural Networks', link: '/guide/ai/05-neural-networks' },
                    { text: 'Deep Learning', link: '/guide/ai/06-deep-learning' },
                    { text: 'Working with LLMs', link: '/guide/ai/07-llms' }
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Fine-tuning Models', link: '/guide/ai/08-fine-tuning' },
                    { text: 'AI Agents', link: '/guide/ai/09-agents' },
                    { text: 'Production AI', link: '/guide/ai/10-production' }
                  ]
                }
              ]
            }
          ]
        }
      }
    },
  }
})
