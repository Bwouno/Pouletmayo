import React from 'react';
import './App.css';
import Menu from './components/menu'

function App() {
  const handleRegimeClick = (index: number) => {
    console.log(index)
  }

  const handleFormuleClick = (index: number) => {
    console.log(index)
  }

  const handleFacturationClick = (index: number) => {
    console.log(index)
  }

  return (
    <div className="App">
     <header></header>
     <nav>
      <Menu data={["Vegan", "Viendard sensible", "Véquoi?"]} onClick={handleRegimeClick} />
      <Menu data={["Petite faim", "Grosse dalle"]} onClick={handleFormuleClick} />
     </nav>
     <section></section>
     <footer>
      <Menu data={["Abonnés à inpulse.tv", "Pompiers et militaires", "Les autres"]} onClick={handleFacturationClick} />
      <Menu data={["Commander"]} />
     </footer>
    </div>
  );
}

export default App;
