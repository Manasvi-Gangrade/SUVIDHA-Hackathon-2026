import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
}

const Chatbot = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Namaste! I am Sahayak, your virtual assistant. How can I help you today?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to select a Hindi/Indian English voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang.includes('IN') || v.name.includes('India'));
            if (preferredVoice) utterance.voice = preferredVoice;
            window.speechSynthesis.speak(utterance);
        }
    };

    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US'; // Default to English, can be toggleable
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            setIsListening(true);

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                handleSendMessage(undefined, transcript);
                setIsListening(false);
            };

            recognition.onerror = () => {
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        } else {
            alert("Speech recognition is not supported in this browser.");
        }
    };

    const handleSendMessage = (e?: React.FormEvent, overrideText?: string) => {
        e?.preventDefault();
        const textPayload = overrideText || inputText;
        if (!textPayload.trim()) return;

        const userMsg: Message = { id: Date.now(), text: textPayload, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        // Enhanced keyword-based auto-response
        setTimeout(() => {
            let botResponse = "I'm sorry, I didn't quite catch that. Could you please rephrase?";
            const lowerInput = textPayload.toLowerCase();

            // Greetings
            if (lowerInput.match(/\b(hello|hi|namaste|hey|greetings)\b/)) {
                botResponse = "Hello! I am here to assist you with Citizen Services. You can ask me about bills, complaints, or navigation.";
            }
            // Gratitude & Acknowledgement
            else if (lowerInput.match(/\b(thank|thanks|thx|धन्यवाद|shukriya)\b/)) {
                botResponse = "You're very welcome! Let me know if you need help with anything else.";
            }
            else if (lowerInput.match(/\b(okay|ok|kk|done|great|good)\b/)) {
                botResponse = "Great! Is there anything else I can assist you with today?";
            }
            else if (lowerInput.match(/\b(bye|goodbye|see you|tata)\b/)) {
                botResponse = "Goodbye! Have a wonderful day.";
            }
            // Utility Bills
            else if (lowerInput.match(/\b(pay|bill|electricity|water|gas|recharge)\b/)) {
                botResponse = "To pay bills, please visit the 'Departments' section on the Home page and select the relevant utility (Electricity, Water, or Gas).";
            }
            // Complaints
            else if (lowerInput.match(/\b(complaint|grievance|report|issue|broken|help)\b/)) {
                botResponse = "You can register a grievance by clicking the 'Register Complaint' button on the Home dashboard. It takes less than 2 minutes!";
            }
            // Status Tracking
            else if (lowerInput.match(/\b(status|track|application|check)\b/)) {
                botResponse = "To check your application status, use the 'Track Request' feature. You will need your Request ID (e.g., SVD-2024-XXXX).";
            }
            // Admin/Staff
            else if (lowerInput.match(/\b(admin|staff|login|employee)\b/)) {
                botResponse = "Staff login is located at the top-right corner of the header (lock icon). Please use your authorized credentials.";
            }
            // Queue/Token
            else if (lowerInput.match(/\b(token|queue|walk-in|appointment)\b/)) {
                botResponse = "Skip the queue! You can generate a digital token for walk-in services directly from any Department page.";
            }
            // Fallback with options
            else {
                botResponse = "I'm not sure about that. I can help you **Pay Bills**, **Track Requests**, or **Contact Admin**. What would you like to do?";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: "bot" }]);
            speak(botResponse); // Read out the response
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 animate-bounce"
                    aria-label="Open Chatbot"
                >
                    <MessageCircle className="h-7 w-7" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-80 flex flex-col rounded-2xl border border-border bg-card shadow-2xl sm:w-96 h-[500px] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-none">Sahayak</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                                    <span className="text-xs font-medium opacity-90">Online Assistant</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-2 hover:bg-white/20 transition-colors"
                            aria-label="Close Chat"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.sender === "user"
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-card border border-border text-foreground rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={(e) => handleSendMessage(e)} className="border-t border-border p-3 bg-card">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={startListening}
                                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                                title="Speak"
                            >
                                <Mic className="h-4 w-4" />
                            </button>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type or speak..."
                                className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
