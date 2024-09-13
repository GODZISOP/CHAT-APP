import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const Msssss = () => {
  const location = useLocation();
  const { donor } = location.state || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // Simulate fetching current user email (replace with actual logic if available)
    setCurrentUser('your-email@example.com'); // Replace with actual user email fetching logic

    if (donor) {
      const messagesQuery = query(
        collection(db, `chats/${donor.id}/messages`),
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => doc.data());
        setMessages(msgs);
      });

      return () => unsubscribe();
    }
  }, [donor]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    try {
      await addDoc(collection(db, `chats/${donor.id}/messages`), {
        text: message,
        timestamp: new Date(),
        sender: currentUser
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-full py-4 text-center">
        <h1 className="text-4xl font-bold">Chat with {donor?.name}</h1>
      </header>

      <main className="flex-grow w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <div className="flex-grow h-[600px] overflow-y-auto mb-4 bg-gray-50 p-4 rounded-lg border border-gray-300">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-2 transition-transform duration-300 ${
                msg.sender === currentUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === currentUser
                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                    : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800'
                } shadow-md`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs block mt-1">
                  {new Date(msg.timestamp.seconds * 1000).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 border-t border-gray-300 pt-4 bg-gray-50">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3 transition-transform duration-300 ease-in-out"
            placeholder="Type a message..."
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:opacity-80 transition-opacity"
          >
            Send
          </button>
        </form>
      </main>

      <footer className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-full py-4 text-center mt-8">
        <p>&copy; 2024 Blood Donation</p>
      </footer>
    </div>
  );
};

export default Msssss;


