const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const token = process.env.token;

const intents = ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS'];
const client = new Client({ intents });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

var rachaNmBool = false;
var rachaNm = 0;

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
    client.user.setActivity('Cum Simulator 2022', { type: 'PLAYING' });
});

client.on('messageCreate', async message => {
	if(message.author.bot || !message.guild || !message.channel) return;

	const text = message.content.toLowerCase();
	if(text!='nm'){
		rachaNmBool = false;
		rachaNm = 0;
	}else{
		rachaNm++;
		message.reply('HHH hh hH HRACHA DE NM: '+rachaNm+' NM')
			.then(() => console.log(message.member.displayName+" - rachaNm"+rachaNm))
			.catch(console.error);
	}

	if(text=='gay'){
		return message.reply('tu si e')
			.then(() => console.log(message.member.displayName+" - gay"))
			.catch(console.error);
	}
	else if(text=='nerda'){
		return message.reply("QUIEN DIJO NELDA \n"+message.member.displayName+" NO VUELVAS A DECIR ESO.")
			.then(() => console.log(message.member.displayName+" - nerda"))
			.catch(console.error);
	}
	else if(text=='prupru'){
		return message.reply("memesitu :3")
			.then(() => console.log(message.member.displayName+" - prupru"))
			.catch(console.error);
	}
	else if(text=='node'){
		return message.reply("https://i.redd.it/9zc150kzxtb71.jpg")
			.then(() => console.log(message.member.displayName+" - node"))
			.catch(console.error);
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) 
		return;

	const command = client.commands.get(interaction.commandName);
	if(interaction.commandName=='nm')
		rachaNmBool = true;

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'No ta el comando man', ephemeral: true });
	}
});

client.login(token);