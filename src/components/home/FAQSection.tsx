import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { t } = useLanguage();

  const categories = [
    { key: "All", label: t("category.all") },
    { key: "Testing", label: t("faq.testing") },
    { key: "Nutrition", label: t("category.nutrition") },
    { key: "Exercise", label: t("category.exercise") },
    { key: "Treatment", label: t("faq.treatment") },
  ];

  const faqs = [
    {
      id: "1",
      question: t("faq.q1"),
      answer: t("faq.a1"),
      category: "Testing",
    },
    {
      id: "2",
      question: t("faq.q2"),
      answer: t("faq.a2"),
      category: "Testing",
    },
    {
      id: "3",
      question: t("faq.q3"),
      answer: t("faq.a3"),
      category: "Nutrition",
    },
    {
      id: "4",
      question: t("faq.q4"),
      answer: t("faq.a4"),
      category: "Exercise",
    },
    {
      id: "5",
      question: t("faq.q5"),
      answer: t("faq.a5"),
      category: "Treatment",
    },
    {
      id: "6",
      question: t("faq.q6"),
      answer: t("faq.a6"),
      category: "Exercise",
    },
  ];

  const filteredFaqs = selectedCategory === "All"
    ? faqs
    : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
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
                      {categories.find((c) => c.key === faq.category)?.label}
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
