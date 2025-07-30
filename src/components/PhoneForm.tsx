import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, PhoneCall, PhoneOff, ArrowLeft, Loader2 } from "lucide-react";
import { useCall } from "@/hooks/useCall";
import { toast } from "sonner";

interface PhoneFormProps {
  onBack: () => void;
}

export const PhoneForm = ({ onBack }: PhoneFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [callDuration, setCallDuration] = useState(0);
  
  const { callData, isLoading, currentCallId, startCall: startCallAPI, endCall: endCallAPI, resetCall } = useCall();

  // Timer for call duration
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (callData.status === 'connected') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callData.status]);

  const handleStartCall = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    await startCallAPI(phoneNumber, countryCode);
  };

  const handleEndCall = async () => {
    await endCallAPI();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Floating wave animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Card className="relative border-0 bg-gradient-to-b from-card/90 to-card/50 backdrop-blur-xl shadow-2xl shadow-primary/20">
          <CardHeader className="text-center relative">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="absolute left-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
              <Phone className="w-10 h-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Agent IVR Call
            </CardTitle>
            <p className="text-muted-foreground text-lg">Enter phone number to start call</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-foreground font-medium">Country Code</Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="bg-secondary/50 border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select country code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">🇮🇳 India (+91)</SelectItem>
                  <SelectItem value="+1">🇺🇸 USA (+1)</SelectItem>
                  <SelectItem value="+44">🇬🇧 UK (+44)</SelectItem>
                  <SelectItem value="+86">🇨🇳 China (+86)</SelectItem>
                  <SelectItem value="+81">🇯🇵 Japan (+81)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="text-lg bg-secondary/50 border-primary/20 focus:border-primary"
                disabled={callData.status === 'connected' || isLoading}
              />
            </div>

            {(callData.status === 'connected' || callData.status === 'calling') && (
              <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {callData.status === 'calling' ? 'Connecting...' : 'Call Active'}
                  </span>
                </div>
                {callData.status === 'connected' && (
                  <>
                    <div className="text-3xl font-mono font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {formatDuration(callDuration)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {countryCode} {phoneNumber}
                    </div>
                  </>
                )}
                {currentCallId && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Call ID: {currentCallId}
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-3">
              {callData.status === 'idle' || callData.status === 'ended' ? (
                <Button 
                  onClick={handleStartCall}
                  className="flex-1 bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-success-foreground shadow-lg shadow-success/30"
                  size="lg"
                  disabled={!phoneNumber.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <PhoneCall className="w-5 h-5 mr-2" />
                  )}
                  Start Call
                </Button>
              ) : (
                <Button 
                  onClick={handleEndCall}
                  className="flex-1 bg-gradient-to-r from-danger to-danger/80 hover:from-danger/90 hover:to-danger/70 text-danger-foreground shadow-lg shadow-danger/30"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <PhoneOff className="w-5 h-5 mr-2" />
                  )}
                  End Call
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Powered by Agent IVR System</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};