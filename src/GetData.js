import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';

function GetData() {
  const [dataFromAPI1, setDataFromAPI1] = useState([]);
  const [dataFromAPI2, setDataFromAPI2] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const[currentpage,setCurrentpage]=useState(1)
  const[postperpage,setPostperpage]=useState(10)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response1 = await axios.get('http://localhost:5000/exchangelist');
        const response2 = await axios.get('http://localhost:5000/exchangeicon');
        console.log(response1.data)
        console.log(response2.data)
        setDataFromAPI1(response1.data);
        setDataFromAPI2(response2.data);
      } catch (error) {
   
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setCombinedData( dataFromAPI1.map((item1) => {
        const matchingItem = dataFromAPI2.find((item2) => item2.exchange_id === item1.exchange_id);
        return { ...item1, ...matchingItem };
      }))
  });
  console.log(combinedData)

  return (
    <>    
<Table data={combinedData} itemsPerPage={postperpage} />

         </>
  )
        }

export default GetData;
