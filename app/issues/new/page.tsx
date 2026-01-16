'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import axios from "axios"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';




type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {

    const [error, setErrors] = useState('')

    const navigate = useRouter()

   const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
      resolver: zodResolver(createIssueSchema)
   })
//    console.log(control)

   const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
        await axios.post('/api/issues', data)
        toast.success('Issue created successfully!')
        navigate.push('/issues')
    } catch (error:any) {
        setErrors("Please fill the title and description")
    }   
   }

  return (
    <div className='max-w-xl '>
        {error && (
            <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>)}
        <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder='Title' {...register('title')}/>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller
        name='description'
        control={control}
        render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
        />
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
        <Button>Submit New Issue</Button>
    </form>
    </div>
    
  )
}

export default NewIssuePage