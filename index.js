require('dotenv').config({
    path: '.env'
  })

const twit = require("twit");
const logger = require('morgan');
const express = require ('express');
const app = express();
app.use(logger('dev'));
const PORT = 3000;
var Twitter = new twit({
    consumer_key:'uDegpB4Vnmaqssu5wAUf0CDYb',
    consumer_secret:process.env.CONSUMER_SECRET,
    access_token:process.env.ACESSS_TOKEN,
    access_token_secret:process.env.ACESSS_TOKEN_SECRET
})




let retweet = function() {
    let params = {
        q: '#softwareEngineer, #devjobs',
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
        // if there is no error
       
        if (!err) {
           // loop through the first 4 returned tweets
          for (let i = 0; i < data.statuses.length; i++) {
            // iterate through those first four defining a rtId that is equal to the value of each of those tweets' ids
          let rtId = data.statuses[i].id_str;
            // the post action
            console.log(`This RTD   ${rtId}`)
          Twitter.post('statuses/retweet/:id', {
            // setting the id equal to the rtId variable
            id: rtId
            // log response and log error
          }, function(err, response) {
            if (response) {
              console.log('Successfully retweeted');
            }
            if (err) {
              console.log(err);
            }
          });
        }
      }
        else {
            // catch all log if the search could not be executed
          console.log('Tweets not found!!!');
        }
    });
}
retweet();
setInterval(retweet, 3000);

app.listen(process.env.PORT || 3000, ()=>console.log(`App is running on port ${PORT}`))

