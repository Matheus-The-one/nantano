"use client";

import { useEffect, useState } from "react";

const industries = [
  { name: "Entertainment", logo: "EN" },
  { name: "Healthcare", logo: "HC" },
  { name: "E-Commerce", logo: "EC" },
  { name: "Food & Recipes", logo: "FR" },
  { name: "Finance", logo: "FN" },
  { name: "Investor Data", logo: "ID" },
  { name: "Retail", logo: "RT" },
  { name: "Sports", logo: "SP" },
  { name: "Real Estate", logo: "RE" },
  { name: "Travel", logo: "TR" },
];

export function CompanyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % industries.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-sm text-muted-foreground mb-8">
            We extract and structure data across industries — then ship it as APIs
          </p>
        </div>

        <div className="hidden md:block overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex * 100) / 5}%)` }}
          >
            {[...industries, ...industries].map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex-none w-1/5 px-8"
              >
                <div className="flex items-center justify-center h-16">
                  <div className="flex items-center space-x-3 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {item.logo}
                    </div>
                    <span className="font-semibold text-lg">
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden grid grid-cols-2 gap-6">
          {industries.slice(0, 6).map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-center"
            >
              <div className="flex items-center space-x-3 opacity-60">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                  {item.logo}
                </div>
                <span className="font-semibold">{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-center mt-8 space-x-2">
          {industries.map((_, index) => (
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
