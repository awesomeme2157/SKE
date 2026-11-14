"use client";

import { useEffect, useId, useRef } from "react";

export function EnquirySuccess({ message, onClose }: { message: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const messageId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const dismissTimer = window.setTimeout(() => dialog.close(), 3000);
    return () => {
      window.clearTimeout(dismissTimer);
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="enquiry-success-dialog" aria-labelledby={titleId} aria-describedby={messageId}
      onClose={(event) => {
        // Ignore a queued close event from React's development effect cleanup.
        if (!event.currentTarget.open) onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
          event.currentTarget.close();
        }
      }}>
      <div className="enquiry-success">
        <button type="button" className="enquiry-success-close" aria-label="Close confirmation" onClick={() => dialogRef.current?.close()}>×</button>
        <span className="enquiry-success-icon" aria-hidden="true">
          <svg viewBox="0 0 56 56" fill="none">
            <circle className="enquiry-success-ring" cx="28" cy="28" r="24" pathLength="1" />
            <path className="enquiry-success-check" d="m17 28 7 7 15-15" pathLength="1" />
          </svg>
        </span>
        <div className="enquiry-success-copy"><h3 id={titleId}>Enquiry sent!</h3><p id={messageId}>{message}</p></div>
        <button type="button" className="button-primary enquiry-success-done" onClick={() => dialogRef.current?.close()}>Done <span aria-hidden="true">✓</span></button>
      </div>
    </dialog>
  );
}
