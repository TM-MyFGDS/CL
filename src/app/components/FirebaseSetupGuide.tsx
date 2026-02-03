import { AlertCircle, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/clipboard';

const FIRESTORE_RULES = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /contentBlocks/{blockId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /guestRegistrations/{registrationId} {
      allow read, write: if true;
    }
    
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`;

export function FirebaseSetupGuide() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(FIRESTORE_RULES);
    if (success) {
      setCopied(true);
      toast.success('Rules copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    } else {
      toast.error('Failed to copy. Please manually select and copy the rules.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-coral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <CardTitle className="text-2xl">Firebase Setup Required</CardTitle>
              <CardDescription className="mt-2">
                Firestore security rules need to be deployed to fix permission errors
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                1
              </div>
              <h3 className="font-semibold">Open Firebase Console</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-10">
              Go to your Firebase project and navigate to <strong>Firestore Database → Rules</strong>
            </p>
            <Button
              variant="outline"
              className="ml-10 mt-2"
              onClick={() => window.open('https://console.firebase.google.com/', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Firebase Console
            </Button>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                2
              </div>
              <h3 className="font-semibold">Copy Firestore Rules</h3>
            </div>
            <div className="ml-10 space-y-2">
              <p className="text-sm text-muted-foreground">
                Copy the security rules below:
              </p>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs border border-border">
                  <code>{FIRESTORE_RULES}</code>
                </pre>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Rules
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                3
              </div>
              <h3 className="font-semibold">Publish Rules</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-10">
              Paste the rules into the Firebase Console editor and click <strong>Publish</strong>
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold">
                4
              </div>
              <h3 className="font-semibold">Refresh This Page</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-10">
              After publishing, refresh this page to continue using CheckinLynk
            </p>
            <Button
              className="ml-10 mt-2"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>

          {/* Info Box */}
          <div className="bg-accent border border-border rounded-lg p-4 ml-10">
            <p className="text-sm text-accent-foreground">
              <strong>Note:</strong> These are development-friendly rules. For production deployment, 
              use the stricter rules in <code className="bg-muted px-1 py-0.5 rounded">/firestore.rules.production</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}