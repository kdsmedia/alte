// Baris ini ditambahkan untuk membaca token dari file .env
require('dotenv').config();

const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

// Sekarang, process.env.BOT_TOKEN akan berisi token Anda
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply('Welcome to the Telegram Web App Bot!', {
    reply_markup: {
      keyboard: [
        // URL web app ditambahkan https:// agar valid
        [{ text: 'Open Web App', web_app: { url: 'https://altime-38dbd.web.app' } }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
});

bot.on(message('web_app_data'), async (ctx) => {
  const data = JSON.parse(ctx.message.web_app_data.data);
  // Process the data received from the web app
  ctx.reply(`Received data from web app: ${JSON.stringify(data)}`);
});

bot.launch();

// Kode ini untuk memastikan bot berhenti dengan baik saat aplikasi ditutup
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
