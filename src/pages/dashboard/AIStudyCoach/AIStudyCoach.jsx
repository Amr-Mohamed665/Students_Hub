import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import Button from '../../../components/atoms/Button/Button';
import { coachMessages, coachSuggestions } from '../../../data/mockData';
import styles from './AIStudyCoach.module.css';

export default function AIStudyCoach() {
  const [messages, setMessages] = useState(coachMessages);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setTyping(true);

    
    setTimeout(() => {
      setTyping(false);
      const aiMsg = {
        id: `msg_${Date.now() + 1}`,
        sender: 'ai',
        text: `Transceiver acknowledged. I analyzed your query about "${text}". How can I expand on this topic to support your academy simulation?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatCard}>
        
        <div className={styles.chatHeader}>
          <div className={styles.botSnippet}>
            <div className={styles.botAvatar}>
              <Bot size={20} />
            </div>
            <div>
              <h3 className={styles.botName}>AI Study Coach</h3>
              <p className={styles.botStatus}>Operational / Standby</p>
            </div>
          </div>
          <span className={styles.badge}>
            <Sparkles size={12} style={{ marginRight: '4px' }} />
            GPT-4o Model
          </span>
        </div>

        
        <div className={styles.messageBox}>
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div key={msg.id} className={`${styles.msgRow} ${isAI ? styles.rowAI : styles.rowUser}`}>
                <div className={styles.avatar}>
                  {isAI ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={styles.bubble}>
                  <div className={styles.bubbleText}>{msg.text}</div>
                  <div className={styles.bubbleTime}>{msg.time}</div>
                </div>
              </div>
            );
          })}
          {typing && (
            <div className={`${styles.msgRow} ${styles.rowAI}`}>
              <div className={styles.avatar}>
                <Bot size={16} />
              </div>
              <div className={styles.bubble}>
                <div className={styles.typingDots}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        
        <div className={styles.suggestions}>
          {coachSuggestions.map((sug, i) => (
            <button
              key={i}
              className={styles.sugBtn}
              onClick={() => handleSend(sug)}
            >
              {sug}
            </button>
          ))}
        </div>

        
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
        >
          <input
            type="text"
            className={styles.input}
            placeholder="Ask your study coach a question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button type="submit" size="sm" icon={<Send size={14} />} />
        </form>
      </div>
    </div>
  );
}
