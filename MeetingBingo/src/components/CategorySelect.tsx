import type { CategoryId } from '../types';
import { categories } from '../data/categories';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface CategorySelectProps {
  onSelect: (id: CategoryId) => void;
  onBack: () => void;
}

export function CategorySelect({ onSelect, onBack }: CategorySelectProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-text-primary">Choose Your Pack</h2>
          <p className="text-text-secondary">Pick a buzzword category for your bingo card</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card key={cat.id} onClick={() => onSelect(cat.id)} className="hover:border-accent-blue">
              <div className="text-center space-y-3">
                <div className="text-4xl">{cat.icon}</div>
                <h3 className="text-xl font-semibold text-text-primary">{cat.name}</h3>
                <p className="text-sm text-text-secondary">{cat.description}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {cat.words.slice(0, 5).map((word) => (
                    <span key={word} className="text-xs bg-gray-100 text-text-secondary px-2 py-0.5 rounded-full">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
