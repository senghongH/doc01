import{d as v,p as f,c as o,F as m,B as g,k as y,o as s,n as c,j as e,G as b,ag as h,t as l,w as x,e as d,T as w,_ as k}from"./framework.-1KSn0C5.js";const H=[{title:"Destructuring Assignment",description:"Extract values from arrays or properties from objects into distinct variables.",code:`// Array destructuring
const [first, second] = [1, 2, 3];

// Object destructuring
const { name, age } = { name: 'John', age: 30 };

// With default values
const { city = 'Unknown' } = {};`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>first = <span style="color:#b5cea8;">1</span></div><div>name = <span style="color:#ce9178;">"John"</span></div><div>city = <span style="color:#ce9178;">"Unknown"</span></div></div>'},{title:"Spread Operator",description:"Expand arrays or objects into individual elements. Great for copying and merging.",code:`// Copy array
const arr = [1, 2, 3];
const copy = [...arr];

// Merge objects
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 };`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>copy = <span style="color:#b5cea8;">[1, 2, 3]</span></div><div>merged = <span style="color:#b5cea8;">{ a: 1, b: 2 }</span></div></div>'},{title:"Optional Chaining",description:"Safely access nested object properties without checking each level for null/undefined.",code:`const user = { profile: { name: 'John' } };

// Without optional chaining (old way)
const name1 = user && user.profile && user.profile.name;

// With optional chaining
const name2 = user?.profile?.name;
const city = user?.address?.city; // undefined, no error`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>name2 = <span style="color:#ce9178;">"John"</span></div><div>city = <span style="color:#569cd6;">undefined</span></div></div>'},{title:"Nullish Coalescing",description:"Provide a default value only when the left side is null or undefined (not falsy).",code:`const value1 = null ?? 'default';    // 'default'
const value2 = undefined ?? 'default'; // 'default'
const value3 = 0 ?? 'default';       // 0
const value4 = '' ?? 'default';      // ''
const value5 = false ?? 'default';   // false`,resultHtml:`<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>null ?? 'default' = <span style="color:#ce9178;">"default"</span></div><div>0 ?? 'default' = <span style="color:#b5cea8;">0</span></div><div>'' ?? 'default' = <span style="color:#ce9178;">""</span></div></div>`},{title:"Array Methods: map, filter, reduce",description:"Transform, filter, and aggregate arrays in a functional programming style.",code:`const numbers = [1, 2, 3, 4, 5];

// map: transform each element
const doubled = numbers.map(n => n * 2);

// filter: keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);

// reduce: aggregate to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>doubled = <span style="color:#b5cea8;">[2, 4, 6, 8, 10]</span></div><div>evens = <span style="color:#b5cea8;">[2, 4]</span></div><div>sum = <span style="color:#b5cea8;">15</span></div></div>'},{title:"Template Literals",description:"Create strings with embedded expressions and multi-line support.",code:`const name = 'World';
const greeting = \`Hello, \${name}!\`;

// Multi-line strings
const html = \`
  <div>
    <h1>\${greeting}</h1>
  </div>
\`;

// Tagged templates
const highlight = (strings, ...values) => 
  strings.reduce((acc, str, i) => 
    \`\${acc}\${str}<b>\${values[i] || ''}</b>\`, '');`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>greeting = <span style="color:#ce9178;">"Hello, World!"</span></div></div>'},{title:"Arrow Functions",description:"Concise function syntax with lexical 'this' binding.",code:`// Traditional function
function add(a, b) { return a + b; }

// Arrow function
const add = (a, b) => a + b;

// Single parameter (no parentheses needed)
const double = n => n * 2;

// Returning object literal
const createUser = name => ({ name, id: Date.now() });`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>add(2, 3) = <span style="color:#b5cea8;">5</span></div><div>double(4) = <span style="color:#b5cea8;">8</span></div></div>'},{title:"Async/Await",description:"Write asynchronous code that looks synchronous. Much cleaner than promise chains.",code:`// Promise-based
fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log(data));

// Async/await
async function getUser() {
  const res = await fetch('/api/user');
  const data = await res.json();
  return data;
}

