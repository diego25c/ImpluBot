const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoice, playVoice, leaveVoice } = require("../shared/voice.js");

const audioPlayers = new Map();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('henry')
		.setDescription('Hablando de besar'),
	async execute(interaction) {
		console.log("henry");
        joinVoice(interaction);
        await playVoice(interaction, "henry.mp3");
    },
};
