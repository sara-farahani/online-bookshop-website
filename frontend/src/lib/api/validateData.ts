import { z, ZodError } from "zod";
import type { ZodRawShape } from "zod";

export function extractParsedData(
  parsedInput: ReturnType<z.ZodTypeAny["safeParse"]>
) {
  let errorMessage: string | undefined, cleanedInput: any;
  if (parsedInput.success) {
    cleanedInput = parsedInput.data;
  } else {
    errorMessage = joinIssueMessages(parsedInput.error);
  }

  return { cleanedInput, errorMessage };
}

export function validateData<T extends z.ZodTypeAny>(
  schema: T,
  input: z.infer<T>
): { cleanedInput: any; errorMessage?: string } {
  const parsedInput = schema.safeParse(input);
  return extractParsedData(parsedInput);
}

export function validateFormData<InputType extends ZodRawShape>(
  FormSchema: z.ZodObject<InputType>,
  formData: FormData
): { cleanedInput: any; errorMessage?: string } {
  for (const [key, value] of formData.entries()) {
  }
  const parsedInput = FormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  return extractParsedData(parsedInput);
}

export function joinIssueMessages(error: ZodError) {
  return error.issues.map((issue) => issue.message).join(" ");
}

export function getAPIErrorMessage(error: any) {
  return (
    error?.response?.data?.detail ||
    error?.message ||
    "خطایی در ارتباط با سرور رخ داده است."
  );
}
