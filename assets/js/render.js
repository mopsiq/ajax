
function formingWeatherForecast(object, block) {
  console.log(object)
  let weatherSing = object.current;
  let locationRequest = object.location;
  let infoInRequest = object.request;

  let item = document.createElement('div');
  item.classList.add('item__wrapper');
  item.innerHTML = `
  <div class="item__header">
    <img class="item__img" src="${weatherSing['weather_icons']}"></img>
    <div class="item__title">Updated:${locationRequest['localtime']}</div>
  </div>
  <div class="item__info">
    <div class="item__subtitle"><span>Location: </span>${infoInRequest.query}</div>
    <div class="item__subtitle"><span>Region: </span>${locationRequest.region}</div>
    <div class="item__subtitle"><span>Weather descriptions: </span> ${weatherSing['weather_descriptions']}</div>
  </div>
  <div class="item__main">
    <p class="item__text">Humidity: ${weatherSing.humidity}%</p>
    <p class="item__text">Temperature: ${weatherSing.temperature}&#8451</p>
    <p class="item__text">Vibisility: ${weatherSing.visibility}km</p>
    <p class="item__text">Wind Speed: ${weatherSing['wind_speed']}km/h</p>
  </div>
`
  return renderInMainBlock(item, block);
};

function formingCovid(object, block) {
  console.log(object)
  let summaryGlobal = object.Global;
  let time = summaryGlobal.Date.slice(0, 16);
  let item = document.createElement('div');
  item.classList.add('item__wrapper');
  item.innerHTML = `
  <div class="item__info">
    <div class="item__title">Общая статистика Covid-19 по всему миру</div>
    <div class="item__subtitle">Данные получены: ${time}</div>
  </div>
  <div class="item__main">
    <p class="item__text">Общее количество заражённых: ${summaryGlobal['TotalConfirmed']}</p>
    <p class="item__text">Общее количество смертей: ${summaryGlobal['TotalDeaths']}</p>
    <p class="item__text">Общее количество выздоровленных: ${summaryGlobal['TotalRecovered']}</p>
    <p class="item__text">За сегодня + заражённых: ${summaryGlobal['NewConfirmed']}</p>
    <p class="item__text">За сегодня + смертей: ${summaryGlobal['NewDeaths']}</p>
    <p class="item__text">За сегодня + выздоровленных: ${summaryGlobal['NewRecovered']}</p>
  </div>
  `
  return renderInMainBlock(item, block);
}

function renderInMainBlock(readyMateData, block) {
  // let wrapper = document.createElement('div');
  // wrapper.classList.add('item__wrapper');
  // wrapper.append(readyMateData)
  block.append(readyMateData);
}

export {formingWeatherForecast, formingCovid, renderInMainBlock};