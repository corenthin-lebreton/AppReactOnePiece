const Discord = require("discord.js");
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

const prefix = "+";

Client.on("ready", () => {
  console.log("bot opérationnel");
});

Client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  //+ping
  if (message.content === prefix + "ping") {
    message.reply("pong !");
  }
});

// Système de kick
Client.on("message", (message) => {
  let command = message.content.split(" ")[0];
  const args = message.content.slice(prefix.length).split(/ +/);
  command = args.shift().toLowerCase();

  if (command === "kick") {
    let kickRole = message.guild.roles.find("name", "+kick");
    if (!message.member.roles.has(kickRole.id)) {
      return message
        .reply("Tu n'as pas la permission d'utiliser cette commande !")
        .catch(console.error);
    }
  }
  if (message.mentions.users.size === 0) {
    return message
      .reply("Merci de mentionner l'utilisateur à expulser !")
      .catch(console.error);
  }
  let kickMember = message.guild.member(message.mentions.users.first());
  if (!kickMember) {
    return message.reply(
      "Cet utilisateur est introuvable ou impossible à expulser !"
    );
  }
  if (!message.guild.member(Client.user).hasPermission("KICK_MEMBERS")) {
    return message.reply(
      "Je n'ai pas la permission KICK_MEMBERS pour faire ceci."
    );
  }
  kickMember
    .kick()
    .then((member) => {
      message
        .reply(`${member.user.username} a été expulsé`)
        .catch(console.error);
    })
    .catch(console.error);
});

// Système de ban

if (command === "ban") {
  let banRole = message.guild.roles.find("name", "+kick");
  if (!message.member.roles.has(banRole.id)) {
    return message
      .reply("Tu n'as pas la permission d'utiliser cette commande")
      .catch(console, error);
  }
  const member = message.mentions.members.first();
  if(!member) return message.reply("Merci de mentionner l'utilisateur à bannir !");
  member.ban().then(member => {
      message.reply(`${member.user.username} a été banni avec succès !`).catch(console.error)
     
  })
}

Client.login("OTM3Mzk0MzU1Njc5OTI4MzQy.YfbGhg.C8kNk1J8P3UYEtPSLsSOhtEawU8");
