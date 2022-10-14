const http = require('http');
const readline = require('readline');
const config = require('./config/config')

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question(`Задайте город, чтобы посмотреть погоду \n`, (userInput) => {

const url = `http://api.weatherstack.com/current?access_key=${config.myAPIKey}&query=${userInput}`;

  http.get(url, res => {

    res.setEncoding('utf8');
    let rowData = '';
    let parseData = '';
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
      parseData = JSON.parse(rowData)
      if (!parseData.error) {
        console.log(`Запрашиваемые данные по городу: ${userInput}`)
        console.log(parseData);
        rl.close();
      }else if(+parseData.error.code===615){
        console.log('Неверное название города!');
        rl.close();
      }else {
        console.log('Технические проблемы!');
        rl.close();
      }
    })
  }).on('error', err => {
    console.error(err);
  })
});

