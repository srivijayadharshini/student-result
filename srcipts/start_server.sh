#!/bin/bash

cd /home/ec2-user/student-result/backend

npm install

nohup node server.js > output.log 2>&1 &