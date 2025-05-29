import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import './ResonanceViewer.css';


function ResonanceViewer({ resonanceData = [], currentForm = 0, setCurrentForm = () => {}, molecule = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!resonanceData || resonanceData.length === 0) return;

    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(400, 300);
        p.background(255);
      };

      p.draw = () => {
        p.background(255);
        const form = resonanceData[currentForm];
        if (!form) return;

        p.stroke(0);
        p.strokeWeight(2);

        form.bonds.forEach(bond => {
          if (bond.type === 'double') {
            const dx = bond.end.x - bond.start.x;
            const dy = bond.end.y - bond.start.y;
            const offset = 4;
            const mag = Math.sqrt(dx * dx + dy * dy);
            const nx = -dy / mag * offset;
            const ny = dx / mag * offset;

            p.line(bond.start.x + nx, bond.start.y + ny, bond.end.x + nx, bond.end.y + ny);
            p.line(bond.start.x - nx, bond.start.y - ny, bond.end.x - nx, bond.end.y - ny);
          } else {
            p.line(bond.start.x, bond.start.y, bond.end.x, bond.end.y);
          }
        });

        form.atoms.forEach(atom => {
          p.fill(255);
          p.ellipse(atom.x, atom.y, 20, 20);
          p.fill(0);
          p.text(atom.label, atom.x - 10, atom.y + 5);
        });
      };
    };

    const p5Instance = new p5(sketch, canvasRef.current);
    return () => p5Instance.remove();
  }, [resonanceData, currentForm]);

  const getExplanation = () => {
    switch (molecule) {
      case 'benzene':
        return {
          text: 'In benzene: The electrons in the double bonds delocalize across the ring.',
          latex: '\\ce{C6H6 <-> C6H6}'
        };
      case 'ozone':
        return {
          text: 'In ozone: The double bond alternates between oxygen atoms.',
          latex: '\\ce{O3 <-> O3}'
        };
      case 'nitrate':
        return {
          text: 'In nitrate: The double bond rotates among the oxygen atoms.',
          latex: '\\ce{NO3^- <-> NO3^-}'
        };
      default:
        return { text: '', latex: '' };
    }
  };

  const { text, latex } = getExplanation();

  if (!resonanceData || resonanceData.length === 0) {
    return (
      <section className="viewer-container">
        <h2>Resonance Structures</h2>
        <p className="loading-text">Loading resonance data...</p>
      </section>
    );
  }

  return (
    <section className="viewer-container">
      <h2>Resonance Structures</h2>
      <div ref={canvasRef} className="canvas-wrapper"></div>
      <div className="button-group">
        <button
          className="nav-button"
          onClick={() => setCurrentForm((prev) => Math.max(0, prev - 1))}
          disabled={currentForm === 0}
        >
          Previous
        </button>
        <button
          className="nav-button"
          onClick={() => setCurrentForm((prev) => Math.min(resonanceData.length - 1, prev + 1))}
          disabled={currentForm === resonanceData.length - 1}
        >
          Next
        </button>
      </div>
      <div className="info-text">
        <p>Current Resonance Form: {currentForm + 1} of {resonanceData.length}</p>
        <p>
          Explanation: {text}{' '}
          <span
            dangerouslySetInnerHTML={{
              __html: `\\[${latex}\\]`
            }}
          />
        </p>
      </div>
    </section>
  );
}

export default ResonanceViewer;