// Error handling
async function fetchData() {
  try {
    const data = await getUser();
  } catch (error) {
    console.error(error);
  }
}`,resultHtml:'<div style="padding:16px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;color:white;text-align:center;">Async/await makes async code readable like sync code!</div>'},{title:"Promise.all & Promise.allSettled",description:"Run multiple promises concurrently and wait for all to complete.",code:`const urls = ['/api/users', '/api/posts', '/api/comments'];

// Promise.all - fails fast if any reject
const results = await Promise.all(
  urls.map(url => fetch(url).then(r => r.json()))
);

// Promise.allSettled - waits for all, never rejects
const results = await Promise.allSettled(
  urls.map(url => fetch(url))
);
// results: [{status: 'fulfilled', value}, {status: 'rejected', reason}]`,resultHtml:'<div style="display:flex;gap:8px;flex-wrap:wrap;"><div style="padding:10px 16px;background:#22c55e;border-radius:6px;color:white;font-size:13px;">fulfilled</div><div style="padding:10px 16px;background:#22c55e;border-radius:6px;color:white;font-size:13px;">fulfilled</div><div style="padding:10px 16px;background:#ef4444;border-radius:6px;color:white;font-size:13px;">rejected</div></div>'},{title:"Object Shorthand Properties",description:"Create objects more concisely when variable names match property names.",code:`const name = 'John';
const age = 30;

// Old way
const user1 = { name: name, age: age };

// Shorthand
const user2 = { name, age };

// Method shorthand
const obj = {
  greet() {
    return 'Hello!';
  }
};`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>user2 = <span style="color:#b5cea8;">{ name: "John", age: 30 }</span></div></div>'},{title:"Array.find & Array.findIndex",description:"Find the first element or its index that matches a condition.",code:`const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// Find first match
const bob = users.find(u => u.name === 'Bob');

// Find index of first match
const bobIndex = users.findIndex(u => u.name === 'Bob');

// Returns undefined/-1 if not found
const dave = users.find(u => u.name === 'Dave');`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>bob = <span style="color:#b5cea8;">{ id: 2, name: "Bob" }</span></div><div>bobIndex = <span style="color:#b5cea8;">1</span></div><div>dave = <span style="color:#569cd6;">undefined</span></div></div>'},{title:"Array.includes & String.includes",description:"Check if an array contains a value or a string contains a substring.",code:`const fruits = ['apple', 'banana', 'orange'];

// Array includes
fruits.includes('banana');  // true
fruits.includes('grape');   // false

// String includes
const str = 'Hello, World!';
str.includes('World');      // true
str.includes('world');      // false (case-sensitive)`,resultHtml:`<div style="display:flex;gap:12px;flex-wrap:wrap;"><div style="padding:10px 16px;background:#22c55e;border-radius:6px;color:white;">includes('banana') = true</div><div style="padding:10px 16px;background:#ef4444;border-radius:6px;color:white;">includes('grape') = false</div></div>`},{title:"Object.entries, Object.keys, Object.values",description:"Convert objects to arrays for easy iteration.",code:`const user = { name: 'John', age: 30, city: 'NYC' };

Object.keys(user);    // ['name', 'age', 'city']
Object.values(user);  // ['John', 30, 'NYC']
Object.entries(user); // [['name','John'], ['age',30], ['city','NYC']]

