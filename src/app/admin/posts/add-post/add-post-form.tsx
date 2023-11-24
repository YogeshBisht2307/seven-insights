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
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Tag, TagInput } from '@/components/ui/tag-input'
import { Category, MultiSelect } from '@/components/ui/multi-select';

import { AddPostFormProps } from "@/types/props";
import { RichTextEditor } from '@/components/ui/rich-text-editor';


const formSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(5).max(200),
  image: z.array(
    z.any()
  ).refine(data => data.length === 1, {
    message: "You must select exactly one file.",
  }),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string()
    })
  ).refine(data => data.length >= 1, {
    message: "You must select at least one tag.",
  }),
  categories: z.array(
    z.object({
      label: z.string(),
      value: z.string()
    })
  ).refine(data => data.length >= 1, {
    message: "You must select at least one category.",
  }),
  content: z.string().min(20)
})


const AddPostForm = (props: AddPostFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [imageSelected, setImageSelected] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      image: [],
      tags: [],
      categories: [],
      content: "Enter content"
    },
  })

  const selectables = props.categories.map(entity => {
    return { value: entity.id, label: entity.name };
  });

  const { setValue: formSetValue } = form;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setIsSubmitting(false);
    router.refresh();
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    formSetValue("image", files);
    setImageSelected(true);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleImageOnChange = (field: any, event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.files ? [event.target.files[0]] : []);
    setImageSelected(true);
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
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultiSelect
                  {...field}
                  placeholder="Enter Category"
                  selected={categories}
                  className='py-1'
                  setSelected={(categories) => {
                    setCategories(categories);
                    formSetValue("categories", categories as [Category, ...Category[]]);
                  }}
                  selectables={selectables}
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
              <FormControl
                onDrop={(event) => handleDrop(event)}
                onDragOver={(event) => handleDragOver(event)}
                className="flex items-center justify-center w-full">
                <FormLabel htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer">
                  <div
                      className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs">SVG, PNG, JPG or GIF</p>
                      { imageSelected && <div className="pt-4">Selected Image - [ {field.value[0].name} ]</div> }
                    </div>
                  <Input
                    accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                    type="file"
                    id="dropzone-file"
                    className="hidden"
                    onChange={(event) => handleImageOnChange(field, event)}
                  />
                </FormLabel>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor content={field.value} onChange={field.onChange}/>
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