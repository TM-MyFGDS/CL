import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import type { Bar } from "@/lib/firestore";

interface BarsEditorProps {
  bars: Bar[];
  onChange: (bars: Bar[]) => void;
}

export function BarsEditor({ bars, onChange }: BarsEditorProps) {
  const addBar = () => {
    onChange([...bars, { 
      id: Date.now().toString(), 
      name: '', 
      address: '' 
    }]);
  };

  const removeBar = (id: string) => {
    onChange(bars.filter(b => b.id !== id));
  };

  const updateBar = (id: string, field: keyof Bar, value: string) => {
    onChange(bars.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bars & Cafes</CardTitle>
        <Button onClick={addBar} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Bar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {bars.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No bars added yet. Click "Add Bar" to start.
          </p>
        )}
        {bars.map((bar) => (
          <div key={bar.id} className="p-4 border rounded-lg space-y-3 relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => removeBar(bar.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={bar.name}
                onChange={(e) => updateBar(bar.id, 'name', e.target.value)}
                placeholder="Bar/Cafe name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={bar.address}
                onChange={(e) => updateBar(bar.id, 'address', e.target.value)}
                placeholder="Address"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
