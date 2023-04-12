const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// create socket connection to server
const client = new net.Socket();
client.connect(3000, 'localhost', () => {
  console.log('Connected to server');
});

// listen for data from server
client.on('data', (data) => {
  const response = JSON.parse(data.toString().trim());
  console.log(`Status: ${response.status}, Message: ${response.message}`);
  client.destroy(); // terminate communication after receiving response
});

// listen for socket close
client.on('close', () => {
  console.log('Connection closed');
});

// prompt user to enter book name and send request to server
rl.question('Insira o nome do livro para verificação: ', (bookName) => {
  if (!bookName) {
    const response = { status: 400, message: 'incorrect request format' };
    console.log(`Status: ${response.status}, Message: ${response.message}`);
    client.destroy(); // terminate communication after sending error response
  } else {
    client.write(bookName);
  }
});
