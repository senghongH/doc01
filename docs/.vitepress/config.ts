import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Tutorial',
  description: 'Programming Tutorials',
  base: '/doc01/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/doc01/favicon.svg' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        logo: '/favicon.svg',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'HTML', link: '/guide/html/' },
          { text: 'CSS', link: '/guide/css/' },
          { text: 'JavaScript', link: '/guide/javascript/' },
          { text: 'TypeScript', link: '/guide/typescript/' },
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
                { text: 'TypeScript', link: '/guide/typescript/' }
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
          ]
        }
      }
    },
    // km: {
    //   label: 'ខ្មែរ',
    //   lang: 'km',
    //   title: 'មេរៀន',
    //   description: 'មេរៀនសរសេរកម្មវិធី',
    //   themeConfig: {
    //     nav: [
    //       { text: 'ទំព័រដើម', link: '/km/' },
    //       { text: 'HTML', link: '/km/guide/html/' },
    //       { text: 'JavaScript', link: '/km/guide/javascript/' }
    //     ],
    //     sidebar: {
    //       '/km/guide/html/': [
    //         {
    //           text: 'មេរៀន HTML',
    //           items: [
    //             { text: 'ការណែនាំ', link: '/km/guide/html/' },
    //             {
    //               text: 'កម្រិតដំបូង',
    //               collapsed: false,
    //               items: [
    //                 { text: 'មូលដ្ឋាន', link: '/km/guide/html/01-basics' },
    //                 { text: 'អត្ថបទ និងពុម្ពអក្សរ', link: '/km/guide/html/02-text' },
    //                 { text: 'តំណភ្ជាប់ និងរូបភាព', link: '/km/guide/html/03-links-images' }
    //               ]
    //             },
    //             {
    //               text: 'កម្រិតមធ្យម',
    //               collapsed: false,
    //               items: [
    //                 { text: 'បញ្ជី និងតារាង', link: '/km/guide/html/04-lists-tables' },
    //                 { text: 'ទម្រង់បែបបទ', link: '/km/guide/html/05-forms' },
    //                 { text: 'Semantic HTML', link: '/km/guide/html/06-semantic' }
    //               ]
    //             },
    //             {
    //               text: 'កម្រិតខ្ពស់',
    //               collapsed: false,
    //               items: [
    //                 { text: 'មេឌៀ', link: '/km/guide/html/07-media' },
    //                 { text: 'មុខងារកម្រិតខ្ពស់', link: '/km/guide/html/08-advanced' }
    //               ]
    //             }
    //           ]
    //         }
    //       ],
    //       '/km/guide/javascript/': [
    //         {
    //           text: 'មេរៀន JavaScript',
    //           items: [
    //             { text: 'ការណែនាំ', link: '/km/guide/javascript/' },
    //             {
    //               text: 'កម្រិតដំបូង',
    //               collapsed: false,
    //               items: [
    //                 { text: 'មូលដ្ឋាន', link: '/km/guide/javascript/01-basics' },
    //                 { text: 'លំហូរគ្រប់គ្រង', link: '/km/guide/javascript/02-control-flow' },
    //                 { text: 'អនុគមន៍', link: '/km/guide/javascript/03-functions' }
    //               ]
    //             },
    //             {
    //               text: 'កម្រិតមធ្យម',
    //               collapsed: false,
    //               items: [
    //                 { text: 'អារេ', link: '/km/guide/javascript/04-arrays' },
    //                 { text: 'វត្ថុ', link: '/km/guide/javascript/05-objects' },
    //                 { text: 'ការគ្រប់គ្រង DOM', link: '/km/guide/javascript/06-dom' }
    //               ]
    //             },
    //             {
    //               text: 'កម្រិតខ្ពស់',
    //               collapsed: false,
    //               items: [
    //                 { text: 'កម្មវិធី Async', link: '/km/guide/javascript/07-async' },
    //                 { text: 'មុខងារ ES6+', link: '/km/guide/javascript/08-es6' },
    //                 { text: 'OOP', link: '/km/guide/javascript/09-oop' },
    //                 { text: 'គំរូកម្រិតខ្ពស់', link: '/km/guide/javascript/10-advanced' }
    //               ]
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     outlineTitle: 'នៅលើទំព័រនេះ',
    //     docFooter: {
    //       prev: 'ទំព័រមុន',
    //       next: 'ទំព័របន្ទាប់'
    //     }
    //   }
    // }
  }
})
