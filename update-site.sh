#!/bin/bash
# A script to update the site

git pull
killall node
node server.js
