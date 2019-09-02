This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project setup

1. Install NodeJS (above the 8 version is recommended)
https://nodejs.org/en/download/package-manager/

1. Install MongoDB
https://docs.mongodb.com/manual/administration/install-community/
and create `fonts-creator` database

1. Open terminal in a current directory and put commands here
```bash
npm install -g yarn
yarn install
```

1. Now you are able to start development with `yarn dev`


## Available Scripts

In the project directory, you can run:

### `yarn install`
Will setup all dependencies for front-end and back-enf


### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `yarn build`
Compiles and minifies for production


### `yarn lint`
Verify code style


## Run on production
For first installation, run next steps on server:
1. Install NodeJS, MongoDB and Nginx or Apache
1. Install pm2 deamon on server `npm install pm2 -g` (more info http://pm2.keymetrics.io/)
1. Clone code to some folder `git clone replace-with-provided-repo-url`
1. Navigate to project folder and copy env files `cp client/.env.example client/.env && cp server/.env.example server/.env`
1. Edit `client/.env` to specify server url and `server/.env` if you want to change default port
1. Build front-end with `yarn build`
1. Navigate to server subfolder and run deamon `pm2 start ./bin/www`
1. Configure Nginx or Apache to serve statics from `client/build` folder and proxy your domain to specified at `server/.env` app port
(nginx example https://stackoverflow.com/questions/29383159/how-do-you-serve-static-files-from-an-nginx-server-acting-as-a-reverse-proxy-for with 80 port instead 8080 and proper path for statics, of course)


To update app:
1. Navigate to project folder and pull new code `git pull`
1. Build front-end with `yarn build`
1. Navigate to server subfolder and restart deamon `pm2 restart ./bin/www`
