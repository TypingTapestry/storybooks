# Savory
A food-focused social media app where users can post pictures and recipes of their favorite foods, interact with recipes made public, and search recipes using keywords.

<!-- link to project, with embedded image -->

## How It's Made

**Tech Used:**
CSS, JavaScript, Handlebars, Express as a framework for Node.js

**Packages/Dependencies Used:**
connect-mongo, dotenv, express, express-handlebars, express-session, method-override, moment, mongodb, mongoose, morgan, nodemon, passport, passport-google-oauth20

This web app began as a simple program where users were able to document text-based content, originally just stored in a database and visible on their personal profile. Using MVC, our next step was to create a scrolling public feed, similar to modern social media sites, where users could view their own content and other users' content in a chronological order. From there, our team has been working on implementing an image upload feature using the CKEditor Ecosystem.

## Usage

- Create a `config.env` file and add the following as `key: value`
    - PORT: `any port, e.g. 3000`
    - MONGO_URI: `your database URI`
    - GOOGLE_CLIENT_ID: `your Google OAuth credential string`
    - GOOGLE_CLIENT_SECRET: `your Google OAuth secret credential string`

```
# Install Dependencies
npm install

# Run in Development
npm run dev

# Run in Production
npm start
```

## Optimizations

Our team looks forward to implementing a section for a recipe's origin within each post, the ability to search for recipes posted by a specific user, and a successful image upload functionality with the CKEditor.

## Lessons Learned

Through creating this web-based social media app, we navigated working with a new team of talented engineers and learned how to come together as a community to delegate tasks and depend on each other depending on each dev's area of expertise. Working to create a project using the MVC architectural paradigm was an opportunity for growth, and as we troubleshooted each feature we developed a more well-rounded understanding of middleware, what it entails, and its capabilities.

## Savory Team

- <a href="https://github.com/TypingTapestry">Dominic L.</a>
- <a href="https://github.com/swingleSara">Sara S.</a>
- <a href="https://github.com/narcisods">Narciso S.</a>
- <a href="https://github.com/lst4rk">Liv S.</a>
- <a href="https://github.com/GreshamFedora">Gresham F.</a>
- <a href="https://github.com/saralarue">Sara L.</a>