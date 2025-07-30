import { useState } from "react";
import { HomePage } from "@/components/HomePage";
import { PhoneForm } from "@/components/PhoneForm";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "form">("home");

  const handleGetStarted = () => {
    setCurrentView("form");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  if (currentView === "form") {
    return <PhoneForm onBack={handleBackToHome} />;
  }

  return <HomePage onGetStarted={handleGetStarted} />;
};

export default Index;
