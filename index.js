const pm2 = require('pm2'),
    PROCESS_NAME = getArg('--name'),
    DELAY = getArg('--delay');

pm2.connect((err) => {
    if (err) {
        console.error(err);
        process.exit();
    }

    pm2.list(async (err, list) => {
        if (err) {
            console.error(err);
            process.exit();
        }

        if (!PROCESS_NAME) {
            console.error('Application name doesn\'t specified');
            process.exit();
        }

        const TARGET_PROCESSES = list.filter(item => item.name == PROCESS_NAME);
        if (!TARGET_PROCESSES.length) console.error('Applications by specific process name don\'t found');

        for (const PROCESS of TARGET_PROCESSES) {
            await pm2Reload(PROCESS.pm_id);
            if (DELAY) {
                console.log('Delay ', DELAY);
                await wait(DELAY);
            }
        }

        console.log('Processes restarted');
        process.exit();
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
