const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uwu')
		.setDescription('(つ≧▽≦)つ'),
	async execute(interaction) {
		await interaction.reply('https://www.concierto.cl/wp-content/uploads/2020/10/174a3f4fa44c7bb22b3b6429cb4ea44c-768x432.png');
	},
};
