// GenerateNotes.js
import Layout from "../../components/layout/Layout";
import React, { useState } from "react";
import { Container, TextField, Button, Grid } from "@mui/material";
import ChatMessage from "../../components/ChatMessage";

const GenerateNotes = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      // const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //     "X-RapidAPI-Key":
      //       "2b85d90714msh1d7ece47b8e8220p1c55a4jsnb14b38250f0a",
      //     "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
      //   },
      //   body: JSON.stringify({
      //     messages: [
      //       {
      //         role: "user",
      //         content: newMessage,
      //       },
      //     ],
      //     tone: "Balanced",
      //   }),
      // };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setResponseText(data.result);
        console.log(data);
      } catch (error) {
        console.error(error);
      }

      // Add user message
      const userMessage = { text: newMessage, isUser: true };

      // Add response message (dummy text for now)

      const responseMessage = { text: responseText, isUser: false };

      // Alternate between user and response messages
      setMessages([...messages, userMessage, responseMessage]);

      setNewMessage("");
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl font-semibold text-center">GenerateNotes</h2>
      <Container
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          // position: "relative",
        }}
      >
        <div className="flex-grow mt-8 px-8">
          <div className="h-full overflow-y-auto pr-16">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "16px",
            backgroundColor: "white",
            zIndex: 1000,
          }}
        >
          <Grid className="pl-36" container spacing={2} alignItems="flex-end">
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Type a message..."
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};

export default GenerateNotes;
