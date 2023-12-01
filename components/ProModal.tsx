'use client';

import { useProModal } from '@/hooks/useProModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const proModal = useProModal();
  const { toast } = useToast();

  const onSusbcribe = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <DialogTitle className='text-center'>Upgrade to Pro</DialogTitle>
          <DialogDescription className='text-center space-y-2'>
            Create <span className='text-sky-500 font-medium'>Custom AI</span>{' '}
            Amigos!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between'>
          <p className='text-2xl font-medium'>
            $9<span className='text-sm font-normal'>.99 / mo</span>
          </p>
          <Button onClick={onSusbcribe} disabled={isLoading} variant='premium'>
            Subscripe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
