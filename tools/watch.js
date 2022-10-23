const cpx = require('cpx');
const path = require('path');
const qbLog = require('qb-log')('simple');

const source = path.join(__dirname, '..', 'addons', '**', '*');
const target = path.join('C:', 'Games', 'World of Warcraft', '_classic_', 'Interface', 'AddOns');

qbLog({
    copy: {
        prefix: 'COPY',
        formatter: qbLog._chalk.green
    },
    remove: {
        prefix: 'REMOVE',
        formatter: qbLog._chalk.yellow
    },
    target: {
        prefix: 'TARGET',
        formatter: qbLog._chalk.cyan
    }
});

const watcher = cpx.watch(source, target, {});

watcher.on('copy', (ev) => qbLog.copy(ev.srcPath));
watcher.on('remove', (ev) => qbLog.remove(ev.path));
watcher.on('watch-error', (err) => qbLog.error(err.message));
watcher.on('watch-ready', () => {
    qbLog.info('Watching for changes...');
    qbLog.target(target);
});