/*eslint-disable*/
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const dotenv = require('dotenv');
const uuid = require('uuid');
const fs = require('fs');

dotenv.config();
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

fs.writeFileSync('creds.json', `{
  "type": "${process.env.type}",
  "project_id": "${process.env.project_id}",
  "private_key_id": "${process.env.private_key_id}",
  "private_key": "${process.env.private_key}",
  "client_email": "${process.env.client_email}",
  "client_id": "${process.env.client_id}",
  "auth_uri": "${process.env.auth_uri}",
  "token_uri": "${process.env.token_uri}",
  "auth_provider_x509_cert_url": "${process.env.auth_provider_x509_cert_url}",
  "client_x509_cert_url": "${process.env.client_x509_cert_url}"
}`);

const dialogflow = require('dialogflow');

io.on('connection', (socket) => {
  socket.on('propagateRequest', async ({text}) => {
    const sessionId = uuid.v4();
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(process.env.project_id, sessionId);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: 'en-US',
        },
      },
    };
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    socket.emit('sendResponse', { response: result.fulfillmentText });
  });
});

app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const appPort = process.env.PORT || 8000;
app.listen(appPort);
console.log(`App is listening on port: ${appPort}`);

const socketPort = process.env.SOCKET_PORT || 4113;
io.listen(socketPort);
console.log(`Socket is listening on port: ${socketPort}`);