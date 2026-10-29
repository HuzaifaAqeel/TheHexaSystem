import { CTA, Eyebrow } from './Design';
import { ReelBand } from './HeroReel';

export default function ServiceCarousel() {
  return <section className="hx-section hx-services-showcase"><div className="hx-container hx-heading" data-reveal><Eyebrow>OUR SERVICES</Eyebrow><h2>From the first click to the final conversation,<br /><em>make every step count.</em></h2><p>Your website, marketing, follow-up and customer conversations should work together, not compete for your time.</p></div><ReelBand label="Services carousel" linked /><div className="hx-carousel-bottom hx-container" style={{ justifyContent: 'center' }}><CTA to="/services">Explore Our Services</CTA></div></section>;
}
