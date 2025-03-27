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
  CommandItem as OriginalCommandItem,
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

// Extend the CommandItem props to include the "value" prop.
interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onSelect: () => void;
  children: React.ReactNode;
}

// Cast the imported CommandItem to our extended type.
const CommandItem = OriginalCommandItem as React.FC<CommandItemProps>;

const FormSchema = z.object({
  Class: z.string({
    required_error: "Please select the class.",
  }),
});

export function ComboboxForm({
  onAttendanceRecorded,
}: {
  onAttendanceRecorded: () => void;
}) {
  const { user } = useAuth();
  const [Classes, setClasses] = useState([{ name: "", value: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Fetch classes from the server side function.
  const getClasses = () => {
    setIsLoading(true);
    fetch("/.netlify/functions/getClasses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((body) => {
        setClasses(body.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getClasses();
  }, []);

  // Call markAttendance from the server side function.
  const markAttendance = (classId: string) => {
    setIsLoading(true);
    fetch("/.netlify/functions/markAttendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.uid,
        classId: classId,
      }),
    })
      .then((response) => {
        response.json();
        onAttendanceRecorded();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Attendance recorded successfully!");
    markAttendance(data.Class);
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-blue-500 border-blue-200"></div>
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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
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
                              setOpen(false);
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
                This is the class you are attending
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
