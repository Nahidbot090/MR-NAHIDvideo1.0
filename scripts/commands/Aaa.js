const axios = require('axios');
const puppeteer = require('puppeteer');

module.exports.config = {
    name: "bombing",
    version: "1.0.0",
    permission: 2,
    credits: "Rahad",
    description: "Send an SMS or make a call",
    prefix: true,
    category: "sms send",
    usages: ["sms <phone_number> <message>", "call <phone_number>"],
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event, args }) {
    const { threadID } = event;
    const action = args.shift();

    if (action === "sms") {
        const phoneNumber = args[0];
        const message = args.slice(1).join(" ");

        if (!phoneNumber || !message) {
            api.sendMessage("Please provide both phone number and message in the format: sms <phone_number> <message>", threadID);
            return;
        }

        try {
            // Send SMS API call 1
            await axios.get(`https://our-api.000webhostapp.com/api/call.php?number=${encodeURIComponent(phoneNumber)}`)
                .then(response => console.log("SMS API Response 1:", response.data))
                .catch(error => console.error("Failed to send SMS to number 1:", error));

            // Send SMS API call 2
            await axios.get(`http://pikachubd.rf.gd/CSMS.php?receiver=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`)
                .then(response => console.log("SMS API Response 2:", response.data))
                .catch(error => console.error("Failed to send SMS to number 2:", error));

            // Send SMS API call 3
            await axios.post("https://customsms.tbbhack.xyz/", { recipient: phoneNumber, message })
                .then(response => console.log("SMS API Response 3:", response.data))
                .catch(error => console.error("Failed to send SMS to number 3:", error));

            // Send SMS API call 4
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(`https://your-fourth-sms-api.com?receiver=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`)
                .then(() => console.log("Your SMS sent successfully to number 4"))
                .catch(error => console.error("Failed to send SMS to number 4:", error));
            await browser.close();

            api.sendMessage("Your SMS sent successfully!", threadID);
        } catch (error) {
            console.error("Error sending SMS:", error);
            api.sendMessage("An error occurred while sending the SMS.", threadID);
        }
    } else if (action === "call") {
        const phoneNumber = args[0];

        if (!phoneNumber) {
            api.sendMessage("Please provide a phone number to call.", threadID);
            return;
        }

        try {
            // Make the call API call
            await axios.get(`https://our-api.000webhostapp.com/api/call.php?number=${encodeURIComponent(phoneNumber)}`)
                .then(response => console.log("Call API Response:", response.data))
                .catch(error => console.error("Failed to initiate call:", error));

            api.sendMessage("Your call initiated successfully!", threadID);
        } catch (error) {
            console.error("Error initiating call:", error);
            api.sendMessage("An error occurred while initiating the call.", threadID);
        }
    } else {
        api.sendMessage("Invalid action. Please use one of the following: sms, call", threadID);
    }
};
