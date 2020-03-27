var Twit = require('twit');
require('dotenv').config();

let condicao = true;
let id ,i = 0,texto;
const Bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
})
console.log(process.env.ACCESS_TOKEN)


function BotInit() {
    
    var query ={
        q:"cerveja",
        result_type:"recent"
    }
    console.log("--------- Bot começou fazer a pesquisa ---------");

    Bot.get('search/tweets',query,BotGotLatestTweet);
    
    console.log("--------- Bot terminou de fazer a pesquisa ---------");

    
    
    function BotGotLatestTweet(error,data,response) {
        if(error){
            console.log("O bot não conseguiu buscar os tweets e o erro foi esse" + error)
        }else{
            
            
             while(condicao){
                if(data.statuses[i].retweeted){
                    i++;
                    console.log(i);
                }
                else{
                    id =data.statuses[i].id_str;
                    text = data.statuses[i].text;
                    condicao =false;
                    console.log("--------- Bot acho o tweet e esta retwetando ---------");
                    Bot.post('statuses/retweet/:id', {id}, BotRetweeted);
                }

            }
            condicao = true
           
        }
    }

    
}

			
			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot não pode retweetar, : ' + error);
				}
				else {
					console.log('Bot retweetou : ' + text);
				}
			}


console.log("--------- Bot iniciou ---------")
setInterval(BotInit, 1*60*1000);