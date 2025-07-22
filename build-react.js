#!/usr/bin/env node
const { build } = require("estrella");
build({
  entry: "src/react/index.tsx",
  outfile: "public/build/index.js",
  bundle: true,
  sourcemap: 'inline'
});
