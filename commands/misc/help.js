module.exports = {
	name: "help",
	aliases: ["foxhelp"],
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
		message.channel.send({
  "content": "",
  "embeds": [],
  "flags": 32768,
  "components": [
    {
      "id": 117112113,
      "type": 17,
      "accent_color": 10364520,
      "components": [
        {
          "id": 688460067,
          "type": 10,
          "content": "### Bot Commands • `//help` *or* `//foxhelp`\n*These are **not** slash commands!*"
        },
        {
          "type": 14,
          "spacing": 1,
          "divider": true
        },
        {
          "type": 10,
          "content": "<:Aether:1118415260014092369> `//character`\n> -# **Submitting a new character, or viewing existing roster/player notes**\n<:Aether:1118415260014092369> `//vtt`\n> -# **Summoning links for AlchemyVTT and respective info guides**\n<:Aether:1118415260014092369> `//lk`\n> -# **Links for the LegendKeeper project & directories**\n<:Aether:1118415260014092369> `//trophy`\n> -# **All links related to Trophy Dark & Trophy Gold side games**"
        }
      ]
    }
  ]
});
	},
};
