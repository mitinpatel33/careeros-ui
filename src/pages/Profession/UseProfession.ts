import { useCallback, useState } from "react";
import {
  getProfession,
  PROFESSION_STORAGE_KEY,
  type ProfessionId,
} from "./ProfessionConfig";

/** Storage key scoped to the logged-in user so accounts don't share a choice. */
const userScope = (): string => {
  try {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    return String(u.id ?? u.userId ?? u._id ?? u.email ?? "anon");
  } catch {
    return "anon";
  }
};

const keyFor = (scope = userScope()) => `${PROFESSION_STORAGE_KEY}:${scope}`;

/** Call right after login/signup (before navigating). */
export const syncProfessionFromUser = (userData: any) => {
  const scope = String(
    userData?.id ?? userData?.userId ?? userData?._id ?? userData?.email ?? "anon",
  );
  try {
    if (getProfession(userData?.profession)) {
      localStorage.setItem(keyFor(scope), userData.profession);
    }
  } catch {
    /* ignore */
  }
  return Boolean(getProfession(readProfession(scope)));
};

const readProfession = (scope = userScope()): ProfessionId | null => {
  try {
    const v = localStorage.getItem(keyFor(scope));
    return getProfession(v) ? (v as ProfessionId) : null;
  } catch {
    return null;
  }
};

export const useProfession = () => {
  const [profession, setProfessionState] = useState<ProfessionId | null>(() =>
    readProfession(),
  );

  const setProfession = useCallback((id: ProfessionId) => {
    try {
      localStorage.setItem(keyFor(), id);
    } catch {
      /* ignore */
    }
    setProfessionState(id);
    // TODO: persist to backend, e.g. updateCandidateProfession({ profession: id })
  }, []);

  return { profession, setProfession };
};