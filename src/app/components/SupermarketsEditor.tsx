import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import type { Supermarket } from "@/lib/firestore";

interface SupermarketsEditorProps {
  supermarkets: Supermarket[];
  onChange: (supermarkets: Supermarket[]) => void;
}

export function SupermarketsEditor({ supermarkets, onChange }: SupermarketsEditorProps) {
  const addSupermarket = () => {
    onChange([...supermarkets, { 
      id: Date.now().toString(), 
      name: '', 
      address: '' 
    }]);
  };

  const removeSupermarket = (id: string) => {
    onChange(supermarkets.filter(s => s.id !== id));
  };

  const updateSupermarket = (id: string, field: keyof Supermarket, value: string) => {
    onChange(supermarkets.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Supermarkets</CardTitle>
        <Button onClick={addSupermarket} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Supermarket
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {supermarkets.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No supermarkets added yet. Click "Add Supermarket" to start.
          </p>
        )}
        {supermarkets.map((supermarket) => (
          <div key={supermarket.id} className="p-4 border rounded-lg space-y-3 relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => removeSupermarket(supermarket.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={supermarket.name}
                onChange={(e) => updateSupermarket(supermarket.id, 'name', e.target.value)}
                placeholder="Supermarket name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={supermarket.address}
                onChange={(e) => updateSupermarket(supermarket.id, 'address', e.target.value)}
                placeholder="Address"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
