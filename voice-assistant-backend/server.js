const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Route for the home page (optional)
app.get('/', (req, res) => {
    res.send('Voice Assistant Backend is running');
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for the 'voice-command' event
    socket.on('voice-command', (command) => {
        console.log('Received command:', command);
        
        // Process the voice command
        const response = processVoiceCommand(command);
        
        // Send response back to the frontend
        socket.emit('command-response', response);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Function to process the command and return a response
function processVoiceCommand(command) {
    const lowerCommand = command.toLowerCase();
    let response = 'Command not recognized';

    if (lowerCommand.includes('weather')) {
        response = 'Fetching the current weather...';
        // Implement a real weather API call here
    } else if (lowerCommand.includes('news')) {
        response = 'Fetching the latest news...';
        // Implement a news API call here
    } else if (lowerCommand.includes('time')) {
        const currentTime = new Date().toLocaleTimeString();
        response = `The current time is ${currentTime}`;
    }
    
    return response;
}

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
