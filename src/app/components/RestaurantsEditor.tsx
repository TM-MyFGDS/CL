import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import type { Restaurant } from "@/lib/firestore";

interface RestaurantsEditorProps {
  restaurants: Restaurant[];
  onChange: (restaurants: Restaurant[]) => void;
}

export function RestaurantsEditor({ restaurants, onChange }: RestaurantsEditorProps) {
  const addRestaurant = () => {
    onChange([...restaurants, { 
      id: Date.now().toString(), 
      name: '', 
      address: '', 
      description: '' 
    }]);
  };

  const removeRestaurant = (id: string) => {
    onChange(restaurants.filter(r => r.id !== id));
  };

  const updateRestaurant = (id: string, field: keyof Restaurant, value: string) => {
    onChange(restaurants.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Restaurants</CardTitle>
        <Button onClick={addRestaurant} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Restaurant
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {restaurants.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No restaurants added yet. Click "Add Restaurant" to start.
          </p>
        )}
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="p-4 border rounded-lg space-y-3 relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => removeRestaurant(restaurant.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={restaurant.name}
                onChange={(e) => updateRestaurant(restaurant.id, 'name', e.target.value)}
                placeholder="Restaurant name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={restaurant.address}
                onChange={(e) => updateRestaurant(restaurant.id, 'address', e.target.value)}
                placeholder="Address"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Why you recommend this place</label>
              <Textarea
                value={restaurant.description}
                onChange={(e) => updateRestaurant(restaurant.id, 'description', e.target.value)}
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
