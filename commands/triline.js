"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");

const { joinVoice, playVoiceFakeYou } = require("../shared/voice.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("triline")
		.setDescription("Triline te habla")
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
        
        // token triline
        let voice = "TM:5x6m0n6wqtpw"

        joinVoice(interaction);
        await playVoiceFakeYou(interaction, voice, message);
		console.log('triline '+message);

	}
};