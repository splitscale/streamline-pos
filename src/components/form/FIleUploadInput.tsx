import { Label } from "@radix-ui/react-label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { excelToJSON } from "~/modules/excelManager";
import _logger from "node_modules/next-auth/utils/logger";
import { useState, ChangeEvent } from "react";

const formSchema = z.object({
  file: z.string(),
});

export interface CallbackValue {
  name: string;
  price: number;
  stock: number;
}

export function FileUploadInput(props: {
  submitCallback: (value: CallbackValue) => void;
}) {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    _logger.debug("Uploading: " + values.file, null);

    if (file === undefined) return;

    const data = await excelToJSON({ arrayBuffer: await file.arrayBuffer() });

    data.forEach((item) => {
      props.submitCallback({
        name: item.name,
        price: item.price,
        stock: item.availableUnits,
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-stretch gap-2"
      >
        <Label htmlFor="file" className="text-base font-semibold text-black">
          Upload an Excel File
        </Label>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full">
                  <Input
                    id="file"
                    type="file"
                    className="w-full rounded-lg bg-gray-200 text-black"
                    {...field}
                    onChange={handleFileChange}
                  />
                  <span className="text-sm text-gray-400">
                    File formats: .xlsx, .xls
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={"default"}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
