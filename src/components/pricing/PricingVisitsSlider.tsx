import React from "react";

interface PricingVisitsSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const PricingVisitsSlider = ({ value, onChange }: PricingVisitsSliderProps) => (
  <div className="mb-12">
    <h3 className="text-xl font-bold mb-4">Expected Monthly Visits</h3>
    <div className="mb-2">
      <input
        type="range"
        min="1000"
        max="100000"
        step="1000"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-rich-blue/20 rounded-lg appearance-none cursor-pointer 
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rich-blue 
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 
          [&::-webkit-slider-thumb]:border-white/20 [&::-webkit-slider-thumb]:shadow-lg
          [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full 
          [&::-moz-range-thumb]:bg-rich-blue [&::-moz-range-thumb]:cursor-pointer 
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/20
          [&::-moz-range-thumb]:shadow-lg hover:bg-rich-blue/30 transition-colors"
      />
      <div className="text-right text-gray-400 mt-2">
        {value.toLocaleString()} visits/month
      </div>
    </div>
  </div>
);

export default PricingVisitsSlider;