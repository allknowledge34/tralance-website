'use client';
import React, { useState } from 'react';
import { Printer } from "lucide-react";
import { PdfLimitModal } from "./PdfLimitModal";

interface PDFDownloadButtonProps {
  toolId: string;
  onDownload: () => void;
  className?: string;
  label?: string;
}

export function PDFDownloadButton({ toolId, onDownload, className, label = "Download / Print" }: PDFDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tools/consume-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId })
      });
      const data = await res.json();
      
      if (data.allowed) {
        onDownload();
      } else if (data.limitReached) {
        setShowModal(true);
      } else {
        alert("An error occurred checking your PDF limit.");
      }
    } catch (e) {
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={handleClick}
        disabled={loading}
        className={className || "flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm shadow-primary/20 transition-all disabled:opacity-50"}
      >
        <Printer className="w-4 h-4 stroke-[2]" />
        {loading ? "Checking..." : label}
      </button>
      <PdfLimitModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
