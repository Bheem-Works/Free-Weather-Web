const weatherCity = document.querySelector(".weatherCity");
const searchBtn = document.querySelector(".search-btn");
const tempH1 = document.querySelector(".tempH1");
const humidH1 = document.querySelector(".humidH1");
const latitudeH1 = document.querySelector(".latitudeH1");
const longitudeH1 = document.querySelector(".longitudeH1");
const City = document.querySelector(".City");


function renderData(city) {
    async function fetchingFun() {
        try{
            const url = await fetch (
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=93Y5PBPC3H2UWBWWP433VGUZ8`
            );
            const data = await url.json();


            City.textContent = city;
            tempH1.textContent = Math.round((data.currentConditions.temp-32) * (5/9));
            humidH1.textContent = data.currentConditions.humidity;
            latitudeH1.textContent = data.latitude;
            longitudeH1.textContent = data.longitude;
            
        } catch(error) {
            alert('There is something wrong!')
        }

    }
    fetchingFun();
}
renderData("dharan");  

weatherCity.addEventListener("keyup",(e)=>{
    if(e.key=="Enter"){
        renderData(weatherCity.value);
    }
})


// for the click 
searchBtn.addEventListener('click',()=>{
    renderData(weatherCity.value);
})
