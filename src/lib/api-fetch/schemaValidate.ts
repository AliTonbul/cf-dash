import {
  ZodError,
  ZodIssue,
  ZodSchema,
  typeToFlattenedError,
  ZodIssueCode,
} from "zod";

import { tracking } from "../tracking";

export class SchemaValidationError extends Error {
  constructor(
    path: string,
    public schemaError: typeToFlattenedError<
      unknown,
      {
        message: string;
        errorCode?: ZodIssueCode;
        path?: (string | number)[];
      }
    >
  ) {
    super(path);
    this.name = "SchemaValidationError";
  }
}

export type SchemaValidateProps<T> = {
  data: T;
  path: string;
  schema: ZodSchema<T>;
};
export const schemaValidate = <T>({
  data,
  path,
  schema,
}: SchemaValidateProps<T>): SchemaValidationError | false => {
  try {
    schema.parse(data);
    return false;
  } catch (error) {
    if (error instanceof ZodError) {
      const flattenedError = error.flatten((issue: ZodIssue) => ({
        message: issue.message,
        errorCode: issue.code,
        path: issue.path,
      }));

      const validationError = new SchemaValidationError(path, flattenedError);
      tracking(error, {
        extra: {
          path,
          flattenedError,
        },
      });
      return validationError;
    }
    throw error as Error;
  }
};
