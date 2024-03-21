module.exports.config = {
  name: "bot",
  version: "0.0.2",
  permission: 0,
  prefix: false,
  credits: "Rahad",
  description: "fun",
  category: "admin",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args, Users }) {
    const axios = require("axios");
    const request = require("request");
    const fs = require("fs-extra");
    const prompt = args.join(" ");
    var id = event.senderID;
    var name = await Users.getNameUser(event.senderID);
    var tl = ["আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘", " কি গো সোনা আমাকে ডাকছ কেনো", "বার বার আমাকে ডাকস কেন😡","আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱","হুম জান তোমার অইখানে উম্মমাহ😷😘"," আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি","আমাকে এতো না ডেকে বস নাহিদকে একটা গফ দে 🙄","jang hanga korba","jang bal falaba🙂"];
    var rand = tl[Math.floor(Math.random() * tl.length)];
    if (!prompt) return api.sendMessage(`╭────────────❍\n╰➤ 👤 𝐃𝐞𝐚𝐫 『${name}』,\n╰➤ 🗣️ ${rand}\n╰─────────────────➤`, event.threadID, event.messageID);
    const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${prompt}&filter=true`);
    console.log(res.data);
    const respond = res.data.success;
    
    return api.sendMessage({
        body: respond
    }, event.threadID, event.messageID);
};
