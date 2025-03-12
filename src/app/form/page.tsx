"use client"; // Mark this component as a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

type FormData = {
  title: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  linkedIn: string;
  facebook: string;
  instagram: string;
  x: string;
};

export default function Form() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    linkedIn: "",
    facebook: "",
    instagram: "",
    x: "",
  });

  // Load data from localStorage on component load
  useEffect(() => {
    const storedData = localStorage.getItem("contactInfo");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("contactInfo", JSON.stringify(formData));
    router.push("/"); // Navigate back to the home page
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-8 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <h2 className="text-base/7 font-semibold text-indigo-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-indigo-600">
            Provide Information you want to share.
          </p>
          {[
            { label: "Title", name: "title", placeholder: "Dr." },
            { label: "Full Name", name: "fullName", placeholder: "Atom Byte" },
            {
              label: "Email Address",
              name: "email",
              placeholder: "example@mail.com",
            },
            {
              label: "Mobile Number",
              name: "mobileNumber",
              placeholder: "+263",
            },
            {
              label: "LinkedIn Username",
              name: "linkedIn",
              placeholder: "limsync",
            },
            {
              label: "Facebook Username",
              name: "facebook",
              placeholder: "Atom Byte",
            },
            {
              label: "Instagram Username",
              name: "instagram",
              placeholder: "limsync",
            },
            { label: "X Username", name: "x", placeholder: "limsync" },
          ].map(({ label, name, placeholder }, idx) => (
            <div key={idx} className="border-b border-indigo-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor={name}
                    className="block text-sm/6 font-medium text-indigo-900"
                  >
                    {label}
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-indigo-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id={name}
                        name={name}
                        type="text"
                        placeholder={placeholder}
                        value={formData[name as keyof FormData]}
                        onChange={handleChange}
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-indigo-900 placeholder:text-indigo-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm/6 font-semibold text-indigo-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
