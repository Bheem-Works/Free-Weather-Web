// 👉 Getting the HTML elements from the page
const weatherCity = document.querySelector(".weatherCity");     // Input box where user types the city name
const searchBtn = document.querySelector(".search-btn");        // Button to start search
const tempH1 = document.querySelector(".tempH1");               // Where we show the temperature
const humidH1 = document.querySelector(".humidH1");             // Where we show the humidity
const latitudeH1 = document.querySelector(".latitudeH1");       // Where we show the latitude
const longitudeH1 = document.querySelector(".longitudeH1");     // Where we show the longitude
const City = document.querySelector(".City");                   // Where we show the name of the city

// 🔥 This function fetches weather data and shows it on the screen
function renderData(city) {
    
    // 📦 We use an async function to handle the API call
    async function fetchingFun() {
        try {
            // 🌍 We make a request to the weather API with the city name
            const url = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=93Y5PBPC3H2UWBWWP433VGUZ8`
            );

            // 📬 Convert the response into actual data (JSON format)
            const data = await url.json();

            // 🖼️ Show the weather data on the page
            City.textContent = city;  // Show the city name
            tempH1.textContent = Math.round((data.currentConditions.temp - 32) * (5 / 9)) + " °C"; // Convert temp from Fahrenheit to Celsius
            humidH1.textContent = data.currentConditions.humidity + " %"; // Show humidity
            latitudeH1.textContent = data.latitude;       // Show latitude
            longitudeH1.textContent = data.longitude;     // Show longitude

        } catch (error) {
            // ❌ If something goes wrong, show an alert message
            alert('⚠️ Something went wrong! Try another city.');
            console.error(error); // Helpful for developers to see what went wrong
        }
    }

    // ✅ Only run the function if the input is not empty
    if (city.trim() !== "") {
        fetchingFun();
    }
}

// 🌟 Show weather for a default city when the page first loads
renderData("Dharan");

// 👇 If user presses "Enter" key inside the input box, run the search
weatherCity.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        renderData(weatherCity.value); // Pass the typed city to the function
    }
});

// 👆 If user clicks the search button, also run the search
searchBtn.addEventListener("click", () => {
    renderData(weatherCity.value); // Pass the typed city to the function
});
