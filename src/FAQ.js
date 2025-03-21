// src/FAQ.js
import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: "How do I buy a car?",
      answer: "To buy a car, browse our listings, select a car you like, and follow the instructions to complete the purchase."
    },
    {
      question: "How do I sell my car?",
      answer: "To sell your car, create an account, list your car with details and photos, and wait for potential buyers to contact you."
    },
    {
      question:  "Can I schedule a test drive?",
       answer: "Yes, you can coordinate directly with the seller to schedule a test drive before making a purchase."
    },
    {
        question: " How do I know if a car is in good condition?",
        answer:"We recommend reviewing the vehicle's description, checking photos, asking for service history, and getting an independent inspection."
    },
    {
        question:"Is financing available for car purchases?",
        answer:"Some sellers may offer financing options. You can also check with your bank or financing companies."
    },
    {
      question: "Is there a warranty on the cars?",
      answer: "Yes, many of our cars come with a warranty. Please check the individual listing for details."
    },
    {
      question: "Can I return a car after purchase?",
      answer: "Our return policy allows for returns within a specified period. Please refer to our return policy for more details."
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <input
        type="text"
        placeholder="Search FAQs..."
        className="faq-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredFAQs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span className="faq-arrow">{activeIndex === index ? '▲' : '▼'}</span>
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;