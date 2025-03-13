"use client"; // Mark this component as a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Updated import
import QRCode from "qrcode";

type ContactInfo = {
  title: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  linkedIn?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
};

export default function Home() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [fullName, setFullName] = useState<string>(""); // For footer display
  const [title, setTitle] = useState<string>(""); // For footer display
  const [contactData, setContactData] = useState<ContactInfo | null>(null); // Store contact data
  const router = useRouter();

  // Function to generate vCard string
  const generateVCard = (data: ContactInfo): string => {
    return `BEGIN:VCARD
VERSION:3.0
N:${data.fullName || ""};;;
FN:${data.fullName || ""}
TEL:${data.mobileNumber || ""}
EMAIL:${data.email || ""}
URL:https://linkedin.com/in/${data.linkedIn || ""}
END:VCARD`;
  };

  // Load data from localStorage on component load
  useEffect(() => {
    const storedData = localStorage.getItem("contactInfo");
    if (storedData) {
      const parsedData: ContactInfo = JSON.parse(storedData);
      setContactData(parsedData); // Set contact data
      setTitle(parsedData.title || ""); // Set title for footer
      setFullName(parsedData.fullName || ""); // Set fullName for footer
      const vCard = generateVCard(parsedData);

      // Generate QR code from vCard using a callback
      QRCode.toDataURL(vCard, (err: Error | null | undefined, url: string) => {
        if (err) {
          console.error("Error generating QR code:", err);
          return;
        }
        setQrCodeUrl(url);
      });
    }
  }, []);

  // Define the fields to display
  const fields = [
    { label: "Tel", key: "mobileNumber", placeholder: "Mobile Number" },
    { label: "Email", key: "email", placeholder: "Email Address" },
    { label: "LinkedIn", key: "linkedIn", placeholder: "LinkedIn" },
    { label: "Facebook", key: "facebook", placeholder: "Facebook" },
    { label: "Instagram", key: "instagram", placeholder: "Instagram" },
    { label: "X", key: "x", placeholder: "X" },
  ];

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold text-indigo-600 sm:truncate sm:text-3xl sm:tracking-tight">
            My Contact Details
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {/* Display contact details from localStorage or placeholders */}
            {fields.map(({ label, key, placeholder }, idx) => (
              <div
                key={idx}
                className="mt-2 flex items-center text-sm text-indigo-500"
              >
                <span
                  aria-hidden="true"
                  className="mr-1.5 size-5 shrink-0 text-indigo-400"
                >
                  •
                </span>
                {`${label}: ${
                  contactData?.[key as keyof ContactInfo] || placeholder
                }`}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:block">
            <button
              type="button"
              onClick={() => router.push("/form")}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-900 ring-1 shadow-xs ring-indigo-300 ring-inset hover:bg-indigo-50"
            >
              Edit
            </button>
          </span>
        </div>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
        ) : (
          <div>QR Code</div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div className="text-2xl/7 font-bold text-indigo-600 sm:truncate sm:text-3xl sm:tracking-tight">
          {title && fullName
            ? `${title} ${fullName}`
            : title
            ? title
            : fullName
            ? fullName
            : "Press Edit Button"}
        </div>
      </footer>
    </div>
  );
}
