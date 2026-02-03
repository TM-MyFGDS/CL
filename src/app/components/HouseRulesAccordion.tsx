import { useState } from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '@/app/components/ui/checkbox';
import type { HouseRuleCategory } from "@/lib/firestore";

interface HouseRulesAccordionProps {
  categories: HouseRuleCategory[];
  onRuleToggle: (categoryId: string, ruleId: string, enabled: boolean) => void;
  onRuleVisibilityToggle?: (categoryId: string, ruleId: string, visible: boolean) => void;
  readOnly?: boolean;
}

export function HouseRulesAccordion({ categories, onRuleToggle, onRuleVisibilityToggle, readOnly = false }: HouseRulesAccordionProps) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  // Safety check for undefined or empty categories
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1">
      {categories.map((category) => {
        const isOpen = openCategoryId === category.id;
        // Safety check for category rules
        const rules = category.rules || [];

        return (
          <div
            key={category.id}
            className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/50"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-secondary transition-colors"
            >
              <span className="font-medium text-card-foreground">{category.name}</span>
              <ChevronRight
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? 'rotate-90' : ''
                }`}
              />
            </button>

            {/* Category Content - Sliding Animation */}
            <div
              className={`transition-all duration-200 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-4 py-3 bg-muted/30 space-y-3">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-start gap-3">
                    <Checkbox
                      id={`${category.id}-${rule.id}`}
                      checked={rule.enabled}
                      onCheckedChange={(checked) =>
                        !readOnly && onRuleToggle(category.id, rule.id, checked as boolean)
                      }
                      disabled={readOnly}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={`${category.id}-${rule.id}`}
                      className={`flex-1 text-sm leading-relaxed cursor-pointer ${
                        readOnly ? 'cursor-default' : ''
                      }`}
                    >
                      {rule.text}
                    </label>
                    {!readOnly && onRuleVisibilityToggle && (
                      <button
                        onClick={() => onRuleVisibilityToggle(category.id, rule.id, !rule.visibleToGuest)}
                        className="ml-auto flex-shrink-0 p-1 hover:bg-muted rounded transition-colors"
                        title={rule.visibleToGuest ? 'Visible to guests' : 'Hidden from guests'}
                      >
                        {rule.visibleToGuest ? (
                          <Eye className="h-4 w-4 text-primary" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}