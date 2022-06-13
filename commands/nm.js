const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nm')
		.setDescription('Depositen sus nm:'),
	async execute(interaction) {
		console.log("nm");
		await interaction.reply('Depositen sus nm: ');
		await interaction.followUp('nm.');
	},
};
