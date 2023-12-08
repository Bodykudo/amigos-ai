'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wand2 } from 'lucide-react';
import { Amigo, Category } from '@prisma/client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Input } from '@/src/components/ui/input';
import { Separator } from '@/src/components/ui/separator';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { useToast } from '@/src/components/ui/use-toast';
import ImageUpload from './ImageUpload';

import { PREAMBLE, SEED_CHAT } from '@/src/lib/constants';

interface AmigoFormProps {
  initialData: Amigo | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  instructions: z.string().min(200, {
    message: 'Instructions requires at least 200 characters.',
  }),
  seed: z.string().min(200, {
    message: 'Seed requires at least 200 characters.',
  }),
  src: z.string().min(1, {
    message: 'Image is required.',
  }),
  categoryId: z.string().min(1, {
    message: 'Category is required.',
  }),
});

export default function AmigoForm({ initialData, categories }: AmigoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      instructions: '',
      seed: '',
      src: '',
      categoryId: undefined,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update companion functionality
        await axios.patch(`/api/amigo/${initialData.id}`, values);
      } else {
        // Create companion functionality
        await axios.post(`/api/amigo`, values);
      }

      toast({
        description: initialData
          ? 'Your amigo has been updated successfully'
          : 'Your amigo has been created successfully',
      });

      router.refresh();
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      });
    }
  };

  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 pb-10'
        >
          <div className='space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium'>General Information</h3>
              <p className='text-sm text-muted-foreground'>
                General information about your Amigo
              </p>
            </div>
            <Separator className='bg-primary/10' />
          </div>
          <FormField
            name='src'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center space-y-4'>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Elon Musk'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This is how your AI Amigo will be named
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='CEO & Founder of Tesla, SpaceX'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Short description of your AI Amigo
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              name='categoryId'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-background'>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    Select a category for your AI Amigo
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium'>Configuration</h3>
              <p className='text-sm text-muted-foreground'>
                Detailed instructions for AI Behavoiur
              </p>
            </div>
            <Separator className='bg-primary/10' />
          </div>

          <FormField
            name='instructions'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-background resize-none'
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Describe in details your amigo&appos;s background and relevant
                  details.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name='seed'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-background resize-none'
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Describe in details your amigo&appos;s background and relevant
                  details.
                </FormDescription>
              </FormItem>
            )}
          />

          <div className='w-full flex justify-center'>
            <Button size='lg' disabled={isLoading}>
              {initialData ? 'Edit your amigo' : 'Create your amigo'}
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
