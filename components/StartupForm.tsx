'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");

    // const {toast} = useToast();

    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title : formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }
            await formSchema.parseAsync(formValues);
            console.log(formValues)

            // const results = await createIdea(prevState, formData, pitch)l

            // console.log(results);

            // if(result.status == 'SUCCESS') {
            //     toast ({
            //         title:'Success',
            //         description: 'Your startup has been created.'
            //     })

            

            // router.push(`/startup/${result.id}`);
            // }
            // return result;

        } catch (error) {
            if(error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);

                toast({
                    title: 'Error',
                    description: 'Please check your inputs',
                    variant: 'destructive'
                })
                return {...prevState, error: "Validation failed", status: 'ERROR'}
            }

            toast({
                title: 'Error',
                description: 'Please check your inputs',
                variant: 'destructive'
            })
            return {
                ...prevState,
                error: "Something went wrong",
                status: 'ERROR'
            }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {error: "",
            status: 'INITIAL'
        }
    );

   
        return (
        <form action={() => {formAction}} className='max-w-2xl mx-auto bg-white my-10 space-y-8 px-6'>

            <div>
                <label htmlFor="title"
                    className='font-bold text-[18px] text-black uppercase'>
                    Title
                </label>
                <Input
                    id='title'
                    name='title'
                    className='border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 '
                    required
                    placeholder='Startup Title'
                />

                {errors.title && <p className='text-red-500 mt-2 ml-5'>{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description"
                    className='font-bold text-[18px] text-black uppercase'>
                    Description
                </label>
                <Textarea
                    id='title'
                    name='title'
                    className='border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300 '
                    required
                    placeholder='Startup Title'
                />

                {errors.description && <p className='text-red-500 mt-2 ml-5'>
                    {errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category"
                    className='font-bold text-[18px] text-black uppercase'>
                    Category
                </label>
                <Input
                    id=''
                    name='title'
                    className='border-[3px] border-black px-5 py-7 text-[18px]
                    text-black font-semibold rounded-full mt-3 
                    placeholder:text-black-300 '
                    required
                    placeholder='Startup Category(Tech, Health, Education...) '
                />

                {errors.category && <p className='text-red-500 mt-2 ml-5'>{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link"
                    className='font-bold text-[18px] text-black uppercase'>
                    Image URL
                </label>
                <Textarea
                    id='link'
                    name='link'
                    className='border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300'
                    required
                    placeholder='Startup Image URL'
                />

                {errors.link && <p className='text-red-500 mt-2 ml-5'>
                    {errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch"
                    className='font-bold text-[18px] text-black uppercase'>
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id='pitch'
                    preview='edit'
                    height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder:
                            'Briefly describe your startup and what makes it unique',
                    }}
                    previewOptions={{
                        disallowedElements: ['style']
                    }}
                />

                {errors.pitch && <p className='text-red-500 mt-2 ml-5'>
                    {errors.pitch}</p>}
            </div>

            <Button type='submit' className='bg-[#EE2B69] border-[4px] text-white border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px]' disabled={isPending}>
                {isPending? 'Submitting...': 'Submit'}
                <Send className='size-6 ml-2'/>
            </Button>
        </form>
    )
}

export default StartupForm
