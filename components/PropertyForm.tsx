'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import { IKContext, IKUpload } from 'imagekitio-react';
import { Loader2, Plus, X } from 'lucide-react';

interface PropertyFormData {
  title: string;
  propertyType: 'Land' | 'House' | 'Flat';
  status: 'ForSale' | 'ForRent';
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  images: string[];
}

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  initialData?: PropertyFormData;
  isLoading?: boolean;
  isEditing?: boolean;
}

const locations = [
  'Victoria Island',
  'Lekki',
  'Ikoyi',
  'Gbagada',
  'Ikeja',
  'Ajah',
  'Surulere',
];

export function PropertyForm({
  onSubmit,
  initialData,
  isLoading = false,
  isEditing = false,
}: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>(
    initialData || {
      title: '',
      propertyType: 'House',
      status: 'ForSale',
      location: '',
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      description: '',
      images: [],
    }
  );

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'bedrooms' || name === 'bathrooms'
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleUploadError = (err: any) => {
    console.error("Upload error:", err);
    setIsUploading(false);
  };

  const handleUploadSuccess = (res: any) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, res.url],
    }));
    setIsUploading(false);
  };

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const removeImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Basic Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Property Title *
            </label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Luxurious 4-Bedroom Apartment in Lekki"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="House">House</option>
                <option value="Land">Land</option>
                <option value="Flat">Flat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="ForSale">For Sale</option>
                <option value="ForRent">For Rent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Location *
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              required
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Price (NGN) *
            </label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 50000000"
              required
            />
          </div>
        </div>
      </Card>

      {/* Specifications */}
      {formData.propertyType !== 'Land' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Specifications
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Bedrooms
              </label>
              <Input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Bathrooms
              </label>
              <Input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Images */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Property Images
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {formData.images.map((url, index) => (
            <div key={index} className="relative group aspect-video bg-muted rounded-lg overflow-hidden border border-border">
              <img src={url} alt={`Property ${index}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <IKContext
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}
            authenticator={async () => {
              const res = await fetch('/api/imagekit-auth');
              return res.json();
            }}
          >
            <label className="flex flex-col items-center justify-center aspect-video bg-muted border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent hover:border-primary transition-all">
              {isUploading ? (
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              ) : (
                <>
                  <Plus className="w-8 h-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-2 font-medium">Add Image</span>
                </>
              )}
              <IKUpload
                className="hidden"
                onError={handleUploadError}
                onSuccess={handleUploadSuccess}
                onUploadStart={handleUploadStart}
              />
            </label>
          </IKContext>
        </div>
      </Card>

      {/* Description */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Description
        </h2>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the property in detail, including location highlights, features, and any special characteristics..."
          rows={6}
          required
        />
      </Card>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isLoading || isUploading}
          className="w-full bg-primary hover:bg-accent text-primary-foreground h-auto py-3 text-lg"
        >
          {isLoading ? (
            'Processing...'
          ) : isEditing ? (
            'Update Property'
          ) : (
            'Create Property'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
