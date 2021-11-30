module.exports = {
	name: 'combination',
    description: 'calculates the permutation. Requires size of the total amount and the size of the target amount, as the parameters',
    aliases: ['comb'],    
	execute(message, args) {
        var totalSize = parseFloat(args[0]);
        var targetSize = parseFloat(args[1]);
        var sampleSize = parseFloat(args[2]);
        //var successAmount = 1 //parseFloat(args[3]);
        //var results = 1;
        var totalComb = factorial(totalSize) / (factorial(targetSize) * factorial(totalSize - targetSize));

        /*for(j = 0; j < successAmount; j++){
            for(i = 0; i < sampleSize; i++){
                results = results * (totalSize - targetSize - i) / (totalSize - i);
                //console.log(results);
            }
        }
        
        results = 1 - results;*/
        message.channel.send(totalComb.toString());
        
	},
};

function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
}
  