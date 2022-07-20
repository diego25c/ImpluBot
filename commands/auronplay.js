"use strict";

const { SlashCommandBuilder } = require("@discordjs/builders");
const { createWriteStream } = require("fs");
const { randomBytes } = require("crypto");
const { pipeline } = require("stream");
const { promisify } = require("util");
const { unlink } = require("fs");
const fetch = require("node-fetch");

const { requestSpeech } = require("../shared/fakeYou.js");
const { joinVoice, playVoiceFakeYou } = require("../shared/voice.js");

/*
  Name: requestSpeechFile(String voice, String message): String
  Description: Requests speech, polls and downloads the result
  Returns: File path on success, error message on failure
*/
function requestSpeechFile(voice, message) {
	return new Promise(async(resolve, reject) => {

		// Launch speech request and poll until completion
		const url = await requestSpeech(voice, message).catch(reject);
		if (!url) return;

		const response = await fetch(url).catch(error => {
			reject(`HTTP error! ${error.name}`);
			console.error(error);
		});
		if (!response.ok) return;

		// Generate random temporary filename to avoid overwriting other recordings
		const filePath = `./${randomBytes(48).toString("hex")}.wav`;

		const streamPipeline = promisify(pipeline);
		await streamPipeline(response.body, createWriteStream(filePath)).then(() => {
			resolve(filePath);
		}).catch(error => {
			if (!error) return;
			reject("Failed to write file!");
			console.error(error);
		});
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("auronplay")
		.setDescription("Abduskan")
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
        
        // token auronplay
        let voice = "TM:jgv6d8br5jdr"

        joinVoice(interaction);
        await playVoiceFakeYou(interaction, voice, message);
		console.log('auronplay '+message);

	}
};