// Iterate with entries
for (const [key, value] of Object.entries(user)) {
  console.log(\`\${key}: \${value}\`);
}`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;font-size:13px;"><div>keys: <span style="color:#b5cea8;">["name", "age", "city"]</span></div><div>values: <span style="color:#b5cea8;">["John", 30, "NYC"]</span></div></div>'},{title:"Default Parameters",description:"Set default values for function parameters.",code:`// Old way
function greet(name) {
  name = name || 'Guest';
  return \`Hello, \${name}!\`;
}

// Default parameters
function greet(name = 'Guest') {
  return \`Hello, \${name}!\`;
}

// Works with objects too
function createUser({ name = 'Anonymous', role = 'user' } = {}) {
  return { name, role };
}`,resultHtml:`<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>greet() = <span style="color:#ce9178;">"Hello, Guest!"</span></div><div>greet('John') = <span style="color:#ce9178;">"Hello, John!"</span></div></div>`},{title:"Rest Parameters",description:"Collect multiple arguments into an array.",code:`// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3);       // 6
sum(1, 2, 3, 4, 5); // 15

// Combine with regular params
function log(level, ...messages) {
  console.log(\`[\${level}]\`, ...messages);
}`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>sum(1, 2, 3) = <span style="color:#b5cea8;">6</span></div><div>sum(1, 2, 3, 4, 5) = <span style="color:#b5cea8;">15</span></div></div>'},{title:"Array.flat & Array.flatMap",description:"Flatten nested arrays and combine map + flatten operations.",code:`const nested = [1, [2, 3], [4, [5, 6]]];

// Flatten one level
nested.flat();     // [1, 2, 3, 4, [5, 6]]

// Flatten all levels
nested.flat(Infinity); // [1, 2, 3, 4, 5, 6]

// flatMap = map + flat(1)
const sentences = ['Hello world', 'How are you'];
sentences.flatMap(s => s.split(' '));
// ['Hello', 'world', 'How', 'are', 'you']`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;font-size:13px;"><div>flat() = <span style="color:#b5cea8;">[1, 2, 3, 4, [5, 6]]</span></div><div>flat(Infinity) = <span style="color:#b5cea8;">[1, 2, 3, 4, 5, 6]</span></div></div>'},{title:"Set for Unique Values",description:"Store unique values of any type. Perfect for removing duplicates.",code:`// Remove duplicates from array
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// Set operations
const set = new Set([1, 2, 3]);
set.add(4);      // {1, 2, 3, 4}
set.has(2);      // true
set.delete(2);   // {1, 3, 4}
set.size;        // 3`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>[1, 2, 2, 3, 3, 3]</div><div style="margin-top:8px;">unique = <span style="color:#b5cea8;">[1, 2, 3]</span></div></div>'},{title:"Map for Key-Value Pairs",description:"Store key-value pairs where keys can be any type (unlike objects).",code:`const map = new Map();

// Any type as key
map.set('string', 'value1');
map.set(42, 'value2');
map.set({ id: 1 }, 'value3');

map.get('string');  // 'value1'
map.has(42);        // true
map.size;           // 3

// Iterate
for (const [key, value] of map) {
  console.log(key, value);
}`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;font-size:13px;"><div><span style="color:#ce9178;">"string"</span> => <span style="color:#ce9178;">"value1"</span></div><div><span style="color:#b5cea8;">42</span> => <span style="color:#ce9178;">"value2"</span></div><div><span style="color:#b5cea8;">{ id: 1 }</span> => <span style="color:#ce9178;">"value3"</span></div></div>'},{title:"Logical Assignment Operators",description:"Combine logical operators with assignment for cleaner code.",code:`let a = null;
let b = 'hello';
let c = 0;

// Nullish assignment (??=)
a ??= 'default';  // a = 'default'
b ??= 'default';  // b = 'hello' (unchanged)

// OR assignment (||=)
c ||= 10;         // c = 10 (0 is falsy)

// AND assignment (&&=)
let user = { name: 'John' };
user.name &&= user.name.toUpperCase(); // 'JOHN'`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>a = <span style="color:#ce9178;">"default"</span></div><div>b = <span style="color:#ce9178;">"hello"</span></div><div>c = <span style="color:#b5cea8;">10</span></div></div>'},{title:"String Methods: padStart, padEnd",description:"Pad strings to a certain length with a specified character.",code:`// Pad start
'5'.padStart(3, '0');     // '005'
'42'.padStart(5, '*');    // '***42'

// Pad end
'Hi'.padEnd(5, '.');      // 'Hi...'

// Useful for formatting
const price = 9.99;
\`$\${price.toFixed(2).padStart(8)}\`;  // '$    9.99'

// Time formatting
const hours = 9;
\`\${String(hours).padStart(2, '0')}:00\`; // '09:00'`,resultHtml:`<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>'5'.padStart(3, '0') = <span style="color:#ce9178;">"005"</span></div><div>'Hi'.padEnd(5, '.') = <span style="color:#ce9178;">"Hi..."</span></div></div>`},{title:"Array.at() for Negative Indexing",description:"Access array elements with negative indices to count from the end.",code:`const arr = ['a', 'b', 'c', 'd', 'e'];

// Positive index (same as bracket notation)
arr.at(0);   // 'a'
arr.at(2);   // 'c'

// Negative index (count from end)
arr.at(-1);  // 'e' (last element)
arr.at(-2);  // 'd' (second to last)

// Old way to get last element
arr[arr.length - 1];  // 'e'`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>arr.at(0) = <span style="color:#ce9178;">"a"</span></div><div>arr.at(-1) = <span style="color:#ce9178;">"e"</span></div><div>arr.at(-2) = <span style="color:#ce9178;">"d"</span></div></div>'},{title:"Object.fromEntries",description:"Convert an array of key-value pairs back into an object.",code:`// From entries array
const entries = [['name', 'John'], ['age', 30]];
Object.fromEntries(entries); // { name: 'John', age: 30 }

// Transform object values
const prices = { apple: 1, banana: 2, orange: 3 };
const doubled = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 2])
); // { apple: 2, banana: 4, orange: 6 }

