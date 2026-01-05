import * as React from "react";
import { createRoot } from "react-dom/client";

function EmailPreview({ html, title, onClose }: { html: string; title?: string; onClose: () => void }) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 8,
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderBottom: "1px solid #eee" }}>
          <div style={{ fontWeight: 600 }}>{title || "Email Preview"}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: 16 }}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}

export function showEmailPreview(html: string, title?: string) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  function cleanup() {
    try {
      root.unmount();
    } catch (e) {}
    if (container.parentNode) container.parentNode.removeChild(container);
  }

  root.render(<EmailPreview html={html} title={title} onClose={cleanup} />);
  return cleanup;
}

export default showEmailPreview;
