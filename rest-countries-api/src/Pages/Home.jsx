import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import Header from "../components/Header"

export default function Home(){
    
        const [data, setData] = useState([])
        const [pages, setPages] = useState(0)
        const [currentPage, setCurrentPage] = useState(1)
        const [region,setRegion] = useState()
        const [country, setCountry] = useState()
      
        function handlePageChange(page){
          setCurrentPage(page + 1)
        }
        
        console.log(currentPage)
        
      
        const cards =  (page) => {
          const startIndex = page * 8
          const endIndex = startIndex + 8
          return (
            data.slice(startIndex,endIndex).map((item,index) => (
            <Link to={`/Country/${item.name}`}>
              <div key={index} className="card-container">
                <img className='flag' src={item.flags.png}></img>
                <h2 className="card-title">{item.name}</h2>
                <p className="card-info-title">Population: <span className="card-info-description">{item.population.toLocaleString()}</span></p>
                <p className="card-info-title">Region:<span className="card-info-description">{item.region}</span></p>
                <p className="card-info-title">Capital:<span className="card-info-description">{item.capital}</span></p>
              </div>
            </Link>
            ))
          )
        }

        console.log(country)
      
     
      
        useEffect(() => {
          fetch(region ? `https://restcountries.com/v2/region/${region}` : country ? `https://restcountries.eu/rest/v2/name/Brazil` : 'https://restcountries.com/v2/all')
          .then(response => {
            if(!response.ok){
              throw new Error('network response failed')
            }
            return response.json()
          })
          .then(data =>{
            setData(data)
            setPages(Math.floor(data.length / 8))
            
          })
          .catch(error => {
            console.log(error('problem fetching data'))
          })
      
        }
       
        ,[region,country])
      
        console.log(data)
        
      
        function filterRegion(){
          const region = event.target.value
          //const filteredData = region ? data.filter(item => item.continents.includes(region)) : data;
          setRegion(region)
          setCurrentPage(1)
        }
      
      
      
      const pagesArray = []
      for(let i = 1; i <= pages; i++){
        pagesArray.push(i);
      }

      function handleSearch(e){
        const input = e.target.value.trim()
        if(e.key === 'Enter'){
          setCountry(input)
          setRegion('')
        }
        
      }
      
      
        return (
          <>
           <Header />
      
            <div className="selections-container">
             
              
              <select onChange={() => filterRegion()} name="regions" id="regions-select">
                <option  value='' >Filter by Region</option>
                <option value='Africa' >Africa</option>
                <option value='Americas' >America</option>
                <option value='Asia' >Asia</option>
                <option value='Europe' >Europe</option>
                <option value='Oceania' >Oceania</option>
              </select>
            </div>
            <main>
            {cards(currentPage)}
      
              
              
            </main>
            <ul>
            {pagesArray.map((item,index) => (
              <li onClick={() => handlePageChange(index)} key={index}>{item}</li>
            ))}
            </ul>
          
          </>
        )
      }
      
    