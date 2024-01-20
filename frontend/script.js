async function fetchFortune() {
    const url = 'http://localhost:3000/fortuneTell';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            // You can pass data in the body if required
            body: JSON.stringify({ key: 'value' }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data.assistant);

        return data.assistant; // Assuming the server response has a structure like { "assistant": "Fortune message" }
    } catch (error) {
        console.error('Error fetching fortune:', error.message);
        throw error;
    }
}

async function main() {
    try {
        const fortune = await fetchFortune();
        displayMessage('server', fortune);
    } catch (error) {
        displayMessage('server', 'Something went wrong while fetching fortune.');
        console.error('Something went wrong:', error.message);
    }
}

function displayMessage(sender, message) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender + '-message');
    messageElement.innerText = `${sender.charAt(0).toUpperCase() + sender.slice(1)}: ${message}`;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const userMessage = messageInput.value;

    if (userMessage.trim() !== '') {
        displayMessage('user', userMessage);
        messageInput.value = ''; // Clear the input field

        // Simulate server response after sending user message
        setTimeout(main, 1000);
    }
}


main();