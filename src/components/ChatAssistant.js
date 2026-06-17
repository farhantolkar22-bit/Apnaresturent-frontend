'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send } from 'lucide-react';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! Welcome to Apna Restaurant's Gourmet Assistant. How may I serve you today?",
      options: ["Signature Dishes", "Reserve a Table", "Opening Hours", "How to Order?"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: textToSend })
      });
      
      const data = await res.json();
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: data.text,
          options: data.options || []
        }]);
      }, 600);
    } catch (err) {
      console.error('Chat bot error:', err);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: "I am having a brief connection issue, but you can always view our menu or call us at +91 98765 43210!",
          options: ["Signature Dishes", "Opening Hours"]
        }]);
      }, 600);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[999]">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white dark:bg-[#1a1a1a] hover:bg-neutral-50 dark:hover:bg-neutral-900 text-[#b71c1c] p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center cursor-pointer border border-[#b71c1c]/20"
          title="Open AI Chat Assistant"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Chat window container */}
      {isOpen && (
        <div className="bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 w-[350px] sm:w-[380px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md transition-all duration-300">
          
          {/* Header */}
          <div className="bg-neutral-50 dark:bg-neutral-900 px-5 py-4 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-[#b71c1c]/10 p-2 rounded-full border border-[#b71c1c]/20">
                <Bot className="w-5 h-5 text-[#b71c1c]" />
              </div>
              <div>
                <h4 className="text-neutral-800 dark:text-white font-serif font-bold text-sm tracking-wider">APNA Gourmet AI</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-neutral-400">Online & Ready</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#b71c1c] text-white rounded-tr-none font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-tl-none border border-black/5 dark:border-white/5'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {msg.text}
                </div>
                
                {/* Message Option Suggestions */}
                {msg.sender === 'bot' && msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSendMessage(opt)}
                        className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-black/5 dark:border-white/5 text-[10px] text-[#b71c1c] px-3 py-1.5 rounded-full transition cursor-pointer font-medium"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 px-4 py-3 rounded-2xl rounded-tl-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b71c1c] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#b71c1c] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#b71c1c] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Input Panel */}
          <div className="p-4 border-t border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900 flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about reservation, menu, timings..."
              className="flex-1 bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50 transition"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="bg-[#b71c1c] hover:bg-[#d32f2f] text-white p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
