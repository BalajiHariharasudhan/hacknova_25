import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Smart Power Assistant. I can help you understand your electricity usage, explain features, and provide energy-saving tips. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('upload') || message.includes('bill')) {
      return 'You can upload your electricity bill in multiple ways: 1) PDF or image files (we\'ll extract data using OCR), 2) CSV files with timestamp and usage data, or 3) Manual entry. Just click the "Upload Bill" button on your dashboard!';
    }
    
    if (message.includes('analysis') || message.includes('analyze')) {
      return 'Our analysis shows your appliance-wise consumption, peak usage hours, and identifies energy-wasting patterns. We break down exactly which appliances consume the most electricity and when you use the most power during the day.';
    }
    
    if (message.includes('prediction') || message.includes('predict')) {
      return 'Our AI prediction uses your historical usage patterns to forecast your next month\'s bill. We consider seasonal variations, usage trends, and can show you potential savings if you follow our optimization suggestions.';
    }
    
    if (message.includes('save') || message.includes('reduce') || message.includes('tips')) {
      return 'We provide personalized energy-saving tips based on your actual usage data! For example, if you use AC heavily during peak hours, we\'ll suggest shifting usage to off-peak times. Each tip shows potential monthly savings.';
    }
    
    if (message.includes('dark mode') || message.includes('theme')) {
      return 'You can toggle between light and dark mode using the sun/moon icon in the top navigation. Your preference is automatically saved and will be remembered for future visits.';
    }
    
    if (message.includes('cost') || message.includes('price') || message.includes('rate')) {
      return 'You can set your electricity rate (cost per unit) in the analysis section. This helps us calculate accurate cost breakdowns and savings estimates. The default rate is ₹7.5 per kWh, but you can adjust it based on your local tariff.';
    }
    
    if (message.includes('report') || message.includes('pdf') || message.includes('download')) {
      return 'Yes! You can download a comprehensive PDF report that includes your usage analysis, efficiency score, trend analysis, and personalized recommendations. Look for the "Download Report" button in the analysis section.';
    }
    
    if (message.includes('score') || message.includes('rating') || message.includes('efficiency')) {
      return 'Your Energy Efficiency Score is calculated based on your daily usage patterns, peak hour consumption, and overall efficiency. Scores range from 0-100, with badges like "Eco Champion" (80+), "Green User" (60+), "Moderate User" (40+), and "High Usage Alert" (<40).';
    }
    
    if (message.includes('peak') || message.includes('hours') || message.includes('time')) {
      return 'Peak hours are typically 12 PM - 6 PM when electricity rates are highest and grid demand is maximum. Our system identifies your personal peak usage times and suggests shifting heavy appliances to off-peak hours (11 PM - 6 AM) to save money.';
    }
    
    if (message.includes('appliance') || message.includes('ac') || message.includes('heater')) {
      return 'We analyze consumption by appliance category: Air Conditioners (usually 40-50% of total), Water Heaters (15-25%), Refrigerators (10-15%), Lighting (5-10%), and Electronics (5-10%). Each appliance shows daily usage hours and cost breakdown.';
    }
    
    if (message.includes('trend') || message.includes('increasing') || message.includes('decreasing')) {
      return 'Our trend detection compares your recent 7-day average with the previous week. We show if your usage is increasing 📈, decreasing 📉, or stable ✅, along with the percentage change and helpful insights.';
    }
    
    if (message.includes('mobile') || message.includes('phone') || message.includes('responsive')) {
      return 'Yes! Our website is fully responsive and works perfectly on mobile phones, tablets, and desktops. All features including chart viewing, bill upload, and analysis are optimized for touch interfaces.';
    }
    
    if (message.includes('data') || message.includes('privacy') || message.includes('security')) {
      return 'Your data privacy is our priority. All uploaded bills and usage data are processed locally in your browser when possible. We don\'t store sensitive billing information on our servers, and you can clear your data anytime using the reset option.';
    }
    
    if (message.includes('help') || message.includes('how') || message.includes('guide')) {
      return 'Here\'s how to get started: 1) Upload your electricity bill, 2) Review the detailed analysis of your usage patterns, 3) Check personalized energy-saving recommendations, 4) Use the prediction feature to forecast future bills, 5) Download your comprehensive report. Need help with any specific step?';
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! I\'m here to help you make the most of Smart Power Optimizer. Whether you need help uploading bills, understanding your analysis, or implementing energy-saving tips, just ask!';
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! I\'m always here to help you save energy and reduce your electricity bills. Feel free to ask if you have any other questions!';
    }
    
    // Default response
    return 'I\'d be happy to help! You can ask me about: uploading bills, understanding your analysis, energy-saving tips, bill predictions, using dark mode, downloading reports, or any other feature. What would you like to know more about?';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 z-50 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Smart Power Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[340px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about energy optimization..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;