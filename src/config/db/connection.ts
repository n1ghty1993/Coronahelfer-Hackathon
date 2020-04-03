import mongoose from 'mongoose';
import Environment from '../environments';

const config = Environment;

let binding;

if (process.env.BINDING) {
    binding = JSON.parse(process.env.BINDING);
}

if (binding === undefined) {
    console.error('ENVIRONMENT variable "BINDING" is not set! MongoDB must be bound to IBM Kubernetes Cluster.');
    process.exit(1);
}

const mongodbConn = binding.connection.mongodb;
const authentication = mongodbConn.authentication;

const username = authentication.username;
const password = authentication.password;
const connectionPath = mongodbConn.hosts;
const connectionString = `mongodb://${username}:${password}@${connectionPath[0].hostname}:${connectionPath[0].port},${connectionPath[1].hostname}:${connectionPath[1].port}/${config.DB_COLLECTION}?authSource=admin&replicaSet=replset&ssl=true`;

const ca = [Buffer.from(mongodbConn.certificate.certificate_base64, 'base64')];
const options = {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

class DBConnection {
    constructor() {
        this.connect();
    }

    private connect() {
        mongoose.connect(connectionString, options)
            .then(
                () => {
                    console.info('Database connection successful');
                },
                console.error.bind(console, 'Connection to the database could not be established:'),
            );
    }
}

export = DBConnection;
