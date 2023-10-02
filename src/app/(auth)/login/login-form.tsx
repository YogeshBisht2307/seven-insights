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
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(32)
})


const LoginForm = () => {
  const supabase = createClientComponentClient();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { email, password } = values;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: password
    })
  
    setIsSubmitting(false);
    router.refresh();

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="py-6" {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="Enter your password"
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
              Signing
            </Button>
            :
            <Button type="submit" className="w-full">
              Sign In
            </Button>
        }
      </form>
    </Form>
  )
}

export default LoginForm;