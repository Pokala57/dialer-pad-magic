import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, PhoneCall, PhoneOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CountryCode {
  country: string;
  code: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { country: "India", code: "+91", flag: "🇮🇳" },
  { country: "United States", code: "+1", flag: "🇺🇸" },
  { country: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { country: "Canada", code: "+1", flag: "🇨🇦" },
  { country: "Australia", code: "+61", flag: "🇦🇺" },
  { country: "Germany", code: "+49", flag: "🇩🇪" },
  { country: "France", code: "+33", flag: "🇫🇷" },
  { country: "Japan", code: "+81", flag: "🇯🇵" },
  { country: "China", code: "+86", flag: "🇨🇳" },
  { country: "Brazil", code: "+55", flag: "🇧🇷" },
];

interface PhoneFormProps {
  onBack: () => void;
}

export const PhoneForm = ({ onBack }: PhoneFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("+91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleStartCall = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Dummy API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      setIsCallActive(true);
      setIsConnecting(false);
      
      toast({
        title: "Call Connected",
        description: `Connected to ${selectedCountry} ${phoneNumber}`,
      });
      
      console.log("API Call - Start Call:", {
        countryCode: selectedCountry,
        phoneNumber: phoneNumber,
        fullNumber: `${selectedCountry}${phoneNumber}`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setIsConnecting(false);
      toast({
        title: "Call Failed",
        description: "Unable to connect. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEndCall = async () => {
    setIsCallActive(false);
    
    // Dummy API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      toast({
        title: "Call Ended",
        description: "Call has been disconnected",
      });
      
      console.log("API Call - End Call:", {
        countryCode: selectedCountry,
        phoneNumber: phoneNumber,
        fullNumber: `${selectedCountry}${phoneNumber}`,
        timestamp: new Date().toISOString(),
        duration: "Sample duration", // In real app, calculate actual duration
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error ending call",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Agent IVR Call</CardTitle>
          <p className="text-muted-foreground">Enter phone number to start call</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country Code</Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.country}</span>
                      <span className="text-muted-foreground">({country.code})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <div className="px-3 py-2 bg-muted rounded-md border flex items-center">
                <span className="text-sm font-medium">{selectedCountry}</span>
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                className="flex-1"
                disabled={isCallActive}
              />
            </div>
          </div>

          {isCallActive && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
              <div className="text-success font-medium">Call Active</div>
              <div className="text-sm text-muted-foreground mt-1">
                Connected to {selectedCountry} {phoneNumber}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {!isCallActive ? (
              <Button 
                onClick={handleStartCall} 
                disabled={isConnecting}
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                {isConnecting ? "Connecting..." : "Start Call"}
              </Button>
            ) : (
              <Button 
                onClick={handleEndCall}
                variant="destructive"
                className="flex-1"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                End Call
              </Button>
            )}
          </div>

          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-full"
            disabled={isCallActive}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};