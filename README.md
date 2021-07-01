# BEXH

Create .env.development file with the following:

REACT_APP_MOCKAROO_API_KEY=


To run with docker (local):

docker-compose up -d -build  
docker images  
pwd  
docker run -it -p 3000:3000 -v <pwd_output>/bexh-web-app/src:/bexh-web-app/src <image_id>  


To run with docker (prod):

docker-compose  build --build-arg app_env=production


To stop docker:

docker-compose stop


To bring everything down and remove container:

docker-compose down --volumes


To run without docker (for some odd reason):

cd bexh-web-app
yarn start

Note: vs code may try to automagically change to using import React from './node_modules/react'  
rather than 'react'. Consider using 'react' if that is the case. Looking into this issue.
