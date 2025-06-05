/*========== Chat Bubble and Custom Chat Interface ==========*/
document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const mainChatButton = document.querySelector(".main-chat-button");
  const chatOptions = document.getElementById("chatOptions");
  const borjbotOption = document.getElementById("borjbotOption");
  const botStatusIndicator = document.getElementById("botStatusIndicator");
  const botStatusText = document.getElementById("botStatusText");
  
  // Webhook URL for checking BorjBot online status
  const webhookUrl = "https://n8n-dev-tx45.onrender.com/webhook/854c829c-2ce6-426f-89e2-ed44d33182f3/chat";

  // Create n8n chat instance (but don't display it)
  let n8nChatClient;
  let sessionId = localStorage.getItem("sessionId") || generateSessionId();
  
  // Function to check if BorjBot is online
  async function checkBotStatus() {
    botStatusIndicator.className = "status-indicator";
    botStatusText.className = "status-text";
    botStatusText.textContent = "Checking...";
    
    try {
      // Add a timestamp to prevent caching
      const response = await fetch(`${webhookUrl}?_=${Date.now()}`, {
        method: "GET",
        // Set a timeout to prevent hanging if the server doesn't respond
        signal: AbortSignal.timeout(5000)
      });
      
      
      if (!response.ok) {
        setBotOffline();
        return;
      }
      
      // If we get a 200 OK response, the bot is considered online
      // No need to check the response body content
      if (response.status === 200) {
        setBotOnline();
        return;
      }
      
      // If we get here, something unexpected happened
      setBotOffline();
    } catch (error) {
      console.error("Error checking bot status:", error);
      setBotOffline();
    }
  }
  
  // Function to set bot status to online
  function setBotOnline() {
    botStatusIndicator.className = "status-indicator online";
    botStatusText.className = "status-text online";
    botStatusText.textContent = "Online";
    
  }
  
  // Function to set bot status to offline
  function setBotOffline() {
    botStatusIndicator.className = "status-indicator offline";
    botStatusText.className = "status-text offline";
    botStatusText.textContent = "Offline";
    console.log("BorjBot is offline!");
  }
  
  // Check bot status immediately
  checkBotStatus();
  
  // Check bot status periodically (every 60 seconds)
  setInterval(checkBotStatus, 60000);

  // Function to generate a unique session ID
  function generateSessionId() {
    const id =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    localStorage.setItem("sessionId", id);
    return id;
  }

  // Function to check if conversation exists
  function hasExistingConversation() {
    return localStorage.getItem("chatMessages") !== null;
  }

  // Function to save chat messages to localStorage
  function saveChatMessage(message, sender) {
    let messages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
    messages.push({ message, sender, timestamp: Date.now() });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }

  try {
    // Create a hidden container for the n8n chat that we won't show
    const hiddenContainer = document.createElement("div");
    hiddenContainer.id = "n8n-chat-hidden";
    hiddenContainer.style.display = "none";
    document.body.appendChild(hiddenContainer);

    // Initialize the n8n chat client with the exact configuration
    n8nChatClient = window.createChat({
      webhookUrl:
        "https://n8n-dev-tx45.onrender.com/webhook/854c829c-2ce6-426f-89e2-ed44d33182f3/chat",
      webhookConfig: {
        method: "POST",
        headers: {},
      },
      target: "#n8n-chat-hidden", // Target our hidden container
      mode: "window",
      autoShowDelay: 0,
      chatInputKey: "chatInput",
      chatSessionKey: "sessionId",
      metadata: {
        sessionId: sessionId,
      },
      showWelcomeScreen: false,
      defaultLanguage: "en",
      initialMessages: [
        "Hi there! My name is BorjBot. I am an AI Chatbot for WorkWithBorj.",
        "How can I assist you today?",
      ],
      i18n: {
        en: {
          title: "BorjBot",
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Type your question..",
        },
      },
    });

    console.log("n8n chat client initialized successfully");
  } catch (error) {
    console.error("Error initializing n8n chat client:", error);
  }

  // Toggle chat options drawer
  mainChatButton.addEventListener("click", function () {
    chatOptions.classList.toggle("show");
    
    // Check bot status when the drawer is opened
    if (chatOptions.classList.contains("show")) {
      checkBotStatus();
    }
  });

  // Close chat options when clicking outside
  document.addEventListener("click", function (e) {
    if (!mainChatButton.contains(e.target) && !chatOptions.contains(e.target)) {
      chatOptions.classList.remove("show");
    }
  });

  // n8n Chat functionality
  borjbotOption.addEventListener("click", function () {
    // Close the options drawer
    chatOptions.classList.remove("show");

    // Initialize or show custom chat
    initializeCustomChat();
  });

  // Initialize custom chat interface
  function initializeCustomChat() {
    const chatInterface = document.getElementById("custom-chat");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendMessageBtn = document.getElementById("send-message");
    const closeBtn = chatInterface.querySelector(".close-chat");

    // Clear existing messages in the UI
    chatMessages.innerHTML = "";

    // Show the chat interface
    chatInterface.classList.add("show");

    // Check if there are saved messages to load
    const savedMessages = JSON.parse(
      localStorage.getItem("chatMessages") || "[]"
    );

    if (savedMessages.length > 0) {
      // Load existing conversation
      savedMessages.forEach((msg) => {
        addMessage(msg.message, msg.sender, false); // Don't save these messages again
      });
    } else {
      // No existing conversation, show welcome messages
      addMessage(
        "Hi there! My name is BorjBot. I am an AI Chatbot for WorkWithBorj.",
        "bot"
      );
      addMessage("How can I assist you today?", "bot");
    }

    // Handle close button
    closeBtn.addEventListener("click", function () {
      chatInterface.classList.remove("show");
    });

    // First, check if header buttons container already exists
    const chatHeader = chatInterface.querySelector(".chat-header");
    let buttonContainer = chatHeader.querySelector(".header-buttons");
    let clearButton;

    // If the container doesn't exist, create it and the buttons
    if (!buttonContainer) {
      // Remove existing close button from DOM (it's currently directly in the header)
      if (closeBtn.parentNode === chatHeader) {
        chatHeader.removeChild(closeBtn);
      }

      // Create the clear button
      clearButton = document.createElement("button");
      clearButton.className = "clear-chat";
      clearButton.textContent = "Clear";
      clearButton.title = "Clear conversation history";

      // Create a container for both buttons
      buttonContainer = document.createElement("div");
      buttonContainer.className = "header-buttons";
      buttonContainer.appendChild(clearButton);
      buttonContainer.appendChild(closeBtn);
      chatHeader.appendChild(buttonContainer);
    } else {
      // If the container exists, just get a reference to the clear button
      clearButton = buttonContainer.querySelector(".clear-chat");
    }

    // Handle clear history button
    clearButton.addEventListener("click", function () {
      // Clear localStorage
      localStorage.removeItem("chatMessages");

      // Clear UI
      chatMessages.innerHTML = "";

      // Show welcome messages again
      addMessage(
        "Hi there! My name is BorjBot. I am an AI Chatbot for WorkWithBorj.",
        "bot"
      );
      addMessage("How can I assist you today?", "bot");
    });

    // Handle message sending
    sendMessageBtn.addEventListener("click", sendMessage);

    // Handle Enter key for sending messages
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Function to send message using n8n chat client
    async function sendMessage() {
      const message = chatInput.value.trim();
      if (!message) return;

      // Disable input and button while processing
      chatInput.disabled = true;
      sendMessageBtn.disabled = true;
      sendMessageBtn.classList.add("disabled");

      // Clear input immediately
      chatInput.value = "";

      // Add user message to chat
      addMessage(message, "user");

      // Use the n8n chat client to send the message
      try {
        if (!n8nChatClient) {
          throw new Error("n8n chat client not initialized");
        }

        // Get or create session ID
        const currentSessionId =
          localStorage.getItem("sessionId") || generateSessionId();

        // Send message using n8n's chat client
        const response = await n8nChatClient.sendMessage(message, {
          sessionId: currentSessionId,
          chatInput: message, // This matches the chatInputKey in the config
        });

        // Process response from n8n
        if (response) {
          // Check if response is a string that contains JSON
          if (typeof response === "string") {
            try {
              // Try to parse the string as JSON
              const jsonResponse = JSON.parse(response);

              // Check for common response formats
              if (jsonResponse.output) {
                addMessage(jsonResponse.output, "bot");
              } else if (jsonResponse.text) {
                addMessage(jsonResponse.text, "bot");
              } else if (jsonResponse.response) {
                addMessage(jsonResponse.response, "bot");
              } else {
                // If no recognized format, just use the original string
                addMessage(response, "bot");
              }
            } catch (e) {
              // If it's not valid JSON, just use the string directly
              addMessage(response, "bot");
            }
          }
          // Handle object with common properties
          else if (response.output) {
            addMessage(response.output, "bot");
          } else if (response.text) {
            addMessage(response.text, "bot");
          } else if (response.response) {
            addMessage(response.response, "bot");
          }
          // Handle array response (multiple messages)
          else if (Array.isArray(response)) {
            response.forEach((msg) => {
              if (typeof msg === "string") {
                try {
                  const jsonMsg = JSON.parse(msg);
                  const msgText =
                    jsonMsg.output || jsonMsg.text || jsonMsg.response || msg;
                  addMessage(msgText, "bot");
                } catch (e) {
                  addMessage(msg, "bot");
                }
              } else {
                const msgText =
                  msg.output || msg.text || msg.response || JSON.stringify(msg);
                addMessage(msgText, "bot");
              }
            });
          }
          // Handle any other object response
          else {
            // Convert to string and try one more time to parse any nested JSON
            const responseStr = JSON.stringify(response);
            try {
              const parsedResponse = JSON.parse(responseStr);
              if (parsedResponse.output) {
                addMessage(parsedResponse.output, "bot");
              } else {
                addMessage(responseStr, "bot");
              }
            } catch (e) {
              addMessage(responseStr, "bot");
            }
          }
        }
      } catch (error) {
        console.error("Error sending message with n8n client:", error);

        // Fallback to direct webhook call if n8n client fails
        try {
          const currentSessionId =
            localStorage.getItem("sessionId") || generateSessionId();

          const fallbackResponse = await fetch(
            "https://n8n-dev-tx45.onrender.com/webhook/854c829c-2ce6-426f-89e2-ed44d33182f3/chat",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: message,
                sessionId: currentSessionId,
                chatInput: message,
                sender: "user",
              }),
            }
          );

          const data = await fallbackResponse.json();

          // Add bot response to chat
          if (data.output) {
            // Handle the specific case from your sample
            addMessage(data.output, "bot");
          } else if (data.response) {
            addMessage(data.response, "bot");
          } else if (typeof data === "string") {
            // Try to parse if it's a JSON string
            try {
              const jsonData = JSON.parse(data);
              if (jsonData.output) {
                addMessage(jsonData.output, "bot");
              } else if (jsonData.response) {
                addMessage(jsonData.response, "bot");
              } else if (jsonData.text) {
                addMessage(jsonData.text, "bot");
              } else {
                addMessage(data, "bot");
              }
            } catch (e) {
              // Not JSON, use as is
              addMessage(data, "bot");
            }
          } else if (data.text) {
            addMessage(data.text, "bot");
          } else {
            const dataStr = JSON.stringify(data);
            try {
              const parsedData = JSON.parse(dataStr);
              if (parsedData.output) {
                addMessage(parsedData.output, "bot");
              } else {
                addMessage(dataStr, "bot");
              }
            } catch (e) {
              addMessage(dataStr, "bot");
            }
          }
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
          addMessage(
            "Sorry, there was an error sending your message. Please try again.",
            "bot"
          );
        }
      }

      // Re-enable input and button
      chatInput.disabled = false;
      sendMessageBtn.disabled = false;
      sendMessageBtn.classList.remove("disabled");
      chatInput.focus();
    }

    // Function to add message to chat
    function addMessage(text, sender, saveToStorage = true) {
      const messageDiv = document.createElement("div");
      messageDiv.className = `message ${sender}`;
      messageDiv.textContent = text;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Save message to localStorage if saveToStorage is true
      if (saveToStorage) {
        saveChatMessage(text, sender);
      }
    }
  }
});
