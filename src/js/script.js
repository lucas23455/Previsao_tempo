document.querySelector('#search').addEventListener('submit', async (e) => {
    e.preventDefault()

    const cityName = document.querySelector('#city_name').value

    if (!cityName)
        return showAlert('Você precisa digitar uma cidade...')

    const apiKey = `adc1e60dccac610c2e0c6de1f2dec920`
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    try {
        const results = await fetch(apiUrl)
        const json = await results.json()

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                tempMx: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                icon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            })
        } else {
            showAlert('Não foi possível localizar...')
                
        }
    } catch (error) {
        showAlert('Erro ao obter os dados da API.')
    }
})

function showInfo(data) {
    showAlert('')
    document.querySelector('#weather').classList.add('show')

    document.querySelector('#title').textContent = `${data.city}, ${data.country}`
    document.querySelector('#temp_value').innerHTML = `${Math.round(data.tempMx)}<sup>C°</sup>`
    document.querySelector('#temp_max').innerHTML = `${Math.round(data.tempMx)}<sup>C°</sup>`
    document.querySelector('#temp_min').innerHTML = `${Math.round(data.tempMin)}<sup>C°</sup>`
    document.querySelector('#temp_description').textContent = data.description
    document.querySelector('#humidity_icon').nextElementSibling.children[1].textContent = `${data.humidity}%`
    document.querySelector('#wind_icon').nextElementSibling.children[1].textContent = `${data.windSpeed} km/h`
    document.querySelector('#temp_img').src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`

}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg
}
