import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Users, Headphones, ArrowRight } from "lucide-react";

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage = ({ onGetStarted }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
            <Headphones className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Agent IVR System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional call management solution for seamless customer interactions. 
            Connect, communicate, and provide exceptional service with our advanced IVR platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-card to-card/80">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Calling</h3>
              <p className="text-muted-foreground">
                Intelligent call routing with advanced IVR capabilities for efficient customer service.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-card to-card/80">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Agent Management</h3>
              <p className="text-muted-foreground">
                Comprehensive agent dashboard with real-time monitoring and performance analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-b from-card to-card/80">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock customer support with automated responses and live agent fallback.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Begin your journey with our powerful IVR system. Make your first call and experience 
                the difference in customer communication.
              </p>
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">5M+</div>
            <div className="text-sm text-muted-foreground">Calls/Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};