export const name = 'hello';
export const description = 'Diz olá para o usuário.';
export function execute(message, args) {
    message.channel.send(`Olá, ${message.author.username}!`);
}
