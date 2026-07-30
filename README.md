# NASA APOD Search

## Project Overview

NASA APOD Search is a responsive single-page web application that uses NASA's Astronomy Picture of the Day API.

The application allows users to select a past or current date and retrieve the astronomy picture for that day. It displays the title, date, image, and explanation provided by NASA.

Users can also save images as favourites. The favourites are stored in the browser using local storage, so they remain available after the page is refreshed.

## Features

- Search NASA APOD by date
- Prevent future date searches
- Display the APOD title
- Display the APOD date
- Display the APOD image
- Display the APOD explanation
- Open the high-definition image in a new browser tab
- Save images to favourites
- Store favourites using local storage
- Delete saved favourites
- Responsive layout for different screen sizes
- Accessible image alternative text
- Loading and error messages

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap
- NASA APOD API
- Fetch API
- Local Storage

## Project Files

- `index.html` contains the page structure.
- `style.css` contains the custom design and responsive styling.
- `script.js` contains the API request, event listeners, display functions, and favourites management.
- `README.md` contains the project report.

## Development Process

I began by creating the HTML structure for the title, date form, APOD result, and favourites section.

I then used Bootstrap and custom CSS to style the application and make the layout responsive.

JavaScript event listeners were added to handle the form submission and button interactions. The Fetch API was used to request APOD data from NASA.

The returned JSON data was used to display the image title, date, picture, and explanation. I also added local storage so users can save and delete favourite images.

## Challenges

One challenge was handling the different media types returned by the NASA API. Some APOD results are images, while others are videos.

Another challenge was saving complete APOD objects in local storage and loading them again when the page refreshed.

I solved these problems by checking the `media_type` property and using `JSON.stringify()` and `JSON.parse()` for local storage.

## External Resources

- NASA APOD API
- Bootstrap documentation
- MDN Web Docs for Fetch API and Local Storage