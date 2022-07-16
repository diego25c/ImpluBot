const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoice, playVoiceLocal, playVoice, leaveVoice } = require("../shared/voice.js");
const fs = require('node:fs');

const dir = require("path").join("resources")
let audios = [];

fs.readdirSync(dir).forEach(file => {
	audios.push(file);
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('henry')
		.setDescription('Hablando de besar'),
	async execute(interaction) {
		console.log("henry");
        joinVoice(interaction);
		let audioName = audios[Math.floor(Math.random()*audios.length)];
		await interaction.reply({
			content: `el henry`,
			ephemeral: true
		}).catch(console.error);
        await playVoiceLocal(interaction, audioName);
    },
};
