const axios = require("axios");

module.exports.config = {
    name: "sms",
    version: "1.0.0",
    permission: 0,
    credits: "Rahad",
    description: "SMS bombing",
    prefix: true,
    category: "sms send",
    usages: "[phone_number] [message]",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event, args }) {
    const { threadID } = event;
    const phoneNumber = args[0];
    const message = args.slice(1).join(" ");

    if (!phoneNumber || !message) {
        api.sendMessage("Please provide both phone number and message.", threadID);
        return;
    }

    try {
        const response = await axios.get(`https://arman83939.000webhostapp.com/customsms.php?number=${encodeURIComponent(phoneNumber)}&mgs=${encodeURIComponent(message)}`);

        if (response.data.msg_code === "operate.success") {
            api.sendMessage("SMS sent successfully!", threadID);
        } else {
            api.sendMessage("Failed to send SMS. Please try again later.", threadID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while sending the SMS.", threadID);
    }
};
