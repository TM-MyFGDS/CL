import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import type { HostProfile } from "@/lib/firestore";
import { toast } from 'sonner';

interface HostProfileSettingsProps {
  profile: HostProfile;
  userEmail?: string;
  onUpdate: (profile: HostProfile) => void;
}

export function HostProfileSettings({ profile, userEmail, onUpdate }: HostProfileSettingsProps) {
  const [bio, setBio] = useState(profile.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64 for demo purposes
      // In production, upload to Firebase Storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        toast.success('Avatar uploaded successfully');
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast.error('Failed to upload avatar');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload avatar');
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    onUpdate({
      avatarUrl: avatarUrl || undefined,
      bio: bio.trim() || undefined,
    });
    toast.success('Profile updated successfully');
  };

  const getInitials = () => {
    if (!userEmail) return 'H';
    return userEmail.charAt(0).toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Host Profile</CardTitle>
        <CardDescription>
          This information will be visible to your guests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Upload */}
        <div className="space-y-3">
          <Label>Profile Photo</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl} alt="Host avatar" />
              <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={handleAvatarClick}
                disabled={isUploading}
              >
                <Camera className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max 5MB.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-3">
          <Label>Host Bio</Label>
          <Textarea
            placeholder="Tell your guests a bit about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-32 resize-none bg-input-background"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground text-right">
            {bio.length}/500 characters
          </p>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Profile
        </Button>
      </CardContent>
    </Card>
  );
}
