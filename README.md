# React Base App - Task Manager (redux)

## Available Commands

In the project directory, you can run:

### `make start`
Installs all dependencies. (docker, node)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Also, runs json-server for API endpoints.
Open [json-server](https://www.npmjs.com/package/json-server) to view more details about this package.
Currently, available two endpoints:
- [http://localhost:3001/users](http://localhost:3001/users)
- [http://localhost:3001/tasks](http://localhost:3001/tasks)

DB file located here `./docker/json-server/db.json`


### `make stop`

Stop all docker containers

### `make node-build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `make nodec c="$command"`

Runs every command via node docker container.
Example `make nodec c="npm i -S moment"` \
Above command is relevant to: `npm i -S moment`
