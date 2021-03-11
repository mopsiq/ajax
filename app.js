const mainBlock = document.querySelector('.main');

async function getJSONInUrl(url, city) {
  return new Promise(async (resolve, reject) => {
    let responce = await fetch(`${url}query=${city}`)
    if(responce.status != 200) {
      return reject(new Error(`Error in ${error.message}`))
    }
    let dataInJson = await responce.json();
    return resolve(dataInJson)
  })
}

function formingWeatherForecast(object, block) {
  console.log(object)
  let wrapper = document.createElement('div'), item = document.createElement('div');
  wrapper.classList.add('item__wrapper')
  wrapper.append(item);

  let weatherSing = object.current;
  let locationRequest = object.location;
  let infoInRequest = object.request;
  item.outerHTML = `
  <div class="item__info">
    <div class="item__title">${infoInRequest.query}</div>
    <div class="item__subtitle">${locationRequest.region}</div>
    <div class="item__subtitle">Weather descriptions: ${weatherSing['weather_descriptions']}</div>
    <div class="item__subtitle">Данные получены:${locationRequest['localtime']}</div>
    <img src="${weatherSing['weather_icons']}"></img>
  </div>
  <div class="item__main">
    <p class="item__text">Humidity: ${weatherSing.humidity}</p>
    <p class="item__text">Temperature: ${weatherSing.temperature}</p>
    <p class="item__text">Vibisility: ${weatherSing.visibility}</p>
    <p class="item__text">Wind Speed: ${weatherSing['wind_speed']}</p>
  </div>
`
  block.append(wrapper)

};

getJSONInUrl('http://api.weatherstack.com/current?access_key=e3f03e2a4da59c7fcaf3e9a620f72281&query=', 'Zaporizhzhya')
  .then(responceInObject => formingWeatherForecast(responceInObject, mainBlock) );