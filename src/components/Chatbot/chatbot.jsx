// Chatbot.jsx (fully integrated with ElevenLabs)
import { useState, useEffect } from 'react';
import OpenAI from "openai";
import ChatbotUI from './ChatbotUI';

// Emotion detection utilities
const emotions = {
  HAPPY: 'happy',
  SAD: 'sad',
  ANGRY: 'angry',
  ANXIOUS: 'anxious',
  NEUTRAL: 'neutral',
  EXCITED: 'excited',
  CONFUSED: 'confused',
};

const emotionKeywords = {
  [emotions.HAPPY]: ['happy', 'joy', 'delighted', 'glad', 'pleased', 'thrilled', '😊', '😄', '🙂', 'excellent', 'amazing'],
  [emotions.SAD]: ['sad', 'unhappy', 'upset', 'depressed', 'down', 'miserable', '😢', '😭', '😞', 'disappointed', 'lonely'],
  [emotions.ANGRY]: ['angry', 'mad', 'furious', 'annoyed', 'irritated', 'frustrated', '😠', '😡', 'terrible', 'worst', 'hate'],
  [emotions.ANXIOUS]: ['anxious', 'worried', 'nervous', 'stressed', 'concerned', 'afraid', 'scared', 'fear', '😰', '😨'],
  [emotions.EXCITED]: ['excited', 'enthusiastic', 'eager', 'looking forward', 'can\'t wait', 'thrilled', '🎉', '🤩', 'awesome'],
  [emotions.CONFUSED]: ['confused', 'unsure', 'not clear', 'don\'t understand', 'what do you mean', 'clarify', 'explain', '🤔']
};

