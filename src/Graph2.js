import React,{useRef,useEffect,useState} from 'react'
import * as d3 from "d3";
import "./Graph2.css";
import Countries from './Coutries'
import Chart from './Chart'


const width = 1505
const height = 1080

const Graph2=({setData})=>{
    const ref = useRef()
    const [countrynode, setCountrynode] =useState("Please choose")

    const line =[135, 171, 211, 252, 288, 323, 360, 396, 430, 465, 498, 533, 568, 603, 640, 675, 708, 745, 782, 817, 850, 885, 920, 959, 994, 1031, 1066, 1098, 1135, 1173, 1210, 1245, 1280, 1313, 1350, 1410]
    const textcontent =["Archery", "Artistic Gymnastics","Athletics" ,"Badminton","Beach Volleyball", "Boxing", "Canoe Slalom","Canoe Sprint","Cycling BMX Freestyle","Cycling BMX Racing","Cycling Mountain Bike","Cycling Road","Cycling Track","Diving","Equestrian","Fencing","Golf","Judo","Karate","Marathon Swimming","Modern Pentathlon","Rhythmic Gymnastics","Rowing","Sailing","Shooting","Skateboarding","Sport Climbing","Surfing","Swimming","Table Tennis","Taekwondo","Tennis","Trampoline Gymnastics","Triathlon","Weightlifting","Wrestling"]
    const textcenter =[123, 140, 197, 236, 260, 313, 340, 374, 393, 432, 463, 513, 545, 593, 622, 663, 700, 738, 771, 783, 818, 850, 908, 947, 980, 1006, 1042, 1086, 1120, 1153, 1193, 1233, 1240, 1297, 1328, 1393]
    const textheight =[330, 300, 260, 330, 285, 260, 330, 260, 350, 380, 320, 290, 340, 260, 340, 300, 300, 300, 300, 260, 300, 340, 260, 260, 300, 260, 340, 260, 285, 260, 300, 260, 340, 260, 300, 340]

    const edgeColors = d3.scaleOrdinal()
            .domain(["GOLD", "SILVER", "BRONZE"])
            .range(["#FFB800", "#E0E0E0", "#DC7F28"])


    useEffect(()=>{
        Promise.all([
            d3.csv("/nodes.csv"), //data
        ])
            .then(([nodes]) => { //dataset is the name we will give the data (you can choose) to access it later
                    //all code that uses the data needs to be inside here!!

            // console.log(dataset)
            
            const svg = d3.select(ref.current)
                    .attr("width",width)
                    .attr("height", height)

            svg.selectAll("*").remove();

            // const g = svg.append("g")
            //         .attr('transform', 'translate(' + width/3 +  ',' + height/2 +')')
            const x = d3.scaleOrdinal()
                .domain(["Archery", "Artistic Gymnastics","Athletics" ,"Badminton","Beach Volleyball", "Boxing", "Canoe Slalom","Canoe Sprint","Cycling BMX Freestyle","Cycling BMX Racing","Cycling Mountain Bike","Cycling Road","Cycling Track","Diving","Equestrian","Fencing","Golf","Judo","Karate","Marathon Swimming","Modern Pentathlon","Rhythmic Gymnastics","Rowing","Sailing","Shooting","Skateboarding","Sport Climbing","Surfing","Swimming","Table Tennis","Taekwondo","Tennis","Trampoline Gymnastics","Triathlon","Weightlifting","Wrestling"])
                .range([0, 35, 70, 105, 140, 175, 210, 245, 280, 315, 350, 385, 420, 455, 490, 525, 560, 595, 630, 665, 700, 735, 770, 805, 840, 875, 910, 945, 980, 1015, 1050, 1085, 1120, 1155, 1190, 1250])
                // .range([0, 3600])

            const node = svg.append("g")
                    .attr('transform', 'translate(' + width/2.5 +  ',' + height/2 +')')
                    .selectAll(".node")
                    .data(nodes)
                    .enter()
                    .append("circle")
                        .classed("node", true)
                        .attr("r", 5)
                        .attr("cx", width / 2)
                        .attr("cy", height / 2)
                        .style("stroke", "white")
                        .style("stroke-width", "1px")
                        .style("fill", function(d){
                            return edgeColors(d.Medal)
                    })
                        .on("click",function(event,d){
                        setData(d)
                    })
                    .on('mouseover', mouseover)
                    .on('mouseout', mouseout)

                    for(let i =0; i < line.length; i++){
                    svg.append("g")
                        .append("line")
                        .style("stroke", "white")
                        .style("stroke-width", 1)
                        .style("stroke-opacity", .8)
                        .attr("x1", function(){
                            return line[i]
                        })
                        // .attr("y1", 240)
                        .attr("y1", function(){
                            return textheight[i] - 13
                        })
                        .attr("x2", function(){
                            return line[i]
                        })
                        .attr("y2", 800)
                    }
                    
                    for(let i =0; i < textcenter.length; i++){
                
                    svg.append("g")
                        .append("text")
                        .text(textcontent[i])
                        .style("fill","white")
                        .style("font-size", 10)
                        .attr("x", function(d){
                                return textcenter[i]
                            
                        })
                        .attr("y", function(){
                            return textheight[i]
                        })
                        // .attr("dx", -10)
                        // .attr("dy", -10)
                        .on('mouseover',function(){
                            d3.select(this)
                            .style('cursor', 'pointer')
                            .style("font-size", 18)
                        })
                        .on('mouseout',function(){
                            d3.select(this)
                            .style("font-size", 10)
                        })
                        // .attr("transform", "translate(100,100)")
                        // .attr("transform", "rotate(50)")
                    }

                        
                    

            const simulation = d3.forceSimulation()
                .force("x", d3.forceX().strength(3).x(function(d){ return x(d.Sport) }))
                .force("y", d3.forceY().strength(.2).y( 10 ))
                .force("center", d3.forceCenter().x(150).y(10)) 
                .force("charge", d3.forceManyBody().strength(-20)) 
                .force("collide", d3.forceCollide().strength(.02).radius(10).iterations(.05))

            simulation.nodes(nodes)
                .on("tick", function(d){
                    node.attr("cx", d => d.x)
                .attr("cy", d => d.y)
                });

            // 建立tooltips
                const tooltips = d3.select("body")
                    .append("div")  
                    .attr("class", "tooltip")            
                    .style('position', 'absolute')
                    .style("visibility", "hidden")
                    .style("background-color", "black")
                    .style("border-radius", "5px")
                    .style("padding", "15px")
                    .style("width", "190px")
                    .style("top","0px")
                    .style("left", "0px");

                function mouseover(event, d){
                         // console.log(d)
                        // console.log(event)
                        d3.select(this) 
                            .style('cursor', 'pointer')
                            .style("stroke","red")
                            .style("stroke-width","2px")
            
                    tooltips.style("visibility", "visible")
                            .html("NAME: " + d.Name + "<br />" + "Sport: " + d.Sport + "<br />" + "Event: " + d.Event + "<br />" + "NOC: " + d.NOC)
                            .style("color","white")
                            .style('left', (event.pageX+10) + "px")
                            .style('top', (event.pageY-90) + "px")
                    }

                    function mouseout(event, d){
                        d3.select(this)
                            .style('stroke', 'none')
                            .style('stroke-width', '0')
                        tooltips.style('visibility', "hidden")
                    }






            })
            
    },[])

    d3.select("#filter")
                .on("click", function(d,e){
                d3.selectAll(".node")
                .transition()
                .duration(800) 
                .style("opacity", function(d){
                    if(d.NOC === countrynode){
                        return 1
                    } else{
                        return 0.3
                    }
                })
        })
            d3.select("#reset")
                .on("click", function (d) {
                    d3.selectAll(".node")
                    .transition()
                    .duration(800)
                    .style("opacity", 1)
            d3.selectAll(".link")
                .transition()
                .duration(800)
                .style("opacity", 1)
        })










    const onChange=(e)=>{
        // e.preventDefault()
        setCountrynode(e.target.value)   
    }

    return (
        <>
            <svg  className="graphs"ref={ref} />
        
            <select id="filter" className="btn-country" onChange={onChange} value={countrynode}> 
            {Countries.map((item)=>{
              return(
                <option key={item.id} value={item.country} >
                    {item.country}
                </option>
            )})}
            </select>
            <button className="btn-all" id="reset">Show All</button>
            <Chart countrynode={countrynode}/>
        </>
    )
}

export default Graph2
