module.exports = {
	name: 'opening',
    description: 'estimates the chance of an opening hand. Requires the total deck size, size of desired card one, amount of card one desired, size of card two desired, amount of card two desired,...,opening hand amount parameters in that order',
	execute(message, args) {
        let remainder = args.length % 2;
        if(remainder != 0){
            return message.channel.send("There was an error with your arguments");
        }
        var totalSize = parseFloat(args[0]);
        var targetSize = [];
        var targetSizeTotal = 0;
        var desiredSize = [];
        for(i = 0; i < ((args.length -2) /2); i++){
            targetSizeTotal += (args[2*i+1]); 
            targetSize.push(args[2*i+1]);
            desiredSize.push(args[2*i+2]);
        }
        var sampleSize = parseFloat(args[args.length-1]);
        //var totalPerm = factorial(totalSize) / (factorial(targetSize) * factorial(totalSize - targetSize));
        /*
        console.log(totalSize);
        console.log(targetSize);
        console.log(desiredSize);
        console.log(sampleSize);*/
        if(targetSize.length > sampleSize){
            return message.channel.send("You are targeting more cards than you are drawing!");
        }

        /*
        //-------------------------------------------------
        for(k = 0; k < targetSize.length; k++){
            var cardProb = 1;
            for(j = 0; j < desiredSize[k]; j++){
                var results = 1;
                results of drawing none of the cards
                for(i = 0; i < sampleSize; i++){
                    
                    results = results * (totalSize - targetSize - i + j) / (totalSize - i - j);
                    console.log(results);
                }
                cardProb = cardProb * (1 - results);
            }
            finalResult = finalResult * cardProb;
        } */

        //using binomial distrubution
        var finalResult = 1;
        for(i = 0; i < targetSize.length; i++){
            finalResult = finalResult * binomial(targetSize[i], desiredSize[i]) * binomial(totalSize - targetSize[i] , sampleSize - desiredSize[i]) / binomial(totalSize, sampleSize);            
        }
        finalResult = finalResult * 100;
        message.channel.send(finalResult.toString() + "%");
        
	},
};

function binomial(n,k){
    return factorialize(n) / (factorialize(k) * factorialize(n - k));
}

function factorialize(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorialize(num - 1));
    }
  }