#!/usr/bin/node

function print_comb(input, start) {        
    if(start === input.length) {
        console.log(input.join(''));
        return;
    }

    if(input[start] === 'X') {
       input[start] = '1';
       print_comb(input, start + 1);

       input[start] = '0';
       print_comb(input, start + 1);
       input[start] = 'X'
    } else {
        print_comb(input, start + 1);
    }
}

if(process.argv.length === 3) {
    print_comb(Array.from(process.argv[2]), 0)
}
