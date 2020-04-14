# BEXH

To run with docker:

docker-compose up -d
docker images
pwd
docker run -it -p 3000:3000 -v <pwd_output>/bexh-web-app/src:/bexh-web-app/src <image_id>

To run without docker (for some odd reason):

cd bexh-web-app
yarn start

Note: vs code may try to automagically change to using import React from './node_modules/react'  
rather than 'react'. Consider using 'react' if that is the case. Looking into this issue.
