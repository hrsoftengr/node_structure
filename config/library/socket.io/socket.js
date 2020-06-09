const
    express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    ENV = require(path.resolve(`./config/env/${process.env.NODE_ENV}`)),
    chalk = require('chalk'),
    ora = require('ora'),
    socket = require('socket.io');


const documents = {};
let timerId = null,
    sockets = new Set();


function startServer() {
    let serve = server.listen(ENV.PORT, () => {
        let main = ora(
            chalk`{yellow ${new Date()} => server running on {green.bold ${
                ENV.PORT
            }} port at {green.bold ${ENV.MODE_TYPE}}..}`
        ).succeed();
    });
    let io = socket(serve);
    /*	io.on('connection', socket => {
            let previousId;
            const safeJoin = currentId => {
                socket.leave(previousId);
                socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
                previousId = currentId;
            }

            socket.on('getDoc', docId => {
                safeJoin(docId);
                socket.emit('document', documents[docId]);
            });

            socket.on('addDoc', doc => {
                documents[doc.id] = doc;
                safeJoin(doc.id);
                io.emit('documents', Object.keys(documents));
                socket.emit('document', doc);
            });

            socket.on('editDoc', doc => {
                documents[doc.id] = doc;
                socket.to(doc.id).emit('document', doc);
            });

            io.emit('documents', Object.keys(documents));

            console.log(`Socket ${socket.id} has connected`);
        });*/

    io.on('connection', socket => {

        sockets.add(socket);
        console.rocket(`Socket ${socket.id} added`);
        console.bust_in_silhouette('user connected');


        if (!timerId) {
            startTimer();
        }

        socket.on('clientdata', data => {
            console.cn(data);
            console.o2('Message Received: ' + data);
            io.emit('message', {type: 'new-message', text: data});
        });

        socket.on('disconnect', () => {
            console.x(`Deleting socket: ${socket.id}`);
            sockets.delete(socket);
            console.log(`Remaining sockets: ${sockets.size}`);
        });

    });
}

function startTimer() {
    //Simulate stock data received by the server that needs
    //to be pushed to clients
    timerId = setInterval(() => {
        if (!sockets.size) {
            clearInterval(timerId);
            timerId = null;
            console.stop_sign('Timer stopped');
        }
        let value = ((Math.random() * 50) + 1).toFixed(2);
        //See comment above about using a "room" to emit to an entire
        //group of sockets if appropriate for your scenario
        //This example tracks each socket and emits to each one
        for (const s of sockets) {
            console.u6e80(`Emitting value: ${value}`);
            s.emit('data', {data: value});
        }

    }, 2000);
}

module.exports = {startServer};
