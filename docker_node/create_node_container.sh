#!/bin/bash
docker run -d -p 80:8080 -e NODE_ENV=production --link palindromer-mongo --restart=always seanreece/palindromer-node-cent