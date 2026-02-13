'use client';

import { useState } from 'react';

import { FAQ } from '../data';
import { ChevronDown } from 'lucide-react';

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="space-y-8">
      <p className="font-medium">Frequently Asked Questions</p>

      <ul className="space-y-16 text-sm">
        {FAQ.map((faq, i) => (
          <li className="space-y-4" key={i}>
            <div className="text-primary">{faq.title}</div>

            {faq.faqs.map((item, j) => {
              return (
                <div
                  className="rounded-2xl border border-border p-4 bg-foreground-200"
                  key={j}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === j ? null : j)}
                    className="flex w-full items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-medium text-primary-text-100 text-sm">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        activeIndex === j ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {activeIndex === j && item.answer && (
                    <p className="mt-4 text-sm text-neutral-500 overflow-hidden">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </li>
        ))}
      </ul>
    </section>
  );
}
