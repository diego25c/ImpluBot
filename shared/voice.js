"use strict";

const { createAudioPlayer, joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus, entersState, createAudioResource, StreamType } = require("@discordjs/voice");
const { join } = require('node:path');
const { requestSpeech } = require("../shared/fakeYou.js");
const audioPlayers = new Map();

/*
  Name: joinVoice(Object interaction)
  Description: Joins the sender's voice channel, creating an audio player if needed
  Returns: None
*/
module.exports.joinVoice = (interaction) => {

	const channel = interaction.member.voice.channel;
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guildId,
		adapterCreator: channel.guild.voiceAdapterCreator
	});

    if (!audioPlayers.has(interaction.guildId)) {
        const player = createAudioPlayer();
        audioPlayers.set(interaction.guildId, player);
        connection.subscribe(player);
    }

}

/*
  Name: leaveVoice(Object interaction)
  Description: Leaves the voice channel and destroys the connection
  Returns: None
*/
module.exports.leaveVoice = (interaction) => {

	const connection = getVoiceConnection(interaction.guildId);
	if (!connection) {
		interaction.reply("no toi").catch(console.error);
		return;
	}

	connection.destroy();
	audioPlayers.delete(interaction.guildId);
	updateStatus(interaction.client);
}

/*
  Name: playVoice(Object interaction, String commandName, Object voiceInfo, String message)
  Description: Requests and plays speech over voice chat, assuming raw format
  Returns: None
*/
module.exports.playVoiceLocal = async(interaction, source) => {

	const connection = getVoiceConnection(interaction.guildId);
	if (!connection) {
		interaction.reply("no toi en vois chanil").catch(console.error);
		return;
	}

	const player = audioPlayers.get(interaction.guildId);
	if (!player) {
		interaction.reply(`ehror`).catch(console.error);
		return;
	}

    const resource = createAudioResource(join("resources",source));
    player.play(resource);
}

module.exports.playVoiceFakeYou = async(interaction, voiceInfo, message) => {

	const connection = getVoiceConnection(interaction.guildId);
	if (!connection) {
		interaction.reply("no toi en vois chanil").catch(console.error);
		return;
	}

	const player = audioPlayers.get(interaction.guildId);
	if (!player) {
		interaction.reply(`ehror`).catch(console.error);
		return;
	}

	await interaction.reply({
		content: `perese...`,
		ephemeral: true
	}).catch(console.error);

	// Launch speech request and poll until completion
	requestSpeech(voiceInfo, message).then(url => {

		// Send new message to avoid 15 minute interaction expiry time
		const resource = createAudioResource(url, {
			inputType: StreamType.Raw
		});
		player.play(resource);

		resource.playStream.on("error", error => {
			interaction.channel.send(`ehror`).catch(console.error);
			console.error(error);
		});

	}).catch(error => {
		interaction.channel.send(`ehrors`).catch(console.error);
		console.error(error);
	});
}