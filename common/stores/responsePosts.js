const { Models: { DataStore, DataObject } } = require('frame');
const {
	pageBtns: PGBTNS,
	denyBtns: DENY,
	textVars: VARIABLES
} = require('../extras');

const MODALS = {
	DENY: (value) => ({
		title: "Closure reason",
		custom_id: 'deny_reason',
		components: [{
			type: 1,
			components: [{
				type: 4,
				custom_id: 'reason',
				style: 2,
				label: "Enter the reason below",
				min_length: 1,
				max_length: 1024,
				required: true,
				placeholder: "Big meanie :(",
				value
			}]
		}]
	})
}

const KEYS = {
	id: { },
	server_id: { },
	channel_id: { },
	message_id: { },
	response: { },
	page: { patch: true }
}

async function sleep(ms) {
	return new Promise((res, rej) => setTimeout(() => res(), ms ?? 1000))
}

class ResponsePost extends DataObject {
	constructor(store, keys, data) {
		super(store, keys, data)
	}
}

class ResponsePostStore extends DataStore {
	constructor(bot, db) {
		super(bot, db);
	}

	async init() {
		this.bot.on('interactionCreate', async (...args) => {
			try {
				this.handleInteractions(...args);
			} catch(e) {
				console.log(e.message || e);
			}
		})

		this.bot.on('messageDelete', async ({ channel, id }) => {
			if(!channel.guild) return;
			await this.deleteByMessage(channel.guild.id, channel.id, id);
		})
	}

