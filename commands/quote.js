const Discord = require('discord.js');

module.exports = {
	name: 'quote',
    description: 'returns a quote from the quotes file',
    aliases:['quotes'],
	execute(message, args) {
        
        if(args == ""){
            args.push(Math.floor(Math.random() * quotes.length) - 2);
            //console.log(args[0]);
        }
        
        if(args <= 0){
            message.channel.send('Please provide a valid quote number!');
            return
        }
        if(args == 'test'){
            processFile("Quotes.txt");
            return                   
        }
        
        var quoteNumber = parseFloat(args[0]) + 2;
        
        message.channel.send('**```css\n' + quotes[quoteNumber].toString() + '```**');
         
	},
};

var finished = false;
var quotes = [""];
function processFile(inputFile) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
     
    rl.on('line', function (line) {
        //console.log(line);
        quotes.push(line);
    });
    
    rl.on('close', function (line) {
        //console.log(line);
        //console.log('done reading file.');
        finished = true;
    });
}
