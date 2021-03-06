const { Telegraf } = require('telegraf')
const path = require('path')
const SpendingsService = require('./Service/SpendingsService')

global.appRoot = path.resolve(__dirname);

const spendingsService = new SpendingsService()
const bot = new Telegraf(process.env.TOKEN)

bot.on('message',(ctx, next) =>{
    if (ctx.message.chat.id === parseInt(process.env.TELEGRAM_ID)) {
        next()
    } else {
        ctx.reply('Ты не можешь пользоваться этим ботом')
    }
})

bot.command('add', ctx => {
    const message = spendingsService.logSpending(ctx.message.text)
    ctx.reply(message)
})

bot.command('show', ctx => {
    const message = spendingsService.showSpendings()
    ctx.reply(message)
})

bot.command('reset', ctx => {
    const message = spendingsService.resetSpendings()
    ctx.reply(message)
})

bot.command('items', ctx => {
    const message = spendingsService.itemsAvailible()
    ctx.reply(message)
})

bot.command('cancel', ctx => {
    const message = spendingsService.cancelLastOperation()
    ctx.reply(message)
})

bot.launch().catch(e => {
    console.log(e.message)
})