const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageInput = document.querySelector('input');
const $messageButton = document.querySelector('button');
const $messages = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML;

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:m:s a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        $messageButton.removeAttribute('disabled');
        $messageInput.value = '';
        $messageInput.focus();
        
        if(error){
            return console.log(error);
        } 
        
        console.log("Message delivered!");
        
    });
});