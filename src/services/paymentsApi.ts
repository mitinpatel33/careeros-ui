import type { Billing, PlanId } from "../types/plans";
import { api } from "./api";

export interface OrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  description: string;
}

export interface RazorpaySuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyResponse {
  plan: PlanId;
  billing: Billing;
  expiresAt: string;
}

export interface MySubscription {
  plan: PlanId;
  billing?: Billing;
  status: "active" | "expired";
  expiresAt?: string;
}

export interface PaymentRecord {
  orderId: string;
  paymentId?: string;
  plan: PlanId;
  billing: Billing;
  amount: number;
  status: "paid" | "failed";
  paidAt?: string;
  createdAt: string;
}

export interface MyPaymentsResponse {
  subscription: MySubscription;
  payments: PaymentRecord[];
}

/** Works whether the server returns the bare object or { success, data }. */
const unwrap = <T>(res: unknown, fallback: T): T => {
  const body = res as { data?: T } | T | undefined;
  if (
    body &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    "data" in body
  ) {
    return (body as { data: T }).data ?? fallback;
  }
  return (body as T) ?? fallback;
};

export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      OrderResponse,
      { planId: PlanId; billing: Billing }
    >({
      query: (body) => ({ url: "/payments/order", method: "POST", body }),
      transformResponse: (res: unknown) =>
        unwrap<OrderResponse>(res, undefined as unknown as OrderResponse),
    }),

    verifyPayment: builder.mutation<VerifyResponse, RazorpaySuccess>({
      query: (body) => ({ url: "/payments/verify", method: "POST", body }),
      transformResponse: (res: unknown) =>
        unwrap<VerifyResponse>(res, undefined as unknown as VerifyResponse),
      invalidatesTags: ["Subscription"], // plan + locked templates update everywhere
    }),

    getMySubscription: builder.query<MyPaymentsResponse, void>({
      query: () => ({ url: "/payments/me", method: "GET" }),
      transformResponse: (res: unknown) =>
        unwrap<MyPaymentsResponse>(res, {
          subscription: { plan: "free", status: "active" },
          payments: [],
        }),
      providesTags: ["Subscription"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetMySubscriptionQuery,
} = paymentsApi;
