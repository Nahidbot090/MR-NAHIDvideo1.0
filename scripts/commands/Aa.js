const puppeteer = require('puppeteer');

module.exports.config = {
    name: "sms",
    version: "1.0.0",
    permission: 0,
    credits: "Rahad",
    description: "Send an SMS to the specified number",
    prefix: true,
    category: "sms send",
    usages: "sms <phone_number> <message>",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event, args }) {
    const { threadID } = event;
    const phoneNumber = args[0];
    const message = args.slice(1).join(" ");

    if (!phoneNumber || !message) {
        api.sendMessage("Please provide both phone number and message in the format: sms <phone_number> <message>", threadID);
        return;
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://pikachubd.rf.gd/CSMS.php?receiver=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`);
        
        // Wait for the page to load (adjust timeout as needed)
        await page.waitForTimeout(5000);
        
        // Get the page content after JavaScript execution
        const content = await page.content();
        console.log("Page Content:", content);
        
        await browser.close();
        
        api.sendMessage("SMS request sent successfully!", threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while sending the SMS request.", threadID);
    }
};
