const TACTIONS = [
	{
		label: 'answer contains...',
		value: 'contains'
	},
	{
		label: 'answer is equal to...',
		value: 'equals'
	}
]

const NACTIONS = [
	{
		label: 'answer is less than...',
		value: 'lt'
	},
	{
		label: 'answer is greater than...',
		value: 'gt'
	},
	{
		label: 'answer is less than or equal to...',
		value: 'lte'
	},
	{
		label: 'answer is greater than or equal to...',
		value: 'gte'
	},
	{
		label: 'answer is equal to...',
		value: 'eq'
	}
]

const options = [
	{val: 'name', desc: 'copy name for this form', alias: ['n', 'name']},
	{val: 'description', desc: 'copy description for this form', alias: ['d', 'desc', 'description']},
	{val: 'roles', desc: 'copy roles for this form', alias: ['r', 'rls', 'rs', 'roles']},
	{val: 'channel_id', desc: 'copy response channel for this form', alias: ['ch', 'chan', 'channel']},
	{val: 'message', desc: 'copy acceptance message for this form', alias: ['m', 'msg', 'message']},
	{val: 'color', desc: 'copy color for this form', alias: ['c', 'col', 'colour', 'color']}
]

const numbers = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"];
const confirmReacts = ['✅','❌'];

const qButtons = {
	nTemp: {
		type: 2,
		style: 2,
	},
	other: {
		type: 2,
		style: 2,
		label: 'Other',
		custom_id: 'other',
		emoji: {name: '🅾️'}
	},
	select: {
		type: 2,
		style: 2,
		label: 'Select',
		custom_id: 'select',
		emoji: {name: '✏️'}
	},
	skip: {
		type: 2,
		style: 2,
		label: 'Skip',
		custom_id: 'skip',
		emoji: {name: '➡️'}
	},
	submit: {
		type: 2,
		style: 2,
		label: 'Submit',
		custom_id: 'submit',
		emoji: { name: '✅'}
	},
	cancel: {
		type: 2,
		style: 2,
		label: 'Cancel',
		custom_id: 'cancel',
		emoji: { name: '❌'}
	}
}

const submitBtns = [
	{
		type: 2,
		style: 2,
		label: 'Submit',
		custom_id: 'submit',
		emoji: { name: '✅'}
	},
	{
		type: 2,
		style: 2,
		label: 'Cancel',
		custom_id: 'cancel',
		emoji: { name: '❌'}
	}
]

module.exports = {
	TACTIONS,
	NACTIONS,
	options,
	numbers,
	confirmReacts,
	confirmVals: [['y', 'yes', '✅'], ['n', 'no', '❌']],
	confirmBtns: [['yes', 'clear'], ['no', 'cancel']],
	events: ['apply', 'submit', 'accept', 'deny'],

	qButtons,
	submitBtns,
	clearBtns: [
		{
			type: 2,
			style: 2,
			label: 'Clear',
			custom_id: 'clear',
			emoji: { name: '🗑'}
		},
		{
			type: 2,
			style: 2,
			label: 'Cancel',
			custom_id: 'cancel',
			emoji: { name: '❌'}
		}
	],
	confBtns: [
		{
			type: 2,
			style: 2,
			label: 'Confirm',
			custom_id: 'yes',
			emoji: { name: '✅'}
		},
		{
			type: 2,
			style: 2,
			label: 'Cancel',
			custom_id: 'no',
			emoji: { name: '❌'}
		}
	],
	responseBtns: [
		//{
		//	type: 2,
		//	style: 2,
		//	label: 'Accept',
		//	custom_id: 'accept',
		//	emoji: {name: '✅'}
		//},
		{
			type: 2,
			style: 2,
			label: 'Create Swap DMs',
			custom_id: 'ticket',
			emoji: {name: '💬'}
		},
		{
			type: 2,
			style: 2,
			label: 'Close',
			custom_id: 'deny',
			emoji: {name: '❌'}
		}
	],
	pageBtns: (ind, len) => {
		return [
			{
				type: 2,
				emoji: {name: '⏮️'},
				style: 2,
				custom_id: 'first'
			},
			{
				type: 2,
				emoji: {name: '◀️'},
				style: 2,
				custom_id: 'prev'
			},
			{
				type: 2,
				label: `page ${ind}/${len}`,
				style: 2,
				custom_id: 'page',
				disabled: true
			},
			{
				type: 2,
				emoji: {name: '▶️'},
				style: 2,
				custom_id: 'next'
			},
			{
				type: 2,
				emoji: {name: '⏭️'},
				style: 2,
				custom_id: 'last'
			}
		]
	},
	denyBtns: (disabled) => ([{
		type: 1,
		components: [
			{
				type: 2,
				label: 'Add reason',
				custom_id: 'reason',
				style: 2,
				emoji: {name: '📝'},
				disabled
			},
			{
				type: 2,
				label: 'Skip reason',
				custom_id: 'skip',
				style: 2,
				emoji: {name: '➡️'},
				disabled
			},
			{
				type: 2,
				label: 'Cancel',
				custom_id: 'cancel',
				style: 2,
				emoji: {name: '❌'},
				disabled
			},
		]
	}]),

	requiredPerms: [
		'AddReactions',
		'ManageMessages',
		'EmbedLinks',
		'AttachFiles',
		'ReadMessageHistory',
		'ViewChannel',
		'SendMessages'
	],
	opPerms: {
		"MANAGE_RESPONSES": "Allow users to accept and deny responses",
		"DELETE_RESPONSES": "Allow users to clear and delete responses",
		"MANAGE_FORMS": "Allow users to create and edit forms",
		"DELETE_FORMS": "Allow users to delete forms",
		"MANAGE_CONFIG": "Allow users to set config options",
		"MANAGE_OPS": "Allow users to add and remove opped users/roles",
	},

	textVars: {
		'$USERTAG': (user) => user.tag,
		'$USERID': (user) => user.id,
		'$USER': (user) => user,
		'$GUILD': (user, guild) => guild.name,
		'$COUNT': (user, guild) => guild.memberCount,
		'$FORMID': (user, guild, form) => form.hid,
		'$FORM': (user, guild, form) => form.name,
		'$RESPONSE': (user, guild, form, response) => response.hid
	}
}
