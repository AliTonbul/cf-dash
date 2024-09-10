import { v4 } from "uuid";
import wretch, { Wretch } from "wretch";
import { WretchError } from "wretch/resolver";
import { ZodSchema } from "zod";

import { useAuth } from "../../hooks/useAuth";

import { SchemaValidationError, schemaValidate } from "./schemaValidate";
import { StrictUnion } from "../types";

type HttpMethod = "get" | "post" | "delete" | "put";

type ApiFetchOptions<T> = {
  basePath?: string;
  method?: HttpMethod;
  body?: object | string;
  noToken?: boolean;
  schema?: ZodSchema<T>;
  headers?: Record<string, string>;
  options?: Record<string, string | AbortSignal | undefined>;
  signal?: AbortSignal;
};

type HandleRequestMethodProps = {
  method: HttpMethod;
  request: Wretch<unknown, unknown, undefined>;
  path: string;
  body?: object | string;
};

const handleRequestMethod = ({
  method,
  request,
  path,
  body,
}: HandleRequestMethodProps) => {
  if (method === "post") {
    return request.post(body, path);
  }
  if (method === "put") {
    return request.put(body, path);
  }
  if (method === "delete") {
    return request.delete(path);
  }
  return request.get(path);
};

export type ApiFetchResponse<T> = StrictUnion<
  | {
      validationError: SchemaValidationError | false;
      data: T;
    }
  | {
      error: WretchError;
      validationError: false;
    }
>;

export const apiFetch = async <T>(
  path: string,
  options?: ApiFetchOptions<T>
): Promise<ApiFetchResponse<T>> => {
  try {
    const data = await wretchRequest(path, options);

    return {
      data,
      validationError: false,
    };
  } catch (error) {
    if (error instanceof WretchError) {
      return { error, validationError: false };
    }

    return { error: new WretchError(), validationError: false };
  }
};

export const wretchRequest = async <T>(
  path: string,
  options?: ApiFetchOptions<T>
): Promise<T> => {
  const method = options?.method ?? "get";

  const { token } = useAuth.getState();

  const request = (() => {
    const wretchInstance = wretch(import.meta.env.VITE_BASE_URL, {
      mode: "cors",
      headers: {
        "X-Request-ID": v4(),
        "Germ-Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...options?.headers,
      },
      ...options?.options,
    });

    return options?.noToken
      ? wretchInstance
      : wretchInstance.auth(`Bearer ${token}`);
  })();

  return await handleRequestMethod({
    request,
    path,
    method,
    body: options?.body,
  })
    .res((response) => {
      const contentType = response.headers.get("content-type");

      if (contentType === null) {
        return response;
      }

      if (contentType.includes("application/json")) {
        return response.json();
      }

      if (contentType.includes("text/plain")) {
        return response.text();
      }

      if (contentType.includes("application/pdf")) {
        return response.blob();
      }

      return response;
    })
    .then((data: T) => {
      if (options?.schema) {
        const validationError = schemaValidate({
          data,
          path,
          schema: options.schema,
        });

        if (validationError) {
          throw validationError;
        }
      }

      return data;
    });
};
