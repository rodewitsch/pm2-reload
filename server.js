const express = require('express'),
    app = express();

let expressServer;

app.get('/', (req, res) => res.send('ok'));

process.on('SIGINT', () => {
    expressServer.close(() => {
        console.log('SIGINT');
        process.exit();
    })
});
process.on('SIGTERM', () => {
    expressServer.close(() => {
        console.log('SIGTERM');
        process.exit();
    })
});

setTimeout(() => {
    expressServer = app.listen(3000, '0.0.0.0', () => {
        process.send('ready');
        console.log('working');
    });
}, 20000);
