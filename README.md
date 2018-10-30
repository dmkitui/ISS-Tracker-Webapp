# International Space Station Tracker

The International Space Station Tracker is a web application that tracks and displays the dynamic position of the 
[International Space Station](https://en.wikipedia.org/wiki/International_Space_Station).

A user can also sign up and be informed when the ISS will over-fly the user's current location as determined by the web app.

The webapp is live [http://iss-tracker-webapp.herokuapp.com/home](http://iss-tracker-webapp.herokuapp.com/home).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have [Node JS](https://nodejs.org) installed.

### Installing

In a terminal: 
1. Clone this repo:

    ```git clone https://github.com/dmkitui/ISS-tracker-webapp.git```
2. Go into the application directory:
    
    ```cd ISS-tracker-webapp```
3. Install required dependancies:

    ```npm install```
    
4. Setup MongoDB. Go to [https://mlab.com/] and sign in or set up an account and setup a database for your instance of 
this webapp to use. Follow [this tutorial](http://fredrik.anderzon.se/2017/01/17/setting-up-a-free-mongodb-database-on-mlab-and-connecting-to-it-with-node-js/)
5. After obtaining the mLab Mongo DB URL, set it as an environment variable as below:


    For **Mac/Linux** users:
       ```export MONGOLAB_URI=<YOUR MONGO URL>```

    For **Windows** users: 
       ```SET MONGOLAB_URI=<YOUR MONGO URL>```
       
6. In order to properly display the maps, you will also need to [obtain a GOOGLE MAPS API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) and set it as an 
environment variable **GOOGLE_API_KEY**. 


    For **Mac/Linux** users:
       ```export GOOGLE_API_KEY=<GOOGLE_API_KEY>```

    For **Windows** users: 
       ```SET GOOGLE_API_KEY=<GOOGLE_API_KEY>```
       
7. For added app security, set an enviroment variable **SESSION_SECRET**
    For **Mac/Linux** users:
       ```export SESSION_SECRET=<your_long_string_of_random_characters>```

    For **Windows** users: 
       ```SET SESSION_SECRET=<your_long_string_of_random_characters>```

8. Type ```nodemon``` to start the server
9. In your browser, got to:  [http://localhost:3000/home]()


## Running the tests

To run the tests, in your terminal, run:
```npm test```

## Authors

* **[Daniel Kitui](https://github.com/dmkitui)**

## License

This project is licensed under the MIT License.

## Acknowledgments

* Andela JS Restacking Initiative