const systemContext = `You are Konnect Bot, a Helping bot for various tasks...
IMPORTANT LANGUAGE INSTRUCTION:
- If user writes in Hindi (Devanagari): Respond in Hindi (Devanagari) only
- If user writes in English: Respond in English only!.
- If user writes in Hinglish: Respond in Hinglish only.
- For any other language: Respond in that same language

ABOUT KONNECT PACKAGING WEBSITE & COMPANY:
- This is the official website for KONNECT Packaging International LLP, a leader in innovative and sustainable packaging solutions for Food & Agro Packaging, VCI Packaging, and more.
- Based in Borgaon, Chhindwara, Madhya Pradesh, India (Pin code: 480106).
- KONNECT is committed to packaging excellence, quality, and customer satisfaction.

PRODUCTS & SERVICES:
- Main product categories include:
  - VCI Kraft Paper: Corrosion protection for ferrous and non-ferrous metals.
  - VCI PE Laminated Paper: Kraft paper laminated with PE for moisture and corrosion protection.
  - VCI 3-Ply Paper: Heavy-duty, multi-layer corrosion inhibitive paper.
  - VCI LDPE Film: Polyethylene film with VCI for rust prevention.
  - VCI HDPE Laminated Strength Fabric: Heavy-duty woven fabric with VCI and HDPE lamination.
  - VCI MET PET Laminated Paper: Kraft paper with metallized PET and VCI for high barrier.
  - VCI 4-Ply Fabric: Multi-layered VCI composite for long-term corrosion protection.
  - VCI Shrink Film: Shrinkable film with VCI for tamper-resistant, rust-proof packaging.
  - VCI Desiccant: Dual-action moisture absorber and corrosion inhibitor.
  - VCI Masterbatch: Additive for imparting VCI properties to plastics.
  - VCI Power Stretch Film: Stretch wrap film with VCI for pallet and industrial packaging.
  - Industrial Wax Paper: Wax-coated kraft paper for moisture and oil barrier.
  - Alu Barrier Bags: Aluminum foil-based high-barrier bags for moisture, oxygen, and UV protection.
  - VCI Eco Paper: Sustainable, recyclable, and biodegradable VCI paper.
  - SMP Bags: Multi-layer bags for food and dairy with strong barriers.
  - Bulk Tea Packaging Bags: High-strength kraft or woven bags with moisture barrier for tea.
  - PE-Coated Paper (Food Grade): Kraft or MG paper with food-safe PE coating.
  - Wax-Coated Paper: Moisture-resistant, grease-repellent paper for food and industrial use.
  - Paper Aluminum Pouches: Kraft paper with aluminum foil for high-barrier food and pharma packaging.
  - Standing Pouches: Stand-up pouches for food, personal care, and more.
  - HDPE Laminated Paper Bags: Kraft paper laminated with HDPE for agricultural and industrial use.
  - Sugar Paper: Food-grade paper for sugar and granular food packaging.
  - Multiwall Paper Bags: Multi-layer kraft bags for industrial, chemical, and food products.
  - Chromo Paper is our offering.
- Many more solutions for Food & Agro, industrial, and specialty packaging. (For more, see Product Analysis or ask for details.)
- If you tell me your requirements, I can also suggest the most suitable product for your needs.

CONTACT INFORMATION:
- General Enquiries: info@konnectpackaging.com
- Sales/Material Requirements: sales@konnectpackaging.com
- Phone: +91-7774031665
- Address: Plot no J/60, KONNECT Packaging International LLP, Borgaon, Chhindwara, Madhya Pradesh, 480106, India

NAVIGATION & WEBSITE SECTIONS:
- Key sections: Why Choose Us, Vision and Mission, Product Analysis, Brochure download, Contact Us
- Social media: YouTube, WhatsApp, Facebook, Instagram, LinkedIn, Twitter
- Some pages (like Career and Catalog) may be under construction—inform users politely if they ask about these.

BRAND TONE & STYLE:
- Be professional, friendly, and helpful.
- Use clear, concise, and positive language.
- If the user writes in Hindi (Devanagari) or Hinglish, always respond in Hindi (Devanagari) script.
- If the user writes in English, respond in English. For other languages, respond in that language.

EMOTIONAL RESPONSE GUIDELINES:
- If user seems happy: Match their positive energy
- If user seems sad: Be empathetic and supportive
- If user seems angry: Be calm and solution-oriented
- If user seems anxious: Be reassuring and clear
- If user seems excited: Match their enthusiasm
- If user seems confused: Be extra clear and offer additional help

Always answer as a knowledgeable representative of KONNECT Packaging, using the above information to help users with their queries about the company, products, contact, and website navigation.

IMPORTANT: All your responses must be concise and brief within (150-200 words). Only give detailed answers when asked. Do not use markdown or asterisks for bullet points—use plain text. Always use a smaller font for your responses in the UI to distinguish AI replies.`;

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "your_default_api_key",
  dangerouslyAllowBrowser: true,
});

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTextToSpeech, setIsTextToSpeech] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [userEmotion, setUserEmotion] = useState(emotions.NEUTRAL);
  const [emotionHistory, setEmotionHistory] = useState([]);
  
  // Detect emotion from text
  const detectEmotion = (text) => {
    if (!text) return emotions.NEUTRAL;
    
    text = text.toLowerCase();
    
    // Create a score for each emotion
    const scores = Object.entries(emotionKeywords).reduce((acc, [emotion, keywords]) => {
      const score = keywords.reduce((count, keyword) => {
        return text.includes(keyword.toLowerCase()) ? count + 1 : count;
      }, 0);
      acc[emotion] = score;
      return acc;
    }, {});
    
    // Find the emotion with the highest score
    let highestScore = 0;
    let detectedEmotion = emotions.NEUTRAL;
    
    Object.entries(scores).forEach(([emotion, score]) => {
      if (score > highestScore) {
        highestScore = score;
        detectedEmotion = emotion;
      }
    });
    
    return highestScore > 0 ? detectedEmotion : emotions.NEUTRAL;
  };
  
  // Improved language detection: prioritize Hindi/Devanagari, then Hinglish, then English
  const detectLanguage = (text) => {
    if (!text) return 'english';
    // Hindi (Devanagari)
    if (/[\u0900-\u097F]/.test(text)) return 'hindi';
    // Hinglish: mixture of Hindi words in Latin script (basic heuristic)
    // If contains common Hindi words in Latin script and no Devanagari
    const hinglishWords = ['hai', 'kya', 'nahi', 'kaise', 'kyun', 'kyon', 'main', 'tum', 'aap', 'mera', 'mera', 'bhi', 'sab', 'par', 'ke', 'se', 'ko', 'mein', 'hoon', 'ho', 'raha', 'rhi', 'rha', 'tha', 'thi', 'the'];
    const lower = text.toLowerCase();
    if (!/[\u0900-\u097F]/.test(text) && hinglishWords.some(w => lower.split(/\s+/).includes(w))) return 'hinglish';
    // English: only a-z, A-Z, spaces, and common punctuation
    if (/^[a-zA-Z0-9\s.,!?"'()\-]+$/.test(text)) return 'english';
    // Fallback
    return 'english';
  };

  useEffect(() => {
    setMessages([{
      message: selectedLanguage.toLowerCase() === 'hindi' 
        ? "नमस्ते! मैं Konnect हूँ, आपकी सहायता के लिए यहाँ हूँ। मैं आपके प्रश्नों का उत्तर देने के लिए तत्पर हूँ।"
        : "Hi, I'm Konnect! I'm here to help you with any questions you may have about this website.",
      sentTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      sender: "ChatGPT"
    }]);
  }, [selectedLanguage]);

 const fetchElevenLabsTTS = async (text) => {
  try {
    const res = await fetch("http://localhost:3001/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      console.error("Backend TTS failed:", await res.text());
      return;
    }

    const blob = await res.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("TTS Error:", err);
  }
};

  const speakMessage = (text) => {
    if (!isTextToSpeech || !text) return;
    const detectedLang = detectLanguage(text);
    const langToUse = selectedLanguage.toLowerCase();
    console.log("TTS Detected Lang:", detectedLang, "Selected:", langToUse);
    fetchElevenLabsTTS(text, langToUse);
  };

  const handleSend = async (message) => {
    if (!message.trim()) return;
    const detectedLanguage = detectLanguage(message);
    // Always set selectedLanguage to detectedLanguage (Hinglish maps to Hindi)
    setSelectedLanguage(detectedLanguage === 'hinglish' ? 'hindi' : detectedLanguage);
    
    // Detect user emotion from message
    const detectedEmotion = detectEmotion(message);
    setUserEmotion(detectedEmotion);
    
    // Track emotion history (keep last 5 emotions)
    setEmotionHistory(prev => {
      const newHistory = [...prev, detectedEmotion];
      return newHistory.slice(-5); // Keep only the last 5 emotions
    });

    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
      sentTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: "sending",
      emotion: detectedEmotion
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => prev.map((msg, i) => i === prev.length - 1 ? {...msg, status: "sent"} : msg));
    }, 500);

    await processMessageToChatGPT(newMessages, detectedLanguage);
  };

  // Update processMessageToChatGPT to accept detectedLanguage
  const processMessageToChatGPT = async (chatMessages, lastDetectedLang) => {
    try {
      const lastUserMessage = chatMessages[chatMessages.length - 1].message;
      const lastDetectedLang = detectLanguage(lastUserMessage);
      
      // Create emotional context
      const emotionalContext = `The user appears to be feeling ${userEmotion}. ` +
        (emotionHistory.length > 1 ? 
          `Their recent emotional pattern: ${emotionHistory.slice(-5).join(' → ')}. ` : '') +
        `Respond appropriately to their emotional state.`;

      // Always set language system prompt based on detected language
      let languageSystemPrompt = '';
      if (lastDetectedLang === 'hindi' || lastDetectedLang === 'hinglish') {
        languageSystemPrompt = "कृपया केवल हिंदी (देवनागरी) में उत्तर दें।";
      } else if (lastDetectedLang === 'english') {
        languageSystemPrompt = "Please respond only in English.";
      } else {
        languageSystemPrompt = "Please respond in the user's language.";
      }

      const openAIMessages = [
        { role: "system", content: systemContext },
        { role: "system", content: emotionalContext },
        { role: "system", content: languageSystemPrompt },
        ...chatMessages.slice(1).map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.message
        }))
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openAIMessages,
        temperature: 0.7,
      });
      
      const responseText = completion.choices[0]?.message?.content?.trim();
      if (responseText) {
        setMessages([...chatMessages, {
          message: responseText,
          sender: "ChatGPT",
          sentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "received",
          respondingToEmotion: userEmotion, // Track which emotion the bot is responding to
        }]);
        setTimeout(() => speakMessage(responseText), 100);
      } else {
        throw new Error("Empty response from OpenAI API");
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = "I'm sorry, I can't help right now. Please try again later.";
      setMessages([...chatMessages, {
        message: errorMessage,
        sender: "ChatGPT",
        sentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "error"
      }]);
      setTimeout(() => speakMessage(errorMessage), 100);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatbotUI
      messages={messages}
      isTyping={isTyping}
      isTextToSpeech={false} // Always false, disables voice feedback
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSend={handleSend}
      onToggleTextToSpeech={() => {}} // No-op
      onEmojiSelect={emoji => setInputValue(prev => prev + emoji)}
      onClose={() => onClose?.()}
      selectedLanguage={selectedLanguage}
      onLanguageChange={setSelectedLanguage}
      userEmotion={userEmotion}
      emotionHistory={emotionHistory}
    />
  );
};

export default Chatbot;
