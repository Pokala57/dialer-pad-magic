import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Users, Headphones, ArrowRight } from "lucide-react";

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage = ({ onGetStarted }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating wave animation similar to Vaanee */}
        <div className="absolute left-0 top-1/4 w-full h-1 bg-gradient-wave opacity-30 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mb-8 shadow-2xl shadow-primary/30">
            <Headphones className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Agent IVR System
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional call management solution for seamless customer interactions. 
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
              Multilingual. Hyper-Realistic. Enterprise.
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-0 bg-gradient-to-b from-card/90 to-card/50 backdrop-blur-xl hover:scale-105">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Phone className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Smart Calling</h3>
              <p className="text-muted-foreground leading-relaxed">
                Intelligent call routing with advanced IVR capabilities for efficient customer service and real-time analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-0 bg-gradient-to-b from-card/90 to-card/50 backdrop-blur-xl hover:scale-105">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Agent Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive agent dashboard with real-time monitoring, performance analytics, and quality assurance.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-0 bg-gradient-to-b from-card/90 to-card/50 backdrop-blur-xl hover:scale-105">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Headphones className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">24/7 Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Round-the-clock customer support with automated responses, live agent fallback, and multi-language capabilities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-3xl mx-auto border-0 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl shadow-2xl shadow-primary/20">
            <CardContent className="p-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Ready to Get Started?
                </span>
              </h2>
              <p className="text-muted-foreground mb-10 text-xl leading-relaxed max-w-2xl mx-auto">
                Begin your journey with our powerful IVR system. Make your first call and experience 
                the difference in customer communication with enterprise-grade reliability.
              </p>
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-8 text-xl font-semibold rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 transform hover:scale-110"
              >
                Get Started
                <ArrowRight className="w-6 h-6 ml-3" />
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