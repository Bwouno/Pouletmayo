import React, {useState, useEffect} from 'react';
import Menu from './components/menu'
import Panier from './components/panier'
import api, {IDataRow} from './services/api'
import './styles/App.css'

function App() {
  const [bgClass, setBgClass] = useState("bg-pas-vegan")
  const [regime, setRegime] = useState(2)
  const [formule, setFormule] = useState(1)
  const [facturation, setFacturation] = useState(0)
  const [entreesDuJour, setEntreesDuJour] = useState([] as IDataRow[])
  const [isMounted, setIsMounted] = useState(false)

  const handleRegimeClick = (index: number) => {
    const bg = ["bg-vegan", "bg-viandard-sensible", "bg-pas-vegan"]
    setBgClass(bg[index])
    setRegime(index)
  }

  const handleFormuleClick = (index: number) => {
    setFormule(index)
  }

  const handleFacturationClick = (index: number) => {
    setFacturation(index)
  }

  useEffect(() => {
    !isMounted && api.getEntreesDuJour().then(json => {
      setIsMounted(true)
      setEntreesDuJour(json)
    })
  }, [isMounted])

  return (
    <div className="App">
     <header className={bgClass}><h1>Menu du {new Date().toLocaleDateString("fr-FR", {weekday:"long"})}</h1></header>
     <nav>
      <Menu className={`regime ${bgClass}`} data={["Vegan", "Viendard sensible", "Véquoi?"]} onClick={handleRegimeClick} selected={regime} />
      <Menu className={`formule ${bgClass}`} data={["Petite faim", "Grosse dalle"]} onClick={handleFormuleClick} selected={formule}  />
     </nav>
     <section className={bgClass}>
        {formule === 1 && (
          <article className="entree">
            <h2>Entrées</h2>
            {entreesDuJour &&
              entreesDuJour
                .filter(
                  (row) =>
                    (regime === 0 && row.Vegan) || (regime !== 0 && !row.Vegan)
                )
                .map((row, index) => {
                  return (
                    <div key={index}>
                      <h3>{row.Nom}</h3>
                      <p>{row.Description}</p>
                    </div>
                  );
                })}
          </article>
        )}
        <article className="plat">
          <h2>Plat</h2>
          <h3>Etouffe-Chrétien</h3>
          <p>
            C'est au figuré
            <br />
            En vrai on n'a rien contre les chrétiens d'ailleurs j'ai un ami
            chrétien, et il <b>adore</b> ce{" "}
            <span className="principal">Sandwich </span>
            {regime === 0 && (
              <span className="garniture">
                <a
                  href="https://vegan-pratique.fr/cote-cuisine/cuisiner-proteines-de-soja-texturees/"
                  target="_blank"
                  rel="noreferrer">
                  protéines de soja texturées
                </a>
              </span>
            )}
            {regime !== 0 && (
              <span className="garniture">
                <a
                  href="https://fr.wikipedia.org/wiki/poulet"
                  target="_blank"
                  rel="noreferrer">
                  poulet
                </a>
              </span>
            )}{" "}
            <span className="sauce">mayonnaise {regime === 0 && "vegan"}</span>
          </p>
        </article>
      </section>
     <footer>
      <Menu className={`facturation ${bgClass}`} data={["Abonnés à inpulse.tv", "Pompiers et militaires", "Les autres"]} onClick={handleFacturationClick} selected={facturation}  />
      <Panier className={`panier ${bgClass}`} facturation={facturation}/>
      <Menu className={`validation ${bgClass}`}data={["Commander"]} />
     </footer>
    </div>
  );
}

export default App;
