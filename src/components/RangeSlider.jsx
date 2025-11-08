import React from 'react';
import { Range } from 'react-range';
import '../styles/RangeSlider.css';

export default function RangeSlider({ min, max, values, onChange }) {
  return (
    <div className="range-slider">
      <Range
        step={5}
        min={min}
        max={max}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => {
          const { key, ...rest } = props;
          const left = ((values[0] - min) / (max - min)) * 100;
          const right = ((values[1] - min) / (max - min)) * 100;
          return (
            <div
              {...rest}
              className="range-track"
              style={{
                ...rest.style,
                background: `linear-gradient(to right,
                  #e2e8f0 0%,
                  #e2e8f0 ${left}%,
                  #6366f1 ${left}%,
                  #6366f1 ${right}%,
                  #e2e8f0 ${right}%,
                  #e2e8f0 100%)`,
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props, index }) => {
          const { key, ...rest } = props;
          return (
            <div
              {...rest}
              className="range-thumb"
              data-value={`$${values[index]}`}
            />
          );
        }}
      />
    </div>
  );
}