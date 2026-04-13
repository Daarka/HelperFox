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
	name: ["//directory", "link!directory", "links!directory", "link!notion", "links!notion", "link!scenes", "links!scenes", "link!archives", "links!archives", "link!archive", "links!archive"],

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
          "content": "### Resource & Lore Directory • `link!directory`\n<:D20:1425254300455534652> **[Scene Archives](<https://daarka.github.io/Aldis/>)**\n<:D20:1425254300455534652> **[Mission Vods](<https://discord.com/channels/732392791010967583/1019878709949378570>)**"
        },
        {
          "type": 14
        },
        {
          "type": 10,
          "content": "\n<:legendkeeper:1398779192350343268> **[Aldis World Map](<https://www.legendkeeper.com/app/ckwwh8rlwybbv0808n9eoyoj2/cl3nkpuud004d037c4itc79lo/>)**\n<:legendkeeper:1398779192350343268> **[Decism/Gods/Religion](<https://www.legendkeeper.com/app/ckwwh8rlwybbv0808n9eoyoj2/cl3qafhna00k3037cgk0mfoqd/cl3qafhnd00k4037c1v06w6es/>)**\n<:legendkeeper:1398779192350343268> **[Alchemy/Crafting System](<https://www.legendkeeper.com/app/ckwwh8rlwybbv0808n9eoyoj2/n4n48maa/>)**\n<:legendkeeper:1398779192350343268> **[Talmas](<https://www.legendkeeper.com/app/ckwwh8rlwybbv0808n9eoyoj2/cl3qa4zp000gy037c3x7tduen/>)**"
        },
        {
          "type": 14
        },
        {
          "type": 10,
          "content": "<:notion:1398779190324756610> **[Bastions](<https://www.notion.so/daarka/Bastions-1917c173147880f793d5def1afd1bb6f>)**\n<:notion:1398779190324756610> **[Alchemy/Crafting System](<https://www.notion.so/daarka/Aldis-Alchemy-3217c173147880dd98b5df289946bfa3>)**"
        },
        {
          "type": 14
        },
        {
          "type": 10,
          "content": "-# *More will be added as they're completed!*"
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
