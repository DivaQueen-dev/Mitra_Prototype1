import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CommunitySection from '@/components/CommunitySection';
import CTASection from '@/components/CTASection';
import WhyMitraSection from '@/components/WhyMitraSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhyMitraSection />
        {/* Vision & Mission Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-4 text-gradient">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To make mental health support accessible, stigma-free, and student-first across all educational institutions.
                </p>
              </div>
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-4 text-gradient">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Empowering students with AI-driven psychological and academic assistance tailored to their unique cultural and academic contexts.
                </p>
              </div>
            </div>
          </div>
        </section>
        <CommunitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
