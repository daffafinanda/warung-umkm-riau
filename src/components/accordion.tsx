import { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItemProps[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-foreground p-2">
      {items.map((item, index) => (
        <div key={index} className="mb-2">
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 rounded-t-xl ${
              activeIndex === index ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-body-${index}`}
          >
            <span>{item.title}</span>
            <svg
              className={`w-3 h-3 transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
          <div
            id={`accordion-body-${index}`}
            className={`${
              activeIndex === index ? "block" : "hidden"
            } p-5 border border-t-0 rounded-b-xl`}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
