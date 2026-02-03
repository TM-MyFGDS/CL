import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import type { EmergencyContact } from "@/lib/firestore";

interface EmergencyContactsEditorProps {
  contacts: EmergencyContact[];
  onChange: (contacts: EmergencyContact[]) => void;
  readOnly?: boolean;
}

export function EmergencyContactsEditor({ contacts, onChange, readOnly = false }: EmergencyContactsEditorProps) {
  const addContact = () => {
    onChange([...contacts, { name: '', phone: '', role: '', visibleToGuest: true }]);
  };

  const updateContact = (index: number, field: keyof EmergencyContact, value: string | boolean) => {
    const updated = [...contacts];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeContact = (index: number) => {
    onChange(contacts.filter((_, i) => i !== index));
  };

  // Ensure minimum 1 row
  const displayContacts = contacts.length === 0 ? [{ name: '', phone: '', role: '', visibleToGuest: true }] : contacts;

  return (
    <div className="space-y-3">
      {displayContacts.map((contact, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-3 p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors relative"
        >
          {!readOnly && contacts.length > 0 && index < contacts.length && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeContact(index)}
              className="absolute top-2 right-2 h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="Contact Name"
                value={contact.name || ''}
                onChange={(e) => {
                  if (index < contacts.length) {
                    updateContact(index, 'name', e.target.value);
                  } else {
                    onChange([...contacts, { name: e.target.value, phone: '', role: '', visibleToGuest: true }]);
                  }
                }}
                disabled={readOnly}
                className="bg-input-background"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                placeholder="Phone Number"
                value={contact.phone || ''}
                onChange={(e) => {
                  if (index < contacts.length) {
                    updateContact(index, 'phone', e.target.value);
                  } else {
                    onChange([...contacts, { name: '', phone: e.target.value, role: '', visibleToGuest: true }]);
                  }
                }}
                disabled={readOnly}
                className="bg-input-background"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Role / Description (optional)</label>
            <Input
              placeholder="Role / Description (optional)"
              value={contact.role || ''}
              onChange={(e) => {
                if (index < contacts.length) {
                  updateContact(index, 'role', e.target.value);
                } else {
                  onChange([...contacts, { name: '', phone: '', role: e.target.value, visibleToGuest: true }]);
                }
              }}
              disabled={readOnly}
              className="bg-input-background"
            />
          </div>
        </div>
      ))}

      {!readOnly && (
        <Button
          variant="outline"
          onClick={addContact}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      )}
    </div>
  );
}