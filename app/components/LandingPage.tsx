"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#42d392] to-[#35495e]">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white/90 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#35495e] tracking-wide">
            HRIS Access
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-[#35495e] font-medium hover:text-[#42d392]">
              Features
            </a>
            <a href="#security" className="text-[#35495e] font-medium hover:text-[#42d392]">
              Security
            </a>
            <a href="#logs" className="text-[#35495e] font-medium hover:text-[#42d392]">
              Audit Logs
            </a>
          </nav>
          <button
            onClick={() => router.push("/login")}
            className="bg-[#42d392] hover:bg-[#35495e] text-white px-5 py-2 rounded-md font-semibold transition"
          >
            Login
          </button>
        </div>
      </header>



      {/* Hero */}
      <main className="flex-1">

{/* Hero Section - Modern Fullscreen Design */}
<section className="relative w-full min-h-screen bg-gradient-to-br from-[#42d392] to-[#35495e] text-white px-6 py-32 flex items-center justify-center overflow-hidden">
  {/* Background Blobs */}
  <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#ffffff22] rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div> 
  <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#ffffff22] rounded-full blur-2xl opacity-20 translate-x-1/2 translate-y-1/2"></div> 

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto text-center">
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg leading-tight mb-6">
      Secure. Efficient. Transparent.
    </h1>
    <p className="text-xl md:text-2xl font-light drop-shadow-md mb-10 max-w-3xl mx-auto">
      HRIS Access enables secure file uploads, downloads, and audit tracking with full role-based visibility — from your desktop to the cloud.
    </p>
    <div className="flex justify-center gap-4 flex-wrap">
      <button
        onClick={() => router.push("/login")}
        className="bg-white text-[#35495e] hover:bg-[#42d392] hover:text-white px-8 py-3 rounded-lg text-lg font-bold transition duration-300 shadow-md"
      >
        Get Started
      </button>
      <button
        onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
        className="bg-transparent border border-white hover:bg-white hover:text-[#35495e] px-8 py-3 rounded-lg text-lg font-bold transition duration-300"
      >
        Explore Features
      </button>
    </div>
  </div>
</section>



        {/* Features */}
        <section id="features" className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-[#35495e] mb-12">
              System Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Upload & Download Files"
                description="Easily upload PDF and image documents per employee. Enable authorized downloads anytime."
              />
              <FeatureCard
                title="Role-Based Access"
                description="Admins control access to files and pages. Secure access by department, role, or user."
              />
              <FeatureCard
                title="Live Usage Monitoring"
                description="Track who viewed, downloaded, or modified documents. Maintain full traceability of access."
              />
            </div>
          </div>
        </section>
        

          {/* Showcase Section */}
      <section className="bg-[#f9f9f9] py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="/images/hris-preview.png" // Replace with actual image path
              alt="HRIS Dashboard"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-[#35495e] mb-4">
              Upload & Track with Confidence
            </h3>
            <p className="text-gray-700 text-lg">
              HRIS Access provides a central document repository with user logging,
              version control, and secure endpoints for every action. Employees and admins
              can access only what's intended for them.
            </p>
          </div>
        </div>
      </section>

        {/* Security Section */}
        <section id="security" className="bg-[#f5f5f5] py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-[#35495e] mb-6">
              Enterprise-Grade Security
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              HRIS Access is built with security-first principles. Files are encrypted,
              access is controlled by user roles, and sensitive data is protected in
              compliance with local labor and data privacy regulations.
            </p>
            <p className="text-lg text-gray-700">
              System activity is logged for audit and legal accountability, ensuring
              full transparency and governance.
            </p>
          </div>
        </section>


        {/* Logs Section */}
        <section id="logs" className="bg-[#35495e] text-white py-20 text-center px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Real-Time Logging</h3>
            <p className="mb-8 text-lg">
              Every action is logged — from login, file access, upload/download, to
              page navigation. Gain insight and visibility into your team’s document
              interaction history.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#42d392] hover:bg-white hover:text-[#35495e] px-8 py-3 rounded-md font-bold text-lg transition shadow"
            >
              View Logs & Access Control
            </button>
          </div>
        </section>

      {/* FAQ Section */}
      <section className="bg-[#f0f0f0] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-[#35495e] mb-10">Frequently Asked Questions</h3>
          <FAQItem
            question="Who can upload or download documents?"
            answer="Only users with the appropriate role-based permissions set by the admin can upload or download files."
          />
          <FAQItem
            question="Can I see who accessed a specific file?"
            answer="Yes. Each file access, view, or download is logged and viewable in the audit section."
          />
          <FAQItem
            question="What file types are supported?"
            answer="PDFs and images (JPG, PNG) are currently supported for uploads."
          />
        </div>
      </section>
<section className="bg-white py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h3 className="text-3xl font-bold text-[#35495e] mb-12">What Our Users Say</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          name: "Anna Reyes",
          role: "HR Director, Moresco II",
          comment: "HRIS Access simplified our document workflows. Audit logs gave us compliance confidence.",
        },
        {
          name: "Marco De Leon",
          role: "IT Supervisor, Energy Co.",
          comment: "The role-based access control is bulletproof. Our HR files have never been more secure.",
        },
        {
          name: "Liza Gomez",
          role: "Payroll Admin, Water District",
          comment: "Uploading and tracking PhilHealth and Pag-IBIG documents is now effortless.",
        },
      ].map((t, index) => (
        <div key={index} className="bg-[#f5f5f5] rounded-lg p-6 shadow-md text-left">
          <p className="text-gray-700 mb-4">“{t.comment}”</p>
          <div>
            <p className="font-semibold text-[#35495e]">{t.name}</p>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Final CTA */}
      <section className="bg-[#42d392] text-white text-center py-20 px-6">
        <h3 className="text-4xl font-bold mb-6">Ready to Secure Your HR Files?</h3>
        <p className="text-lg mb-8">
          Get started with HRIS Access and bring order, traceability, and compliance to your document workflows.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-white text-[#35495e] hover:bg-[#35495e] hover:text-white px-8 py-3 rounded-lg text-lg font-bold transition duration-300"
        >
          Start Now
        </button>
      </section>          


      </main>

      <Footer />
    </div>
  );
}

// function FeatureCard({ title, description }: { title: string; description: string }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition">
//       <h4 className="text-xl font-semibold text-[#35495e] mb-2">{title}</h4>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// }

// Feature Card
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition">
      <h4 className="text-xl font-semibold text-[#35495e] mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// FAQ Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-[#35495e]">{question}</h4>
      <p className="text-gray-700">{answer}</p>
    </div>
  );
}
