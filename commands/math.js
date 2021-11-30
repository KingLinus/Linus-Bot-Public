module.exports = {
	name: 'math',
    description: 'Performs calculations',
    alias: ['calculate'],
	execute(message, args) {
        var results = 0;
        if(args[0] == "add" || args[0] == "sum" || args[0] == "+"){
            for(i=0;i < args.length - 1;i++){
                if(isNaN(args[i+1])){
                    return message.channel.send('You can only add numbers!');
                }
                results += parseFloat(args[i+1]);
            }
        }
        if(args[0] == "minus" || args[0] == "subtract" || args[0] == "sub" || args[0] == "-"){
            results = args[1];
            for(i=0;i < args.length - 2;i++){
                if(isNaN(args[i+2])){
                    return message.channel.send('You can only add numbers!');
                }
                results -= parseFloat(args[i+2]);
            }
        }
        if(args[0] == "multiply" || args[0] == "times" || args[0] == "*"){
            results = args[1];
            for(i=0;i < args.length - 2;i++){
                if(isNaN(args[i+2])){
                    return message.channel.send('You can only add numbers!');
                }
                results = results * parseFloat(args[i+2]);
            }
        }
        if(args[0] == "divide" || args[0] == "over" || args[0] == "/"){
            results = args[1];
            for(i=0;i < args.length - 2;i++){
                if(isNaN(args[i+2])){
                    return message.channel.send('You can only add numbers!');
                }
                if(args[i+2] == 0){
                    return message.channel.send('Divided by zero error! (#DIV/0!)')
                }
                results = results / parseFloat(args[i+2]);
            }
        }
        if(args[0] == "squareroot" || args[0] == "sqrt" || args[0] == "√"){
            if(isFinite(parseFloat(args[1]))){
                results = parseFloat(args[1]);
                for(i=1;i < args.length - 2;i++){
                    if(isNaN(args[i+2])){
                        return message.channel.send('You can only square root numbers!');
                    }
                    if(args[i+2] < 0){
                        return message.channel.send('Imaginary results not supported yet')
                    }
                    if(args[i+1] == "+"){
                        results += parseFloat(args[i+2]);
                    }
                    if(args[i+1] == "-"){
                        results -= parseFloat(args[i+2]);
                    }
                    if(args[i+1] == "*"){
                        results = results * parseFloat(args[i+2]);
                    }
                    if(args[i+1] == "/"){
                        results = results / parseFloat(args[i+2]);
                    }
                }
                results = Math.sqrt(results);
            }
            
        }
        if(isFinite(parseFloat(args[0]))){
            results = parseFloat(args[0]);
            for(i=0;i < args.length - 2;i++){
                if(args[i+1] == "+"){
                    results += parseFloat(args[i+2]);
                }
                if(args[i+1] == "-"){
                    results -= parseFloat(args[i+2]);
                }
                if(args[i+1] == "*"){
                    results = results * parseFloat(args[i+2]);
                }
                if(args[i+1] == "/"){
                    results = results / parseFloat(args[i+2]);
                }
            }
        }
        message.channel.send(results);
	},
};