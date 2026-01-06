import { LandingHeader } from '../landing-header';
import { LandingHero } from '../landing-hero';
import { LandingFeatures } from '../landing-features';
import { LandingHowItWorks } from '../landing-how-it-works';
import { LandingCTA } from '../landing-cta';
import { LandingFooter } from '../landing-footer';

export function LandingTracking() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