// From Map
const map = new Map([['a', 1], ['b', 2]]);
Object.fromEntries(map); // { a: 1, b: 2 }`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;font-size:13px;"><div>fromEntries = <span style="color:#b5cea8;">{ name: "John", age: 30 }</span></div><div>doubled = <span style="color:#b5cea8;">{ apple: 2, banana: 4, orange: 6 }</span></div></div>'},{title:"Numeric Separators",description:"Use underscores in numbers for better readability.",code:`// Large numbers are easier to read
const billion = 1_000_000_000;
const bytes = 0xFF_FF_FF_FF;
const binary = 0b1010_0001_1000_0101;

// Decimals too
const price = 19_999.99;

// The underscores are ignored
1_000_000 === 1000000;  // true`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>1_000_000_000 = <span style="color:#b5cea8;">1000000000</span></div><div>19_999.99 = <span style="color:#b5cea8;">19999.99</span></div></div>'},{title:"Private Class Fields",description:"Create truly private properties in classes using # prefix.",code:`class BankAccount {
  #balance = 0;  // Private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
account.getBalance();  // 100
account.#balance;      // SyntaxError!`,resultHtml:'<div style="padding:16px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:8px;color:white;text-align:center;font-size:14px;">account.#balance throws SyntaxError - truly private!</div>'},{title:"Array.prototype.toSorted & toReversed",description:"Create sorted/reversed copies without mutating the original array.",code:`const arr = [3, 1, 4, 1, 5];

// Old way (mutates original)
const sorted1 = [...arr].sort();

// New way (doesn't mutate)
const sorted2 = arr.toSorted();       // [1, 1, 3, 4, 5]
const reversed = arr.toReversed();    // [5, 1, 4, 1, 3]
const spliced = arr.toSpliced(1, 2);  // [3, 1, 5]

console.log(arr); // [3, 1, 4, 1, 5] - unchanged!`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;font-size:13px;"><div>original = <span style="color:#b5cea8;">[3, 1, 4, 1, 5]</span></div><div>toSorted() = <span style="color:#b5cea8;">[1, 1, 3, 4, 5]</span></div><div>toReversed() = <span style="color:#b5cea8;">[5, 1, 4, 1, 3]</span></div></div>'},{title:"Ternary Operator",description:"Shorthand for if-else statements, perfect for conditional assignments.",code:`const age = 20;

// Instead of if-else
let status;
if (age >= 18) {
  status = 'adult';
} else {
  status = 'minor';
}

// Use ternary
const status = age >= 18 ? 'adult' : 'minor';

// Nested (use sparingly)
const grade = score >= 90 ? 'A'
            : score >= 80 ? 'B'
            : score >= 70 ? 'C' : 'F';`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>status = <span style="color:#ce9178;">"adult"</span></div></div>'},{title:"Short-Circuit Evaluation",description:"Use && and || for concise conditional logic.",code:`// AND (&&) - returns first falsy or last value
const result1 = true && 'hello';   // 'hello'
const result2 = false && 'hello';  // false

// Conditional execution
isLoggedIn && showDashboard();

// OR (||) - returns first truthy or last value
const name = userName || 'Guest';
const port = process.env.PORT || 3000;

