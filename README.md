### Weather Plotter

![Screenshot1](https://github.com/Bigbudddo/arbnco-technical-test-mvc/blob/master/screenshots/chart-view.png "ChartView Screenshot")

Welcome to weather plotter. A small web-application that gives you some nice charts for a city/town of your choice. Data will be shown as an line/area chart detailing the following information:

* Temperature. 
* Humidity.
* Rain.
* Snow.

This Web Application was developed as part of a technical test supplied by [ARBNCO](https://arbnco.com/).

### Access

You can access the live website here: http://weatherplotter.eu-west-1.elasticbeanstalk.com

*note: at the time you are using this, the link might have gone offline.*

### Development

The application is written as an ASP.NET C# MVC Web-Application using Web Api 2.0 for the backend and [AngularJS](https://angularjs.org/) for the front-end framework. [Highchart & Highmaps](https://www.highcharts.com/) were used for data display whilst [BulmaIO](https://bulma.io/) was used for styling the application. Forecast data is fetched from the [OpenWeatherMap](https://openweathermap.org/). Finally, [MongoDB](https://www.mongodb.com/) was used to store the search data.

### Running The Application

See the Access heading for running a live demo of the application! However, if you would like to run the application yourself; you will need a copy of Visual Studio 2017 Community Edition install on your local machine. Download the repository and open the .sln file to get access to the project files.

You need to configure the *app.js* file in the Client App folder to target the local running Api to debug correctly. Also, if you want to target a local install of MongoDB, edit the *Web.Config* file in the Api project.