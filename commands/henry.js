const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoice, playVoiceLocal, playVoice, leaveVoice } = require("../shared/voice.js");

const audios = [];
const audiosPath = path.join(__dirname, 'resources');
const audioFiles = fs.readdirSync(audiosPath).filter(file => file.endsWith('.mp3'));

for (const file of audioFiles) {
	const filePath = path.join(audiosPath, file);
	const audio = require(filePath);
	audios.push(file.data.toJSON());
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('henry')
		.setDescription('Hablando de besar'),
	async execute(interaction) {
		console.log("henry");
        joinVoice(interaction);
		let audioName = audios[Math.floor(Math.random()*items.length)];
        await playVoiceLocal(interaction, audioName);
    },
};
