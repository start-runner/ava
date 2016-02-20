# start-ava

[![npm](https://img.shields.io/npm/v/start-ava.svg?style=flat-square)](https://www.npmjs.com/package/start-ava)
[![linux build](https://img.shields.io/travis/start-runner/ava.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/ava)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/ava.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/ava)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/ava.svg?style=flat-square)](https://codecov.io/github/start-runner/ava)
[![deps](https://img.shields.io/gemnasium/start-runner/ava.svg?style=flat-square)](https://gemnasium.com/start-runner/ava)
[![gitter](https://img.shields.io/badge/gitter-join_chat_%E2%86%92-00d06f.svg?style=flat-square)](https://gitter.im/start-runner/start)

[AVA](https://github.com/sindresorhus/ava) task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -D start-ava
```

## Usage

```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import watch from 'start-watch';
import ava from 'start-ava';
import tapSpec from 'tap-spec';

const start = Start(reporter());

export function test() {
    return start(
        files('test/**/*.js'),
        ava('tap', tapSpec)
    )
}

export function tdd() {
    return start(
        files([ 'lib/**/*.js', 'test/**/*.js' ]),
        watch(test)
    );
}
```

This task relies on array of files and provides the same, see [documentation](https://github.com/start-runner/start#readme) for details.

:point_right: Note that this task will not work with [start-istanbul](https://github.com/start-runner/istanbul).

## Arguments

`ava(avaReporter, tapReporter)`

* `avaReporter` – name of [AVA reporter](https://github.com/sindresorhus/ava/tree/master/lib/reporters), `'verbose'` by default
* `tapReporter` – optional [tap reporter](https://github.com/substack/tape/#pretty-reporters) for `avaReporter='tap'`
