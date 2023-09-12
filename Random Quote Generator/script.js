const quoteText = document.querySelector('.quote');
const authorName = document.querySelector('.name');
const quoteBtn = document.querySelector('button');
const speechBtn = document.querySelector('.speech');
const copyBtn = document.querySelector('.copy');
const twitterBtn = document.querySelector('.twitter');
const synth = window.speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add('loading');
  quoteBtn.innerText = 'Loading...';

  fetch('https://type.fit/api/quotes')
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex];

      quoteText.innerText = quote.text;
      authorName.innerText = quote.author || 'Unknown';
      
      quoteBtn.classList.remove('loading');
      quoteBtn.innerText = 'New Quote';
    });
}

speechBtn.addEventListener('click', () => {
  if (!quoteBtn.classList.contains('loading')) {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    synth.speak(utterance);

    setInterval(() => {
      !synth.speaking ? speechBtn.classList.remove('active') : speechBtn.classList.add('active');
    }, 10);
  }
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener('click', () => {
  let twitterUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(twitterUrl, '_blank');
});

quoteBtn.addEventListener('click', randomQuote);

randomQuote();