	async create(data = {}) {
		try {
			var c = await this.db.query(`INSERT INTO response_posts (
				server_id,
				channel_id,
				message_id,
				response,
				page
			) VALUES ($1,$2,$3,$4,$5)
			RETURNING id`,
			[data.server_id, data.channel_id, data.message_id, 
			 data.response, data.page ?? 1]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		return await this.getID(c.rows[0].id);
	}

	async index(server, channel, message, data = {}) {
		try {
			await this.db.query(`INSERT INTO response_posts (
				server_id,
				channel_id,
				message_id,
				response,
				page
			) VALUES ($1,$2,$3,$4,$5)`,
			[server, channel, message, data.response, data.page ?? 1]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		return;
	}

	async get(server, channel, message) {
		try {
			var data = await this.db.query(`
				SELECT * FROM response_posts WHERE
				server_id = $1
				AND channel_id = $2
				AND message_id = $3
			`, [server, channel, message]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		if(data.rows?.[0]) {
			var post = new ResponsePost(this, KEYS, data.rows[0]);
			var response = await this.bot.stores.responses.get(data.rows[0].server_id, data.rows[0].response);
			if(response) post.response = response;
			
			return post;
		} else return new ResponsePost(this, KEYS, { server_id: server, channel_id: channel, message_id: message });
	}

	async getByResponse(server, hid) {
		try {
			var data = await this.db.query(`SELECT * FROM response_posts WHERE server_id = $1 AND response = $2`,[server, hid]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		if(data.rows?.[0]) {
			var post = new ResponsePost(this, KEYS, data.rows[0]);
			var response = await this.bot.stores.responses.get(data.rows[0].server_id, data.rows[0].response);
			if(response) post.response = response;
			
			return post;
		} else return new ResponsePost(this, KEYS, { server_id: server, response: hid });
	}

	async update(id, data = {}) {
		try {
			await this.db.query(`
				UPDATE response_posts SET
				${Object.keys(data).map((k, i) => k+"=$"+(i+2)).join(",")}
				WHERE id = $1
			`, [id, ...Object.values(data)]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}

		return await this.getID(id)
	}

	async delete(id) {
		try {
			await this.db.query(`
				DELETE FROM response_posts
				WHERE id = $1
			`, [id]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		return;
	}

	async deleteByMessage(server, channel, message) {
		try {
			await this.db.query(`
				DELETE FROM response_posts
				WHERE server_id = $1
				AND channel_id = $2
				AND message_id = $3
			`, [server, channel, message]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		return;
	}

	async handleInteractions(ctx) {
		if(!ctx.isButton()) return;
		if(!ctx.guild) return;

		var post = await this.get(ctx.channel.guild.id, ctx.channel.id, ctx.message.id);
		if(!post?.id) return;

		var {message: msg, user} = ctx;

		var cfg = await this.bot.stores.configs.get(ctx.guild.id);
		var check = await this.bot.handlers.interaction.checkPerms(
			{
				permissions: ['ManageMessages'],
				opPerms: ['MANAGE_RESPONSES']
			},
			ctx, cfg
		)
		if(!check) return;

		var u2 = await this.bot.users.fetch(post.response.user_id);
		if(!u2) return await msg.channel.send("ERR! Couldn't fetch that response's user!");

		var ticket = await this.bot.stores.tickets.get(msg.guild.id, post.response.hid);
		var cmp = msg.components;
		switch(ctx.customId) {
			case 'deny':
				await ctx.deferUpdate();
				var reason;
				var m = await msg.channel.send({
		            flags: ['IsComponentsV2'],
		            components: [
		                {
		                    type: 17,
		                    components: [{
		                        type: 10,
		                        content: 'Would you like to give a closure reason?'
		                    }]
		                },
		                ...DENY(false)
		            ],
		            fetchReply: true
		        });

				var resp = await this.bot.utils.getChoice(this.bot, m, user, 2 * 60 * 1000, false);
				if(!resp.choice) return await ctx.followUp({content: 'Err! Nothing selected!', ephemeral: true});
				switch(resp.choice) {
					case 'cancel':
						await m.delete()
						return resp.interaction.reply({content: 'Action cancelled!', ephemeral: true});
					case 'reason':
						var mod = await this.bot.utils.awaitModal(resp.interaction, MODALS.DENY(reason), user, true, 5 * 60_000);
		                if(mod) reason = mod.fields.getTextInputValue('reason')?.trim();
		                await mod.followUp("Modal received!");
		                await m.edit({
		                    components: [{
		                        type: 17,
		                        components: [{
		                            type: 10,
		                            content: `## Closure Reason\n${reason}`
		                        }]
		                    }]
		                })
						break;
					case 'skip':
						await m.edit({
		                    components: [{
		                        type: 17,
		                        components: [{
		                            type: 10,
		                            content: `## Closure Reason\n${reason}`
		                        }]
		                    }]
		                })
						break;
				}

				await m.delete()

				var embed = msg.components[0].toJSON();
		        embed.accent_color = parseInt('aa0000', 16);

		        embed.components = embed.components.concat([
		            {
		                type: 14
		            },
		            {
		                type: 10,
		                content: `Response closed <t:${Math.floor(new Date().getTime() / 1000)}:F>`
		            },
		            {
		                type: 10,
		                content: `Closed by ${user}`
		            }
		        ])

				try {
					this.bot.emit('DENY', post.response);
					if(ticket?.id) {
						try {
							var tch = await ctx.guild.channels.fetch(ticket.channel_id);
							//await tch?.delete();
							await sleep(500);
							await tch.permissionOverwrites.create(u2.id, {
								'ViewChannel': false,
								'SendMessages': false,
								'ReadMessageHistory': false
							})

						} catch(e) { }
					}

					post.response.status = 'denied';
					post.response = await post.response.save();
					await msg.edit({
						components: [embed]
					});
					await msg.reactions.removeAll();

					await post.delete();

					await u2.send({
		                flags: ['IsComponentsV2'],
		                components: [{
		                    type: 17,
		                    accent_color: parseInt('aa0000', 16),
		                    components: [
		                        {
		                            type: 10,
		                            content: `## Response closed!\n${reason ?? '*(no reason given)*'}`
		                        },
		                        {
		                            type: 10,
		                            content:
		                                `**Form:** ${post.response.form.name}\n` +
		                                `**Response ID:** ${post.response.hid}` 
		                        },
		                        {
		                            type: 10,
		                            content: `-# ❤ Form: ${post.response.form.hid} • Response: ${post.response.hid}`
		                        }
		                    ]
		                }]
		            })
				} catch(e) {
					console.log(e);
					return await msg.channel.send('ERR! Response closed, but couldn\'t message the user!');
				}

				return await ctx.followUp({content: 'Response closed!', ephemeral: true});
			case 'accept':
				var embed = msg.components[0].toJSON();
		        embed.accent_color = parseInt('770000', 16);
		        let footer = embed.components[embed.components.length - 1]
		        footer.content = footer.content.replace('pending', 'accepted')
		        embed.components = embed.components.concat([
		            {
		                type: 14
		            },
		            {
		                type: 10,
		                content: `-# Response accepted <t:${Math.floor(new Date().getTime() / 1000)}:F>`
		            },
		            {
		                type: 10,
		                content: `-# Accepted by ${user} (${user.tag} | ${user.id})`
		            }
		        ])

				try {
					this.bot.emit('ACCEPT', post.response);
					if(ticket?.id) {
						try {
							var tch = await ctx.guild.channels.fetch(ticket.channel_id);
							//await tch?.delete();
							await sleep(500);
							await tch.permissionOverwrites.create(u2.id, {
								'ViewChannel': false,
								'SendMessages': false,
								'ReadMessageHistory': false
							})
						} catch(e) { }
					}

					post.response.status = 'accepted';
					post.response = await post.response.save();
					await msg.edit({
						components: [embed]
					});
					await msg.reactions.removeAll();

					await post.delete();

					var welc = post.response.form.message;
					if(welc) {
						for(var key of Object.keys(VARIABLES)) {
							welc = welc.replace(key, VARIABLES[key](u2, msg.guild, post.response.form, post.response));
						}
					}

					await u2.send({
		                flags: ['IsComponentsV2'],
		                components: [{
		                    type: 17,
		                    accent_color: parseInt('770000', 16),
		                    components: [
		                        {
		                            type: 10,
		                            content: `## Response confirmed!\n${welc ?? ''}`
		                        },
		                        {
		                            type: 10,
		                            content:
		                                `**Form:** ${post.response.form.name} \n` +
		                                `**Response ID:** ${post.response.hid}` 
		                        },
		                        {
		                            type: 10,
		                            content:  `-# ❤ Form: ${post.response.form.hid} • Response: ${post.response.hid}`
		                        }
		                    ]
		                }]
		            });
				} catch(e) {
					console.log(e);
					return await msg.channel.send(`ERR! ${e.message || e}\n(Response still accepted!)`);
				}
				break;
			case 'ticket':
				try {
					await ctx.deferReply({ephemeral: true});
					var ch_id = post.response.form.tickets_id ?? cfg?.ticket_category;
					if(!ch_id) return await ctx.followUp('No ticket category set!');
					var ch = msg.guild.channels.resolve(ch_id);
					if(!ch) return await ctx.followUp('Category not found!!');

					if(ticket?.id) return await ctx.followUp(`Channel already opened! Link: <#${ticket.channel_id}>`)
//
					var tname = `00`;
					if(post.response.form.ticket_format) {
						tname = post.response.form.ticket_format;
						for(var key of Object.keys(VARIABLES)) {
							if(['$FORM', '$GUILD'].includes(key)) continue;
							tname = tname.replace(key, VARIABLES[key](u2, msg.guild, post.response.form, post.response));
						}
					}

					var ch2 = await msg.guild.channels.create({
						name: tname,
						parent: ch.id,
						reason: 'Your Swap DMs channel has been opened! '+post.response.hid
					})

					await ch2.lockPermissions(); //get perms from parent category
					await sleep(500);
					await ch2.permissionOverwrites.create(u2.id, {
						'ViewChannel': true,
						'SendMessages': true,
						'ReadMessageHistory': true
					})
//
					var tmsg = post.response.form.ticket_msg ?? cfg?.ticket_message;
					if(tmsg) {
						for(var key of Object.keys(VARIABLES)) {
							tmsg = tmsg.replace(key, VARIABLES[key](u2, msg.guild, post.response.form));
						}
						
					//  await ch2.send(tmsg);
						await ch2.send(`# Hey, ${u2}! ♡\nGreat to have you along for the ride! Below is a copy of your registration submission. Let me know ASAP if anything needs to be changed! Otherwise you are all set for now! ♡`);
						}
					
					//var rembeds = await this.bot.handlers.response.buildResponseEmbeds(post.response, template);
		
		//await ch2.send({
		  //content: [
			//`# Hey, ${u2}! ♡` +
		    //`\n${tmsg}`
		  //].join('\n'),
		  //embeds: [rembeds[0]]
		//})


					cmp = cmp[0].components.map(x => x.toJSON());
					cmp[1].disabled = true;
					await msg.edit({
						components: [
							msg.components[0].toJSON(),
							{
								type: 1,
								components: cmp
							}
						]
					})
					await this.bot.stores.tickets.create({
						server_id: msg.guild.id,
						channel_id: ch2.id,
						response_id: post.response.hid
					});
					await ctx.followUp(`Channel created! <#${ch2.id}>`);
					return;
				} catch(e) {
					return await msg.channel.send('ERR: '+e.message);
				}
		}

		if(PGBTNS(1,1).find(pg => pg.custom_id == ctx.customId)) {
			var template = {
				components: [
					{
						type: 10,
						content:
							`## ${response.form.name}`		
					}
				],
				color: parseInt('aa0000', 16),
				footer: [{
					type: 10,
					content:
						`-# ❤ Form: ${response.form.hid} • Response: $${created.hid}`
				}]
			}

			var embeds = this.bot.handlers.response.buildResponseEmbeds(post.response, template);
			switch(ctx.customId) {
				case 'first':
					post.page = 1;
					break;
				case 'prev':
					if(post.page == 1) post.page = embeds.length;
					else post.page -= 1;
					break;
				case 'next':
					if(post.page == embeds.length) post.page = 1;
					else post.page += 1;
					break;
				case 'last':
					post.page = embeds.length;
					break;
			}

			await msg.edit({
				components: [embeds[post.page - 1]]
			});
			await post.save();
			return;
		}
	}
}

module.exports = (bot, db) => new ResponsePostStore(bot, db);