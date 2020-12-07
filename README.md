
# CSV to JSON Converter
This is CSV to JSON file converter. 
In simple terms, it takes CSV files from the user and converts it into JSON format.

Live version of app: https://csv-to-json-converter.herokuapp.com/

## Table of Contents
1. [Pre-requisite](#pre-requisite)
1. [Implementation](#implementation)
1. [Demo](#demo)
1. [EXTRAS: How to setup Heroku and Travis CI](#extras-how-to-setup-heroku-and-travis-ci)
1. [Technologies Used](#technologies-used)

## Pre-requisite
- Node.js
- npm

## Implementation
- Clone the repository
- Install dependencies 
```
npm install
```
- Run the server
```
node server.js
```
- Open a browser and browse 'localhost:3000'
- You can test the working by uploading the provided csv files named as testFiles in root directory.

## Demo
<img src="https://raw.githubusercontent.com/kirito-k/CSV-to-JSON-Converter/master/Demo/1.gif" title="Short Demo gif" />

## EXTRAS: How to setup Heroku and Travis CI
- Create an account on Travis and connect it to your Github when prompted. 

Travis will ask which projects to add to the Travis workflow. Add the project which you want to deploy. 

To see if you linked the repo successfully, go to that repository's settings in GitHub and open the 'Integrations' tab. You can see Travis is added there. 

- Install Travis CLI using following commands
```
sudo apt install ruby ruby-dev
sudo gem install travis
```
- Create an account on Heroku
- Click 'Create new App' for your project.
- Go to the 'Deploy' tab and click the Github logo. Link GitHub repository of your project
- Enable Automatic Deployment and tick 'wait for CI to pass before deploy' since you will be using Travis CI for testing your application before pushing it to production.
- Install Heroku CLI using the following command
```
sudo snap install --classic heroku
```
- Login Heroku through a terminal
```
heroku login
```
- Create a remote reference to your repo
```
heroku git:remote -a app_name_given_in_heroku
```
- Create a .travis.yml file. Copy the contents of my Travis file into yours. You have to make the travis-Heroku key to be inserted in this file. 
- To create Travis api_key and automatically add it into your Travis file
```
- Create a Procfile. This file tells Heroku on how to start our webapp. Create a file named 'Procfile" in root dir and copy the command of your startup app as shown in my Procfile. 
travis encrypt $(heroku auth:token) --add deploy.api_key
```
- The last step is to edit your code and push it to GitHub master.

CONGRATS!! Your CI(Travis) and CD(Heroku) is working and you can check the logs on their website's respective dashboards. 

## Technologies Used
- Node.js (language)
- Express.js (server library)
- Vanilla HTML,CSS
- Travis CI (Continuous Integration)
- Heroku (Continuous Deployment)




It is dockerized app.
exposed at port 80.(underlaying app working on port 3000).
