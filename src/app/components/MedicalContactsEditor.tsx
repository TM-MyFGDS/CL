import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import type { MedicalContact } from "@/lib/firestore";

interface MedicalContactsEditorProps {
  medicalContacts: MedicalContact[];
  onChange: (medicalContacts: MedicalContact[]) => void;
}

export function MedicalContactsEditor({ medicalContacts, onChange }: MedicalContactsEditorProps) {
  const addMedicalContact = () => {
    onChange([...medicalContacts, { 
      id: Date.now().toString(), 
      name: '', 
      address: '', 
      phone: '' 
    }]);
  };

  const removeMedicalContact = (id: string) => {
    onChange(medicalContacts.filter(m => m.id !== id));
  };

  const updateMedicalContact = (id: string, field: keyof MedicalContact, value: string) => {
    onChange(medicalContacts.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Medical Contacts</CardTitle>
        <Button onClick={addMedicalContact} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Medical Contact
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {medicalContacts.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No medical contacts added yet. Click "Add Medical Contact" to start.
          </p>
        )}
        {medicalContacts.map((medical) => (
          <div key={medical.id} className="p-4 border rounded-lg space-y-3 relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => removeMedicalContact(medical.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={medical.name}
                onChange={(e) => updateMedicalContact(medical.id, 'name', e.target.value)}
                placeholder="Hospital/Clinic name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={medical.address}
                onChange={(e) => updateMedicalContact(medical.id, 'address', e.target.value)}
                placeholder="Address"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                value={medical.phone}
                onChange={(e) => updateMedicalContact(medical.id, 'phone', e.target.value)}
                placeholder="Phone number"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
