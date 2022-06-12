const { SlashCommandBuilder } = require('@discordjs/builders');

let cumiadas = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cum')
		.setDescription('Cumiarse bien de hhhrico'),
	async execute(interaction) {
		cumiadas++;
		await interaction.reply('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dairy.com%2Fwp-content%2Fuploads%2F2012%2F12%2FFotolia_24497554_L.jpg&f=1&nofb=1');
		await interaction.reply('Hoy se han cumiado '+cumiadas+' veces');
	},
};
