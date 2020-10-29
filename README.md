# pm2-reload

Sometimes, in some versions of pm2, the reload command is incorrect or does not work at all. This module allows you to restart processes one by one, waiting for a certain time interval between restarts to stabilize applications.

### Installing pm2-reload

With NPM from Github:

```bash
$ npm i -g git+https://github.com/rodewitsch/pm2-reload.git
```

With NPM:

```bash
$ npm i -g @rodewitsch/pm2-reload
```

Example:

```bash
pm2-reload --name clusteredAppName --delay 30000
```

Will restart the application with the specified name with a wait of 30 seconds.
