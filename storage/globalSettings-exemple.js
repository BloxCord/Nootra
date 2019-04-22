// Note : the development config is optionnal and require another discord application

const pack = require("../package.json");

const releaseName = "whateverYouWant";
const devName = `${releaseName}-Dev`;
const creator = "yourName";
const devs = ["YourId", "YourCollaboratorId", "AnotherCollaboratorId"]; // Nb : Discord Id
const loggerVersion = "Logger-1.0.0";
const defaultPrefix = "whateverYouWant";


const devConfig = {
    token: "DEV_TOKEN",
    apiYoutube: "YOUTUBE_TOKEN",
    clientSecret: "CLIENT_SECRET",
    avatar: "AVATAR_LINK",
    loggerMsgId: "CHANNEL_ID",
    id: "BOT_ID",
    version: `${devName}-${pack.version}`,
    name: devName,
    defaultPrefix,
    creator,
    devs,
    loggerVersion
};

const releaseConfig = {
    token: "RELEASE_TOKEN",
    apiYoutube: "YOUTUBE_TOKEN2",
    clientSecret: "CLIENT_SECRET2",
    avatar: "AVATAR_LINK2",
    loggerMsgId: "CHANNEL_ID2",
    id: "BOT_ID2",
    version: `${releaseName}-${pack.version}`,
    name: releaseName,
    defaultPrefix,
    creator,
    devs,
    loggerVersion
};

module.exports.devConfig = devConfig;
module.exports.releaseConfig = releaseConfig;