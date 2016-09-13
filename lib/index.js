export default (reporterName = 'verbose', tapReporter) => (input) => {
    return function ava(/* log */) {
        const API = require('ava/api');
        const Reporter = require('ava/lib/reporters/' + reporterName);

        // tap with custom reporter
        if (reporterName === 'tap' && typeof tapReporter === 'function') {
            return new Promise((resolve, reject) => {
                const api = new API(input);
                const reporter = Reporter();
                const stream = tapReporter();

                reporter.api = api;

                stream.pipe(process.stdout);

                api
                    .on('test', test => {
                        stream.write(reporter.test(test));
                    })
                    .on('error', error => {
                        console.error(reporter.unhandledError(error));
                    })
                    .run()
                    .then((test) => {
                        stream.write(reporter.finish(test));
                        stream.end();

                        if (api.failCount > 0) {
                            return reject();
                        }

                        resolve(input);
                    })
                    .catch(error => {
                        reject(error.message);
                    });
            });
        }

        // simple
        return new Promise((resolve, reject) => {
            const api = new API(input);
            const reporter = Reporter();

            reporter.api = api;

            api
                .on('test', test => {
                    console.log(reporter.test(test));
                })
                .on('error', error => {
                    console.error(reporter.unhandledError(error));
                })
                .run()
                .then((test) => {
                    console.log(reporter.finish(test));

                    if (api.failCount > 0) {
                        return reject();
                    }

                    resolve(input);
                })
                .catch(error => {
                    reject(error.message);
                });
        });
    };
};
