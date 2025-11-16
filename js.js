


//slider
const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidesLength = slideRight.querySelectorAll('div').length

let activeSlideIndex = 0

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`

upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight
    if(direction === 'up') {
        activeSlideIndex++
        if(activeSlideIndex > slidesLength - 1) {
            activeSlideIndex = 0
        }
    } else if(direction === 'down') {
        activeSlideIndex--
        if(activeSlideIndex < 0) {
            activeSlideIndex = slidesLength - 1
        }
    }

    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
}



//imagem não carregadas
  const DEFAULT_IMG = 'padrao.jpg';

  function replaceBrokenImage(img) {
    img.onerror = null;
    img.src = DEFAULT_IMG;
  }

  // Aplica às imagens já presentes
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) replaceBrokenImage(img);
    img.addEventListener('error', () => replaceBrokenImage(img));
  });

  // Observa imagens adicionadas dinamicamente
  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1) {
          if (node.tagName === 'IMG') {
            node.addEventListener('error', () => replaceBrokenImage(node));
            if (!node.complete || node.naturalWidth === 0) replaceBrokenImage(node);
          } else {
            node.querySelectorAll && node.querySelectorAll('img').forEach(img => {
              img.addEventListener('error', () => replaceBrokenImage(img));
              if (!img.complete || img.naturalWidth === 0) replaceBrokenImage(img);
            });
          }
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
