import { useState } from 'react';
import { z } from 'zod';

export function useForm<T extends z.ZodType<any, any>>(schema: T) {
  type FormData = z.infer<typeof schema>;
  
  const [data, setData] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path.join('.')] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const setValue = (field: keyof FormData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  };

  return {
    data,
    errors,
    setValue,
    validate,
    setData,
  };
}