# Welcome!

Welcome to Condor's React.js assessment challenge!

Please fork the repo to start. Once finished, issue a pull request to our repo so we can review your solution.

This challenge requires:

- NodeJS (> v14.7.0)
- NPM or Yarn
- A cup of ☕ or 🍵

The repo is pre-configured, so just running `npm i` or `yarn` should install these basic packages:

- Parcel + React.js: To serve and build a simple front-end.
- Json Server: To serve and expose a basic json db.

In the main `package.json` you'll have access to the following scripts:

- `npm run app`: To run the react app.
- `npm run server`: To start the local db.

You may use any other package of your choice to enrich your development experience.

## The challenge

> _Tasks are not ordered nor weighted! First, before coding, read all items carefully and prioritize as you see fit._

During the SOW meeting, our customer voiced these requests:

> We need a simple web page for our students.
>
> They should be able to select the university they are interested in and add it to a list to later compare their weather data.
>
> Nobody likes to study in a rainy day.

In response to our client's request, we made a simple wireframe that we need you to recreate. The wireframe images can be found in the `./graphics` folder with the name of the required screen and width, like `search`.

Since this is only wireframe, feel free to use any ui lib or style you like.

Do note that responsiveness has to perform correctly. We wont be evaluating design quality, but responsiveness-related-code quality.

## The task

Using react and the apis referenced in the resources section, create a simple web app consisting of four screens:

1. Login: A login/register screen
1. Search: A universities search screen, with results
1. Profile-compare: The user profile with a list of the user's saved universities and a compare panel to show the selected universities countries data

Aside from the screens, the app has to comply with the following specs:

- Search values have to be autocompleted with the correct (or close-to-correct) university name.
- A menu to go to the search page, logout and the user profie.
- User data must include at least email, password and a universities list.
  > Use Json-server for this. Do not worry about hashing or security as this is only a basic local db. We just want to see how you handle the data.

Personal user data (like the email) may or not be shown depending on your preference.

Finally, if any design element does not comply with best practices, we expect you to take care of fixing it.

## What we'll be looking at

<!-- - Tests -->

- Clean, formatted, readable, KISS, DRY code
- Commits structures and information
- Componentization and reusability
- State management
- API implementation
- UI-Logic detachment
- Error handling
- Design responsiveness
- Coding in accordance with industry best practices
- UX patterns

## Resources

- [React](https://reactjs.org/)
- [Parcel](https://parceljs.org/recipes/react/)
- [JSON Server](https://github.com/typicode/json-server#getting-started)
- [Hipolabs Universities API](https://github.com/Hipo/university-domains-list-api): An API and JSON list with domains, names and countries of most of the universities of the world.
- [7Timer](https://github.com/Yeqzids/7timer-issues/wiki/Wiki): Weather data.
- [RestCountries](https://restcountries.com/#api-endpoints-v3-name): Rest api with countries data like latitude and longitude.

## Submission Guidelines

Please fork the repo to start. Once finished, issue a pull request to our repo so we can review your solution.
