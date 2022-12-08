import { createPlaywrightRouter, Dataset} from 'crawlee';

// createPlaywrightRouter() is only a helper to get better
// intellisense and typings. You can use Router.create() too.
export const router = createPlaywrightRouter();


router.addHandler('PRODUCT', async ({ request, page, log }) => {
    await Dataset.pushData({url: request.url});
});


router.addHandler('CATEGORY|PAGE', async ({ request, page, enqueueLinks, log }) => {
    const start = Date.now();
    log.debug(`Processing CATEGORY|PAGE request: ${request.url}`);

    await page.waitForSelector('.pagination-number a');
    await enqueueLinks({
        selector: '.pagination-number > a',
        label: 'CATEGORY|PAGE',
    })

    await page.waitForSelector('.product-base a');
    await enqueueLinks({
        selector: '.product-base > a',
        label: 'PRODUCT',
    })

    const end = Date.now();
    
    // log.debug(`Request Completed: ${request.url}`);
    // log.debug(`Start time: ${start} ms`);
    // log.debug(`End time: ${end} ms`);
    // log.debug(`Execution time: ${end - start} ms`);
});


// This is a fallback route which will handle the start URL
// as well as the LIST labelled URLs.
router.addDefaultHandler(async ({ request, page, enqueueLinks, log, proxyInfo }) => {
    const start = Date.now();
    // console.log(proxyInfo);
    log.debug(`Processing first request: ${request.url}`);
    
    await page.waitForSelector('.desktop-categoryLink', {state: 'hidden', timeout:0});
    await enqueueLinks({
        selector: '.desktop-categoryLink',
        label: 'CATEGORY|PAGE',
    })
    const end = Date.now();


    // log.debug(`Request Completed: ${request.url}`);
    // log.debug(`Start time: ${start} ms`);
    // log.debug(`End time: ${end} ms`);
    // log.debug(`Execution time: ${end - start} ms`);
});


