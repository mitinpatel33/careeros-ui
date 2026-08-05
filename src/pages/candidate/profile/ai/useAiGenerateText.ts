import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import type { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { aiApi } from "../../../../services/aiApi";

type AppDispatch = ThunkDispatch<unknown, unknown, AnyAction>;

export type AiAction = "generate" | "enhance";

export interface AiGenerateParams {
  action: AiAction;
  fieldType: string;
  currentText?: string;
  tone?: string;
  context?: Record<string, unknown>;
}

interface UseAiGenerateTextOptions {
  /** The endpoint URL (e.g. "/ai/generate-summary") */
  endpoint: string;
  /** Optional custom payload builder – overrides the default one */
  buildPayload?: (params: AiGenerateParams) => any;
}

/**
 * Map URL paths to the actual endpoint names defined in aiApi.
 */
const endpointNameMap: Record<string, keyof typeof aiApi.endpoints> = {
  "/ai/generate-summary": "generateSummary",
  "/ai/enhance-description": "enhanceDescription",
  "/ai/suggest-skills": "suggestSkills",
  "/ai/suggest-social": "suggestSocial",        // fixed typo
  "/ai/suggest-certificate": "suggestCertificates",
};

/**
 * Default payload builder – constructs the request body that matches your backend controllers.
 */
const defaultPayloadBuilder = (endpoint: string, params: AiGenerateParams): any => {
  const { context = {}, currentText, tone, fieldType } = params;

  switch (endpoint) {
    case "/ai/generate-summary":
      return {
        jobTitle: context.jobTitle,
        skills: context.skills,
        experience: context.experience,
      };

    case "/ai/enhance-description":
      return {
        text: currentText,
        // If your backend supports `tone`, uncomment the next line:
        // tone,
      };

    case "/ai/suggest-skills":
      return {
        jobTitle: context.jobTitle,
      };

    case "/ai/suggest-social":
      return {
        jobTitle: context.jobTitle,
      };

    case "/ai/suggest-certificate":
      return {
        jobTitle: context.jobTitle,
        skills: context.skills,
      };

    default:
      // Fallback – send everything (rarely used)
      return { ...context, currentText, tone, fieldType };
  }
};

export function useAiGenerateText({ endpoint, buildPayload }: UseAiGenerateTextOptions) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (params: AiGenerateParams): Promise<string | null> => {
      const endpointName = endpointNameMap[endpoint];
      if (!endpointName) {
        setError(`Unknown endpoint: ${endpoint}`);
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        // Build the payload – use custom builder if provided, otherwise the default one
        const payload = buildPayload
          ? buildPayload(params)
          : defaultPayloadBuilder(endpoint, params);

        // Dispatch the RTK Query mutation
        const action = aiApi.endpoints[endpointName].initiate(payload);
        const result = await dispatch(action).unwrap();

        // Normalize the response – supports multiple possible shapes
        const text: unknown =
          result?.data?.text ??
          result?.data ??
          result?.text ??
          result?.summary ??
          result?.result;

        if (typeof text !== "string" || !text.trim()) {
          throw new Error("AI response was empty or in an unexpected format");
        }

        return text.trim();
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong generating content";
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, dispatch, buildPayload]
  );

  return { generate, loading, error, clearError: () => setError(null) };
}