import React from 'react';

const steps = [
  { id: 1, key: 'choose', label: 'CHOOSE' },
  { id: 2, key: 'details', label: 'DETAILS' },
  { id: 3, key: 'frame', label: 'FRAME' },
  { id: 4, key: 'generate', label: 'GENERATE' }
];

const StepTracker = ({ currentView, generationMode, navigateTo }) => {
  // Determine active step index (1 to 4)
  let activeStep = 1;
  if (currentView === 'choose') activeStep = 1;
  else if (currentView === 'solo-details' || currentView === 'squad-details') activeStep = 2;
  else if (currentView === 'frame') activeStep = 3;
  else if (currentView === 'generate') activeStep = 4;

  const handleStepClick = (stepKey, stepId) => {
    if (stepId >= activeStep) return; // Only allow going back to completed steps
    
    if (stepKey === 'choose') {
      navigateTo('choose');
    } else if (stepKey === 'details') {
      navigateTo(generationMode === 'solo' ? 'solo-details' : 'squad-details');
    } else if (stepKey === 'frame') {
      navigateTo('frame');
    }
  };

  return (
    <div className="flex justify-center items-center my-4 w-full overflow-x-auto py-2">
      <div className="flex items-center gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isCompleted = step.id < activeStep;
          const isActive = step.id === activeStep;
          const isUpcoming = step.id > activeStep;
          
          let bgColor = 'rgba(5, 33, 21, 0.6)';
          let color = 'rgba(255, 255, 255, 0.6)';
          let border = '2px solid rgba(255, 255, 255, 0.25)';
          
          if (isCompleted) {
            bgColor = '#ff2a85'; // Hot pink for completed
            color = '#ffffff';
            border = '2px solid #000000';
          } else if (isActive) {
            bgColor = '#ffe600'; // Bright yellow for active
            color = '#000000';
            border = '2px solid #000000';
          }
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Pill */}
              <div 
                onClick={() => handleStepClick(step.key, step.id)}
                className={`uppercase font-mono flex items-center gap-1.5 transition-all ${
                  isCompleted ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                }`}
                style={{
                  backgroundColor: bgColor,
                  color: color,
                  border: border,
                  padding: '6px 16px',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  boxShadow: !isUpcoming ? '2px 2px 0px 0px #000' : 'none',
                  whiteSpace: 'nowrap'
                }}
                title={isCompleted ? `Go back to ${step.label}` : undefined}
              >
                {isCompleted ? (
                  <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">✓</span>
                ) : (
                  <span style={{ opacity: isActive ? 1 : 0.6 }}>0{step.id}</span>
                )}
                <span>{step.label}</span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div style={{
                  width: '32px',
                  height: '2px',
                  borderTop: step.id < activeStep ? '2px solid #ff2a85' : '2px dashed rgba(255,255,255,0.25)',
                  margin: '0 2px'
                }}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepTracker;
