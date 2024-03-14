module.exports.config = {
  name: "prefix",
  version: "1.0.0", 
  permission: 0,
  credits: "Rahad",
  description: "", 
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5, 
  dependencies: {
	}
};

module.exports.handleEvent = async function ({ api, event }) {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs");
  const moment = require("moment-timezone");
  
  var times = moment.tz("Asia/Dhaka").format("hh:mm:ss || D/MM/YYYY");
  var thu = moment.tz("Asia/Dhaka").format("dddd");

  if (thu === "Sunday") thu = "𝚂𝚞𝚗𝚍𝚊𝚢";
  if (thu === "Monday") thu = "𝙼𝚘𝚗𝚍𝚊𝚢";
  if (thu === "Tuesday") thu = "𝚃𝚞𝚎𝚜𝚍𝚊𝚢";
  if (thu === "Wednesday") thu = "𝚆𝚎𝚍𝚗𝚎𝚜𝚍𝚊𝚢";
  if (thu === "Thursday") thu = "𝚃𝚑𝚞𝚛𝚜𝚍𝚊𝚢";
  if (thu === "Friday") thu = "𝙵𝚛𝚒𝚍𝚊𝚢";
  if (thu === "Saturday") thu = "𝚂𝚊𝚝𝚞𝚛𝚍𝚊𝚢";

  var { threadID, messageID, body } = event;
  const { PREFIX } = global.config;
  let threadSetting = global.data.threadData.get(threadID) || {};
  let prefix = threadSetting.PREFIX || PREFIX;
  const timeStart = Date.now();
  const tdung = require("./../../rahad/prefix.json");
  var video = tdung[Math.floor(Math.random() * tdung.length)].trim();
  
  function vtuanhihi(videoUrl, vtuandz, callback) {
    request(videoUrl)
      .pipe(fs.createWriteStream(__dirname + `/` + vtuandz))
      .on("close", callback);
  }
  
  if (body && body.startsWith("Prefix")) {
    let callback = function () {
      return api.sendMessage(
        {
          body: `====『 𝙿𝚁𝙴𝙵𝙸𝚇 』====\n▱▱▱▱▱▱▱▱▱▱▱▱▱\n✿𝙶𝚛𝚘𝚞𝚙 𝙿𝚛𝚎𝚏𝚒𝚡: ${prefix}\n۞𝚂𝚢𝚜𝚝𝚎𝚖 𝙿𝚛𝚎𝚏𝚒𝚡 : ${global.config.PREFIX}\n✪𝙱𝚘𝚝 𝙽𝚊𝚖𝚎: ${global.config.BOTNAME}\n✴𝙿𝚒𝚗𝚐: ${Date.now() - timeStart}ms\n▱▱▱▱▱▱▱▱▱▱▱▱▱\n『  ${thu} || ${times} 』`,
          attachment: [fs.createReadStream(__dirname + `/video.mp4`)],
        },
        event.threadID,
        () => {
          fs.unlinkSync(__dirname + `/video.mp4`);
        },
        event.messageID
      );
    };
    vtuanhihi(video, "video.mp4", callback);
  }
};
