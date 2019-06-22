/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
    console.log('The HTTP server is listening at Port 3000.');
});

let messages = [
    { 'id': 1, 'user': 'Brittany', 'message': 'hi there!' },
    { 'id': 2, 'user': 'Michael Scott', 'message': 'thats what she said' },
    { 'id': 3, 'user': 'Mary Poppins', 'message': 'Supercalifragalisticexpialidocious' }
];

const getAllMessages = (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(messages));
};

const addMessage = (message, res) => {
    const updatedMsgs = [...messages, message];
    messages = updatedMsgs;
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};

server.on('request', (request, response) => {
    if (request.method === 'GET') {
        getAllMessages(response);
    }

    else if (request.method === 'POST') {
        let newMessage = { 'id': new Date() };
        request.on('data', (data) => {
            newMessage = Object.assign(newMessage, JSON.parse(data));
        });

        request.on('end', () => {
            addMessage(newMessage, response);
        });
    }
});

