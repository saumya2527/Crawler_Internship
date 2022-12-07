import { PlaywrightCrawler} from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`)
        if (request.label === 'DETAIL') {
           
        } else {
            // This means we're either on the start page, with no label,
            // or on a list page, with LIST label.

            await page.waitForSelector('.ge-49M');
            await enqueueLinks({
                selector: '.ge-49M',
                label: 'LIST',
            })

            // In addition to adding the listing URLs, we now also
            // add the detail URLs from all the listing pages.
            // await page.waitForSelector('._2UzuFa');
            // await enqueueLinks({
            //     selector: '._2UzuFa',
            //     label: 'DETAIL', // <= note the different label
            // })
        }
    },
});

await crawler.run(['https://www.flipkart.com/clothing-and-accessories/~cs-aerg0b0afc/pr?sid=clo&collection-tab-name=KK%2CSets%2CDM%2CSarees&fm=neo%2Fmerchandising&iid=M_82b68521-593c-4c6c-948e-b16b63f33cec_1_372UD5BXDFYS_MC.HQXTE43PO8HC&otracker=hp_rich_navigation_3_1.navigationCard.RICH_NAVIGATION_Fashion~Women%2BEthnic_HQXTE43PO8HC&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_3_L1_view-all&cid=HQXTE43PO8HC']);