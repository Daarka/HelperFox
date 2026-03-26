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
	name: ["vhtest"],

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
          "content": "### Commands\n*You don't need a prefix, and these aren't slash commands. Just type these words and the bot will respond!*\n\n`vhtest` - test"
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
