const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const infoTxt = document.querySelector(".info-txt");
const inputField = document.querySelector("input");
const locationBtn = document.querySelector("button");
const weatherIcon = document.querySelector(".weather-part img");
const arrowBack = document.querySelector("header i");

let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    // if browser supports geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("You browser do not support geolocation api");
  }
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&units=metric&lon=${longitude}&appid=${apiKey}`;
  fetchData();
}
function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

const apiKey = `68ac8f672fc49ae0cb7433b95728df09`;
function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=68ac8f672fc49ae0cb7433b95728df09`;
  fetchData();
}

function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  infoTxt.classList.replace("pending", "error");
  if (info.cod == "404") {
    infoTxt.innerText = `${inputField.value} is not a valid city name`;
  } else {
    // get required properties value

    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    // use custom icons
    if (id == 800) {
      weatherIcon.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      weatherIcon.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
      weatherIcon.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      weatherIcon.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      weatherIcon.src = "icons/cloud.svg";
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      weatherIcon.src = "icons/cloud.svg";
    }

    // pass values to html
    wrapper.querySelector(".temp .numb").innerText = temp;
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city},${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = feels_like;
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