// Combine for defaults
const config = userConfig && userConfig.theme || 'light';`,resultHtml:`<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;"><div>true && 'hello' = <span style="color:#ce9178;">"hello"</span></div><div>false && 'hello' = <span style="color:#569cd6;">false</span></div><div>'' || 'Guest' = <span style="color:#ce9178;">"Guest"</span></div></div>`},{title:"Console Methods Beyond log",description:"Use specialized console methods for better debugging.",code:`// Group related logs
console.group('User Details');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();

// Table format
console.table([{name: 'John', age: 30}, {name: 'Jane', age: 25}]);

// Timing
console.time('loop');
for(let i = 0; i < 1000000; i++) {}
console.timeEnd('loop'); // loop: 2.5ms

// Styled output
console.log('%cStyled!', 'color: red; font-size: 20px');`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;font-size:12px;"><div style="color:#6a9955;">▼ User Details</div><div style="padding-left:16px;">Name: John</div><div style="padding-left:16px;">Age: 30</div><div style="margin-top:8px;color:#dcdcaa;">loop: 2.5ms</div></div>'},{title:"JSON.stringify with Replacer & Space",description:"Format and filter JSON output for better readability.",code:`const user = { name: 'John', password: 'secret', age: 30 };

// Pretty print with 2-space indent
JSON.stringify(user, null, 2);

// Filter properties with replacer array
JSON.stringify(user, ['name', 'age']);
// '{"name":"John","age":30}'

// Transform with replacer function
JSON.stringify(user, (key, value) => 
  key === 'password' ? undefined : value
);`,resultHtml:'<div style="font-family:monospace;padding:12px;background:#1e1e1e;border-radius:8px;color:#9cdcfe;font-size:12px;white-space:pre;">{<br>  "name": "John",<br>  "age": 30<br>}</div>'},{title:"Debounce Function",description:"Limit how often a function can fire. Great for search inputs and resize events.",code:`function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Usage
const handleSearch = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`);
}, 300);

input.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});`,resultHtml:'<div style="padding:16px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);border-radius:8px;color:white;text-align:center;">Only fires after user stops typing for 300ms!</div>'}],S={class:"tips-container"},j=["onClick"],C={class:"tip-title"},_={key:0,class:"tip-content"},O={class:"tip-description"},J={key:0,class:"tip-result"},A=["innerHTML"],N={key:1,class:"tip-code"},F=v({__name:"JsTip",setup(T){const p=H,n=f(new Set);function u(i){n.value.has(i)?n.value.delete(i):n.value.add(i),n.value=new Set(n.value)}return(i,t)=>(s(),o("div",S,[(s(!0),o(m,null,g(y(p),(a,r)=>(s(),o("div",{key:r,class:c(["tip-card",{"tip-card--active":n.value.has(r)}])},[e("button",{onClick:P=>u(r),class:"tip-header"},[t[1]||(t[1]=h('<div class="tip-icon" data-v-5c40fc36><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-5c40fc36><path d="M9 18h6" data-v-5c40fc36></path><path d="M10 22h4" data-v-5c40fc36></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" data-v-5c40fc36></path></svg></div>',1)),e("span",C,l(a.title),1),e("span",{class:c(["tip-arrow",{"tip-arrow--open":n.value.has(r)}])},[...t[0]||(t[0]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"m6 9 6 6 6-6"})],-1)])],2)],8,j),b(w,{name:"expand"},{default:x(()=>[n.value.has(r)?(s(),o("div",_,[e("p",O,l(a.description),1),a.resultHtml?(s(),o("div",J,[t[2]||(t[2]=e("div",{class:"tip-result-header"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),e("circle",{cx:"12",cy:"12",r:"3"})]),e("span",null,"Output")],-1)),e("div",{class:"tip-result-preview",innerHTML:a.resultHtml},null,8,A)])):d("",!0),a.code?(s(),o("div",N,[t[3]||(t[3]=e("div",{class:"tip-code-header"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("polyline",{points:"16 18 22 12 16 6"}),e("polyline",{points:"8 6 2 12 8 18"})]),e("span",null,"JavaScript Code")],-1)),e("pre",null,[e("code",null,l(a.code),1)])])):d("",!0)])):d("",!0)]),_:2},1024)],2))),128))]))}}),B=k(F,[["__scopeId","data-v-5c40fc36"]]);export{B as default};
