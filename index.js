const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const token = process.env.token;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
    client.user.setActivity('Cum Simulator 2022', { type: 'PLAYING' });
});

client.on('messageCreate', (message) => {
	if(message.content==='gay'){
		console.log(message.author+" - gay");
		message.reply({
			content: "tu si e",
		});
	}
	else if(message.content==='nm'){
		console.log(message.author+" - nm");
		message.reply({
			content: "Depositen sus nm: \n nm",
		});
	}
	else if(message.content==='nerda'){
		console.log(message.author+" - nerda");
		message.reply({
			content: "QUIEN DIJO NELDA \n" +message.author+"NO VUELVAS A DECIR ESO.",
		});
	}
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) 
		return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'No ta el comando man', ephemeral: true });
	}
});

client.login(token);