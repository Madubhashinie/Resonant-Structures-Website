import './MoleculeSelector.css';

function MoleculeSelector({ molecule, setMolecule }) {
  return (
    <section className="molecule-selector">
      <h2 className="selector-title">Select a Molecule</h2>
      <select
        className="selector-dropdown"
        value={molecule}
        onChange={(e) => setMolecule(e.target.value)}
      >
        <option value="benzene">Benzene (C₆H₆)</option>
        <option value="ozone">Ozone (O₃)</option>
        <option value="nitrate">Nitrate Ion (NO₃⁻)</option>
      </select>
    </section>
  );
}

export default MoleculeSelector;
