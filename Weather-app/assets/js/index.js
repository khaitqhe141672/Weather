const apiKey = 'ZldO5NAKgnBOxLdYhTWWqJi670YDCzKk';

const getSearchCity = async (text) => {
    const url = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
    const query = `?apikey=${apiKey}&q=${text}&language=vi`;

    const res = await fetch(url + query);
    const data = await res.json();
    return data[0];
};
const cityForm = document.querySelector("form");

cityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city);
});

const getWeather = async (key) => {
    const url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    const query = `${key}?apikey=${apiKey}&language=vi`;

    const res = await fetch(url + query);
    const data = await res.json();
    return data;
};

const updateCity = async (city) => {
    const cityDetails = await getSearchCity(city);
    const cityWeather = await getWeather(cityDetails.Key);
    let cityName = (cityDetails.LocalizedName);
    let html = `<h3>Khu Vực: ${cityName}</h3>`;
    document.getElementById('city').innerHTML = html;
    console.log(cityWeather);
    let a = (cityWeather.DailyForecasts);
    htmlBox(a);
};

const htmlBox = arr => {
    let html = ``;
    arr.forEach(p => {
        const value = moment(p.Date).format('DD/MM/YYYY');
        console.log(value);
        const max = p.Temperature.Maximum.Value;
        const min = p.Temperature.Minimum.Value;
        const nightMin = Math.floor((min - 32) / 1.8);
        const dayMax = Math.floor((max - 32) / 1.8);
        const dayDetail = p.Day.IconPhrase;
        const nightDetail = p.Night.IconPhrase;
        // console.log("icon: " + p.Day.PrecipitationType);
        html += `<div class="box">
        <div class="date">
            <h3>${value}</h3>
        </div>
        <hr style="margin: 0;">
        <div class="day">
            <svg height="150" viewBox="0 0 128 128" width="50" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle cx="64" cy="63.997" fill="#fedb41" r="39.247"/>
                    <g fill="#fea832">
                        <path d="m95.247 65.747a1.749 1.749 0 0 1 -1.747-1.747 29.53 29.53 0 0 0 -29.5-29.5 1.75 1.75 0 0 1 0-3.5 33.035 33.035 0 0 1 33 33 1.749 1.749 0 0 1 -1.753 1.747z"/>
                        <g>
                            <path d="m64 16.75a47.252 47.252 0 0 1 8.5.781c.038-.545.063-1.1.063-1.658-.001-7.801-8.563-14.126-8.563-14.126s-8.563 6.325-8.563 14.126c0 .562.026 1.113.064 1.658a47.243 47.243 0 0 1 8.499-.781z"/>
                            <path d="m64 111.244a47.343 47.343 0 0 0 8.5-.78c.038.544.063 1.095.063 1.657 0 7.8-8.562 14.126-8.562 14.126s-8.563-6.324-8.563-14.126c0-.562.026-1.113.064-1.657a47.335 47.335 0 0 0 8.498.78z"/>
                            <path d="m97.409 30.588a47.349 47.349 0 0 1 5.457 6.562c.413-.358.82-.73 1.217-1.127 5.517-5.517 3.934-16.043 3.934-16.043s-10.526-1.58-16.043 3.934c-.4.4-.769.8-1.127 1.217a47.349 47.349 0 0 1 6.562 5.457z"/>
                            <path d="m30.591 97.406a47.232 47.232 0 0 0 6.562 5.457c-.358.413-.73.82-1.127 1.217-5.517 5.517-16.043 3.934-16.043 3.934s-1.583-10.526 3.934-16.043c.4-.4.8-.769 1.217-1.127a47.291 47.291 0 0 0 5.457 6.562z"/>
                            <path d="m111.247 64a47.335 47.335 0 0 1 -.78 8.5c.544.038 1.095.064 1.657.064 7.8 0 14.126-8.563 14.126-8.563s-6.325-8.562-14.126-8.562c-.562 0-1.113.025-1.657.063a47.343 47.343 0 0 1 .78 8.498z"/>
                            <path d="m16.753 64a47.335 47.335 0 0 0 .78 8.5c-.544.038-1.1.064-1.657.064-7.801-.004-14.126-8.564-14.126-8.564s6.325-8.562 14.126-8.562c.562 0 1.113.025 1.657.063a47.343 47.343 0 0 0 -.78 8.499z"/>
                            <path d="m97.409 97.406a47.349 47.349 0 0 1 -6.562 5.457c.358.413.73.82 1.127 1.217 5.517 5.517 16.043 3.934 16.043 3.934s1.583-10.526-3.934-16.043c-.4-.4-.8-.769-1.217-1.127a47.291 47.291 0 0 1 -5.457 6.562z"/>
                            <path d="m30.591 30.588a47.349 47.349 0 0 0 -5.457 6.562c-.413-.358-.82-.73-1.217-1.127-5.517-5.517-3.934-16.043-3.934-16.043s10.526-1.58 16.043 3.934c.4.4.769.8 1.127 1.217a47.291 47.291 0 0 0 -6.562 5.457z"/>
                        </g>
                    </g>
                </g>
            </svg>
            <div class="weather_detail" style="text-align: center;">
                <h3>${dayMax} &#186;C</h3>
                <p>${dayDetail}</p>
            </div>
        </div>
        <hr style="margin: 0;">
        <div class="night">
            <svg id="Layer_2" enable-background="new 0 0 64 64" height="150" viewBox="0 0 64 64" width="50"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="m53.623 31.328c-1.696-8.18-8.941-14.328-17.623-14.328-5.87 0-11.068 2.823-14.354 7.171-.531-.111-1.082-.171-1.646-.171-3.392 0-6.285 2.115-7.448 5.096-5.943.716-10.552 5.768-10.552 11.904 0 6.627 5.373 12 12 12h37c6.075 0 11-4.925 11-11 0-5.169-3.571-9.494-8.377-10.672z"
                      fill="#6e83b7"/>
                <g fill="#ffe352">
                    <path d="m43.199 37.304c-9.666 0-17.503-7.836-17.503-17.503 0-2.037.366-3.983 1.005-5.801-6.81 2.396-11.701 8.868-11.701 16.497 0 9.667 7.836 17.503 17.503 17.503 7.63 0 14.102-4.891 16.497-11.701-1.818.639-3.765 1.005-5.801 1.005z"/>
                    <path d="m33.59 19.197-3.59-1.197 3.59-1.197c1.045-.348 1.865-1.168 2.214-2.214l1.196-3.589 1.197 3.59c.348 1.045 1.168 1.865 2.214 2.214l3.589 1.196-3.59 1.197c-1.045.348-1.865 1.168-2.214 2.214l-1.196 3.589-1.197-3.59c-.348-1.045-1.168-1.865-2.213-2.213z"/>
                    <path d="m45.051 30.684-2.051-.684 2.051-.684c.597-.199 1.066-.668 1.265-1.265l.684-2.051.684 2.051c.199.597.668 1.066 1.265 1.265l2.051.684-2.051.684c-.597.199-1.066.668-1.265 1.265l-.684 2.051-.684-2.051c-.199-.598-.667-1.066-1.265-1.265z"/>
                    <path d="m10.538 41.513-1.538-.513 1.538-.513c.448-.149.799-.501.949-.949l.513-1.538.513 1.538c.149.448.501.799.949.949l1.538.513-1.538.513c-.448.149-.799.501-.949.949l-.513 1.538-.513-1.538c-.149-.448-.501-.8-.949-.949z"/>
                    <path d="m39.538 53.513-1.538-.513 1.538-.513c.448-.149.799-.501.949-.949l.513-1.538.513 1.538c.149.448.501.799.949.949l1.538.513-1.538.513c-.448.149-.799.501-.949.949l-.513 1.538-.513-1.538c-.149-.448-.501-.8-.949-.949z"/>
                    <path d="m14.538 14.513-1.538-.513 1.538-.513c.448-.149.799-.501.949-.949l.513-1.538.513 1.538c.149.448.501.799.949.949l1.538.513-1.538.513c-.448.149-.799.501-.949.949l-.513 1.538-.513-1.538c-.149-.448-.501-.8-.949-.949z"/>
                    <path d="m49.538 11.513-1.538-.513 1.538-.513c.448-.149.799-.501.949-.949l.513-1.538.513 1.538c.149.448.501.799.949.949l1.538.513-1.538.513c-.448.149-.799.501-.949.949l-.513 1.538-.513-1.538c-.149-.448-.501-.8-.949-.949z"/>
                </g>
            </svg>
            <div class="weather_detail" style="text-align: center;">
                <h3>${nightMin} &#186;C</h3>
                <p>${nightDetail}</p>
            </div>
        </div>
    </div>`
    })
    document.getElementById('box_Item').innerHTML = html;
}

const firstLoad = async firstIcon => {
    const cityWeather = await getWeather(firstIcon);
    let a = (cityWeather.DailyForecasts);
    document.getElementById('city').innerHTML = '<h3>Khu Vực: Hà Nội</h3>';
    htmlBox(a);
}

document.body.onload = firstLoad("353412");
