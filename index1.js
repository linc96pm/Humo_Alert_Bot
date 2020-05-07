const TelegramBot = require('node-telegram-bot-api'); // Telegram bot Library for node-js
const token ='1277107614:AAGJjFL_SW4U8ThGNZDjV4ufyM5VRZYhtKU'; // token of the bot form @botfather
const bot = new TelegramBot(token, {polling: true}); // run our bot on Local
const request = require('request');
bot.onText(/\/movie (.+)/, function(msg, match) {
    const movie = match[1];
    const chatId = msg.chat.id;
    request(`http://www.omdbapi.com/?apikey=3aa4c482&t=${movie}`, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            bot.sendMessage(chatId, '_Looking for _' + movie + '...', {parse_mode:'Markdown'}).then(function(msg) {
                const res = JSON.parse(body);
               // bot.sendMessage(chatId, 'Result: \nTitle: ' + res.Title + '\nYear: ' + res.Year + '\nRated: ' + res.Rated + '\nReleased: ' + res.Released + '\nRuntime: ' + res.Runtime + '\nGenre: ' + res.Genre + '\nAction' + res.Action);
                bot.sendPhoto(chatId, res.Poster, {caption: 'Result: \nTitle: ' + res.Title + '\nYear: ' + res.Year + '\nRated: ' + res.Rated + '\nReleased: ' + res.Released + '\nRuntime: ' + res.Runtime + '\nGenre: ' + res.Genre + '\nAction: ' + res.Action})
            })
        }
    });
});
bot.onText(/\/weather (.+)/, function(msg, match) {
    const chatId = msg.chat.id;
    const weather = match[1];
    request(`http://api.weatherapi.com/v1/current.json?key=d4a687efccb54ce1a6f95509200705&q=${weather}`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const res = JSON.parse(body);
            console.log(res);
            
            const location = res.location;
            const current = res.current;
            const condition = res.current.condition;
    
            bot.sendMessage(chatId, `*${location.name} | ${location.country}*\nTemprature C: ${current.temp_c}\nCondition: ${condition.text}\nWind: ${current.wind_kph}`, {parse_mode: 'Markdown'})
        }
    })
})