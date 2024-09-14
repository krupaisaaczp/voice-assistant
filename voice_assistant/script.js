const socket = io('http://localhost:5000'); // Connect to the backend server

// Process the recognized command without showing it
recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Recognized command:", transcript);

    // Send the recognized command to the backend for processing
    socket.emit('voice-command', transcript);
    
    // Listen for the response from the backend
    socket.on('command-response', (response) => {
        outputText.textContent = `Response: ${response}`;
        console.log('Received response:', response);
    });
});

// Automatically stop after 15 seconds
function startVoiceAssistant() {
    outputText.textContent = "Listening for your command...";
    recognition.start();

    setTimeout(() => {
        recognition.stop();
        outputText.textContent = "Processing your command...";
    }, 15000); // Stop after 15 seconds
}
