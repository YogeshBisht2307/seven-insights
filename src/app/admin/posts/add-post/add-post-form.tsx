"use client";

import * as z from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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


const formSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(5).max(200)
})


const AddPostForm = () => {
  const supabase = createClientComponentClient();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: ""
    },
  })

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
                  placeholder="Enter post title"
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
                  placeholder="Enter post slug"
                  className="py-6" {...field}
                />
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