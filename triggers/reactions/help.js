/**
 * @file Sample Trigger command.
 * @author Naman Vrati
 * @since 2.0.0
 * @version 3.2.2
 */

// For now, the only available property is name array. Not making the name array will result in an error.

/**
 * @type {import('../../typings').TriggerCommand}
 */
module.exports = {
	name: ["//help"],

	execute(message, args) {
		// Put all your trigger code over here. This code will be executed when any of the element in the "name" array is found in the message content.

		message.channel.send({
  "content": "",
  "tts": false,
  "embeds": [],
  "components": [
    {
      "id": 117112113,
      "type": 17,
      "components": [
        {
          "id": 688460067,
          "type": 10,
          "content": "### Bot Commands • `bot!help`\n*These are **not** slash commands. Just type these, and the bot will reply!*"
        },
        {
          "type": 14,
          "spacing": 1,
          "divider": true
        },
        {
          "type": 10,
          "content": "<:Aether:1118415260014092369> `link!character`\n> -# **Submitting a new character, or viewing existing roster/player notes**\n<:Aether:1118415260014092369> `link!vtt`\n> -# **Summoning links for AlchemyVTT and respective info guides**\n<:Aether:1118415260014092369> `link!lk`\n> -# **Links for the LegendKeeper project & directories**\n<:Aether:1118415260014092369> `link!trophy`\n> -# **All links related to Trophy Dark & Trophy Gold side games**"
        }
      ],
      "accent_color": 10364520
    }
  ],
  "actions": {},
  "flags": 32768
});
	},
};
