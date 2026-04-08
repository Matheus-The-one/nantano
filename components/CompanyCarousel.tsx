"use client";

import { useEffect, useState } from "react";

const companies = [
  { name: "TechStart", logo: "TS" },
  { name: "InnovateAI", logo: "IA" },
  { name: "DevCorp", logo: "DC" },
  { name: "CloudFlow", logo: "CF" },
  { name: "DataPro", logo: "DP" },
  { name: "AppBuilder", logo: "AB" },
  { name: "CodeLab", logo: "CL" },
  { name: "FutureAPI", logo: "FA" },
  { name: "SmartTech", logo: "ST" },
  { name: "BuildFast", logo: "BF" },
];

export function CompanyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % companies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by innovative companies worldwide
          </p>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex * 100) / 5}%)` }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-none w-1/5 px-8"
              >
                <div className="flex items-center justify-center h-16">
                  <div className="flex items-center space-x-3 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {company.logo}
                    </div>
                    <span className="font-semibold text-lg">
                      {company.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile grid */}
        <div className="md:hidden grid grid-cols-2 gap-6">
          {companies.slice(0, 6).map((company, index) => (
            <div
              key={company.name}
              className="flex items-center justify-center"
            >
              <div className="flex items-center space-x-3 opacity-60">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                  {company.logo}
                </div>
                <span className="font-semibold">{company.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="hidden md:flex justify-center mt-8 space-x-2">
          {companies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
