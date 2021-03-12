import {formingWeatherForecast, formingCovid, renderInMainBlock} from './render.js';
import {errorWindow, loader} from './auxiliary.js';

const mainBlock = document.querySelector('.main');
const mainSelect = document.querySelector('.main__select');

mainBlock.addEventListener('click', e => {
  let currentTarget = e.target;

  if(currentTarget.classList.contains('main__button')) {
    let inputValue = currentTarget.previousElementSibling.value;
    document.querySelector('.main__wrapper').remove()
    
    getJSONInUrl('http://api.weatherstack.com/current?access_key=e3f03e2a4da59c7fcaf3e9a620f72281&query=', inputValue)
      .then(responceInObject => formingWeatherForecast(responceInObject, mainBlock) );
  }

})


mainSelect.addEventListener('change', (e) => {
  let currentSelect = e.target.value;
  if(mainBlock.firstElementChild != null) {
    mainBlock.firstElementChild.remove();
  } 
  initBlock(currentSelect);
});


function questionCityInput(param, block) {
  let wrapper = document.createElement('div');
  wrapper.classList.add('main__wrapper');
  if(param == 'Weather') {
    wrapper.innerHTML = `
    <input type="text"></input><button class="main__button">search</button>
    `
    block.append(wrapper)
  }

}


function initBlock(target) {

  switch(target) {
    case 'Weather': {
      questionCityInput(target, mainBlock)
      break;
    }
    case 'Covid': {
      getJSONInUrl('https://api.covid19api.com/summary', '')
        .then(responceInObject => formingCovid(responceInObject, mainBlock))
      break;
    }

  }
}

async function getJSONInUrl(url, query) {
  return new Promise(async (resolve, reject) => {
    loader('on', mainBlock);
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

