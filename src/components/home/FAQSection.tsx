import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = ["All", "Testing", "Nutrition", "Exercise", "Treatment"];

const faqs = [
  {
    id: "1",
    question: "What is a T-score and what does it mean?",
    answer: "A T-score compares your bone density to that of a healthy 30-year-old adult. A T-score of -1.0 or above is normal, between -1.0 and -2.5 indicates osteopenia (low bone mass), and -2.5 or below indicates osteoporosis.",
    category: "Testing",
  },
  {
    id: "2",
    question: "How often should I get a bone density test?",
    answer: "The frequency depends on your risk factors and previous test results. Generally, women over 65 and men over 70 should get tested every 1-2 years. Those with osteoporosis or high risk factors may need more frequent testing.",
    category: "Testing",
  },
  {
    id: "3",
    question: "What foods are best for bone health?",
    answer: "Calcium-rich foods like dairy products, leafy greens, and fortified foods are essential. Vitamin D sources include fatty fish and fortified foods. Also important are protein, vitamin K (found in green vegetables), and minerals like magnesium and zinc.",
    category: "Nutrition",
  },
  {
    id: "4",
    question: "What exercises help prevent osteoporosis?",
    answer: "Weight-bearing exercises like walking, jogging, and dancing, along with resistance training, are most beneficial. Balance exercises like tai chi can help prevent falls. Aim for at least 30 minutes of exercise most days of the week.",
    category: "Exercise",
  },
  {
    id: "5",
    question: "Are there medications for osteoporosis?",
    answer: "Yes, several medications are available including bisphosphonates, denosumab, and hormone-related therapies. Your doctor will recommend the best option based on your bone density, fracture risk, and overall health.",
    category: "Treatment",
  },
  {
    id: "6",
    question: "How can I prevent falls at home?",
    answer: "Remove tripping hazards, install grab bars in bathrooms, ensure good lighting, wear non-slip footwear, and keep frequently used items within easy reach. Regular balance exercises also help prevent falls.",
    category: "Exercise",
  },
];

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = selectedCategory === "All"
    ? faqs
    : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about bone health, osteoporosis, 
            and managing your condition.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card rounded-lg border border-border px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <div className="flex items-start gap-3">
                    <span className="font-medium text-foreground">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-xs px-2 py-0.5 bg-accent rounded text-accent-foreground">
                      {faq.category}
                    </span>
                  </div>
                  <p className="mt-2">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
