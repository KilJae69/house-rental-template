import { FadeIn, FadeInStagger } from "../shared/FadeIn";

export default function PropertyDetailsSection() {
  return (
    <section id="details" className="py-12">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl font-semibold text-[var(--color-primary-dark)] mb-6">
      Property Details
    </h2>
    <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
      {[
        ['Bedrooms', '3'],
        ['Bathrooms', '2'],
        ['Living Area', '1,200 sqft'],
        ['Lot Size', '6,000 sqft'],
        ['Year Built', '2016'],
        ['Stories', '2'],
      ].map(([label, value]) => (
        <FadeIn key={label} className="flex justify-between border-b border-[var(--color-primary-light)] py-2">
          <dt className="font-medium text-[var(--color-text-dark)]">{label}</dt>
          <dd className="text-[var(--color-text-dark)]">{value}</dd>
        </FadeIn>
      ))}
    </FadeInStagger>
  </div>
</section>

  );
  
}