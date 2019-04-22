exports.run = (client, e) => {
    const censortoken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
    if (e.startsWith("[ws] [connection]")) {
        return;
    }
    console.log(`${e.replace(censortoken, "~~REDACTED~~")}`);
};