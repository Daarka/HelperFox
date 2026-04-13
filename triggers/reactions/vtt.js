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
	name: ["//vtt", "link!vtt", "links!vtt"],

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
          "content": "### AlchemyVTT Links • `link!vtt`\n<:alchemyrpg:1398782688466305107> **[Valehunters](<https://app.alchemyrpg.com/i/mzGjNOXQS>)** (DM Daarka)\n<:alchemyrpg:1398782688466305107> **[Valehunters](<https://app.alchemyrpg.com/i/mzGjNOXQS>)** (DM Rebecca)\n<:alchemyrpg:1398782688466305107> ***[AlchemyVTT Guide](<https://discord.com/channels/732392791010967583/1177495912390611034/1192744882717069362>)***"
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
