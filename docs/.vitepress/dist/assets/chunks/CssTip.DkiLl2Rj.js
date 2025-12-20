import{d as u,p as x,c as o,F as b,B as h,k as v,o as n,n as p,j as e,G as f,ag as y,t as s,w as m,e as d,T as w,_ as k}from"./framework.-1KSn0C5.js";const T=[{title:"Use CSS Variables for Theming",description:"CSS custom properties make it easy to create consistent themes and enable dark mode.",code:`:root {
  --primary: #3b82f6;
  --bg: #ffffff;
}
.dark {
  --primary: #60a5fa;
  --bg: #1a1a1a;
}`,resultType:"theme",resultHtml:'<div style="display:flex;gap:8px;"><div style="padding:12px 20px;background:#3b82f6;color:white;border-radius:6px;">Light Theme</div><div style="padding:12px 20px;background:#1a1a1a;color:#60a5fa;border-radius:6px;">Dark Theme</div></div>'},{title:"Centering with Flexbox",description:"The easiest way to center an element both horizontally and vertically.",code:`.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,resultType:"flex",resultHtml:'<div style="display:flex;justify-content:center;align-items:center;height:100px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;"><div style="padding:12px 24px;background:white;border-radius:6px;font-weight:600;color:#333;">Centered!</div></div>'},{title:"Smooth Scrolling",description:"Enable smooth scrolling behavior for anchor links with one line of CSS.",code:`html {
  scroll-behavior: smooth;
}`,resultType:"info",resultHtml:'<div style="padding:16px;background:linear-gradient(135deg,#11998e,#38ef7d);border-radius:8px;color:white;text-align:center;">Scroll behavior is applied to the whole page. Try clicking anchor links!</div>'},{title:"Aspect Ratio",description:"Maintain consistent aspect ratios for images and videos without JavaScript.",code:`.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}`,resultType:"aspect",resultHtml:'<div style="aspect-ratio:16/9;width:100%;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:8px;display:flex;align-items:center;justify-content:center;"><span style="color:white;font-size:14px;">16:9 Aspect Ratio</span></div>'},{title:"Truncate Text with Ellipsis",description:"Show ellipsis (...) when text overflows its container.",code:`.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,resultType:"text",resultHtml:'<div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:12px;background:#f0f0f0;border-radius:6px;max-width:100%;color:#333;">This is a very long text that will be truncated with an ellipsis when it overflows the container width</div>'},{title:"CSS Grid Auto-Fit",description:"Create responsive grids without media queries using auto-fit and minmax.",code:`.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
}`,resultType:"grid",resultHtml:'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr));gap:8px;"><div style="padding:16px;background:#3b82f6;border-radius:6px;text-align:center;color:white;">1</div><div style="padding:16px;background:#8b5cf6;border-radius:6px;text-align:center;color:white;">2</div><div style="padding:16px;background:#ec4899;border-radius:6px;text-align:center;color:white;">3</div><div style="padding:16px;background:#f59e0b;border-radius:6px;text-align:center;color:white;">4</div></div>'},{title:"Clamp for Responsive Typography",description:"Create fluid typography that scales smoothly between viewport sizes.",code:`h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}`,resultType:"text",resultHtml:'<div style="font-size:clamp(1rem,4vw,2rem);font-weight:bold;background:linear-gradient(90deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Responsive Text Size</div>'},{title:"Backdrop Filter for Glassmorphism",description:"Create frosted glass effects with backdrop-filter.",code:`.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}`,resultType:"glass",resultHtml:'<div style="position:relative;padding:20px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:12px;"><div style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:16px;color:white;text-align:center;">Glassmorphism Effect</div></div>'},{title:"Focus-Visible for Better Accessibility",description:"Show focus styles only for keyboard navigation, not mouse clicks.",code:`button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}`,resultType:"button",resultHtml:'<button style="padding:12px 24px;background:#3b82f6;color:white;border:none;border-radius:6px;cursor:pointer;outline:2px solid #3b82f6;outline-offset:3px;">Tab to focus me</button>'},{title:"Container Queries",description:"Style elements based on their container size, not just viewport.",code:`.card-container {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .card { flex-direction: row; }
}`,resultType:"info",resultHtml:'<div style="padding:16px;background:linear-gradient(135deg,#ff6b6b,#feca57);border-radius:8px;color:white;text-align:center;">Container queries adapt based on parent container, not viewport!</div>'},{title:"Logical Properties",description:"Use logical properties for better internationalization and RTL support.",code:`.element {
  margin-inline: auto;
  padding-block: 1rem;
  border-inline-start: 2px solid blue;
}`,resultType:"logical",resultHtml:'<div style="margin-inline:auto;padding-block:16px;border-inline-start:4px solid #3b82f6;background:#f0f0f0;border-radius:0 8px 8px 0;max-width:200px;padding-inline:16px;color:#333;">RTL Ready!</div>'},{title:"Scroll Snap",description:"Create smooth carousel-like scrolling without JavaScript.",code:`.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
}
.slide {
  scroll-snap-align: start;
}`,resultType:"scroll",resultHtml:'<div style="display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding:8px 0;"><div style="scroll-snap-align:start;min-width:120px;padding:24px;background:#3b82f6;border-radius:8px;color:white;text-align:center;">Slide 1</div><div style="scroll-snap-align:start;min-width:120px;padding:24px;background:#8b5cf6;border-radius:8px;color:white;text-align:center;">Slide 2</div><div style="scroll-snap-align:start;min-width:120px;padding:24px;background:#ec4899;border-radius:8px;color:white;text-align:center;">Slide 3</div></div>'},{title:"CSS :has() Selector",description:'Select parent elements based on their children - the "parent selector" we always wanted.',code:`/* Style card if it has an image */
.card:has(img) {
  grid-template-rows: auto 1fr;
}
/* Style form if input is invalid */
form:has(:invalid) {
  border-color: red;
}`,resultType:"info",resultHtml:'<div style="padding:16px;background:#fef3c7;border:2px solid #f59e0b;border-radius:8px;color:#92400e;">:has() lets you style parents based on children state!</div>'},{title:"Multi-line Ellipsis",description:"Truncate text after multiple lines with ellipsis.",code:`.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`,resultType:"text",resultHtml:'<div style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;padding:12px;background:#f0f0f0;border-radius:6px;line-height:1.5;color:#333;">This is a long paragraph that will be clamped to only show 2 lines. Any text beyond that will be hidden with an ellipsis at the end. This is very useful for card descriptions and previews.</div>'},{title:"CSS Nesting",description:"Native CSS nesting without preprocessors - now supported in modern browsers.",code:`.card {
  background: white;

  & .title {
    font-size: 1.5rem;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
}`,resultType:"card",resultHtml:'<div style="background:white;padding:20px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);transition:transform 0.2s;"><div style="font-size:1.2rem;font-weight:bold;margin-bottom:8px;color:#333;">Card Title</div><div style="color:#666;font-size:14px;">Hover to see the effect!</div></div>'},{title:"Subgrid",description:"Align nested grid items with the parent grid tracks.",code:`.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}`,resultType:"grid",resultHtml:'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;"><div style="padding:12px;background:#3b82f6;border-radius:6px;text-align:center;color:white;">A</div><div style="padding:12px;background:#3b82f6;border-radius:6px;text-align:center;color:white;">B</div><div style="padding:12px;background:#3b82f6;border-radius:6px;text-align:center;color:white;">C</div></div>'},{title:"Color-Mix Function",description:"Mix colors directly in CSS for creating variations.",code:`.button {
  --base: #3b82f6;
  background: var(--base);
}
.button:hover {
  background: color-mix(in srgb, var(--base), black 20%);
}`,resultType:"colors",resultHtml:'<div style="display:flex;gap:8px;align-items:center;"><div style="padding:12px 20px;background:#3b82f6;color:white;border-radius:6px;">Base</div><div style="padding:12px 20px;background:#2563eb;color:white;border-radius:6px;">Mixed darker</div><div style="padding:12px 20px;background:#60a5fa;color:white;border-radius:6px;">Mixed lighter</div></div>'},{title:"Accent Color",description:"Easily style form controls like checkboxes and radio buttons.",code:`input[type="checkbox"],
input[type="radio"],
input[type="range"] {
  accent-color: #3b82f6;
}`,resultType:"form",resultHtml:'<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;"><label style="display:flex;align-items:center;gap:6px;color:#333;"><input type="checkbox" checked style="accent-color:#3b82f6;width:18px;height:18px;">Checkbox</label><label style="display:flex;align-items:center;gap:6px;color:#333;"><input type="radio" checked style="accent-color:#8b5cf6;width:18px;height:18px;">Radio</label><input type="range" style="accent-color:#ec4899;width:100px;"></div>'},{title:"Isolation for Stacking Context",description:"Create a new stacking context without using z-index hacks.",code:`.modal-container {
  isolation: isolate;
}
.modal {
  z-index: 1; /* Only competes within container */
}`,resultType:"info",resultHtml:'<div style="padding:16px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;color:white;text-align:center;">Isolation creates a new stacking context!</div>'},{title:"Gap in Flexbox",description:"Use gap property in flexbox instead of margins for consistent spacing.",code:`.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Works like grid gap! */
}`,resultType:"flex",resultHtml:'<div style="display:flex;flex-wrap:wrap;gap:12px;"><div style="padding:12px 20px;background:#3b82f6;border-radius:6px;color:white;">Item 1</div><div style="padding:12px 20px;background:#8b5cf6;border-radius:6px;color:white;">Item 2</div><div style="padding:12px 20px;background:#ec4899;border-radius:6px;color:white;">Item 3</div></div>'},{title:"Inset Shorthand",description:"Shorthand for top, right, bottom, left positioning.",code:`.overlay {
  position: absolute;
  inset: 0; /* Same as top/right/bottom/left: 0 */
}
.sidebar {
  inset: 0 auto 0 0; /* top right bottom left */
}`,resultType:"position",resultHtml:'<div style="position:relative;height:80px;background:#e5e7eb;border-radius:8px;"><div style="position:absolute;inset:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:6px;display:flex;align-items:center;justify-content:center;color:white;">inset: 8px</div></div>'},{title:"Place Items Shorthand",description:"Center items in grid with a single property.",code:`.grid-center {
  display: grid;
  place-items: center; /* align-items + justify-items */
  min-height: 100vh;
}`,resultType:"grid",resultHtml:'<div style="display:grid;place-items:center;height:80px;background:linear-gradient(135deg,#f093fb,#f5576c);border-radius:8px;"><div style="padding:8px 16px;background:white;border-radius:6px;font-weight:600;color:#333;">Centered!</div></div>'},{title:"Text Wrap Balance",description:"Create more balanced text wrapping for headings.",code:`h1, h2, h3 {
  text-wrap: balance;
}
/* Or for better last-line control */
p {
  text-wrap: pretty;
}`,resultType:"text",resultHtml:'<div style="text-wrap:balance;font-size:1.2rem;font-weight:bold;text-align:center;padding:16px;background:#f0f0f0;border-radius:8px;color:#333;">This heading text is balanced for better visual appearance</div>'},{title:"Sticky Positioning",description:"Create sticky headers or sidebars that stick when scrolling.",code:`.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}`,resultType:"sticky",resultHtml:'<div style="height:100px;overflow-y:auto;border-radius:8px;border:1px solid #e5e7eb;"><div style="position:sticky;top:0;background:#3b82f6;color:white;padding:8px 16px;font-weight:600;">Sticky Header</div><div style="padding:16px;color:#666;">Scroll down to see the sticky effect. The header stays at the top while content scrolls.</div><div style="padding:16px;color:#666;">More content here...</div><div style="padding:16px;color:#666;">Even more content...</div></div>'},{title:"Custom Scrollbar",description:"Style scrollbars to match your design.",code:`.custom-scroll::-webkit-scrollbar {
  width: 8px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}`,resultType:"info",resultHtml:'<div style="padding:16px;background:#f3f4f6;border-radius:8px;color:#374151;text-align:center;">Custom scrollbars work in WebKit browsers (Chrome, Safari, Edge)</div>'},{title:"Object Fit for Images",description:"Control how images fit within their containers.",code:`.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover; /* Crop to fill */
  object-position: top; /* Focus on top */
}`,resultType:"image",resultHtml:'<div style="display:flex;gap:16px;align-items:center;"><div style="text-align:center;"><div style="width:60px;height:60px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:12px;">cover</div></div><div style="text-align:center;"><div style="width:60px;height:60px;background:linear-gradient(135deg,#f093fb,#f5576c);border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:12px;">contain</div></div></div>'},{title:"Pointer Events None",description:"Make elements click-through for overlays or decorative elements.",code:`.watermark {
  position: absolute;
  pointer-events: none; /* Clicks pass through */
  opacity: 0.5;
}`,resultType:"pointer",resultHtml:'<div style="position:relative;"><button style="padding:12px 24px;background:#3b82f6;color:white;border:none;border-radius:6px;cursor:pointer;">Click me!</button><div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.1);pointer-events:none;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#666;font-size:12px;">Overlay (click through)</div></div>'},{title:"User Select",description:"Control text selection behavior.",code:`.no-select {
  user-select: none; /* Prevent selection */
}
.select-all {
  user-select: all; /* Select all on click */
}`,resultType:"select",resultHtml:`<div style="display:flex;gap:12px;flex-wrap:wrap;"><div style="user-select:none;padding:12px 16px;background:#fee2e2;border-radius:6px;color:#991b1b;cursor:not-allowed;">Can't select me</div><div style="user-select:all;padding:12px 16px;background:#dcfce7;border-radius:6px;color:#166534;cursor:pointer;">Click to select all</div></div>`},{title:"Writing Mode for Vertical Text",description:"Create vertical text layouts for creative designs.",code:`.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}`,resultType:"vertical",resultHtml:'<div style="display:flex;gap:16px;align-items:center;"><div style="writing-mode:vertical-rl;text-orientation:mixed;padding:16px 8px;background:linear-gradient(180deg,#667eea,#764ba2);border-radius:8px;color:white;font-weight:600;">Vertical</div><div style="padding:16px;background:#f0f0f0;border-radius:8px;color:#333;">Horizontal text for comparison</div></div>'}],S={class:"tips-container"},C=["onClick"],H={class:"tip-title"},_={key:0,class:"tip-content"},z={class:"tip-description"},j={key:0,class:"tip-result"},M=["innerHTML"],B={key:1,class:"tip-code"},A=u({__name:"CssTip",setup(F){const c=T,t=x(new Set);function g(a){t.value.has(a)?t.value.delete(a):t.value.add(a),t.value=new Set(t.value)}return(a,i)=>(n(),o("div",S,[(n(!0),o(b,null,h(v(c),(r,l)=>(n(),o("div",{key:l,class:p(["tip-card",{"tip-card--active":t.value.has(l)}])},[e("button",{onClick:E=>g(l),class:"tip-header"},[i[1]||(i[1]=y('<div class="tip-icon" data-v-8a28f943><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8a28f943><path d="M9 18h6" data-v-8a28f943></path><path d="M10 22h4" data-v-8a28f943></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" data-v-8a28f943></path></svg></div>',1)),e("span",H,s(r.title),1),e("span",{class:p(["tip-arrow",{"tip-arrow--open":t.value.has(l)}])},[...i[0]||(i[0]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"m6 9 6 6 6-6"})],-1)])],2)],8,C),f(w,{name:"expand"},{default:m(()=>[t.value.has(l)?(n(),o("div",_,[e("p",z,s(r.description),1),r.resultHtml?(n(),o("div",j,[i[2]||(i[2]=e("div",{class:"tip-result-header"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),e("circle",{cx:"12",cy:"12",r:"3"})]),e("span",null,"Result")],-1)),e("div",{class:"tip-result-preview",innerHTML:r.resultHtml},null,8,M)])):d("",!0),r.code?(n(),o("div",B,[i[3]||(i[3]=e("div",{class:"tip-code-header"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("polyline",{points:"16 18 22 12 16 6"}),e("polyline",{points:"8 6 2 12 8 18"})]),e("span",null,"CSS Code")],-1)),e("pre",null,[e("code",null,s(r.code),1)])])):d("",!0)])):d("",!0)]),_:2},1024)],2))),128))]))}}),R=k(A,[["__scopeId","data-v-8a28f943"]]);export{R as default};
