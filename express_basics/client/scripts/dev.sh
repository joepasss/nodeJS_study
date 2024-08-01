#!/bin/bash

export NODE_OPTIONS="--import ./register-hooks.js --no-deprecation"
npx nodemon --watch "src/**/*.ts" --exec "ts-node" ./server/index.ts
