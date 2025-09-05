import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQ() {
  const faqs = [
    { question: 'What is WaliinInvestment?', answer: 'WaliinShare is a platform that allows users to buy, sell, and transfer company shares digitally.' },
    { question: 'How do I purchase shares?', answer: 'Simply sign up, select the number of shares, and choose your preferred payment method including Stripe, PayPal, Telebirr, or manual.' },
    { question: 'Can I transfer shares to someone else?', answer: 'Yes, you can transfer shares to anyone who also has a WaliinShare account. Just provide their email and other required details.' },
    { question: 'Is my payment secure?', answer: 'Yes, all payments are encrypted and processed through secure payment gateways with additional admin verification for manual methods.' },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAnswer = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-slate-950 text-gray-800 dark:text-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-200">Frequently Asked Questions</h1>
      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 shadow-md rounded-md p-4 cursor-pointer transition hover:shadow-lg border border-transparent dark:border-slate-800"
            onClick={() => toggleAnswer(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#16896D]">{faq.question}</h2>
              {openIndex === index ? (
                <FaChevronUp className="text-gray-600 dark:text-gray-300" />
              ) : (
                <FaChevronDown className="text-gray-600 dark:text-gray-300" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
