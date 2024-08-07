#!/bin/bash

# Install npm dependencies
npm install

# Ensure Puppeteer installs its own Chromium
npx puppeteer install

# Print the installed Chromium executable path for debugging
CHROME_EXECUTABLE_PATH=$(node -e "console.log(require('puppeteer').executablePath())")
echo "Chromium executable path: $CHROME_EXECUTABLE_PATH"
