#!/usr/bin/env node

const pm2 = require('pm2'),
    PROCESS_NAME = getArg('--name'),
    DELAY = getArg('--delay');

pm2.connect(err => {
    if (err) throw err;

    pm2.list(async (err, list) => {
        try {
            if (err) throw err;
            if (!PROCESS_NAME) throw 'Application name doesn\'t specified';
            const TARGET_PROCESSES = list.filter(item => item.name == PROCESS_NAME);
            if (!TARGET_PROCESSES.length) throw 'Applications by specific process name don\'t found';
            for (const PROCESS of TARGET_PROCESSES) {
                await pm2Reload(PROCESS.pm_id);
                if (DELAY) await wait(DELAY);
            }
            console.log('Processes restarted');
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    })
});

function pm2Reload(process) {
    return new Promise((resolve, reject) => {
        console.log('Restart ', process);
        pm2.reload(process, (err, process) => {
            console.log('Restarted');
            if (err) return reject(err);
            return resolve(process);
        })
    });
}

function wait(value) { return new Promise(resolve => setTimeout(() => resolve(), value)) };

function getArg(name) {
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == name) return process.argv[i + 1];
    }
}
