const mainBlock = document.querySelector('.main');
const mainSelect = document.querySelector('.main__select');
const testBlock = document.querySelector('.main__wrapper');


mainSelect.addEventListener('change', (e) => {
  let currentSelect = e.target.value;
  if(mainBlock.firstElementChild != null) {
    mainBlock.firstElementChild.remove();
  } 
  initBlock(currentSelect);
});

function initBlock(target) {

  switch(target) {
    case 'Weather': {
      getJSONInUrl('http://api.weatherstack.com/current?access_key=e3f03e2a4da59c7fcaf3e9a620f72281&query=', 'Zaporizhzhya')
      .then(responceInObject => formingWeatherForecast(responceInObject, mainBlock) );
      break;
    }
    case 'Covid': {
      getJSONInUrl('https://api.covid19api.com/summary', '')
        .then(responceInObject => formingCovid(responceInObject, mainBlock));
    }

  }
}

async function getJSONInUrl(url, query) {
  return new Promise(async (resolve, reject) => {
    let responce = await fetch(`${url}${query}`)
    if(responce.status != 200) {
      return reject(new Error(`Error in ${error.message}`))
    }
    let dataInJson = await responce.json();
    return resolve(dataInJson)
  })
}

function formingWeatherForecast(object, block) {
  console.log(object)
  let weatherSing = object.current;
  let locationRequest = object.location;
  let infoInRequest = object.request;

  let item = document.createElement('div');
  item.innerHTML = `
  <div class="item__info">
    <div class="item__title">${infoInRequest.query}</div>
    <div class="item__subtitle">${locationRequest.region}</div>
    <div class="item__subtitle">Weather descriptions: ${weatherSing['weather_descriptions']}</div>
    <div class="item__subtitle">Данные получены:${locationRequest['localtime']}</div>
    <img class="item__img" src="${weatherSing['weather_icons']}"></img>
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
  let wrapper = document.createElement('div');
  wrapper.classList.add('item__wrapper');
  wrapper.append(readyMateData)
  block.append(wrapper);
}
