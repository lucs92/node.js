import fs from 'fs';
import readline from 'readline';

const lineHandler = (line, data, id, callback) => {
    const activity = JSON.parse(line);
    if (activity.id === id) {
        return callback(data, activity);
    }
    return activity;
};

const getReadlineInterface = () => {
    return readline.createInterface({
        input: fs.createReadStream('./db.json'),
        output: process.stdout,
        terminal: false
    });
};

const checkDb = () => {
    return fs.existsSync('./db.json');
};

const createId = () => {
    return Math.random().toString(36).substr(2, 9);
};

export { createId, checkDb, getReadlineInterface, lineHandler };