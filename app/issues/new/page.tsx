'use client'

import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import axios from "axios"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';



interface IssueForm {
    title: string,
    description: string
}


const NewIssuePage = () => {

    const [errors, setErrors] = useState('')

    const navigate = useRouter()

   const {register, control, handleSubmit} = useForm<IssueForm>()
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
        {errors && (
            <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{errors}</Callout.Text>
            </Callout.Root>)}
        <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder='Title' {...register('title')}/>
        <Controller
        name='description'
        control={control}
        render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
        />
        <Button>Submit New Issue</Button>
    </form>
    </div>
    
  )
}

export default NewIssuePage