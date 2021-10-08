# pm2-reload
[![Total alerts](https://img.shields.io/lgtm/alerts/g/rodewitsch/pm2-reload.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/rodewitsch/pm2-reload/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/rodewitsch/pm2-reload.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/rodewitsch/pm2-reload/context:javascript)

Sometimes, in some versions of pm2, the reload command is incorrect or does not work at all. This module allows you to restart processes one by one, waiting for a certain time interval between restarts to stabilize applications.

### Installing pm2-reload

With NPM:

```bash
$ npm i -g @rodewitsch/pm2-reload
```

With Yarn:

```bash
$ yarn global add @rodewitsch/pm2-reload
```

With NPM from Github:

```bash
$ npm i -g git+https://github.com/rodewitsch/pm2-reload.git
```

### Usage example

```bash
pm2-reload --name clusteredAppName --delay 30000
pm2-reload --all --delay 30000
```
