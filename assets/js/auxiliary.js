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
    return block.append(loaderGif)
  }

  if(param == 'off') {
    return block.children[0].remove();
  }
}

export {errorWindow, loader};