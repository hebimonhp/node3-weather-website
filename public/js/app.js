
fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return console.log(data.error)
        }
        console.log(data.forecast);
        console.log(data.location);
    })
});

async function getWeather(location) {
    const response = await fetch(`http://localhost:3000/weather?address=${location}`);
    return await response.json();
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    message1.textContent = 'Loading...';
    message2.textContent = '';
    getWeather(search.value).then((data) => {
        if (data.error) {
            return message1.textContent = data.error;
        }
        message1.textContent = data.forecast;
        message2.textContent = data.location;

    });
    e.preventDefault();
});