
# My Nightflix app
The Application is built using React. This is the client-side for an app called myNightflix based on its
existing server-side code (REST API and database).

## Essential Views & Features:
#### Main view
● Returns ALL movies to the user (each movie item with an image, title, and description)
● Filtering the list of movies with a “search” feature
● Ability to select a movie for more details
● Ability to log out
● Ability to navigate to Profile view

#### Single Movie view
● Returns data (description, genre, director, image) about a single movie to the user
● Allows user   s to add a movie to their list of favorites
Login view
● Allows users to log in with a username and password
Signup view
● Allows new users to register (username, password, email, date of birth)
Profile view
● Displays user registration details
● Allows users to update their info (username, password, email, date of birth)
● Displays favorite movies
● Allows users to remove a movie from their list of favorites
● Allows existing users to deregister

## Technical Requirements
● The application is a single-page application (SPA)
● The application uses state routing to navigate between views and share URLs
● The application gives users the option to filter movies using a “search” feature
● The application uses Parcel as its build tool
● The application is written using the React library and in ES2015+
● The application uses Bootstrap as a UI library for styling and responsiveness
● The application is contain function components
● The application is hosted online https://mynightflix.netlify.app

## Installation

Required dependencies:

npm install -g parcel

npm install --save react react-dom

npm install -g process

npm install react-bootstrap bootstrap

#### Testing
Test this project using Parcel: parcel src/index.html

#### Related links: 
https://github.com/weraseemann/myFlix-client
https://github.com/weraseemann/my-movie-api
https://mynightflix.netlify.app