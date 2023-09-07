# Weather App Readme

This README provides an overview of the Weather App, which is a simple web application built using React. The app displays weather information for the user's current location and the forecast for the next few days.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [APIs Used](#apis-used)

## Features

- **Location-based Weather:** The app uses the user's geolocation to fetch the weather information for their current location.
- **Current Weather:** It displays the current weather, including the date, temperature range, and weather conditions.
- **Forecast:** The app provides a 3-day weather forecast with details such as date, temperature range, and weather condition.
- **Images:** It dynamically displays weather condition images based on the current weather condition.

## Usage

- The app will request access to your geolocation. Allow it to fetch weather information based on your current location.
- You will see the current weather information along with a 3-day forecast.
- Explore the weather conditions and images displayed for each day.

## APIs Used

The Weather App utilizes the following APIs to provide weather information:

### 7timer Weather API:

- [URL](http://www.7timer.info/bin/api.pl)
- Purpose: Fetches weather data based on latitude and longitude coordinates.

### OpenCageData Geocoding API:

- [URL](https://api.opencagedata.com/geocode/v1/json)
- Purpose: Geocodes latitude and longitude coordinates to determine the city or location.
