import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can we help you today?' },
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input.trim() }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Thanks! A Waliin representative will be with you shortly.' },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-16 right-4 z-50">
      {open ? (
        <div className="w-80 h-96 rounded-xl shadow-lg flex flex-col overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937]">
          {/* Header */}
          <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-bold">Chat with Waliin</h3>
            <button onClick={() => setOpen(false)} className="hover:text-gray-300">
              <FaTimes />
            </button>
          </div>

          {/* Chat Body */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-gray-800"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-indigo-200 text-gray-900 dark:bg-indigo-500 dark:text-white'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-300 dark:border-gray-700 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              type="text"
              placeholder="Type a message..."
              className="flex-1 border px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <button
              onClick={sendMessage}
              className="text-indigo-600 dark:text-indigo-400 text-xl hover:scale-110 transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-end">
          <div className="mb-2 px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow text-sm text-gray-700 dark:text-gray-200">
            Need Help?
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition duration-300"
          >
            <FaComments size={20} />
          </button>
        </div>
      )}
    </div>
  );
}