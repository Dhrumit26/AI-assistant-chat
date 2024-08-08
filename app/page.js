'use client';

import { Box, Button, Stack, TextField, Typography, Paper, IconButton, Modal, Divider } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app'; // Import your Firebase app configuration
import { db } from '@/firebase' // Ensure this path is correct


export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Helina Zippers support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false); // State for the feedback modal
  const [feedback, setFeedback] = useState({ name: '', rating: '', review: '' }); // State for feedback data
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim() || isLoading || chatEnded) return;

    setIsLoading(true);
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const endChat = () => {
    setChatEnded(true);
    setMessages((messages) => [
      ...messages,
      { role: 'assistant', content: "Thank you for contacting us! Have a great day!" },
    ]);
    setFeedbackOpen(true); // Open the feedback modal when chat ends
  };

  const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleFeedbackSubmit = async () => {
    const db = getFirestore(getApp());
    try {
      await addDoc(collection(db, 'feedback'), feedback);
      setFeedbackOpen(false);
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: 'url(https://cdn.dribbble.com/users/1373613/screenshots/5385718/siri-____.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        p: 2,
        fontFamily: 'Roboto, Arial, sans-serif', // Updated font
        color: 'rgba(255, 255, 255, 0.9)' // Light text color for dark background
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '600px',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for Paper
          borderRadius: 2,
        }}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          p={2}
        >
          <Typography variant="h5" gutterBottom color="primary.contrastText">
            Smart AI Assistant
          </Typography>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'rgba(33, 150, 243, 0.8)' // Adjusted color for assistant messages
                    : 'rgba(255, 87, 34, 0.8)' // Adjusted color for user messages
                }
                color="white"
                borderRadius={2}
                p={2}
                maxWidth="80%"
                sx={{ boxShadow: 1 }} // Added shadow for better separation
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          display="flex"
          p={2}
          bgcolor="rgba(0, 0, 0, 0.8)"
          borderTop="1px solid"
          borderColor="divider"
        >
          <TextField
          label="Type your message..."
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || chatEnded}
          multiline
          minRows={1}
          maxRows={4}
          sx={{
            input: {
              color: 'rgba(255, 255, 255, 0.9)', // Light text color for readability
            },
            label: {
              color: 'rgba(255, 255, 255, 0.7)', // Label color
            },
            fieldset: {
              borderColor: 'rgba(255, 255, 255, 0.5)', // Light border color
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.7)', // Slightly darker border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.9)', // Even darker border when focused
            },
            textarea: {
              color: 'rgba(255, 255, 255, 0.9)', // Light text color for multiline input
            },
          }}
        />

          <IconButton 
            color="primary"
            onClick={sendMessage}
            disabled={isLoading || chatEnded}
            sx={{ ml: 2 }}
          >
            <SendIcon />
          </IconButton>
          <Button
            variant="contained"
            color="error"
            onClick={endChat}
            sx={{ ml: 2 }}
            disabled={chatEnded}
          >
            End Chat
          </Button>
        </Box>
      </Paper>

      <Modal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            bgcolor: 'rgba(255, 255, 255, 0.9)', // White background with slight transparency
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            color: 'black' // Text color for Modal
          }}
        >
          <Typography id="feedback-modal-title" variant="h6" component="h2">
            We value your feedback!
          </Typography>
          <Divider sx={{ my: 2, borderColor: 'divider' }} />
          <TextField
            label="Your Name"
            name="name"
            value={feedback.name}
            onChange={handleFeedbackChange}
            fullWidth
            sx={{ mb: 2, input: { color: 'black' }, label: { color: 'rgba(0, 0, 0, 0.7)' } }} // Adjusted colors for TextField
          />
          <TextField
            label="Rating (1-5)"
            name="rating"
            type="number"
            value={feedback.rating}
            onChange={handleFeedbackChange}
            fullWidth
            sx={{ mb: 2, input: { color: 'black' }, label: { color: 'rgba(0, 0, 0, 0.7)' } }} // Adjusted colors for TextField
          />
          <TextField
            label="Review"
            name="review"
            value={feedback.review}
            onChange={handleFeedbackChange}
            fullWidth
            multiline
            minRows={3}
            sx={{ mb: 2, input: { color: 'black' }, label: { color: 'rgba(0, 0, 0, 0.7)' } }} // Adjusted colors for TextField
          />
          <Button
            variant="contained"
            onClick={handleFeedbackSubmit}
            color="primary"
          >
            Submit Feedback
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
