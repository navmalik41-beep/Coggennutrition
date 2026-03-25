import React from 'react';

const StaticPage = ({ title }) => {
  const pageContents = {
    "About Us": (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Engineered for the Elite</h2>
          <p>
            Welcome to <strong className="text-white">Coggen Nutrition</strong>. We started with a simple belief: the sports supplement industry was fundamentally broken. We noticed too many proprietary blends, cheap fillers, and a severe lack of transparency. Our foundation was built to permanently disrupt that standard by crafting absolute pinnacle-tier sports nutrition formulated strictly from scientifically proven, raw ingredients.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Uncompromising Quality</h2>
          <p>
            Every formula that bears the Coggen shield undergoes rigorous, multi-phase clinical testing. We don’t guess. We measure, we verify, and we execute. Our lab-tested, triple-filtered protein matrices and bio-available amino acids ensure that you absorb exactly what you pay for, resulting in explosive power output, sustained anabolism, and rapid tissue recovery.
          </p>
        </div>
        <div>
          <p className="text-xl text-gold-500 font-medium italic border-l-4 border-gold-500 pl-6 my-8">
            "We refuse to cut corners. When you choose Coggen, you are not just consuming a supplement; you are arming your physique with the ultimate biological advantage."
          </p>
          <p>
            We operate out of India, delivering unparalleled athletic nutrition nationwide. Discover what you are truly capable of when there are no weak links in your diet.
          </p>
        </div>
      </div>
    ),
    "Contact": (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">We're Here to Assist You</h2>
          <p>
            Premium nutrition demands elite-level support. Whether you have inquiries concerning specific macro-nutrient breakdowns, require guidance on stacking our formulas for hyper-trophic results, or need immediate assistance with your recent order, the Coggen Nutrition concierge team is standing by.
          </p>
        </div>
        <div className="bg-black/30 p-8 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gold-500">📧</div>
            <div>
              <p className="text-xs uppercase tracking-widest text-textSecondary font-bold">Email Dispatch</p>
              <p className="text-white text-lg font-medium">ayaz09843@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gold-500">📱</div>
            <div>
              <p className="text-xs uppercase tracking-widest text-textSecondary font-bold">Direct WhatsApp</p>
              <p className="text-white text-lg font-medium">+91 7392825062</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gold-500">🏢</div>
            <div>
              <p className="text-xs uppercase tracking-widest text-textSecondary font-bold">Corporate Headquarters</p>
              <p className="text-white text-lg font-medium">Lucknow Road Four-Way, B.M.U. Uttar Pardesh (209868)</p>
            </div>
          </div>
        </div>
        <p className="text-sm border-t border-white/10 pt-6">
          System response times are typically under 4 hours. For critical order modifications, please utilize our integrated WhatsApp channel for real-time adjustments.
        </p>
      </div>
    ),
    "Privacy Policy": (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">1. Data Security Paradigm</h2>
          <p>
            Your bio-data and personal credentials are treated with the exact same strict discipline as our supplement production lines. <strong className="text-white">Coggen Nutrition</strong> only extracts data absolutely necessary to fulfill logistics and personalize your retail experience. We utilize zero-knowledge architectures wherever feasible to isolate your data from external observation.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">2. Zero Tolerance for Data Brokering</h2>
          <p>
            We unequivocally refuse to participate in secondary data markets. Your information, including physical addresses, cellular contacts utilized during our WhatsApp checkout protocols, and payment vectors, will never be sold, leased, or transmitted to third-party ad-networks.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">3. Logistical Processing</h2>
          <p>
            Limited access is granted strictly to our tier-1 courier partners solely for the purpose of executing the delivery of your physical order. Our communication channels are End-to-End Encrypted (E2EE) through the WhatsApp Business API.
          </p>
        </div>
      </div>
    ),
    "Refund Policy": (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">The Coggen Guarantee</h2>
          <p>
            We hold supreme confidence in our engineering. However, in the highly improbable event that a batch does not pass visual inspection upon delivery—due to transit damage, severe clumping, or compromised seals—we instantly accept responsibility. 
          </p>
        </div>
        <div className="bg-gold-500/5 border border-gold-500/20 p-6 rounded-2xl">
          <h3 className="text-gold-500 font-bold mb-3 uppercase tracking-widest">30-Day Window</h3>
          <p className="text-white/90">
            You must initiate a secure ticket with our WhatsApp support system within 30 days of standard delivery. Provide clear photographic evidence of the anomaly, and our team will dispatch a flawless replacement without hesitation.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Biosecurity & Hygiene Constraints</h2>
          <p>
            Due to the strict, FDA-compliant protocols concerning sports nutrition consumables, we cannot legally accept returns on items where the induction seal has been completely punctured or removed. Changing your mind on flavor profiling does not authorize a return. Products must be untampered unless reporting a strictly verified internal imperfection.
          </p>
        </div>
      </div>
    ),
    "Terms of Service": (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Acknowledgment of Terms</h2>
          <p>
             By navigating our digital interface, or utilizing our direct WhatsApp merchant integration, you agree to enter a binding agreement defined by the high standards of <strong className="text-white">Coggen Nutrition</strong>. 
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property & Licensing</h2>
          <p>
             All digital assets, proprietary blends, written protocols, and exact UI aesthetics are strictly protected by intellectual property laws. You are prohibited from crawling, duplicating, or mimicking the Coggen identity for commercial leverage.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Supply & Biological Variations</h2>
          <p>
             In extreme cases of global whey shortage or raw material depletion, we maintain the operational right to swap sizes or offer refunds to match stock realities. Furthermore, results documented on this platform depend heavily on your baseline physiology, training frequency, and caloric intake; supplements are adjuncts, not primary solutions.
          </p>
        </div>
      </div>
    )
  };

  const content = pageContents[title] || (
    <p>Loading information regarding {title}...</p>
  );

  return (
    <div className="min-h-screen relative pt-32 pb-20">
      <div className="bg-layer bg-fitness"></div>
      <div className="overlay-layer"></div>
      <div className="content-layer container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 border-b border-white/10 pb-8">
          <span className="text-gradient">{title}</span>
        </h1>
        <div className="glass-panel p-8 md:p-12 text-textSecondary leading-relaxed space-y-6 text-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
