/* eslint-disable no-unused-vars */
require('dotenv').config();
require('console-emojis');

const
    express         = require('express'),
    app             = express(),
    fs              = require ('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    Art             = require('figlet'),
    ora             = require('ora'),
    os              = require('os'),
    ENV             = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));
    // swaggerDoc      = require(path.resolve(`./config/library/swagger/swagger`));
let ifaces          = os.networkInterfaces();

// @swagger setup
// swaggerDoc(app)

/*
/!* create http2 , https server *!/
const
	options = {
		// key : fs.readdirSync('./key.pem','utf8'),
		// cert : fs.readdirSync('./csr.pem', 'utf8')
        key: fs.readFileSync('/opt/SSL/12.key', 'utf8'),
        cert: fs.readFileSync('/opt/SSL/13.crt' , 'utf8'),
        ca: fs.readFileSync ('/opt/SSL/14.ca-bundle' , 'utf8')
	};
*/



//let Admin               = require(path.resolve('./modules/user/controllers/admin'));
let scoket              = require(path.resolve(`./config/library/socket.io/socket`));
let CreateF             = require(path.resolve('./config/library/createFolders/create_folder'));



app.use(express.static(__dirname + '/public'));

//@ start server
function startServer(){
let     server      = require('http').createServer(app , express);
// let     server      = require('http2').createSecureServer(options,app);    // this is use only secure server (HTTPS Create)
        server.listen(ENV.PORT,  ()=> {
        // eslint-disable-next-line no-console
       const ServerMess = ora((chalk`{bgYellow Node Js server running on {green.bold ${( process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + ENV.APP_HOST + ':' + ENV.PORT}} port at {green.bold ${ENV.MODE_TYPE}}..}`)).start();
        setTimeout(() => {
            ServerMess.stop();
            ServerMess.succeed();
        }, 2600)
    });
}

function CreateFolder() {
    let _log_folder_create  = new CreateF.FolderCreate().createDirectory(ENV.CREATE_LOGS_PATH)
    const _waiting = ora('Folder Create').start();
    setTimeout(() => {
        _waiting.stop();
        _waiting.succeed();
    }, 2000)

}

function _ServerStart() {
    const ServerMessage = Art('! ! Server Start ! !', function (err, data) {
        if (err) {
            // eslint-disable-next-line no-console
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    return ServerMessage;
}


async function STR() {
    let newServer = await scoket.startServer();
    return newServer;
}

// Db server start
function DbServerStart() {
    require(path.resolve('./config/library/server'))(app, ENV);
    //Admin.checkAdmin();
}

function Waiting() {
    const _waiting = ora('Server is start with in 1 mint Please wait').start();
    setTimeout(() => {
        _waiting.stop();
        _waiting.succeed();
    }, 3000)
}


function mainServer() {
    // _ServerStart();
    // setTimeout(SystemDetails, 200)
    // setTimeout(Waiting, 400);
    // used web socket
    /*setTimeout(STR, 5000);
    setTimeout(DbServerStart, 8000);*/

    // server run without socket
    _ServerStart();
    setTimeout(Waiting, 400);
    setTimeout(CreateFolder ,3000);
    setTimeout(startServer, 6000);
    setTimeout(DbServerStart, 8000);

    // setTimeout(startServer);
    // setTimeout(DbServerStart, 1000);
}


//@
if (require.main == module) {
    //@ run server without cluster module
    mainServer();
} else {
    //@ export startServer method to run application using cluster module
    module.exports = mainServer;
}


module.exports = app;

