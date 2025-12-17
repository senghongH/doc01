---
layout: home

hero:
  name: DevDocs
  text: Master Modern Web Development
  tagline: From fundamentals to production-ready skills. Learn HTML, CSS, JavaScript, TypeScript, and modern frameworks.
  image:
    src: /hero-image.svg
    alt: Programming Tutorials
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com

features:
  - icon: 🌐
    title: HTML Fundamentals
    details: Build solid foundations with semantic markup, accessibility best practices, and modern HTML5 features.
    link: /guide/html/
    linkText: Learn HTML
  - icon: 🎨
    title: CSS Mastery
    details: Create stunning layouts with Flexbox, Grid, animations, and responsive design techniques.
    link: /guide/css/
    linkText: Learn CSS
  - icon: ⚡
    title: JavaScript
    details: From basics to advanced patterns - async/await, ES6+, DOM manipulation, and functional programming.
    link: /guide/javascript/
    linkText: Learn JavaScript
  - icon: 🔷
    title: TypeScript
    details: Write type-safe, scalable code with interfaces, generics, and advanced type manipulation.
    link: /guide/typescript/
    linkText: Learn TypeScript
  - icon: 🏗️
    title: NestJS
    details: Build enterprise-grade Node.js applications with this powerful, modular framework.
    link: /guide/nestjs/
    linkText: Learn NestJS
  - icon: 🔥
    title: Hono
    details: Ultrafast web framework for Edge computing - Cloudflare Workers, Deno, Bun & more.
    link: /guide/hono/
    linkText: Learn Hono
  - icon: 🐍
    title: Python
    details: Versatile programming language for web development, data science, AI, and automation.
    link: /guide/python/
    linkText: Learn Python
  - icon: 🤖
    title: AI & Machine Learning
    details: Explore artificial intelligence concepts, neural networks, and practical ML applications.
    link: /guide/ai/
    linkText: Learn AI
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe50 50%, #47caff50 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPHero .text {
  font-size: 48px !important;
  line-height: 1.2 !important;
}

.VPHero .tagline {
  font-size: 20px !important;
  max-width: 560px !important;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
