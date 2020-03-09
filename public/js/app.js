


async function getWeather(location) {
    const response = await fetch(`/weather?address=${location}`);
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