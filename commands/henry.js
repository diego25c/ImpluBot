const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoice, playVoiceLocal: playVoice, leaveVoice } = require("../shared/voice.js");

const audioPlayers = new Map();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('henry')
		.setDescription('Hablando de besar'),
	async execute(interaction) {
		console.log("henry");
        joinVoice(interaction);
        await playVoiceLocal(interaction, "henry.mp3");
    },
};
