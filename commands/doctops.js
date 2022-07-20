"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");

const { joinVoice, playVoiceFakeYou } = require("../shared/voice.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("doctops")
		.setDescription("Desde demonio nemadore, hasta demonio loqiadore")
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
        let voice = "TM:2wx5r4sxkry1"

        joinVoice(interaction);
        await playVoiceFakeYou(interaction, voice, message);
		console.log('doctops '+message);

	}
};