#!/usr/bin/env node
const { build } = require("estrella");
build({
  entry: "src/index.ts",
  outfile: "public/build/index.js",
  bundle: true,
  sourcemap: 'inline'
});
