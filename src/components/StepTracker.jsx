import React from 'react';

const steps = [
  { id: 1, key: 'choose', label: 'CHOOSE' },
  { id: 2, key: 'details', label: 'DETAILS' },
  { id: 3, key: 'frame', label: 'FRAME' },
  { id: 4, key: 'generate', label: 'GENERATE' },
];

const StepTracker = ({ currentView, generationMode, navigateTo }) => {
  let activeStep = 1;
  if (currentView === 'choose') activeStep = 1;
  else if (currentView === 'solo-details' || currentView === 'squad-details') activeStep = 2;
  else if (currentView === 'frame') activeStep = 3;
  else if (currentView === 'generate') activeStep = 4;

  const handleStepClick = (stepKey, stepId) => {
    if (stepId >= activeStep) return;

    if (stepKey === 'choose') navigateTo('choose');
    else if (stepKey === 'details') navigateTo(generationMode === 'solo' ? 'solo-details' : 'squad-details');
    else if (stepKey === 'frame') navigateTo('frame');
  };

  return (
    <nav className="my-4 flex w-full justify-center overflow-x-auto py-2" aria-label="Progress">
      <div className="flex items-center gap-1.5 sm:gap-3">
        {steps.map((step, index) => {
          const isCompleted = step.id < activeStep;
          const isActive = step.id === activeStep;
          const isUpcoming = step.id > activeStep;

          let bgColor = 'rgba(5, 33, 21, 0.6)';
          let color = 'rgba(255, 255, 255, 0.6)';
          let border = '2px solid rgba(255, 255, 255, 0.25)';

          if (isCompleted) {
            bgColor = '#ff2a85';
            color = '#ffffff';
            border = '2px solid #000000';
          } else if (isActive) {
            bgColor = '#ffe600';
            color = '#000000';
            border = '2px solid #000000';
          }

          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => handleStepClick(step.key, step.id)}
                disabled={!isCompleted}
                className={`font-mono flex items-center gap-1.5 whitespace-nowrap uppercase transition-all ${
                  isCompleted ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                }`}
                style={{
                  backgroundColor: bgColor,
                  color,
                  border,
                  padding: '6px 14px',
                  borderRadius: '50px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  boxShadow: !isUpcoming ? '2px 2px 0px 0px #000' : 'none',
                }}
                title={isCompleted ? `Go back to ${step.label}` : undefined}
              >
                {isCompleted ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[10px]">✓</span>
                ) : (
                  <span style={{ opacity: isActive ? 1 : 0.6 }}>0{step.id}</span>
                )}
                <span className="hidden xs:inline sm:inline">{step.label}</span>
              </button>

              {index < steps.length - 1 && (
                <div className={`step-connector ${step.id < activeStep ? 'done' : 'pending'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default StepTracker;
