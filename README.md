# AI Chatbot Assistant

This project is a chatbot AI assistant built with OpenAI, JavaScript, React.js, Next.js, and Material-UI. It features a chat interface where users can interact with the chatbot, and provides functionality to collect user feedback which is saved to a Firebase database.

<img width="1508" alt="first" src="https://github.com/user-attachments/assets/e67d3849-efb1-4889-98fd-ad9b61da4075">


<img width="1504" alt="second" src="https://github.com/user-attachments/assets/a2ba7af0-9fa1-430d-8dac-639edcd0fb83">

<img width="1160" alt="third" src="https://github.com/user-attachments/assets/53a9cadf-a719-4db3-88a3-06f81b642ce5">

## Features

- **AI Chatbot Integration:** Powered by OpenAI, the chatbot can handle user queries and provide responses.
- **Real-time Chat:** Supports real-time messaging with smooth scrolling to the latest messages.
- **Feedback Collection:** Users can submit their feedback, including their name, rating, and review, which is stored in a Firebase database.
- **Material-UI Design:** Utilizes Material-UI for a modern and responsive user interface.
- **Modal Feedback Form:** A modal form collects user feedback after ending the chat.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- Firebase account with Firestore setup

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration to the `firebase.js` file in the `src` directory.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` to see the chatbot in action.

## Usage

- Type your message in the input field and press Enter or click the send button to send a message.
- Click "End Chat" to finish the conversation and provide feedback.
- A feedback modal will appear after ending the chat to collect user feedback.

## Code Overview

- **`pages/index.js`**: Main page file containing the chatbot UI and logic.
- **`firebase.js`**: Firebase configuration and initialization.
- **`/api/chat`**: API endpoint for handling chat requests (you'll need to implement this based on your backend setup).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com).
