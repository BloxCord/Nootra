exports.run = (client, messageReaction, user) => {
    console.log(user);
    if (user.bot) {
        return;
    }
};