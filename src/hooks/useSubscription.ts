import { useCallback } from "react";
import { useGetMySubscriptionQuery, type MySubscription, type PaymentRecord } from "../services/paymentsApi";
import type { PlanId } from "../types/plans";

export const useSubscription = () => {
  const { data, isLoading, refetch } = useGetMySubscriptionQuery();
  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const sub: MySubscription | undefined = data?.subscription;
  const payments: PaymentRecord[] = data?.payments ?? [];
  const plan: PlanId = sub?.plan ?? "free";
  return { sub, plan, payments, loading: isLoading, refresh };
};
