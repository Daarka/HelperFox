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
	name: ["//trophy", "link!trophy", "links!trophy"],

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
          "content": "### Trophy Links • `link!trophy`\n`#💫table-talk` ➤ **[Trophy Dark](<https://discord.com/channels/732392791010967583/1097686598772072629>)**\n— *[Trophy Dark: Player Guide](<https://www.dropbox.com/scl/fi/17ukq402fa23cpn6nq0tn/Trophy_Dark.pdf?rlkey=68tbqljcvymvbn6afpp0y6e74&e=1&st=odblp00z&dl=0>)*\n— *[Trophy Dark: Character Sheets](<https://discord.com/channels/732392791010967583/1097686598772072629/1097687203452305492>)*\n— *[Trophy Dark: Vods](<https://discord.com/channels/732392791010967583/1097686598772072629/1190022810408599607>)*\n`#💫table-talk` ➤ **[Trophy Gold](<https://discord.com/channels/732392791010967583/1097686415938158642>)**\n— *[Trophy Gold: Player Guide](<https://www.dropbox.com/scl/fi/upzwsja6k7v41blxvbkcx/Trophy_Gold.pdf?rlkey=8gdrvr6ed0qhh1zg3nf49vluc&dl=0>)*\n— *[Trophy Gold: Character Sheets](<https://www.dropbox.com/scl/fi/mpj5zxbsmb1q0kh99wrjs/Trophy-Gold-Character-Sheet-Form-Fillable.pdf?rlkey=drigngd7ept1ay74llwjs0ita&dl=0>)*\n<:alchemyrpg:1398782688466305107> **[Trophy VTT](<https://app.alchemyrpg.com/i/XfCraq5qq>)** (DM Woozy)\n<:alchemyrpg:1398782688466305107> ***[AlchemyVTT Guide](<https://discord.com/channels/732392791010967583/1177495912390611034/1192744882717069362>)***"
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
