import { ArrowLeft, Home, Globe, Volume2, VolumeX, Lock, Sun, Cloud } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useTTS } from "@/hooks/useTTS";

const KioskHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { speak, stop, speaking, supported, ttsEnabled, setTtsEnabled } = useTTS();

  // Time and Weather State
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = currentTime.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });

  const isHome = location.pathname === "/";

  const toggleLanguage = () => {
    const langs = ["en", "hi", "mr", "bn"];
    // Use resolvedLanguage to handle regional variants (e.g., en-US -> en)
    const currentLang = i18n.resolvedLanguage || i18n.language || "en";
    const currentIdx = langs.indexOf(currentLang);

    // If not found (e.g. some unexpected locale), default to en (0)
    const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % langs.length;
    const nextLang = langs[nextIdx];

    i18n.changeLanguage(nextLang);
  };

  const getLangLabel = (lang: string) => {
    switch (lang) {
      case "hi": return "हिंदी";
      case "mr": return "मराठी";
      case "bn": return "বাংলা";
      default: return "EN";
    }
  };

  const toggleTTS = () => {
    if (ttsEnabled) {
      setTtsEnabled(false);
      stop();
    } else {
      setTtsEnabled(true);
      // Read the current page title or summary immediately
      const textToRead = document.body.innerText.substring(0, 200);
      speak(textToRead, i18n.language);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="kiosk-touch-target flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 rounded-lg py-2 transition-colors hover:bg-muted"
          >
            <div className="hidden h-10 w-10 md:flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-md">
              <span className="text-xl font-bold text-primary-foreground">S</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-foreground tracking-tight leading-none">{t("appTitle")}</span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider hidden sm:block">Citizen Connect Hub</span>
            </div>
          </button>

          {/* New Header Feature: Live Info Widget */}
          <div className="hidden lg:flex items-center gap-4 ml-6 border-l border-border pl-6">
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-foreground">{timeString}</span>
              <span className="text-[10px] text-muted-foreground">{dateString}</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/10 px-2 py-1 rounded-md">
              <Sun className="h-4 w-4 text-orange-500" />
              <span className="text-xs font-medium text-foreground">28°C</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 mr-2">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">New Delhi, IN</span>
          </div>

          <button
            onClick={toggleLanguage}
            className="kiosk-touch-target flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Globe className="h-4 w-4 text-primary" />
            <span className="font-semibold">{getLangLabel(i18n.resolvedLanguage || i18n.language || "en")}</span>
          </button>

          {supported && (
            <button
              onClick={toggleTTS}
              className={`kiosk-touch-target flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${ttsEnabled ? "text-primary animate-pulse border border-primary/20 bg-primary/5" : "text-muted-foreground"}`}
            >
              {ttsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          )}

          <button
            onClick={() => navigate("/admin/login")}
            className="kiosk-touch-target flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Staff Login"
          >
            <Lock className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default KioskHeader;
