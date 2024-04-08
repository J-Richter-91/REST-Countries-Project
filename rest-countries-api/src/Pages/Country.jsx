import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function Country(){
    const {name} = useParams()
    console.log(name)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`https://restcountries.com/v2/name/${name}?fullText=true`)
        .then(response => {
          if(!response.ok){
            throw new Error('network response failed')
          }
          return response.json()
        })
        .then(data =>{
          setData(data)
          
          
        })
        .catch(error => {
          console.log(error('problem fetching data'))
        })
    
       
    },[name])
    
    console.log(data)

    return(
        <>
            <Header />
            {!data ? (<p>loading</p>) : data.map((item,index) => (
                  <main key={index} className='country-main'>
                  <img className='country-flag' src={item.flags.svg} alt="flag"  />
                  <div className="country-info-container">
                      
                    <div className="info-column-1">
                    <h1>{item.name}</h1>
                        <div className="info-row">
                            <p className='info-title'>Native Name:</p>
                            <p className='info-description'>{item.nativeName}</p>
                        </div>
                        <div className="info-row">
                            <p className='info-title'>Population:</p>
                            <p className='info-description'>{item.population.toLocaleString()}</p>
                        </div>
                        <div className="info-row">
                            <p className='info-title'>Region:</p>
                            <p className='info-description'>{item.region}</p>
                        </div>
                        <div className="info-row">
                            <p className='info-title'>Sub Region:</p>
                            <p className='info-description'>{item.subregion}</p>
                        </div>
                        <div className="info-row">
                            <p className='info-title'>Capital:</p>
                            <p className='info-description'>{item.capital}</p>
                        </div>
                    </div>
                    <div className="info-column-2">
                    <div className="info-row">
                            <p className='info-title'>Top Level Domain:</p>
                            <p className='info-description'>{item.topLevelDomain}</p>
                        </div>
                        <div className="info-row">
                            <p className='info-title'>Currencies:</p>
                            {item.currencies.map((currency,index) => (
                                <p key={index} className='info-description'>{currency.name}</p>
                            ))}
                        </div>
                        <div className="info-row">
                            <p className='info-title'>Languages:</p>
                            {item.languages.map((language,index) => (
                                <p key={index} className='info-description' >{language.name}</p>
                            ))}

                        </div>
                    </div>
                    
                    <div className="border-countries-container">\
                            <ul>
                               
                            </ul>
                    </div> 
                  </div>
              </main>
            ))}
          
        </>
    )
}