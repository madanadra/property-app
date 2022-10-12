import { MenuItem, TextField, Box, Button, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TopBar, Layout } from '../App';

function GantiKavling() {
    const api = 'http://inmu-property-api.dgrande.com/api/'
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [houses, setHouses] = useState([])
    const [options, setOptions] = useState([])
    const old = useRef()
    const recent = useRef()

    useEffect(() => {
      setTimeout(()=>{
       setError(false)
      }, 3000)
    }, [error])

    const loadGantiKavling = async () => {
      if (!loading) {
        setLoading(true);
      } 
      const result = await axios.get(`${api}ganti-kavling`);
      setHouses(result.data.houses);
      setOptions(result.data.options);
      setLoading(false);
      console.log(result);
    }

    useEffect(() => {
      loadGantiKavling();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleGantiKavling = () => {
      setLoading(true);
      axios.post(`${api}edit-ganti-kavling`, 
      {old: old.current.value,
      recent: recent.current.value})
      .then((response) => {
        loadGantiKavling();
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
    }

    const Content = () => {
      return (<>
        {loading ? <LinearProgress sx={{ width: '100%' }} /> : 
        <Box sx={{ p: '30px', display: 'grid' }}>
        <TextField inputRef={old} label="Customer" select sx={{ my: '10px' }} size="small">
          {houses.map(house => <MenuItem value={house.house_id}>{house.nama} - {house.blok}/{house.no}</MenuItem>)}
        </TextField>
        <TextField inputRef={recent} label="Kavling Baru" select sx={{ my: '10px' }} size="small">
          {options.map(option => <MenuItem value={option.id}>{option.blok}/{option.no}</MenuItem>)}
        </TextField>
        <Button variant="contained" sx={{ m: '10px 0 10px auto', width: 'max-content' }} 
        onClick={() => handleGantiKavling()}>Submit</Button>
        </Box>}
      </>);
    }

    return (<>
      <TopBar title="Ganti Kavling" />
      <Layout center={<Content />} />
      {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Gagal mengganti!</Typography> : []}
    </>);
}
    
export default GantiKavling;