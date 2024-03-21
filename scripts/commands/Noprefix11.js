const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
  "https://i.imgur.com/vxCDlNN.mp4",
  "https://i.imgur.com/ez6Yq9h.mp4",
"https://i.imgur.com/vl4ZznW.mp4",
"https://i.imgur.com/B2sQMJ3.mp4",
"https://i.imgur.com/PXHwuzw.mp4",
"https://i.imgur.com/ZIR1MSP.mp4",
"https://i.imgur.com/zokuM2t.mp4",
"https://i.imgur.com/8mRhKeF.mp4",
"https://i.imgur.com/8O89NlF.mp4",
"https://i.imgur.com/KxLdx5Z.mp4",
"https://i.imgur.com/n3r8emF.mp4",
"https://i.imgur.com/Um8WMAk.mp4",
"https://i.imgur.com/Ejm8TFf.mp4",
"https://i.imgur.com/I2UVfpE.mp4",
"https://i.imgur.com/PQe775i.mp4",
"https://i.imgur.com/pL1IrRC.mp4",
"https://i.imgur.com/uKhwIVZ.mp4",
"https://i.imgur.com/aGcjw7t.mp4",
"https://i.imgur.com/RG4jgIt.mp4",
"https://i.imgur.com/pHQ2F32.mp4"
];

module.exports.config = {
  name: "😒",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  category: "no prefix", 
  usages: "😒",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.handleEvent = async ({ api, event, Threads }) => {
  const content = event.body ? event.body : '';
    const body = content.toLowerCase();
  if (body.startsWith("😒")) {
    const rahad = [
      "_ওই দিকে কি দেখো এ দিকে দেখো..!🫂😍",
      " উম্মম্মমমমমমহহহ..বেবি ওই দিকে কি 😒"
    
    ];
    const rahad2 = rahad[Math.floor(Math.random() * rahad.length)];

    const callback = () => api.sendMessage({
      body: `${rahad2}`,
      attachment: fs.createReadStream(__dirname + "/cache/2024.mp4")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.mp4"), event.messageID);
    
    const requestStream = request(encodeURI(link[Math.floor(Math.random() * link.length)]));
    requestStream.pipe(fs.createWriteStream(__dirname + "/cache/2024.mp4")).on("close", () => callback());
    return requestStream;
  }
};

module.exports.languages = {
  "vi": {
    "on": "Dùng sai cách rồi lêu lêu",
    "off": "sv ngu, đã bão dùng sai cách",
    "successText": `🧠`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["😒"] === "undefined" || data["😒"]) data["😒"] = false;
  else data["😒"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["😒"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
