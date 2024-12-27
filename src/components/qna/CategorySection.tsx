import React, { memo } from "react";
import { Zap } from "lucide-react";
import FAQItem from "./FAQItem";

interface Question {
  question: string;
  answer: string;
}

interface Category {
  category: string;
  questions: Question[];
}

interface CategorySectionProps {
  category: Category;
  categoryIndex: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
}

const CategorySection: React.FC<CategorySectionProps> = memo(
  ({ category, categoryIndex, activeIndex, onToggle }) => (
    <div>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-rich-gold" />
        {category.category}
      </h3>
      <div className="space-y-4">
        {category.questions.map((item, questionIndex) => {
          const index = categoryIndex * 10 + questionIndex;
          return (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              onToggle={onToggle}
            />
          );
        })}
      </div>
    </div>
  ),
);

CategorySection.displayName = "CategorySection";

export default CategorySection;