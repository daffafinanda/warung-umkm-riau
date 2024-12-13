'use client'

import React from 'react'
import { FaCheck } from "react-icons/fa";

interface Step {
  name: string
  status: 'completed' | 'current' | 'upcoming'
}

interface ProgressStepperProps {
  steps: Step[]
}

export default function ProgressStepper({ steps }: ProgressStepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-center mb-10">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={`${
              stepIdx !== steps.length - 1 ? 'flex-1' : ''
            } relative`}
          >
            <div className="group flex items-center">
              <span className="flex flex-col items-center" aria-current={step.status === 'current' ? 'step' : undefined}>
                {step.status === 'completed' ? (
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                    <FaCheck className="h-5 w-5 text-white" />
                  </span>
                ) : step.status === 'current' ? (
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center bg-background rounded-full border-2 border-blue-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  </span>
                ) : (
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background border-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                  </span>
                )}
                <span className="absolute text-black -bottom-6  items-center w-max md:text-sm text-xs font-medium">
                {step.name}
                </span>
              </span>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`absolute left-0 -right-0 top-4 -mt-0.5 h-[1px] ${
                    step.status === 'completed' ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            
          </li>
        ))}
      </ol>
    </nav>
  )
}


