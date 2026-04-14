/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("bing")
		.setDescription(
			"testy."
		),

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
          "content": "### Server Tool Guides • `//guide`\n<:D20:1425254300455534652> **[Guide to Avrae Bot](<https://discord.com/channels/732392791010967583/1177497164503601223/1205325526575874089>)**\n<:D20:1425254300455534652> **[Guide to Using Dice](<https://discord.com/channels/732392791010967583/1215808396515737762/1215830335015878796>)**\n<:D20:1425254300455534652> **[Streaming Audio with HelperFox](<https://discord.com/channels/732392791010967583/1196126550064648334/1196126550064648334>)**\n<:D20:1425254300455534652> **[Guide to AlchemyVTT](<https://discord.com/channels/732392791010967583/1177495912390611034/1192744882717069362>)**\n<:D20:1425254300455534652> **[Guide to Sesh Bot](<https://.>)**"
        }
      ]
    }
  ]
});
	},
};
