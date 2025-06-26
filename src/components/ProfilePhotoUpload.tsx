
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfilePhotoUploadProps {
  currentPhoto?: string;
  userName: string;
  onPhotoUpdate: (photoUrl: string) => void;
}

const ProfilePhotoUpload = ({ currentPhoto, userName, onPhotoUpdate }: ProfilePhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      onPhotoUpdate(imageUrl);
      
      toast({
        title: 'Profile Photo Updated',
        description: 'Your profile photo has been updated successfully'
      });
      
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
          <AvatarImage src={currentPhoto} alt={userName} />
          <AvatarFallback className="bg-blue-500 text-white text-xl sm:text-2xl">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <Button
          onClick={triggerFileInput}
          disabled={isUploading}
          className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 hover:bg-blue-600 p-0"
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Button
        onClick={triggerFileInput}
        variant="outline"
        disabled={isUploading}
        className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-700"
      >
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Change Photo'}
      </Button>
    </div>
  );
};

export default ProfilePhotoUpload;
