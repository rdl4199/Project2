/* First thing we do is grab a reference ot our socket so that we can use
    it from our client code. The io() function comes from the socket.io
    client side library, which is in a script tag in views/index.handlebars.
*/

const socket = io();

/* This function is responsible for setting up events related to the edit
    box in our simple chat application.
*/
const handleEditBox = () => {
    const editForm = document.getElementById('editForm');
    const editBox = document.getElementById('editBox');
    const channelSelect = document.getElementById('channelSelect');
    
    /* When the user presses the "submit" button in the edit form, this 
        code will handle the event. First we prevent the forms default
        action. Then, if there is anything in the edit box, we will
        build our data object.

        The data object contains both what is written in the text box,
        and what is selected in the channel dropdown. We want to let
        the server know about both of these, so that it can send the
        message to the correct channel.

        We then send that data to the generic 'chat message' event 
        channel using the emit function from socket. Remember that the 
        event name can be anything we want as long as our server 
        and client both know what name to use.
    */
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if(editBox.value) {            
            const data = {
                message: editBox.value,
                channel: channelSelect.value,
            };

            socket.emit('chat message', data);
            editBox.value = '';
        }
    });
};

/* This simple function just takes in text (msg), and displays it
    on the screen in the messages div.
*/
const displayMessage = (msg) => {    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = msg;
    document.getElementById('messages').appendChild(messageDiv);
}

/* This function handles selections in the channel dropdown. When
    someone moves to a new channel, we simply clear the current
    chat history on their screen. 
    
    Then, based on the channel they have selected, we remove our 
    event handlers for the other channel using the socket.off() 
    function. We also add our listener to the selected channel
    and have it use the displayMessage function to handle any
    messages it may recieve in that channel.
*/
const handleChannelSelect = () => {
    const channelSelect = document.getElementById('channelSelect');
    const messages = document.getElementById('messages');
    channelSelect.addEventListener('change', () => {
        messages.innerHTML = '';

        switch(channelSelect.value) {
            case 'memes':
                socket.off('general');
                socket.on('memes', displayMessage);
                break;
            default:
                socket.off('memes');
                socket.on('general', displayMessage);
                break;
        }
    });
}

/* Our init function sets up the edit box, subscribes us to
    notifications in the 'general' channel by default, and
    sets up the channel select.
*/
const init = () => {
    handleEditBox();
    socket.on('general', displayMessage);
    handleChannelSelect();
};

window.onload = init;
