const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Sets the rate limit of the current channel.')
    .addIntegerOption(option =>
      option.setName('seconds')
        .setDescription('The new rate limit in seconds.')),
  async execute (interaction) {
    const seconds = interaction.options.getInteger('seconds')

    await interaction.channel.setRateLimitPerUser(seconds)

    const embed = new MessageEmbed()
      .setAuthor('Set Slowmode', `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}`)
      .setTitle(`#${interaction.channel.name}`)
      .setThumbnail(interaction.guild.iconURL())
      .setDescription(`Set the rate limit of #${interaction.channel.name} to ${seconds}s.`)
      .setFooter('SuitBot', 'https://cdn.discordapp.com/app-icons/887122733010411611/78c68033a9da502750c5165029b57817.png')

    await interaction.reply({ embeds: [embed] })
  }
}