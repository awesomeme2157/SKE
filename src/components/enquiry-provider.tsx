"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const EnquiryContext = createContext<{
  selectedProduct: string;
  selectProduct: (product: string) => void;
} | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, selectProduct] = useState("");
  return <EnquiryContext.Provider value={{ selectedProduct, selectProduct }}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("Enquiry controls must be inside EnquiryProvider.");
  return context;
}
