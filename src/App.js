import "./App.css"
import Graph from './Grpah'
import React,{useState} from 'react';
import Graph2 from './Graph2'


function App() {


  const [data,setData] = useState({
    Name:"Artur DAVTYAN",
    Sport:"Artistic Gymnastics",
    Event:"Men's Vault",
    Age:"29",
    Height:"162",
    Weight:"55",
    NOC:"Armenia"
  })
  const [show, setShow] = useState(true)
    const [hidden, setHidden] = useState(false)



  const onClick=()=>{
    setShow(!show)
    setHidden(!hidden)
  }
  






  return (
    <>
    <div className="App">
        <div className="title">
          2021 Olympic Athletes Awardes & country
        </div>
        <div className="info">
          <span>{data.Name}</span>
          <span>Sports: {data.Sport}</span>
          <span>Events: {data.Event}</span>
          <span>Age: {data.Age} years old</span>
          <span>Height: {data.Height} CM</span>
          <span>Weight: {data.Weight} KG</span>
          <span>NOC: {data.NOC} </span>
        </div>  
        { show &&
          <Graph data={data} setData={setData}/>
        }
        { hidden && 
          <Graph2 setData={setData}/>
        }
        <button className="btn-vertical" id="vertical" onClick={onClick}>{show ? "Sport perspective": "overview"}</button>
        
    </div>
        
    
    </>
  );
}

export default App;
