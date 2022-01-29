import React,{useRef,useState,useEffect} from 'react';
import * as d3 from "d3";
import "./Graph.css";
import Countries from './Coutries'
import Chart from './Chart'


const width = 1405
const height = 1080

const Grpah=({setData})=>{
    const ref = useRef()
    const [country, setCountry] =useState("default")
    
    

    const edgeColors = d3.scaleOrdinal()
            .domain(["GOLD", "SILVER", "BRONZE"])
            .range(["#FFB800", "#E0E0E0", "#DC7F28"])
    useEffect(()=>{

    
    

    Promise.all([
            d3.csv("/nodes.csv"), //nodes
             d3.csv("/links.csv")//edges
        ])
            .then(([nodes,links]) => {

                // console.log(nodes)
                // console.log(links)
                

                const svg = d3.select(ref.current)
                    .attr("width",width)
                    .attr("height", height)

                // stop keeping rendering the graphs
                svg.selectAll("*").remove();

                
                
                const g = svg.append("g")
                    .attr('transform', 'translate(' + width/2.5 +  ',' + height/2 +')')


                // g.append("pattern")
                // .attr("id", "avatar")
                // .attr("width", 1)
                // .attr("height", 1)
                // .append("image")
                // .attr("xlink:href", 'http://placekitten.com/g/48/48'
                //         )
                // .attr("x",8)
                // .attr("y",8)
                // .attr("width", 16)
                // .attr("height", 16)








                //create links   
                const link = g.selectAll(".link")
                    .data(links)
                    .join("line")
                    .classed("link", true)
                    .style("fill", "white")
                    .attr("stroke-width", 2)
                    .style("stroke", "white")
                    .style("opacity", 1)

                
                


                //create nodes
                const node = g.selectAll(".node")
                    .data(nodes)
                    .join("circle")
                    .classed("node", true)
                        .attr("r", 8)
                        .style("stroke", "white")
                        .style("stroke-width", "1px")
                        .style("fill", function(d){
                            return edgeColors(d.Medal)
                        })
                        
                        // .style("fill", "url(#avatar)")
                        
                    
                node
                    .on("click",function(event,d){
                        setData(d)
                    })
                    .on('mouseover', mouseover)
                    .on('mouseout', mouseout)
                    

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
                    .style("left", "0px")


                const simulation = d3.forceSimulation(nodes)// Force algorithm is applied to data.nodes
                    .force("link", d3.forceLink().id(function(d) { return d.ID; }).links(links))
                    .velocityDecay(0.1) // 設定摩擦係數
                    // 設定中心點位置
                    .force("center", d3.forceCenter().x(150).y(10))
                    // 設定節點間電荷力
                    .force("charge", d3.forceManyBody().strength(-20))
                    // 設定節點間彼此的互斥力
                    .force("collide", d3.forceCollide().strength(0.3).radius(15).iterations(0.5))
                    .on("tick", ticked);

                    simulation
                    .force("x", d3.forceX()) // 設定Ｘ軸平移位置
                    .force("y", d3.forceY()) // 設定Ｙ軸移動位置

                function ticked() {
                    link
                        .attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node
                        .attr("cx", function (d) { return d.x; })
                        .attr("cy", function(d) { return d.y; });
                }


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
                    .on("click", function(d){
                        d3.selectAll(".node")
                            .transition()
                            .duration(800) 
                            .style("opacity", function(d){
                                if(d.NOC === country){
                                    return 1
                                } else{
                                    return 0.3
                                }
                        })

            d3.selectAll(".link")
            .transition()
            .duration(800) 
            .style("opacity", function(d){
                if(d.NOC === country){
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
        setCountry(e.target.value)   
    }
    


    return (
    <>
            <svg  className="graphs" ref={ref}/>
            
            
                {/* <Graph2 setData={setData}/> */}
            
            <select id="filter" className="btn-country" onChange={onChange} value={country}> 
            {Countries.map((item)=>{
              return(
                <option key={item.id} value={item.country} >
                    {item.country}
                </option>
            )})}
            </select>
            
            <button className="btn-all" id="reset">Show All</button>
            <Chart  country={country} />
              
    </>
    )
}

export default Grpah
