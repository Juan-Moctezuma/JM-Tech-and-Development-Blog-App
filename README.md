# JM Tech & Development

### Introduction

JM Tech & Development (JMTD) is a fictional blog site for developers and technology enthusiasts. 
This full-stack application allows the user to create / delete both blog posts and comments.
JMTD utilizes RESTful architecture and performs CRUD operations for the user (depending on his/her 
authorization/ownership). This app is connected to a MongoDB (NoSQL Database) cluster which allows 
data to get stored. Errors are handled through flash messages to provide the user with feedback.

### Link
Heroku: https://jm-tech-and-development.herokuapp.com/

### Does the code require a local web server to run?
Yes. Be sure to select Port 3000 and 0.0.0.0 IP Address on your app.js (or server.js)

### Directory Tree
BLOG_SITE_(JMTD)
|
|
├── middleware
│   └── index.js
├── models
│   ├── article.js
│   ├── comment.js
│   └── user.js
├── node_modules (NOT INCLUDED IN REPOSITORY)  
├── package-lock.json
├── package.json
├── public
│   └── stylesheets
│       ├── landing.css
│       └── main.css
├── routes
│   ├── articles.js
│   ├── comments.js
│   └── index.js
├── seeds.js
├── server.js
└── views
    ├── articles
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    ├── comments
    │   ├── edit.ejs
    │   └── new.ejs
    ├── landing.ejs
    ├── login.ejs
    ├── partials
    │   ├── footer.ejs
    │   └── header.ejs
    └── register.ejs


### Technologies

1. HTML
2. CSS
   * Responsive Framework: Bootstrap 4
3. JavaScript
   * ES6
4. MongoDB (NoSQL Database)
5. Node.js (Server-side)
6. NPM Modules:
   * Ejs
   * Express / Express-Session
   * Body-Parser
   * Mongoose
   * Method-Override
   * Connect-Flash
   * Passport / Passport-Local / Passport-Local-Mongoose
   
