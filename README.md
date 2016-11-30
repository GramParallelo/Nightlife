Nightlife

see it live: https://frozen-harbor-81818.herokuapp.com/

Notes:
* create-react-app on the client proxied to Express server.
* local dev uses node-foreman to run client and server process together.
* user --> client (webpack-dev-server) hosted on port 3000 ---proxy to---> server hosted on port 8080

* Push to production from /server . (( first run /client npm run build create static folder served in production ))
* First change Procfile to ==> web: npm run server-prod


TODO:
* refactoring
* design improvements
* more functionality
