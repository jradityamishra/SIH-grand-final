// ChatMessage.js
import React, { useEffect, useState } from "react";
import { Avatar, Paper, Typography, IconButton } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { jsPDF } from "jspdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ message, isUser }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);

    // Reset the "Copy to Clipboard" button state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handlePdfDownload = () => {
    const doc = new jsPDF();

    doc.text(message, 10, 10);
    doc.save("Notes.pdf");
  };
  return (
    <div
      className={`flex flex-wrap ${
        isUser ? "justify-end" : "justify-start"
      } mb-2`}
    >
      {!isUser && <Avatar>AI</Avatar>}
      <Paper
        className={`p-2 ${
          isUser ? "bg-blue-200" : "bg-gray-200"
        } rounded-md max-w-2/3`}
        style={{
          marginLeft: isUser ? "auto" : "0",
          marginRight: isUser ? "0" : "auto",
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Paper>
      {!isUser && (
        <div>
          <IconButton
            size="medium"
            onClick={handleCopyToClipboard}
            disabled={isCopied}
            sx={{ marginLeft: "0", marginRight: "50%" }}
          >
            <FileCopyIcon />
          </IconButton>
        </div>
      )}
      {!isUser && (
        <div>
          <IconButton
            size="medium"
            onClick={handlePdfDownload}
            sx={{ marginLeft: "0", marginRight: "50%" }}
          >
            <PictureAsPdfIcon />
          </IconButton>
        </div>
      )}
      {isUser && <Avatar>U</Avatar>}
    </div>
  );
};

export default ChatMessage;
