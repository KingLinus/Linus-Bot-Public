module.exports = {
	name: 'perm',
    description: 'calculates the permutation, size of the total amount, the size of the target amount, the sample amount',
	execute(message, args) {
        var totalSize = parseFloat(args[0]);
        var targetSize = parseFloat(args[1]);
        var sampleSize = parseFloat(args[2]);
        var successAmount = 1 //parseFloat(args[3]);
        var results = 1;
        //var totalPerm = factorial(totalSize) / (factorial(targetSize) * factorial(totalSize - targetSize));

        for(j = 0; j < successAmount; j++){
            for(i = 0; i < sampleSize; i++){
                results = results * (totalSize - targetSize - i) / (totalSize - i);
                //console.log(results);
            }
        }
        

        results = 1 - results;
        message.channel.send(results.toString());
        
	},
};

/*function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
  }*/
  