"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Classes = [
  { label: "Class A", value: "Class A" },
  { label: "Class B", value: "Class B" },
  { label: "Class C", value: "Class C" },
  { label: "Class D", value: "Class D" },
  { label: "Class E", value: "Class E" },
  { label: "Class F", value: "Class F" },
  { label: "Class G", value: "Class G" },
  { label: "Class H", value: "Class H" },
] as const;

const FormSchema = z.object({
  Class: z.string({
    required_error: "Please select the class.",
  }),
});

export function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="Class"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Class</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? Classes.find(
                            (Class) => Class.value === field.value
                          )?.label
                        : "Select Class"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search class..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No classes found.</CommandEmpty>
                      <CommandGroup>
                        {Classes.map((Class) => (
                          <CommandItem
                            value={Class.label}
                            key={Class.value}
                            onSelect={() => {
                              form.setValue("Class", Class.value);
                            }}
                          >
                            {Class.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                Class.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the class that you are attending.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Record Attendance</Button>
      </form>
    </Form>
  );
}
