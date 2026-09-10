"use client";

import { useMemo, useState } from "react";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

function fill(value: number, min: number, max: number) {
  return { "--fill": `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties;
}

export function RoiCalculator() {
  const [enquiries, setEnquiries] = useState(40);
  const [aov, setAov] = useState(3500);
  const [missed, setMissed] = useState(45);

  const { revenue, recovered } = useMemo(() => {
    const recoveredConv = enquiries * 30 * (missed / 100) * 0.6;
    return { revenue: recoveredConv * 0.22 * aov, recovered: recoveredConv };
  }, [enquiries, aov, missed]);

  return (
    <div className="roi" data-reveal>
      <div className="roi__controls">
        <div className="ctrl">
          <label htmlFor="roi-enq">
            WhatsApp enquiries per day <output>{enquiries}</output>
          </label>
          <input
            id="roi-enq"
            type="range"
            min={5}
            max={200}
            step={5}
            value={enquiries}
            style={fill(enquiries, 5, 200)}
            onChange={(e) => setEnquiries(+e.target.value)}
          />
        </div>
        <div className="ctrl">
          <label htmlFor="roi-aov">
            Average order value <output>₹{inr.format(aov)}</output>
          </label>
          <input
            id="roi-aov"
            type="range"
            min={500}
            max={50000}
            step={500}
            value={aov}
            style={fill(aov, 500, 50000)}
            onChange={(e) => setAov(+e.target.value)}
          />
        </div>
        <div className="ctrl">
          <label htmlFor="roi-missed">
            Enquiries missed or answered late <output>{missed}%</output>
          </label>
          <input
            id="roi-missed"
            type="range"
            min={10}
            max={80}
            step={5}
            value={missed}
            style={fill(missed, 10, 80)}
            onChange={(e) => setMissed(+e.target.value)}
          />
        </div>
      </div>
      <div className="roi__out">
        <div className="k">Revenue left on the table</div>
        <div className="roi__big">₹{inr.format(Math.round(revenue))}</div>
        <div className="k" style={{ color: "var(--ink-mid)" }}>
          per month
        </div>
        <p className="roi__note">
          ≈ {inr.format(Math.round(recovered))} enquiries a month you&rsquo;re not answering in time.
        </p>
      </div>
    </div>
  );
}
