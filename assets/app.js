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
      getJSONInUrl('https://api.covid19api.com/summary', 'a')
        .then(responceInObject => formingCovid(responceInObject, mainBlock));
      break;
    }

  }
}

async function getJSONInUrl(url, query) {
  return new Promise(async (resolve, reject) => {
    loader('on');

    let responce = await fetch(`${url}${query}`)
    if(responce.status != 200) {
      loader('off', mainBlock);
      errorWindow();
      reject(new Error(`Error in ${error.message}`));
    }
    console.log(responce)
    let dataInJson = await responce.json();

    loader('off', mainBlock)
    return resolve(dataInJson)
  })
}

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

function errorWindow() {
  let div = document.createElement('div');
  div.textContent = 'Oops... An error occured during the request. Please, come back later.'
  mainBlock.append(div);
}

function loader(param, block) {
  if(param == 'on') {
    let loaderGif = document.createElement('div');
    loaderGif.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="137px" height="137px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <g>
    <path d="M50 27A23 23 0 1 0 73 50.00000000000001" fill="none" stroke="#35c0db" stroke-width="7"></path>
    <path d="M49 17L49 37L59 27L49 17" fill="#35c0db"></path>
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.7543859649122806s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
  </g>
    `;
    return mainBlock.append(loaderGif)
  }

  if(param == 'off') {
    return block.children[0].remove();
  }
}
