const puppeteer = require('puppeteer');
const axios = require('axios');

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
            console.log("Sending SMS API request...");
            await axios.get(`http://pikachubd.rf.gd/CSMS.php?receiver=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`)
                .then(response => {
                    console.log("SMS API Response:", response.data);
                    console.log("SMS request sent successfully!");
                })
                .catch(error => console.error("Failed to send SMS:", error));
        } catch (error) {
            console.error("Error sending SMS:", error);
            api.sendMessage("An error occurred while sending the SMS request.", threadID);
        }
    } else if (action === "call") {
        const phoneNumber = args[0];

        if (!phoneNumber) {
            api.sendMessage("Please provide a phone number to call.", threadID);
            return;
        }

        try {
            console.log("Making call API request...");
            await axios.get(`https://our-api.000webhostapp.com/api/call.php?number=${encodeURIComponent(phoneNumber)}`)
                .then(() => {
                    console.log("Your call initiated successfully!");
                    api.sendMessage("Your call initiated successfully!", threadID);
                })
                .catch(error => console.error("Failed to initiate call:", error));
        } catch (error) {
            console.error("Error initiating call:", error);
            api.sendMessage("An error occurred while initiating the call.", threadID);
        }
    } else {
        api.sendMessage("Invalid action. Please use one of the following: sms, call", threadID);
    }
};
