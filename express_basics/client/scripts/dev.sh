#!/bin/bash

export NODE_OPTIONS="--import ./register-hooks.js --no-deprecation"
npx webpack serve --config ./webpack/webpack.dev.config.ts
