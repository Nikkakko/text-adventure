"use client";
import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { formSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
// import { createChatAction } from "../../../convex/chat";

interface StartChatProps {}

const StartChat: React.FC<StartChatProps> = ({}) => {
  const handlePlayerAction = useAction(api.chat.handlePlayerAction);
  const [isPending, startTransition] = React.useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    startTransition(async () => {
      await handlePlayerAction({ message: values.message });

      form.reset();
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-secondary">
                Enter your message
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default StartChat;
