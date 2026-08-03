// hooks/useProfileSaver.ts
import { useCallback } from "react";
import { useSaveProfileCollectionMutation, useUpdateProfileMutation } from "../services/candidateprofileApi";
import type { ProfileStepKey } from "../pages/candidate/profile/ProfileStepCards";

type ListStepKey = Extract<ProfileStepKey,
  "skills" | "educations" | "experiences" | "projects" | "certificates" | "achievements" | "languages"
>;

interface UseProfileSaverProps {
  onSuccess: (step: ProfileStepKey, title: string) => void;
  onError: (step: ProfileStepKey, title: string) => void;
  onNavigateNext: () => void;
}

export const useProfileSaver = ({ onSuccess, onError, onNavigateNext }: UseProfileSaverProps) => {
  const [updateProfile] = useUpdateProfileMutation();
  const [saveCollection] = useSaveProfileCollectionMutation();

  const saveStep = useCallback(
    async (step: ProfileStepKey, values: any) => {
      const isList = ["skills", "educations", "experiences", "projects", "certificates", "achievements", "languages"].includes(step);
      const title = step.charAt(0).toUpperCase() + step.slice(1);

      try {
        if (isList) {
          await saveCollection({ section: step as ListStepKey, data: values }).unwrap();
        } else {
          await updateProfile({ section: step, data: values }).unwrap();
        }
        onSuccess(step, title);
        onNavigateNext();
      } catch (err) {
        onError(step, title);
        throw err; // rethrow to let component handle additional UI
      }
    },
    [updateProfile, saveCollection, onSuccess, onError, onNavigateNext]
  );

  return { saveStep };
};