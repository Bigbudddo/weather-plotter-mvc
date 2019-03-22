### Weather Plotter

![Screenshot1](https://github.com/Bigbudddo/weather-plotter-mvc/blob/master/screenshots/chart-view.png "ChartView Screenshot")

Welcome to weather plotter. A small C# MVC Web Application written initially as a technical test in a private repository but now used to learn & explore the uses of MongoDB in web applications. The idea is that the application will give you some nice charts for a city/town of your choice using the search-bar provided. Data will be shown as an line/area chart detailing the following information:

* Temperature. 
* Humidity.
* Rain.
* Snow.

### Development

The application is written as an ASP.NET C# MVC Web-Application using Web Api 2.0 for the backend and [AngularJS](https://angularjs.org/) for the front-end framework. [Highchart & Highmaps](https://www.highcharts.com/) were used for data display whilst [BulmaIO](https://bulma.io/) was used for styling the application. Forecast data is fetched from the [OpenWeatherMap](https://openweathermap.org/). Finally, [MongoDB](https://www.mongodb.com/) was used to store the search data.

### Running The Application

To run the application yourself; you will need a copy of Visual Studio 2017 Community Edition installed on your local machine. Download the repository and open the .sln file to get access to the project files.

You need to configure the *app.js* file in the Client App folder to target the local running Api to debug correctly. Also, you need to specify a *settings.config* file in the root of the WeatherPlotter.Api folder. Copy the following into the *settings.config* file you create.

```xml
<?xml version="1.0"?>
<appSettings>
  <add key="corsWhitelist" value="*" />
  <add key="openWeatherApiKey" value="<YOUR API KEY>" />
  <add key="mongoDbConnection" value="<YOUR MONGODB CONNECTION STRING>" />
</appSettings>
```