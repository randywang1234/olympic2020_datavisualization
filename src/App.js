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
  const [modalOpen, setModalOpen] = useState(false)


  const onClick=()=>{
    setShow(!show)
    setHidden(!hidden)
  }
  const showinfo =()=>{
    setModalOpen(!modalOpen)
  }






  return (
    <>
    <div className="App">
        <div className="title">
          2020 Olympic Athletes Awardes & country
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
        <button className="btn-info" onClick={showinfo}>Info</button>
        {modalOpen && 
          <div className="modal">
            <p>Reference</p>
            <a href="https://www.kaggle.com/arjunprasadsarkhel/2021-olympics-in-tokyo">2021 Olympic in Tokyo</a>
            <a href="https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results">120 years of Olympic history data</a>
            <a href="https://www.kaggle.com/the-guardian/olympic-games">Olympic sports and medals</a>
            <p>Acknowledgements</p>
            <span>As an exchange student, there are a few courses I could choose. Fortunately, i am really excited and curious to make data visualization, it's quite interesting to explore things from existing data and learn the different tools to achieve the goal. Data visualization is a serious professional skill, you have to think about the comprehensive way to present, including the meaning of the colors, size of the bubble, connection between each other(length, width), there are too many things you need to consider it. Thanks for the consulting from the teacher and classmate, they can help you to review the work and give you suggestions. I also recommend students choose data visualization courses, it can make their programming skills better.</span>
            <p>project/names/team:</p>
            <span>project name: 2021 Olympic Athletes Awardes & country</span>
            <span>Date you finished the project: 29.01.2022</span>
            <span>Your names and for teams your team roles/responsibilities: <br />Randy Wang: In charge of the programming part. <br />Weijie Pan: In charge of the design part. <br />Design concept are all discussed by two of us.</span>
            <p>Used web technologies</p>
            <span>D3.js, react.js, chart.js</span>
            <p>course details:</p>
            <a href="https://uclab.fh-potsdam.de/advances/">Advances in Data Visualization: Networks & Hierarchies by Mark-Jan Bludau at University of Applied Sciences Potsdam, Winter semester 2021/22</a>
          </div>
        }
       <p className="self">Project by <a href="https://github.com/randywang1234/olympic2020_datavisualization">YU-CHEN WANG</a></p> 
    </div>
        
    
    </>
  );
}

export default App;
