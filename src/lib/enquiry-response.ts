export const ENQUIRY_ERROR_MESSAGE =
  "We couldn’t send your enquiry. Please try again or contact us directly at skesanjay9@gmail.com or +91 98815 52345.";

const validationMessages = new Set([
  "Your message is too long.",
  "Please check your enquiry and try again.",
  "Please check the length and format of your enquiry.",
  "Please enter your name, a valid email address, and a message.",
  "Please choose a product from the list or select General enquiry.",
]);

type EnquiryResult = { success: true } | { success: false; message: string };

export async function readEnquiryResponse(response: Response): Promise<EnquiryResult> {
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    return { success: false, message: ENQUIRY_ERROR_MESSAGE };
  }

  if (result && typeof result === "object" && !Array.isArray(result)) {
    if (response.ok && "success" in result && result.success === true) {
      return { success: true };
    }
    if (
      (response.status === 400 || response.status === 413) &&
      "error" in result &&
      typeof result.error === "string" &&
      validationMessages.has(result.error)
    ) {
      return { success: false, message: result.error };
    }
  }

  return { success: false, message: ENQUIRY_ERROR_MESSAGE };
}
