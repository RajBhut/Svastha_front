import React from "react";

export default function Resorse() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5f5]">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-[#1a1a4d]">Resources</h1>
          <p className="text-lg text-[#1a1a4d]">
            Here are some resources that you can use to help you with your
            mental health.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2
                className="text-2xl font-semibold text
                    -[#1a1a4d]"
              >
                Online Resources
              </h2>
              <p className="text-lg text-[#1a1a4d]">
                Here are some online resources that you can use to help you with
                your mental health.
              </p>
              <ul className="list-disc pl-6">
                <li className="text-lg text-[#1a1a4d]">
                  <a
                    href="https://www.nimh.nih.gov/health/find-help"
                    target="_blank"
                    rel="noreferrer"
                  >
                    National Institute of Mental Health
                  </a>
                </li>
                <li className="text-lg text-[#1a1a4d]">
                  <a
                    href="https://www.nami.org/Home"
                    target="_blank"
                    rel="noreferrer"
                  >
                    National Alliance on Mental Illness
                  </a>
                </li>
                <li className="text-lg text-[#1a1a4d]">
                  <a
                    href="https://www.mentalhealth.gov/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    MentalHealth.gov
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-[#1a1a4d]">
                Hotlines
              </h2>
              <p className="text-lg text-[#1a1a4d]">
                Here are some hotlines that you can call if you need help.
              </p>
              <ul className="list-disc pl-6">
                <li className="text-lg text-[#1a1a4d]">
                  <a href="tel:1-800-273-TALK" target="_blank" rel="noreferrer">
                    1-800-273
                  </a>
                </li>
                <li className="text-lg text-[#1a1a4d]">
                  <a href="tel:1-800-273-TALK" target="_blank" rel="noreferrer">
                    1-800-273
                  </a>
                </li>
                <li className="text-lg text-[#1a1a4d]">
                  <a href="tel:1-800-273-TALK" target="_blank" rel="noreferrer">
                    1-800-273
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
