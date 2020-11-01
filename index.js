#!/usr/bin/env node

const pm2 = require('pm2'),
    ALL_MODE = getArg('--all'),
    HELP_MODE = getArg('--help'),
    PROCESS_NAME = getArg('--name'),
    DELAY = getArg('--delay');

if (HELP_MODE) {
    console.log(`
Usage: 
    pm2-reload [options]

Examples: 
    pm2-reload --all [--delay n]
    pm2-reload --name clusteredAppName [--delay n]

Options:
    --help                                    show help info
    --all                                     reload all processes
    --name                                    reload processes by specific name
    --delay                                   delay between restarts
`);
    process.exit();
}

pm2.connect(err => {
    if (err) throw err;

    pm2.list(async (err, list) => {
        try {
            if (err) throw err;
            if (!ALL_MODE && !PROCESS_NAME) throw 'Application name doesn\'t specified';
            const TARGET_PROCESSES = ALL_MODE ? list : list.filter(item => item.name == PROCESS_NAME);
            if (!TARGET_PROCESSES.length) throw 'Applications by specific process name don\'t found';
            for (let processIndex = 0; processIndex < TARGET_PROCESSES.length; processIndex++) {
                const PROCESS = TARGET_PROCESSES[processIndex],
                    NEXT_PROCESS = TARGET_PROCESSES[processIndex + 1];
                await pm2Reload(PROCESS.pm_id);
                if (DELAY && NEXT_PROCESS && PROCESS.name == NEXT_PROCESS.name) await wait(DELAY);
            }
            console.log('Processes restarted');
        }
        catch (err) { console.error(err); }
        finally { process.exit(); }
    })
});

function pm2Reload(process) {
    const PROCESS_ID = process;
    return new Promise((resolve, reject) => {
        pm2.reload(PROCESS_ID, (err, process) => {
            console.log('Restarted ', process[0].name, ' pm_id ', PROCESS_ID);
            if (err) return reject(err);
            return resolve(process);
        })
    });
}

function wait(value) { return new Promise(resolve => setTimeout(() => resolve(), value)) };

function getArg(name) {
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == name) {
            if (name == '--help' || name == '--all') return true;
            return process.argv[i + 1];
        }
    }
}
