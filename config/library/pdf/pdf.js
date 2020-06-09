'use strict'
const
    Fs = require('fs'),
    Path = require('path'),
    Puppeteer = require('puppeteer'),
    Handlebars = require('handlebars');

const ENV = require(Path.resolve(`./config/env/${process.env.NODE_ENV}`));

exports.PDF = async (data) => {
    try {
        console.boom('Start PDF....................')
        let dataBinding = {
            items: [{
                name: "item 1",
                price: 100
            },
                {
                    name: "item 2",
                    price: 200
                },
                {
                    name: "item 3",
                    price: 300
                }
            ],
            total: 600,
            isWatermark: true
        }
        var templateHtml = Fs.readFileSync(Path.join(process.cwd(), ENV.INVOICE), 'utf8');
        var template = Handlebars.compile(templateHtml);
        var finalHtml = template(dataBinding);
        var options = {
            format: 'A4',
            headerTemplate: "<p>Invoice</p>",
            footerTemplate: "<p>DataGardener</p>",
            displayHeaderFooter: true,
            margin: {
                top: "40px",
                bottom: "100px"
            },
            printBackground: true,
            path: 'invoice.pdf'
        }

        const browser = await Puppeteer.launch({
            args: ['--no-sandbox'],
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(`data:text/html,${finalHtml}`, {
            waitUntil: 'networkidle0'
        });
        await page.pdf(options);
        await browser.close();

        return true;
    } catch (e) {
        console.log(e)
    }

}

