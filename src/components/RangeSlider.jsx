import React from 'react';
import { Range } from 'react-range';
import '../styles/RangeSlider.css'; // Add if separate

export default function RangeSlider({ min, max, values, onChange }) {
  return (
    <Range
      step={5}
      min={min}
      max={max}
      values={values}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{ ...props.style, height: '6px', display: 'flex', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px' }}
          className="range-track"
        >
          <div
            style={{
              position: 'absolute',
              height: '100%',
              backgroundColor: '#6366f1',
              borderRadius: '4px',
              left: `${(values[0] - min) / (max - min) * 100}%`,
              width: `${(values[1] - values[0]) / (max - min) * 100}%`,
            }}
          />
          {children}
        </div>
      )}
      renderThumb={({ props, index }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '20px',
            width: '20px',
            backgroundColor: '#6366f1',
            borderRadius: '50%',
            outline: 'none',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          className={`range-thumb ${index === 0 ? 'min' : 'max'}`}
        >
          <small style={{ position: 'absolute', bottom: '-25px', left: '-10px', fontSize: '12px' }}>
            ${values[index]}
          </small>
        </div>
      )}
    />
  );
}