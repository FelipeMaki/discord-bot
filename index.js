import { readdirSync } from 'fs';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const TOKEN = 'YOUR_BOT_TOKEN_HERE';

// Cria uma coleção de comandos
client.commands = new Collection();

// Lê todos os arquivos de comando da pasta commands
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Adiciona cada comando na coleção
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    // Ignora mensagens do próprio bot
    if (message.author.bot) return;

    // Verifica se a mensagem começa com o prefixo de comando
    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;

    // Separa o comando e os argumentos
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Verifica se o comando existe
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        // Executa o comando
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Houve um erro ao tentar executar esse comando!');
    }
});

client.login(TOKEN);
