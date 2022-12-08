import { PlaywrightCrawler, log, ProxyConfiguration } from 'crawlee';
import { router } from './routes.mjs';

const proxyConfiguration = new ProxyConfiguration({});

// This is better set with CRAWLEE_LOG_LEVEL env var
// or a configuration option. This is just for show 😈
log.setLevel(log.LEVELS.DEBUG);

log.debug('Setting up crawler.');
const crawler = new PlaywrightCrawler({
    useSessionPool: true,
    sessionPoolOptions: { maxPoolSize: 100 },
    persistCookiesPerSession: true,
    // proxyConfiguration,

    browserPoolOptions: {
        useFingerprints: false,
    },

    // Instead of the long requestHandler with
    // if clauses we provide a router instance.
    requestHandler: router,
});

log.debug('Adding requests to the queue.');
await crawler.addRequests(['https://www.myntra.com/']);

// crawler.run has its own logs 🙂
await crawler.run();