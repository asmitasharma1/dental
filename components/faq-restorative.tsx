"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DentalCareFAQ() {
  const faqSections = [
    {
      section: "Dental Fillings and Restorations",
      faqs: [
        {
          question: "What is a dental filling or restoration?",
          answer:
            "A dental filling is a restorative treatment used to repair cavities (tooth decay) or minor damage like cracks, chips, or worn enamel. It restores the tooth’s function, shape, and strength while preventing further decay.",
        },
        {
          question: "Why do you need a dental filling?",
          answer: `
            <ul class="list-disc pl-5">
              <li>Treat cavities caused by tooth decay.</li>
              <li>Repair cracked, broken, or worn-down teeth.</li>
              <li>Replace old or damaged fillings.</li>
              <li>Prevent further decay and infection.</li>
            </ul>
          `,
        },
        {
          question: "What are the types of dental fillings?",
          answer: `
            <ul class="list-disc pl-5">
              <li><strong>Amalgam (Silver) Fillings</strong>: Made of mercury, silver, tin, and copper. Best for back teeth with large cavities. <br><strong>Pros</strong>: Durable (10–15+ years), cost-effective, resists chewing wear. <br><strong>Cons</strong>: Visible, contains mercury (safe per FDA/WHO), requires more tooth removal.</li>
              <li><strong>Composite (Tooth-Colored) Fillings</strong>: Plastic resin and glass/quartz particles. Ideal for front teeth or small-to-medium cavities. <br><strong>Pros</strong>: Matches tooth color, bonds directly (less drilling), good for small repairs. <br><strong>Cons</strong>: Less durable (5–10 years), may stain, slightly more expensive.</li>
              <li><strong>Ceramic (Porcelain) Fillings</strong>: High-strength porcelain. Best for visible teeth or large restorations (e.g., inlays/onlays). <br><strong>Pros</strong>: Stain-resistant, natural-looking, durable (10–15+ years). <br><strong>Cons</strong>: Expensive, often requires multiple visits.</li>
              <li><strong>Glass Ionomer Fillings</strong>: Acrylic and glass powder (fluoride-releasing). Best for baby teeth, small cavities, or temporary fillings. <br><strong>Pros</strong>: Releases fluoride, bonds well. <br><strong>Cons</strong>: Weak (lasts ~5 years), not for high-stress areas.</li>
              <li><strong>Temporary Fillings</strong>: Soft materials (e.g., zinc oxide). Used for short-term protection (e.g., between root canal visits). <br><strong>Lifespan</strong>: Few weeks to months.</li>
            </ul>
            <p>Your dentist will recommend the best option based on cavity size, location, and your preferences.</p>
          `,
        },
        {
          question: "What are the benefits of dental fillings?",
          answer: `
            <ul class="list-disc pl-5">
              <li>Stops tooth decay, preventing bacterial spread.</li>
              <li>Restores tooth function for proper chewing.</li>
              <li>Prevents further damage, avoiding root canals or extractions.</li>
              <li>Improves aesthetics with composite or ceramic fillings, matching natural teeth.</li>
            </ul>
          `,
        },
        {
          question: "What happens if you don’t get a dental filling?",
          answer: `
            Ignoring a cavity can lead to serious issues:
            <ul class="list-disc pl-5">
              <li><strong>Cavity Growth</strong>: Decay spreads to dentin, causing sensitivity, visible holes, or dark spots.</li>
              <li><strong>Infection & Abscess</strong>: Decay reaches the pulp, leading to severe pain, abscess, swelling, or fever. Requires root canal or extraction.</li>
              <li><strong>Tooth Loss</strong>: Advanced decay causes cracks, fractures, or unsaveable teeth, leading to bone loss.</li>
              <li><strong>Infection Spread</strong>: Bacteria may enter the bloodstream, risking sinus infections, heart disease, or sepsis.</li>
              <li><strong>Gum Disease & Bone Damage</strong>: Decay near gums causes periodontitis and jawbone loss.</li>
              <li><strong>Costlier Treatments</strong>: Small fillings escalate to root canals, crowns, implants, or bridges.</li>
              <li><strong>Bad Breath & Aesthetics</strong>: Decay causes halitosis and visible damage, affecting confidence.</li>
            </ul>
          `,
        },
        {
          question: "When is it too late for a filling?",
          answer: `
            It’s too late for a filling if:
            <ul class="list-disc pl-5">
              <li>Pain is constant, indicating nerve infection (requires root canal).</li>
              <li>The tooth is cracked or broken below the gumline (may need extraction).</li>
            </ul>
            <p><strong>What to do instead</strong>: See a dentist ASAP, practice good oral hygiene (brush twice daily, floss, use fluoride toothpaste), and get regular check-ups to catch cavities early.</p>
          `,
        },
        {
          question: "How to make dental restorations last longer?",
          answer: `
            <ul class="list-disc pl-5">
              <li>Maintain excellent oral hygiene: Brush, floss, and use antiseptic mouthwash.</li>
              <li>Attend regular dental check-ups to detect issues early.</li>
              <li>Avoid hard or sticky foods to prevent cracks or dislodging.</li>
              <li>Use a nightguard if you grind your teeth.</li>
              <li>Quit smoking to reduce gum disease and implant failure risks.</li>
            </ul>
          `,
        },
        {
          question: "When should you replace a dental restoration?",
          answer: `
            Replace a restoration if you notice:
            <ul class="list-disc pl-5">
              <li>Pain or sensitivity around the tooth.</li>
              <li>Visible cracks, chips, or wear.</li>
              <li>Loose or broken fillings/crowns.</li>
              <li>Recurrent decay (dark spots near edges).</li>
            </ul>
          `,
        },
        {
          question: "What should you do after getting a filling?",
          answer: `
            <strong>Immediate Aftercare (First 24 Hours):</strong>
            <ul class="list-disc pl-5">
              <li>Wait 30 minutes before eating (for composite fillings).</li>
              <li>Avoid hard, sticky, or chewy foods (e.g., nuts, gum, caramel).</li>
              <li>Avoid very hot or cold foods/drinks if sensitive.</li>
              <li>Don’t smoke or drink alcohol (delays healing).</li>
            </ul>
            <strong>Managing Sensitivity (1–2 Weeks):</strong>
            <ul class="list-disc pl-5">
              <li>Use desensitizing toothpaste (e.g., Sensodyne).</li>
              <li>Avoid extreme temperatures in food/drinks.</li>
              <li>Contact your dentist if pain worsens after 3–4 days or you feel sharp pain when biting.</li>
            </ul>
            <strong>Oral Hygiene:</strong>
            <ul class="list-disc pl-5">
              <li>Brush gently with a soft-bristled toothbrush.</li>
              <li>Floss carefully near the filling.</li>
              <li>Rinse with salt water (1/2 tsp salt + warm water) to soothe gums.</li>
              <li>Avoid alcohol-based mouthwashes for 24 hours.</li>
            </ul>
            <strong>Eating After a Filling:</strong>
            <ul class="list-disc pl-5">
              <li>Eat soft foods (e.g., yogurt, mashed potatoes, soup).</li>
              <li>Stick to room-temperature drinks.</li>
              <li>Avoid hard or sticky foods for 1–2 days.</li>
              <li>Don’t chew directly on new amalgam fillings.</li>
            </ul>
            <strong>Long-Term Care:</strong>
            <ul class="list-disc pl-5">
              <li>Visit the dentist every 6 months.</li>
              <li>Use fluoride toothpaste to prevent new cavities.</li>
              <li>Wear a nightguard if you grind teeth.</li>
              <li>Avoid excessive sugar and acidic drinks (e.g., soda, citrus juice).</li>
            </ul>
            <strong>Emergency Signs:</strong>
            <ul class="list-disc pl-5">
              <li>Severe, throbbing pain (possible nerve issue).</li>
              <li>Filling falls out or cracks.</li>
              <li>Swelling or allergic reaction (rare).</li>
            </ul>
            <p><strong>Tip</strong>: Composite fillings may feel slightly rough at first but smooth out soon. If discomfort persists beyond 2 weeks, see your dentist.</p>
          `,
        },
        {
          question: "How are deep caries managed?",
          answer: `
            Deep caries (decay near the pulp) requires careful treatment to preserve the tooth and avoid root canals.
            <strong>Diagnosis:</strong>
            <ul class="list-disc pl-5">
              <li><strong>Symptoms</strong>: Severe sensitivity to hot/cold/sweet, spontaneous throbbing pain, or visible large cavities.</li>
              <li><strong>Tools</strong>: X-rays and pulp vitality tests (cold/electrical testing).</li>
            </ul>
            <strong>Treatment Goals:</strong>
            <ul class="list-disc pl-5">
              <li>Preserve the pulp to avoid root canals.</li>
              <li>Remove decayed tissue while protecting the pulp.</li>
              <li>Restore the tooth with a filling, crown, or inlay.</li>
            </ul>
            <strong>Treatment Options:</strong>
            <ul class="list-disc pl-5">
              <li><strong>Indirect Pulp Capping (IPC)</strong>: Used when decay is close to but not exposing the pulp, with no constant pain. Most decay is removed, calcium hydroxide or MTA is applied to stimulate dentin repair, and sealed with a temporary filling. Monitored for weeks/months, then replaced with a permanent filling. <br><strong>Success Rate</strong>: ~75–90% if pulp is healthy.</li>
              <li><strong>Direct Pulp Capping (DPC)</strong>: Used for tiny mechanical pulp exposure with no infection. Biocompatible material (MTA or calcium hydroxide) is placed on the pulp, then sealed with a filling or crown.</li>
            </ul>
            <p><strong>Note</strong>: Deep decay doesn’t always require a root canal. Visit your dentist ASAP for the best outcome.</p>
          `,
        },
      ],
    },
    {
      section: "Teeth Scaling and Cleaning",
      faqs: [
        {
          question: "What is teeth scaling/cleaning?",
          answer: `
            Teeth scaling, also known as professional cleaning, removes plaque, tartar (calculus), and stains from teeth. Performed by a dentist or hygienist, it targets hardened plaque that regular brushing can’t remove, helping prevent gum disease (gingivitis, periodontitis) and tooth decay.
          `,
        },
        {
          question: "How much does teeth cleaning cost?",
          answer: `
            The cost for teeth cleaning ranges from NPR 2,000 to NPR 4,500, depending on the amount of plaque, stains, and time required by the dentist.
          `,
        },
        {
          question: "What are the types of dental scaling?",
          answer: `
            <ul class="list-disc pl-5">
              <li><strong>Manual Scaling</strong>: Dentist uses handheld tools (scalers, curettes) to scrape off tartar.</li>
              <li><strong>Ultrasonic Scaling</strong>: Uses a vibrating tool with water irrigation for faster, more efficient cleaning.</li>
            </ul>
          `,
        },
        {
          question: "What are the benefits of dental scaling?",
          answer: `
            <ul class="list-disc pl-5">
              <li><strong>Removes Plaque and Tartar</strong>: Eliminates hardened plaque (calculus) to prevent gum disease.</li>
              <li><strong>Prevents Gum Disease</strong>: Reduces gum inflammation and bleeding, reversing early gingivitis and preventing periodontitis.</li>
              <li><strong>Freshens Breath</strong>: Eliminates bacteria and debris causing bad breath (halitosis).</li>
              <li><strong>Lowers Systemic Disease Risk</strong>: Reduces oral bacteria linked to heart disease, diabetes, and respiratory infections.</li>
              <li><strong>Prevents Tooth Decay</strong>: Removes cavity-causing bacteria, protecting enamel.</li>
              <li><strong>Brightens Teeth</strong>: Removes surface stains from coffee, tea, or tobacco for a whiter appearance.</li>
              <li><strong>Saves Money</strong>: Prevents costly treatments like fillings, root canals, or gum surgery.</li>
              <li><strong>Improves Oral Hygiene</strong>: Encourages better brushing and flossing habits.</li>
            </ul>
            <p>Interested in teeth whitening? <a href="/teeth-whitening" class="text-teal-600 hover:underline">Learn more about teeth whitening or bleaching</a>.</p>
          `,
        },
        {
          question: "What happens if you don’t get teeth scaling every 6 months?",
          answer: `
            Skipping regular scaling can lead to:
            <ul class="list-disc pl-5">
              <li><strong>Gum Disease</strong>: Plaque hardens into tartar, causing gingivitis (reversible) or periodontitis (irreversible bone loss, loose teeth).</li>
              <li><strong>Tooth Decay & Cavities</strong>: Tartar harbors bacteria that erode enamel, leading to cavities and potential root canal needs.</li>
              <li><strong>Bad Breath (Halitosis)</strong>: Bacteria in tartar cause persistent bad breath.</li>
              <li><strong>Tooth Loss</strong>: Severe gum disease destroys bone, leading to tooth loss.</li>
              <li><strong>Systemic Health Risks</strong>: Oral bacteria may contribute to heart disease, diabetes complications, respiratory infections, or pregnancy risks.</li>
              <li><strong>Costly Treatments</strong>: Neglecting scaling leads to expensive procedures like deep cleanings, gum surgery, or dental implants.</li>
            </ul>
          `,
        },
        {
          question: "How often should you get teeth scaling?",
          answer: `
            <ul class="list-disc pl-5">
              <li>Every 6 months for most people.</li>
              <li>Every 3–4 months if you have gum disease or high tartar buildup.</li>
            </ul>
          `,
        },
        {
          question: "What are the signs you need scaling ASAP?",
          answer: `
            <ul class="list-disc pl-5">
              <li>Bleeding gums.</li>
              <li>Persistent bad breath.</li>
              <li>Visible tartar (yellow/brown hard deposits).</li>
              <li>Receding gums or tooth sensitivity.</li>
            </ul>
          `,
        },
        {
          question: "Can scaling make teeth whiter?",
          answer: `
            Scaling removes surface stains from coffee, tea, or smoking, making teeth appear slightly brighter but not dramatically whiter. It doesn’t bleach teeth like whitening treatments. <a href="/teeth-whitening" class="text-teal-600 hover:underline">Click here for teeth whitening or bleaching options</a>.
          `,
        },
        {
          question: "What should you do after teeth scaling?",
          answer: `
            <strong>Right After Scaling (First 24–48 Hours):</strong>
            <ul class="list-disc pl-5">
              <li>Rinse gently with warm salt water (1/2 tsp salt in warm water) to soothe gums.</li>
              <li>Brush softly with a soft-bristled toothbrush (avoid aggressive scrubbing).</li>
              <li>Use fluoride toothpaste to strengthen enamel.</li>
              <li>Floss carefully to avoid irritating tender gums.</li>
              <li>Stay hydrated to flush out bacteria.</li>
              <li>Avoid spicy, acidic, or very hot/cold foods if gums are sensitive.</li>
              <li>Avoid hard or crunchy foods (e.g., chips, nuts) that may irritate gums.</li>
              <li>Avoid smoking or tobacco (delays healing, stains teeth).</li>
              <li>Avoid alcohol-based mouthwashes (can irritate gums).</li>
            </ul>
            <strong>Managing Sensitivity:</strong>
            <ul class="list-disc pl-5">
              <li>Use desensitizing toothpaste (e.g., Sensodyne or Thermoseal) if teeth feel sensitive.</li>
            </ul>
            <strong>Long-Term Care:</strong>
            <ul class="list-disc pl-5">
              <li>Brush twice daily with a soft brush and gentle circular motions.</li>
              <li>Floss daily to prevent plaque buildup between teeth.</li>
              <li>Use antimicrobial mouthwash (e.g., chlorhexidine) if recommended by your dentist.</li>
              <li>Attend regular dental check-ups every 6 months.</li>
            </ul>
          `,
        },
      ],
    },
  ]

  return (
      <section className="py-24 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-4">
            Dental Care FAQs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about dental fillings, restorations, and teeth scaling to keep your smile healthy and bright.
          </p>
        </div>
        <Card className="bg-white rounded-3xl shadow-xl p-8">
          <CardContent>
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.section}</h3>
                <Accordion type="single" collapsible className="w-full">
                  {section.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${sectionIndex}-${index}`} className="border-b border-gray-200">
                      <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-teal-600 py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Have more questions or need dental care? Book an appointment with our expert team today!
              </p>
              <Link href="/book-appointment">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full">
                  Schedule Your Visit
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}