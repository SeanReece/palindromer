#!/bin/bash
cd ..
npm prune --production
docker build -t seanreece/palindromer-node-cent .