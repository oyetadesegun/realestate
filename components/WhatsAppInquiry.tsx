'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppInquiryProps {
  propertyTitle: string;
  propertyId: number;
  className?: string;
}

export function WhatsAppInquiry({ propertyTitle, propertyId, className = '' }: WhatsAppInquiryProps) {
  const handleWhatsAppClick = () => {
    const phoneNumber = '2349068465685'; // Updated WhatsApp number
    const message = encodeURIComponent(
      `Hi Plus S+GN, I'm interested in learning more about the property "${propertyTitle}" (ID: ${propertyId}). Could you provide me with more details?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant="outline"
      className={`w-full h-auto py-2 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 flex items-center justify-center gap-2 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Make an Inquiry via WhatsApp
    </Button>
  );
}
