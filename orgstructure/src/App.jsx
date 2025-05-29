import  { useState , useEffect} from 'react';
import Header from './components/Header';
import MoleculeSelector from './components/MoleculeSelector';
import ResonanceViewer  from './components/ResonanceViewer';
import Quiz from './components/Quiz';
import './App.css';
function App() {
  const [molecule, setMolecule] = useState('benzene');
  const [resonanceData, setResonanceData] = useState([]);
  const [currentForm, setCurrentForm] = useState(0);
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/resonance/${molecule}`)
      .then(res => res.json())
      .then(data => {
        setResonanceData(data.structures);
        setCurrentForm(0); // Reset to first form when molecule changes
      })
      .catch(err => console.error('Error fetching resonance data:', err));
  }, [molecule]);

  return (
    <div className="App">
      <Header />
      <main>
        <MoleculeSelector molecule={molecule} setMolecule={setMolecule} />
        <ResonanceViewer resonanceData={resonanceData} currentForm={currentForm} setCurrentForm={setCurrentForm} molecule={molecule}/>
        <Quiz molecule={molecule}/>
        <h1>Welcome to the App</h1>
        <p>This is a simple React application.</p>
      </main>
      <footer className="footer">
        <p>Learn more: <a href="https://chem.libretexts.org" className="underline">LibreTexts Chemistry</a></p>
      </footer>
    </div>
  );
}
export default App;