"use client";

import React from 'react';
import * as z from "zod";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Tag, TagInput } from '@/components/ui/tag-input'

import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(5).max(200),
  image: z.any(),
  tags: z.array(z.object({
    id: z.string(),
    text: z.string()
  }))
})


const AddPostForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = React.useState<Tag[]>([]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      image: null,
    },
  })

  const { setValue: formSetValue } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { title, slug } = values;

    setIsSubmitting(false);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter title"
                  className="py-6" {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter slug"
                  className="py-6" {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder="Enter tags"
                  tags={tags}
                  className='py-6'
                  setTags={(newTags) => {
                    setTags(newTags);
                    formSetValue("tags", newTags as [Tag, ...Tag[]]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl className="flex items-center justify-center w-full">
                <FormLabel htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs">SVG, PNG, JPG or GIF</p>
                  </div>
                  <Input
                    accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                    type="file"
                    id="dropzone-file"
                    className="hidden"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormLabel>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          isSubmitting ?
            <Button className="w-full" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </Button>
            :
            <Button type="submit" className="w-full">
              Submit
            </Button>
        }
      </form>
    </Form>
  )
}

export default AddPostForm;