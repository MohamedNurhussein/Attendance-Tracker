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
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
const FormSchema = z.object({
  Class: z.string({
    required_error: "Please select the class.",
  }),
});

export function ComboboxForm() {
  const {user} = useAuth();
  const [Classes, setClasses] = useState([{ name: "", value: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  // get classes from server side function
  const getClasses = () => {
    //start loading
    setIsLoading(true);
    //fetch classes
    fetch("/.netlify/functions/getClasses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((body) => {
        //get classes from body
        setClasses(body.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getClasses();
  }, []);
  //call markAttendance from server side function
  const markAttendance = (classId:string)=>{
    //start loading
    setIsLoading(true);
    //fetch classes
    fetch("/.netlify/functions/markAttendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        classId:classId,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast("Attendance recorded successfully!", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    markAttendance(data.Class);
  }
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
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
                        ? Classes.find((Class) => Class.value === field.value)
                            ?.name
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
                            value={Class.name}
                            key={Class.value}
                            onSelect={() => {
                              form.setValue("Class", Class.value);
                            }}
                          >
                            {Class.name}
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
