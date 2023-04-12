const net = require('net');
const port = 3000;
const books = ['Odisseia', 'A cabana do Pai Tomás', 'Frankenstein',
                '1984', 'Hamlet', 'Cem anos de solidão', 'Ilíada',
                'Amada', 'A Revolução dos Bichos', 'Vasto Mar de Sargaços',   
                 'A Divina Comédia', 'Epopeia de Gilgamesh ',
                'O processo', 'Coração das Trevas', 'Édipo Rei']; // array of available books

const server = net.createServer((socket) => {
  console.log('Client connected');

  // listen for data from the client
  socket.on('data', (data) => {
    const bookName = data.toString().trim(); // convert data to string and remove whitespace

    // check if book exists
    const bookExists = books.includes(bookName);

    // send response to client
    let response;
    if (bookExists) { 
      response = { status: 200, message: 'ok' };
    } else {
      response = { status: 404, message: 'not found' };
    }
    socket.write(JSON.stringify(response));
  });

  // listen for socket close
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// listen for incoming connections

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
