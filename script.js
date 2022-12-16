//create an obj to store functions and varibles for the API
const weather = {           
    apiKey: "864c5457497fab035cc59942e078f492",   //access the weather data from openweather.org
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey                   //gets the weather data from API 
      )
        .then((response) => {
          if (!response.ok) {
            //throw an error if data is missing
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {   
      //extract from data obj and store them as variables
      const { name } = data;
      const { icon, description } = data.weather[0];   
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
       //display the weather data by replacing DOM content
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
       //get random background images from unsplash.com
      document.body.style.backgroundImage ="url('https://source.unsplash.com/1920x1080/?" + name + "')";  
    },
    search: function () {    //add a search bar
      this.fetchWeather(document.querySelector(".search-bar").value);   
    },
  };
  //add a click eventListener
  document.querySelector(".search button").addEventListener("click", function () {       
    weather.search();
  });
  
  document.querySelector(".search-bar")
  .addEventListener("keyup", function (event) {       //adding a keyup eventlistener
      if (event.key == "Enter") {   //pressing enter key used to search 
        weather.search();
      }
    });
  
 weather.fetchWeather("Nairobi");
  