console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

let fetchWeather = search => {
    fetch('http://localhost:3000/weather?address=' + search).then(response => {
        response.json().then(data => {
            if (data.error) {
                console.log(data.error);
                messageTwo.textContent = data.error;
            } else {
                messageOne.textContent = data.location + ': ' + data.forecast;
            }
        });
    });
};

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    fetchWeather(location);
});
