/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
let xhr = new XMLHttpRequest()
xhr.responseType = 'json';
const formData = new FormData();
let method = options.method;
let url = options.url;

if (options.method === 'GET') {
    url += '?';

    for (let i in options.data) {
        url += `${i}=${options.data[i]}&`;
        url = url.slice(0, -1);
    }
} else {
    for (let i in options.data) {
        formData.append(i, options.data[i]);
    }
}

try {
    xhr.open(method, url);
    xhr.send(formData);
}
catch (err) {
    options.callback(err, null);
}
            
xhr.addEventListener('load', () => {options.callback(null, xhr.response)});
};
