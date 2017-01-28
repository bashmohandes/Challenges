let fs = require('fs');
let os = require('os');

function findPair(pairs, num) {
    let minDelta = Number.MAX_VALUE;
    let minPair = null;
    for(let i = 0; i<pairs.length; i++) {        
        let lo = 0;
        let hi = pairs.length - 1;        
        while(lo < hi) {            
            let m = Math.floor((hi + lo) / 2);                        
            let sum = pairs[m][1] + pairs[i][1];            
            if(sum === num) {
                return [pairs[m], pairs[i]];
            }

            if(sum < num) {
                lo = m + 1;
            } else if(sum > num){                
                if(Math.abs(num - sum) < minDelta) {                    
                    minDelta = num - sum;
                    minPair = [m, i];
                }
                hi = m - 1;
            } 
        }
    }

    if(minPair) {
        return [pairs[minPair[0]], pairs[minPair[1]]];
    }

    return [];
}

if(process.argv.length === 4) {
    let fileName = process.argv[2];
    fs.readFile(fileName, function(err, data){
        let pairs = data.toString().split(os.EOL).filter(v => v != '').map(l => {
            let p = l.split(' '); 
            return [p[0], Number(p[1])];
        });
        let pair = findPair(pairs, Number(process.argv[3]));
        console.log(pair);
    });
}