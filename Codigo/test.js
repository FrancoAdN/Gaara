const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
    if(input == 'users')
        console.log('Show users');
    else if(input == 'proyect')
        console.log('Show proyects');
    else if(input == 'tasks')
        console.log('Show tasks'); 
});