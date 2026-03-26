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
	name: ["link!lk", "links!lk"],

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
          "content": "### LegendKeeper Links • `link!lk`\n<:legendkeeper:1398779192350343268> **[Public Access](<https://www.legendkeeper.com/app/ckwwh8rlwybbv0808n9eoyoj2>)**\n<:legendkeeper:1398779192350343268> **[Logged-In Access](<https://app.legendkeeper.com/a/worlds/ckwwh8rlwybbv0808n9eoyoj2/cl4btf1os0007037cnxg05end/>)**\n<:legendkeeper:1398779192350343268> *Type* `link!directory` *for links to common specific pages!*"
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
