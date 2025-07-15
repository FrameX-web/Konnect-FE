import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Volume2, VolumeX, Send, MessageSquare, Mic, MicOff, HelpCircle } from 'lucide-react';
import '@fontsource/montserrat'; // Ensure Montserrat is loaded

// Theme constants
const GOLD_GRADIENT = 'linear-gradient(135deg, #FAE5B5 0%, #EECF8E 100%)';
const GOLD_SOLID = '#EECF8E';
const BLACK = '#181818';
const WHITE = '#fff';
const FONT = "'Montserrat', Arial, sans-serif";

const ChatbotUI = ({
  messages,
  isTyping,
  isTextToSpeech,
  inputValue,
  onInputChange,
  onSend,
  onToggleTextToSpeech,
  onClose,
  selectedLanguage,
  onLanguageChange,
  userEmotion,
  emotionHistory
}) => {
  const messageEndRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showEmotionTooltip, setShowEmotionTooltip] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Trigger opening animation with a slight delay for a smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
    }
  };

  // Message component
  const ChatMessage = ({ message, isUser }) => {
    // Map emotions to emojis
    const emotionEmojis = {
      'happy': '😊',
      'sad': '😢',
      'angry': '😠',
      'anxious': '😰',
      'neutral': '',
      'excited': '🤩',
      'confused': '🤔'
    };
    const emotion = isUser ? message.emotion : message.respondingToEmotion;
    const emoji = emotion && emotionEmojis[emotion] ? emotionEmojis[emotion] : '';

    return (
      <div style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 18,
        paddingLeft: 8,
        paddingRight: 8,
        fontFamily: FONT
      }}>
        {!isUser && (
          <div style={{
            background: GOLD_GRADIENT,
            borderRadius: '50%',
            width: 28, // reduced from 36
            height: 28, // reduced from 36
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            boxShadow: '0 2px 8px rgba(238,207,142,0.15)'
          }}>
            <MessageSquare size={12} color={BLACK} /> {/* reduced from 16 */}
          </div>
        )}
        <div style={{ maxWidth: '75%' }}>
          <div style={{
            background: isUser
              ? '#181818'
              : 'rgba(255,255,255,0.97)',
            color: isUser ? GOLD_SOLID : BLACK,
            borderRadius: isUser ? '1.5rem 1.5rem 0.25rem 1.5rem' : '1.5rem 1.5rem 1.5rem 0.25rem',
            padding: '0.95rem 1.2rem',
            fontFamily: FONT,
            fontSize: isUser ? '1rem' : '0.92rem', // Lower font size for AI response
            fontWeight: 500,
            boxShadow: isUser
              ? '0 2px 8px rgba(238,207,142,0.10)'
              : '0 2px 8px rgba(30,41,59,0.07)',
            position: 'relative',
            border: isUser ? '1.5px solid #EECF8E' : '1.5px solid #EECF8E22'
          }}>
            {message.message}
            {emoji && (
              <span style={{
                position: 'absolute',
                top: 6,
                right: 12,
                fontSize: '1.1em'
              }}>{emoji}</span>
            )}
          </div>
          <div style={{
            fontSize: '0.85rem',
            marginTop: 6,
            color: isUser ? GOLD_SOLID : '#bfa76a',
            textAlign: isUser ? 'right' : 'left',
            fontFamily: FONT,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            {message.sentTime}
            {isUser && (
              <span>
                {message.status === "sending" && <span style={{ color: GOLD_SOLID }}>...</span>}
                {message.status === "sent" && <span style={{ color: GOLD_SOLID }}>✓</span>}
                {message.status === "delivered" && <span style={{ color: GOLD_SOLID }}>✓✓</span>}
              </span>
            )}
            {emotion && emotion !== 'neutral' && (
              <span style={{
                background: '#FAE5B5',
                color: BLACK,
                borderRadius: '1rem',
                padding: '0.1rem 0.7rem',
                fontSize: '0.8em',
                border: `1px solid #EECF8E`
              }}>
                {emotion}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        background: WHITE,
        borderRadius: '2rem',
        boxShadow: '0 16px 48px -8px #EECF8E44, 0 0 0 1.5px #EECF8E22 inset',
        overflow: 'hidden',
        height: 600,
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: FONT,
        border: '2px solid #EECF8E',
        transition: 'all 0.5s cubic-bezier(.4,0,.2,1)',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'scale(1)' : 'scale(0.97)'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: BLACK,
          color: GOLD_SOLID,
          padding: '1.1rem 1.7rem 1.1rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: '1.1rem',
          borderBottom: '1.5px solid #EECF8E22',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 30, // reduced from 38
            height: 30, // reduced from 38
            borderRadius: '50%',
            background: GOLD_GRADIENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px #EECF8E33'
          }}>
            <MessageSquare size={14} color={BLACK} /> {/* reduced from 18 */}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: GOLD_SOLID, fontFamily: FONT }}>
              {selectedLanguage.toLowerCase() === 'hindi' ? "Konnect" : "Konnect"}
            </div>
            <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#fff', opacity: 0.8, display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT }}>
              {/* Removed language indicator */}
              {userEmotion && userEmotion !== 'neutral' && (
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      marginLeft: 10,
                      padding: '0.2rem 0.9rem',
                      borderRadius: '1rem',
                      background: '#fff2',
                      color: GOLD_SOLID,
                      fontSize: '0.85em',
                      border: '1px solid #EECF8E44',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                    onMouseEnter={() => setShowEmotionTooltip(true)}
                    onMouseLeave={() => setShowEmotionTooltip(false)}
                  >
                    {userEmotion === 'happy' && '😊 Happy'}
                    {userEmotion === 'sad' && '😢 Sad'}
                    {userEmotion === 'angry' && '😠 Angry'}
                    {userEmotion === 'anxious' && '😰 Anxious'}
                    {userEmotion === 'excited' && '🤩 Excited'}
                    {userEmotion === 'confused' && '🤔 Confused'}
                    <HelpCircle size={13} />
                  </span>
                  {showEmotionTooltip && (
                    <div style={{
                      position: 'absolute',
                      bottom: '120%',
                      left: 0,
                      width: 180,
                      padding: 10,
                      background: '#181818',
                      color: GOLD_SOLID,
                      fontSize: '0.85em',
                      borderRadius: 10,
                      boxShadow: '0 4px 16px #18181844',
                      border: '1px solid #EECF8E44',
                      zIndex: 10
                    }}>
                      The assistant adapts its responses based on your detected emotional state.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Removed voice feedback button */}
          {/* Language Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLanguageOptions(!showLanguageOptions)}
              style={{
                padding: 10,
                borderRadius: 12,
                background: '#fff2',
                color: GOLD_SOLID,
                border: 'none',
                outline: 'none',
                fontWeight: 700,
                fontFamily: FONT,
                fontSize: '1em',
                cursor: 'pointer'
              }}
              aria-label="Language selection"
            >
              {selectedLanguage.toLowerCase() === 'hindi'
                ? <span>हिं</span>
                : <span>ENG</span>
              }
            </button>
            {showLanguageOptions && (
              <div style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                background: '#fff',
                borderRadius: 12,
                border: '1.5px solid #EECF8E',
                boxShadow: '0 4px 24px #EECF8E22',
                zIndex: 10,
                minWidth: 120,
                overflow: 'hidden'
              }}>
                <div style={{ padding: 6 }}>
                  <button
                    onClick={() => { onLanguageChange('english'); setShowLanguageOptions(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 16px',
                      fontSize: '1em',
                      color: BLACK,
                      background: 'none',
                      border: 'none',
                      borderRadius: 8,
                      fontFamily: FONT,
                      cursor: 'pointer'
                    }}
                  >English</button>
                  <button
                    onClick={() => { onLanguageChange('hindi'); setShowLanguageOptions(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 16px',
                      fontSize: '1em',
                      color: BLACK,
                      background: 'none',
                      border: 'none',
                      borderRadius: 8,
                      fontFamily: FONT,
                      cursor: 'pointer'
                    }}
                  >हिंदी</button>
                </div>
              </div>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                padding: 10,
                borderRadius: 12,
                background: 'transparent',
                color: GOLD_SOLID,
                border: 'none',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.93)',
          overflowY: 'auto',
          padding: '1.2rem 1.1rem 1rem 1.1rem',
          fontFamily: FONT
        }}
      >
        {messages.map((message, i) => (
          <ChatMessage
            key={i}
            message={message}
            isUser={message.sender === "user"}
          />
        ))}
        {isTyping && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: 18,
            paddingLeft: 8,
            paddingRight: 8,
            fontFamily: FONT
          }}>
            <div style={{
              background: GOLD_GRADIENT,
              borderRadius: '50%',
              width: 28, // reduced from 36
              height: 28, // reduced from 36
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              boxShadow: '0 2px 8px rgba(238,207,142,0.15)'
            }}>
              <MessageSquare size={12} color={BLACK} /> {/* reduced from 16 */}
            </div>
            <div style={{
              background: '#fff',
              padding: '0.9rem 1.5rem',
              borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem',
              boxShadow: '0 2px 8px #EECF8E22',
              fontFamily: FONT,
              fontSize: '1rem',
              color: BLACK,
              display: 'flex',
              gap: 8
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#EECF8E', marginRight: 4, animation: 'pulse 1.2s infinite'
              }} />
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#EECF8E', marginRight: 4, animation: 'pulse 1.2s 0.2s infinite'
              }} />
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#EECF8E', animation: 'pulse 1.2s 0.4s infinite'
              }} />
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          background: 'rgba(255,255,255,0.97)',
          borderTop: '1.5px solid #EECF8E22',
          padding: '1.1rem 1.1rem 1.1rem 1.1rem',
          fontFamily: FONT
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={selectedLanguage.toLowerCase() === 'hindi' ? "अपना संदेश यहां टाइप करें..." : "Type your message..."}
            style={{
              flex: 1,
              padding: '0.9rem 1.2rem',
              borderRadius: 16,
              border: '1.5px solid #EECF8E44',
              background: WHITE,
              color: BLACK,
              fontFamily: FONT,
              fontSize: '1rem',
              outline: 'none',
              marginRight: 8,
              boxShadow: '0 2px 6px #EECF8E11 inset'
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{
              padding: 12,
              borderRadius: 12,
              background: GOLD_GRADIENT,
              color: BLACK,
              border: 'none',
              outline: 'none',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              opacity: inputValue.trim() ? 1 : 0.6,
              fontWeight: 700
            }}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: 10,
          fontSize: '0.85rem',
          color: '#bfa76a',
          fontFamily: FONT
        }}>
          {selectedLanguage.toLowerCase() === 'hindi'
            ? "FrameX द्वारा संचालित"
            : "Powered by FrameX"}
        </div>
      </div>
    </div>
  );
};

ChatbotUI.propTypes = {
  messages: PropTypes.array.isRequired,
  isTyping: PropTypes.bool.isRequired,
  isTextToSpeech: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onToggleTextToSpeech: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  selectedLanguage: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  userEmotion: PropTypes.string,
  emotionHistory: PropTypes.array
};

export default ChatbotUI;