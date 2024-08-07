#!/bin/bash

# Install Chrome dependencies and Chrome itself
apt-get update
apt-get install -y wget gnupg
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
apt-get update
apt-get install -y google-chrome-stable

# Log the Chrome executable path
CHROME_PATH=$(which google-chrome-stable)
echo "Chrome executable path: $CHROME_PATH"

# Install npm dependencies
npm install

# Install Puppeteer with the necessary Chromium
npx puppeteer install chrome

# Create a .env file with the Chrome executable path
echo "CHROME_PATH=$CHROME_PATH" >> .env
