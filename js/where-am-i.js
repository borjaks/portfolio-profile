"use strict";

const btn = document.querySelector(".btn-country");
const btnReset = document.querySelector(".btn-reset");
const countriesContainer = document.querySelector(".countries");
const imgContainer = document.querySelector(".images");

let city, locality;
let isRunning = false;
let currentImg;

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;
    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error(`Error: Image Not Found!`));
    });
  });
};

const renderCountry = function (data, className = "") {
  //Currency Capitalization
  console.log(data);
  const curr = data.currencies[0].name.split(" ");
  const currArr = [];
  curr.map((c) => {
    const capitalizedCurr = c[0].toUpperCase() + c.slice(1);
    currArr.push(capitalizedCurr);
  });
  const currNew = currArr.join(" ");

  const html = `
    <article class="country ${className}">
           <img class="country__img" src="${data.flag}" />
           <div class="country__data">
             <h3 class="country__name">${data.name}</h3>
             <h4 class="country__region">${
               data.region
             } / ${city} / ${locality} </h4>
             <p class="country__row"><span>👫</span>${+(
               data.population / 1000000
             ).toFixed(1)}M People</p>
             <p class="country__row"><span>🗣️</span>${
               data.languages[0].name
             }</p>
             <p class="country__row"><span>💰</span>${currNew}</p>
           </div>
         </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const renderError = function (msg) {
  // Check if the last child is a text node before removing
  if (countriesContainer.lastChild?.nodeType === Node.TEXT_NODE) {
    countriesContainer.removeChild(countriesContainer.lastChild);
  }

  countriesContainer.insertAdjacentText("beforeend", msg);
  isRunning = false;
  btnReset.classList.toggle("btn__hidden");
};

const renderStatus = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const removeStatusText = function () {
  // Check if the last child is a text node before removing
  if (countriesContainer.lastChild?.nodeType === Node.TEXT_NODE) {
    countriesContainer.removeChild(countriesContainer.lastChild);
  }
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  if (!isRunning) {
    try {
      btn.classList.toggle("btn__hidden");
      const statusMsg = `Fetching Current Location`;
      console.log(statusMsg);
      renderStatus(statusMsg);

      const img = await createImage(
        "https://github.com/user-attachments/assets/f81a983f-0e60-4847-b7f7-5588ceae9a2c"
      );
      currentImg = img;
      imgContainer.classList.remove("btn__hidden");
      console.log(`loading image rendered`);

      const locator = `https://restcountries.com/v2/name/`;

      const pos = await getPosition();
      console.log(pos);
      const { latitude: lat, longitude: lng } = pos.coords;

      //Reverse Geocoding
      const uri = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
      const res = await fetch(uri);

      if (!res.ok) {
        throw new Error(`Problem with Geocoding ${res.status}`);
      }

      const data = await res.json();

      if (!data.countryName && !data.city) {
        console.log(`Invalid Location Coordinates`);
      }

      city = data.city;
      locality = data.locality;
      console.log(`You are in ${data.city}, ${data.countryName}`);

      //Country Data
      const originalString = data.countryName;
      const cleanedString = originalString.replace(/\s\(the\)/, "");

      const res2 = await fetch(`${locator}${cleanedString}`);

      if (!res2.ok) {
        throw new Error(`Error ${res2.status}: Country not found!`);
      }

      const data2 = await res2.json();
      removeStatusText();
      renderCountry(data2[0], "country");

      countriesContainer.style.opacity = 1;
      isRunning = true;
      btnReset.classList.toggle("btn__hidden");
      imgContainer.classList.add("btn__hidden");
    } catch (err) {
      console.error(`${err}`);
      renderError(`Something went wrong. ${err.message}`);
      countriesContainer.style.opacity = 1;
    }
  }

  console.log(`Location Fetched`);
};

const resetWindow = function () {
  location.reload();
};

//Event Listener

btn.addEventListener("click", whereAmI);
btnReset.addEventListener("click", resetWindow);
