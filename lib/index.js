export default (reporterName = 'verbose', tapReporter) => (input) => {
    return function ava(/* log */) {
        const API = require('ava/api');
        const Reporter = require('ava/lib/reporters/' + reporterName);

        // tap with custom reporter
        if (reporterName === 'tap' && typeof tapReporter === 'function') {
            return new Promise((resolve, reject) => {
                const api = new API();
                const reporter = Reporter();
                const stream = tapReporter();

                reporter.api = api;

                stream.pipe(process.stdout);

                api
                    .on('test-run', (runStatus) => {
                        runStatus.on('test', (data) => {
                            stream.write(reporter.test(data, runStatus));
                        });
                    })
                    .on('error', (error) => {
                        console.error(reporter.unhandledError(error));
                    })
                    .run(input)
                    .then((runStatus) => {
                        stream.write(reporter.finish(runStatus));
                        stream.end();

                        if (runStatus.failCount > 0) {
                            return reject();
                        }

                        resolve(input);
                    })
                    .catch(reject);
            });
        }

        // simple
        return new Promise((resolve, reject) => {
            const api = new API();
            const reporter = Reporter();

            reporter.api = api;

            api
                .on('test-run', (runStatus) => {
                    runStatus.on('test', (data) => {
                        console.log(reporter.test(data, runStatus));
                    });
                })
                .on('error', (error) => {
                    console.error(reporter.unhandledError(error));
                })
                .run(input)
                .then((runStatus) => {
                    console.log(reporter.finish(runStatus));

                    if (runStatus.failCount > 0) {
                        return reject();
                    }

                    resolve(input);
                })
                .catch(reject);
        });
    };
};
