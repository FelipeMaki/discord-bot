export const name = 'ping';
export const description = 'Responde com Pong!';
export function execute(message, args) {
    message.channel.send('Pong!');
}
