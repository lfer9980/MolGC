/*
WORK IN PROGRESS, this code is not fully implemented yet.
*/
// #region libraries
import mqtt from 'mqtt';
// #endregion


// #region utils
// #endregion


// #region main logic
const client = mqtt.connect('wss://broker.mqtt-dashboard.com');

client.on('connect', () => {
	console.log('Conectado a MQTT');
	client.subscribe('topico/ejemplo');
	client.publish('topico/ejemplo', 'Hola desde frontend');
});

client.on('message', (topic, message) => {
	console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
});
// #endregion
