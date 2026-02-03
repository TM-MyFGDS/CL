import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import type { PointOfInterest } from "@/lib/firestore";

interface PointsOfInterestEditorProps {
  pointsOfInterest: PointOfInterest[];
  onChange: (pointsOfInterest: PointOfInterest[]) => void;
}

export function PointsOfInterestEditor({ pointsOfInterest, onChange }: PointsOfInterestEditorProps) {
  const addPointOfInterest = () => {
    onChange([...pointsOfInterest, { 
      id: Date.now().toString(), 
      name: '', 
      address: '', 
      recommendation: '' 
    }]);
  };

  const removePointOfInterest = (id: string) => {
    onChange(pointsOfInterest.filter(p => p.id !== id));
  };

  const updatePointOfInterest = (id: string, field: keyof PointOfInterest, value: string) => {
    onChange(pointsOfInterest.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Points of Interest / Attractions</CardTitle>
        <Button onClick={addPointOfInterest} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Attraction
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {pointsOfInterest.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No attractions added yet. Click "Add Attraction" to start.
          </p>
        )}
        {pointsOfInterest.map((poi) => (
          <div key={poi.id} className="p-4 border rounded-lg space-y-3 relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => removePointOfInterest(poi.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={poi.name}
                onChange={(e) => updatePointOfInterest(poi.id, 'name', e.target.value)}
                placeholder="Attraction name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={poi.address}
                onChange={(e) => updatePointOfInterest(poi.id, 'address', e.target.value)}
                placeholder="Address"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Why you recommend this place</label>
              <Textarea
                value={poi.recommendation}
                onChange={(e) => updatePointOfInterest(poi.id, 'recommendation', e.target.value)}
                placeholder="Describe why guests should visit..."
                rows={2}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
