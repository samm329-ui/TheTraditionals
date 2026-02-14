const fs = require("fs");
const path = require("path");


const root = process.cwd();


const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build"
]);


function shouldIgnore(dir) {
  return IGNORE_DIRS.has(path.basename(dir));
}


function scan(dir) {
  if (shouldIgnore(dir)) return;


  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);


    if (fs.statSync(full).isDirectory()) {
      scan(full);
      continue;
    }


    if (!file.match(/\.(js|jsx|ts|tsx)$/)) continue;


    const content = fs.readFileSync(full, "utf8");


    // Ignore type definition files
    if (file.endsWith(".d.ts")) return;


    if (
      content.includes("<Html") &&
      !full.includes(`${path.sep}pages${path.sep}_document`)
    ) {
      console.error(`
❌ BUILD STOPPED: <Html> used outside pages/_document.js
File: ${full}
`);
      process.exit(1);
    }
  }
}


// Router conflict check
const hasApp = fs.existsSync(path.join(root, "app"));
const hasPages = fs.existsSync(path.join(root, "pages"));


if (hasApp && hasPages) {
  console.error(`
❌ BUILD STOPPED: Both App Router (/app) and Pages Router (/pages) detected.
Choose ONE router only.
`);
  process.exit(1);
}


scan(root);


console.log("✅ Next.js build verification passed");