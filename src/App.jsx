import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [city, setCity] = useState()

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not available")
    }
    navigator.geolocation.getCurrentPosition(position => {
      fetchData(position.coords)
    }),
    () => console.log("sorry we can't find your location")
  }

  const fetchData = (coords) => {
    const latitude = coords?.latitude
    const longitude = coords?.longitude
    
    axios.get(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`)
    .then(res => setData(res.data.dataseries))
    .catch(err => console.log(err.message))

    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ca3f4fccceae4afeaef6a921d3b57d82`)
      .then(res => setCity(res.data.results[0].components.city || res.data.results[0].components.county || res.data.results[0].components.town))
      .catch(err => console.log(err.message))

    // axios.get(`https://api.opencagedata.com/geocode/v1/json?q=london&key=ca3f4fccceae4afeaef6a921d3b57d82`)
    // .then(res => console.log(res.data))
    // .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getLocation()
  }, [])

  const date = data[0]?.date.toString()
  const year = Number(date?.slice(0,4))
  const month = Number(date?.slice(4,6))
  const day = Number(date?.slice(7,8))

  const formattedMonth = new Date(year, month -1, day).toDateString().slice(4, 7)
  const formattedDay = new Date(year, month -1, day).toDateString().slice(0, 3)

  const getImages = (weather) => {
    let image
    switch (weather) {
      case 'clear':
        image = 'https://i.imgur.com/D264j9P.png'
        break;

      case 'cloudy':
      case 'pcloudy':
          image = 'https://i.imgur.com/wOcN0i1.png'
          break;
    
      case 'lightrain':
      case 'oshower':
      case 'ishower':
        image = 'https://i.imgur.com/ZXVh9Fa.png'
        break;

      case 'snow':
      case 'rainsnow':
        image = 'https://i.imgur.com/cBrBPgC.png'
        break;

      case 'mcloudy':
        image = 'https://i.imgur.com/37TXAh6.png'
        break;

      case 'humid':
        image = 'https://i.imgur.com/JTmfv07.png'
        break;

      case 'rain':
        image = 'https://i.imgur.com/a5Pox7I.png'
        break;

      default:
        image = 'https://i.imgur.com/D264j9P.png'
        break;
    }
    return image
  }

  return (
    <div className="container-md outer">
      <div className="main mx-md-5 px-md-4 pb-3 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center my-4 mx-4">WEATHER - <span className='fs-3'>{city?.toUpperCase()}</span></h2>  

        <div className="d-flex justify-content-center mb-4">
          <div className="main-card mx-md-2 mx-3 d-flex align-items-center justify-content-evenly">
            <img className="main-card-img" src={getImages(data[0]?.weather)} alt="" />
            <div>
              <h2>{formattedDay} ({day} {formattedMonth})</h2>
              <h4>{data[0]?.temp2m.min} - {data[0]?.temp2m.max} &deg;C</h4>
              <h4>{data[0]?.weather}</h4>
              {/* <p>feels like: 29 C</p>
              <p>min: 23 C</p>
              <p>max: 28 C</p> */}
            </div>
          </div>
        </div>

        
        <div className='other-cards d-flex align-items-center justify-content-center gap-2 gap-md-3 mx-2'>

          {
            data?.slice(1, 4).map((data, _index) => {
              const date = data.date.toString()
              const year = Number(date.slice(0,4))
              const month = Number(date.slice(4,6))
              const day = Number(date.slice(6,8))

              const formattedDate = new Date(year, month -1, day).toDateString().slice(0, 3)

              return (
                <div key={_index} className="other-card p-3 pb-1 d-flex flex-column align-items-center justify-content-center">
                  <img className="other-card-img mb-3 p-md-3" src={getImages(data?.weather)} alt="" />
                  <div key={_index} className='text-center'>
                    <h3>{formattedDate}</h3>
                    <h5>{data?.temp2m.min}-{data?.temp2m.max} &deg;C</h5>
                    <h5>{data?.weather}</h5>
                  </div>
                </div>
              );
            })
          }

        </div> 

      </div>
    </div>

  )
}

export default App