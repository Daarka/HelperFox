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
	name: ["link!character", "links!character", "link!characters", "links!characters", "link!newcharacter", "links!newcharacter", "link!pc", "links!pc", "link!newpc", "links!newpc", "link!char", "links!char"],

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
          "content": "### Character Links • `link!character`\n<:ddb:1398782690903326833> **[Join DnDBeyond Campaign](<https://ddb.ac/campaigns/join/1250680958380520>)**\n<:notion:1398779190324756610> **[Character Creation Guide](<https://www.notion.so/daarka/New-Friend-Guide-1c37c1731478800cafd6fc1b1bd96729?pvs=97#1c47c173147880efbcb2e48135262e53>)**\n<:notion:1398779190324756610> **[Submit Character on Notion](<https://www.notion.so/daarka/The-Valehunters-Guild-1377c1731478816590fcd24a6deae175>)**"
        },
        {
          "type": 14,
          "spacing": 1,
          "divider": true
        },
        {
          "type": 10,
          "content": "<:notion:1398779190324756610> **[Character Roster](<https://www.notion.so/daarka/1807c173147880e08058c4e72e816541?v=1c47c173147880a092bb000ceafab6d9>)**\n<:notion:1398779190324756610> **[Your Character Notes](<https://www.notion.so/daarka/Character-Notes-23a7c1731478805c9abcf649b8669f9b>)**"
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
