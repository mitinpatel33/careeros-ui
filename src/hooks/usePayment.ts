import { useCallback, useState } from "react";
import type { Billing, PlanId } from "../types/plans";
import { useCreateOrderMutation, useVerifyPaymentMutation, type RazorpaySuccess } from "../services/paymentsApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Razorpay?: any;
  }
}

export type PayStatus =
  | "idle"
  | "creating"
  | "checkout"
  | "verifying"
  | "success"
  | "failed"
  | "cancelled";
export interface PayResult {
  plan: PlanId;
  billing: Billing;
  expiresAt: string;
}

const loadCheckoutScript = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

export const useRazorpay = (
  user: { name: string; email: string; phone?: string },
  onSuccess?: (r: PayResult) => void,
) => {
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [status, setStatus] = useState<PayStatus>("idle");
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<PayResult>();

  const reset = useCallback(() => {
    setStatus("idle");
    setError(undefined);
    setResult(undefined);
  }, []);

  const pay = useCallback(
    async (planId: PlanId, billing: Billing) => {
      setError(undefined);
      setStatus("creating");
      try {
        if (!(await loadCheckoutScript()))
          throw new Error(
            "Could not load Razorpay. Check your internet connection.",
          );
        const order = await createOrder({ planId, billing }).unwrap();
        setStatus("checkout");

        await new Promise<void>((resolve, reject) => {
          let settled = false;
          const done = (fn: () => void) => {
            if (settled) return;
            settled = true;
            fn();
          };

          const rzp = new window.Razorpay({
            key: order.keyId,
            order_id: order.orderId,
            amount: order.amount,
            currency: order.currency,
            name: "Career OS",
            description: order.description,
            prefill: {
              name: user.name,
              email: user.email,
              contact: user.phone,
            },
            theme: { color: "#2563eb" },
            modal: {
              confirm_close: true,
              ondismiss: () =>
                done(() => {
                  setStatus("cancelled");
                  resolve();
                }),
            },
            handler: async (res: RazorpaySuccess) => {
              try {
                setStatus("verifying");
                const verified = await verifyPayment(res).unwrap();
                done(() => {
                  setResult(verified);
                  setStatus("success");
                  onSuccess?.(verified);
                  resolve();
                });
              } catch (e) {
                done(() => reject(e));
              }
            },
          });
          rzp.on("payment.failed", (r: any) =>
            done(() =>
              reject(new Error(r?.error?.description || "Payment failed")),
            ),
          );
          rzp.open();
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Payment failed");
        setStatus("failed");
      }
    },
    [user.name, user.email, user.phone, onSuccess],
  );

  return { pay, status, error, result, reset };
};
