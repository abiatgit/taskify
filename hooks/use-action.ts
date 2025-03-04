import { useState, useCallback } from "react";
import { ActionState, fieldErrors } from "@/lib/create-safe-action";

export type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}
export const UseAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  option: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    fieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          option.onError?.(result.error)
        }
        if (result.data) {
          setData(result.data);
          option.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);

        option.onComplete?.();
      }
    },
    [action, option]
  );
  return {
    execute,

    fieldErrors,
    error,
    data,
    isLoading,
  };
};
