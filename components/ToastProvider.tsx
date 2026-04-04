"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

type Toast = { id: number; message: string; severity: "success" | "error" | "info" | "warning" };

const ToastCtx = createContext<(msg: string, sev?: Toast["severity"]) => void>(() => {});

export function useToast() { return useContext(ToastCtx); }

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, severity: Toast["severity"] = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, severity }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      {toasts.map((t, i) => (
        <Snackbar
          key={t.id}
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          style={{ bottom: `${16 + i * 72}px` }}
        >
          <Alert
            severity={t.severity}
            variant="filled"
            sx={{ borderRadius: 3, fontFamily: "Poppins", fontWeight: 500 }}
          >
            {t.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastCtx.Provider>
  );
}
