import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TTSContextType {
    speak: (text: string, lang?: string) => void;
    stop: () => void;
    speaking: boolean;
    supported: boolean;
    ttsEnabled: boolean;
    setTtsEnabled: (enabled: boolean) => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export const TTSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [speaking, setSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const { i18n } = useTranslation();
    const location = useLocation();
    const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        if ("speechSynthesis" in window) {
            setSupported(true);
            const updateVoices = () => {
                voicesRef.current = window.speechSynthesis.getVoices();
            };
            window.speechSynthesis.onvoiceschanged = updateVoices;
            updateVoices();
        }
    }, []);

    const speak = useCallback((text: string, lang: string = i18n.language) => {
        if (!supported) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Better voice selection logic
        const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();

        let preferredVoice = null;
        if (lang === "hi" || lang === "mr" || lang === "bn") {
            // Priority 1: Google Hindi/India specific
            preferredVoice = voices.find(v => v.name.includes("Google हिन्दी") || v.name.includes("Lekha") || v.name.includes("Neerja"));

            // Priority 2: Any Indian language voice
            if (!preferredVoice) {
                preferredVoice = voices.find(v => v.lang.includes("IN") || v.name.includes("India"));
            }
        }

        // Fallback to English/default if no specific voice found
        if (!preferredVoice && lang === "en") {
            preferredVoice = voices.find(v => v.lang.startsWith("en-US") || v.name.includes("Google US"));
        }

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [supported, i18n.language]);

    const stop = useCallback(() => {
        if (!supported) return;
        window.speechSynthesis.cancel();
        setSpeaking(false);
    }, [supported]);

    // Auto-read on navigation if enabled
    useEffect(() => {
        if (ttsEnabled && supported) {
            // Small delay to allow page content to update
            const timeoutId = setTimeout(() => {
                const textToRead = document.body.innerText.substring(0, 300).replace(/\n/g, ". ");
                speak(textToRead, i18n.language);
            }, 1000);
            return () => clearTimeout(timeoutId);
        } else {
            stop();
        }
    }, [location.pathname, ttsEnabled, supported, speak, i18n.language, stop]);

    // Global Hover Listener for TTS
    useEffect(() => {
        if (!ttsEnabled || !supported) return;

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Target interactive elements and text blocks
            const interactable = target.closest('button, a, h1, h2, h3, h4, p, li, span');

            if (interactable) {
                // Prioritize aria-label, then alt (for imgs), then text content
                const text = interactable.getAttribute('aria-label') ||
                    interactable.getAttribute('alt') ||
                    (interactable as HTMLElement).innerText;

                if (text && text.trim().length > 0) {
                    // Optimization: Don't read if overly long container
                    if (text.length < 200) {
                        speak(text, i18n.language);
                    }
                }
            }
        };

        const handleMouseOut = () => {
            stop();
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            stop();
        };
    }, [ttsEnabled, supported, speak, stop, i18n.language]);

    return (
        <TTSContext.Provider value={{ speak, stop, speaking, supported, ttsEnabled, setTtsEnabled }}>
            {children}
        </TTSContext.Provider>
    );
};

export const useTTS = () => {
    const context = useContext(TTSContext);
    if (context === undefined) {
        throw new Error("useTTS must be used within a TTSProvider");
    }
    return context;
};
