const testimonials = [
  {
    initials: 'SM',
    name: 'Sarah M.',
    tier: 'Premium',
    color: 'bg-primary',
    ringColor: 'ring-primary/30',
    quote:
      'Renovo changed the way I think about giving. I can actually see my trees growing and track the CO\u2082 my contributions offset. It feels real.',
  },
  {
    initials: 'JK',
    name: 'James K.',
    tier: 'VIP',
    color: 'bg-accent-warm',
    ringColor: 'ring-accent-warm/30',
    quote:
      'As a company, we needed transparent ESG reporting. Renovo gives us dashboards our board actually trusts — no greenwashing, just data.',
  },
  {
    initials: 'LP',
    name: 'Lina P.',
    tier: 'Base',
    color: 'bg-sdg-14',
    ringColor: 'ring-sdg-14/30',
    quote:
      'I joined as a student on the Base plan and I already feel like part of a real community. Voting on projects every month is so empowering.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-warm py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-3">
          Trusted by Changemakers
        </h2>
        <p className="text-text-secondary text-center mb-10 max-w-xl mx-auto">
          Hear from members who are making a measurable difference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-white rounded-xl p-6 border-l-4 border-primary shadow-md animate-fade-in-up ${i === 1 ? 'animation-delay-100' : i === 2 ? 'animation-delay-200' : ''}`}
            >
              <p className="text-text-primary text-sm italic leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`${t.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-semibold shrink-0 ring-2 ring-offset-2 ${t.ringColor}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.tier} Member</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
