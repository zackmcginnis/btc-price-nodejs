const axios = require('axios')
const colors = require('colors');

const url = 'https://api.coinbase.com/v2/prices/BTC-USD/buy'

let last_price = null
let last_change_hour = 0
let last_change_day = 0

const get_price = () => {
    // Make a request for a user with a given ID
    axios.get(url)
        .then( (response) => {
            // handle success
            const new_price = Number(response.data.data.amount)
            last_price = Number(last_price)

            if(last_price) {
                const diff = Number(Math.abs(new_price - last_price).toFixed(2))
                if(new_price > last_price) {
                    const tempHour = Number(Number(diff) + Number(last_change_hour))
                    const tempDay = Number(Number(diff) + Number(last_change_day))
                    last_change_hour = tempHour.toFixed(2)
                    last_change_day = tempDay.toFixed(2)
                    last_change = `${diff.toFixed(2)}`.green
                } else if (last_price > new_price) {
                    const tempHour = Number(Number(last_change_hour) - Number(diff))
                    const tempDay = Number(Number(last_change_day) - Number(diff))
                    last_change_hour = tempHour.toFixed(2)
                    last_change_day = tempDay.toFixed(2)
                    last_change = `${diff.toFixed(2)}`.red
                } else {
                    last_change = `${diff.toFixed(2)}`
                }
            } else {
                last_change = 'N/A'.america
            }

            const date = new Date(Date.now())
            const time = date.toISOString()
            let last_change_hour_display
            let last_change_day_display

            if(last_change_hour) {
                last_change_hour_display = last_change_hour > 0 ? last_change_hour.green : last_change_hour.red
            } else {
                last_change_hour_display = 0
            }

            if(last_change_day) {
                last_change_day_display = last_change_day > 0 ? last_change_day.green : last_change_day.red
            } else {
                last_change_day_display = 0
            }

            console.log(`${time.magenta} : ${'$'.cyan}${new_price.toString().cyan} : ${last_change} ${'just now'.bold} : ${last_change_hour_display} ${'this hour'.bold} : ${last_change_day_display} ${'today'.bold}`);
            last_price = new_price
        })
        .catch( (error) => {
            // handle error
            console.log(error)
            console.log(new Date(Date.now()), `ERROR`);
        })

}

const clear_hour_change = () => {
    last_change_hour = 0
    console.log(`---------- NEW HOUR OF TRACKING ----------`.america)
}

const clear_day_change = () => {
    last_change_day = 0
    console.log(`---------- NEW DAY OF TRACKING ----------`.america)
}

get_price()

setInterval(clear_hour_change, 60000 * 60)
setInterval(clear_day_change, 60000 * 60 * 24)
setInterval(get_price, 20000)





