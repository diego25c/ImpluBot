"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");

const { joinVoice, playVoiceFakeYou } = require("../shared/voice.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("jordi")
		.setDescription("Muy buenas tetas por cierto")
		.addStringOption(option =>
			option.setName("mensaje")
				.setDescription("Mensaje")
				.setRequired(true)),
	async execute(interaction) {

		const message = interaction.options.getString("mensaje");
		if (!message) {
			interaction.reply("pero poné mensaje boludo").catch(console.error);
			return;
		}
        
        // token doctops
        let voice = "TM:3p54yktjhtc8"

        joinVoice(interaction);
        await playVoiceFakeYou(interaction, voice, message);
		console.log('doctops '+message);

	}
};