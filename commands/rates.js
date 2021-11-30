module.exports = {
	name: 'rates',
    description: 'calculates the likelyhood of obtaining an SSR in certain gacha games(fgo, gfl, feh for now)',
    aliases: ['roll', 'gacha'],    
	execute(message, args) {
        var gacha = args[0];
        if(gacha == "fgo"){
            var rateup = true;
            var pity = 0;
            var rates = [0.01, 0.008];
            var sampleSize = parseFloat(args[1]);            
        }
        else if(gacha == "gfl"){
            var rateup = false;
            var pity = 0;
            if(args[1] == "normal"){
                var rates = [0.03, 0.03];
                var sampleSize = parseFloat(args[2]);
            }else if(args[1] == "lowheavy"){
                var rates = [0.15, 0.15];
                var sampleSize = parseFloat(args[2]);
            }else if(args[1] == "midheavy"){
                var rates = [0.2, 0.2];
                var sampleSize = parseFloat(args[2]);
            }else if(args[1] == "highheavy"){
                var rates = [0.25, 0.25];
                var sampleSize = parseFloat(args[2]);
            }else{
                return message.channel.send("Please add which construction you are using!(normal, lowheavy, midheavy or highheavy)");                
            }
        }
        else if (gacha == "feh"){
            var rateup = true;
            var pity = 0.0025;
            if(args[2] > 120){
                return message.channel.send("If a player goes without a 5-star for 120 rolls, the rate to pull a 5-Star hero will be raised to 100% for the next summoning session!")
            }
            if(args[1] == "normal"){
                var rates = [0.06, 0.03];
                var sampleSize = parseFloat(args[2]);
                
            }else if(args[1] == "herofest"){
                var rates = [0.08, 0.05];
                var sampleSize = parseFloat(args[2]);
            }else if(args[1] == "herofocus"){
                rateup = false;
                var rates = [0.08, 0.08];
                var sampleSize = parseFloat(args[2]);
            }else{
                return message.channel.send("Please add which summon!(normal, herofest, or herofocus)");                
            }
        }
        else{
            return message.channel.send("That gacha game isn't supported yet!");
        }

        if(sampleSize < 0 || sampleSize > 999 || sampleSize != Math.floor(sampleSize) || sampleSize != Math.ceil(sampleSize)){
            return message.channel.send("Please enter a valid number of rolls!");
            
        }

        var anySSR = chance(sampleSize, rates[0], pity * 2) * 100;
        var rateUp = chance(sampleSize, rates[1], pity) * 100;
        if(rateup){
            message.channel.send("You have " + anySSR + "% chance of getting an SSR and " + rateUp + "% chance of getting the rate up SSR!");
            
        }else{
            message.channel.send("You have " + anySSR + "% chance of getting an SSR");
        }
        
	},
};

function chance(n, rates, pity){
    var results = 1;
    
    for(i = 0; i < n; i++){
        if(pity != 0 && i % 5 == 0 && i != 0){
            rates = rates + pity;
        }
        results = results * (1 - rates);
        //console.log(results);
    }
    return 1-results;
}