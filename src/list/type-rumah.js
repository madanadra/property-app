import { Typography, CardActionArea, TableContainer, Table, TableHead, TableBody,
    TableRow, TableCell, useMediaQuery, Dialog, DialogTitle, DialogActions, Button, LinearProgress, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { TopBar, Layout } from '../App';

function TypeRumah() {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const api = 'https://inmu-property-api.dgrande.com/api/'
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [type, setType] = useState([])
    const satu = useRef()
    const dua = useRef()

    useEffect(() => {
      setDialog(false);
    }, [isMobile]);

    const loadType = async () => {
      if (!loading) {
        setLoading(true);
      } 
      const result = await axios.get(`${api}type`);
      setType(result.data.types);
      setLoading(false);
      console.log(result);
    }

    useEffect(() => {
      setTimeout(()=>{
       setError(false)
      }, 3000)
    }, [error])

    useEffect(() => {
      loadType();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Content = () => {
      return (<>
        {loading ? <LinearProgress /> :
        <TableContainer sx={{ ...(dialog && {position: 'fixed'}) }}>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Type</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Luas Bangunan</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Luas Tanah</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Created at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { type.length !== 0 ? type.map((item) => 
                <TableRow>
                    <TableCell>{item.luas_b ? item.luas_b : '-'}/{item.luas_t ? item.luas_t : '-'}</TableCell>
                    <TableCell>{item.luas_b ? item.luas_b : '-'} M<sup>2</sup></TableCell>
                    <TableCell>{item.luas_t ? item.luas_t : '-'} M<sup>2</sup></TableCell>
                    <TableCell>{item.created_at ? item.created_at : '-'}</TableCell>
                </TableRow>) : 
                <TableRow>
                    <TableCell colSpan={4} align='center' sx={{ color: '#c0c0c0' }}>Belum ada data</TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>}
      </>);
    }

    const Menu = () => {
      return(<>
        <Typography sx={{ p: '7px 25px', color: '#c0c0c0', fontSize: '15px' }}>Menu</Typography>
        <CardActionArea>
            <Typography sx={{ p: '7px 25px' }} onClick={() => setDialog(true)}>Tambah</Typography>
        </CardActionArea>
    </>);
    }

    const handleType = () => {
      setDialog(false);
      setLoading(true);
      axios.post(`${api}add-type`, 
      {luas_b: satu.current.value,
      luas_t: dua.current.value})
      .then((response) => {
        loadType();
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
    }

    const Dialogs = () => {
      return (
        <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth={isMobile}>
            <DialogTitle>Type Rumah</DialogTitle>
            <TextField inputRef={satu} label="Luas Bangunan" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={dua} label="Luas Tanah" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <DialogActions sx={{ m: '0 7px 5px 0' }}>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => handleType()}>Submit</Button>
            </DialogActions>
        </Dialog>
      );
    }
    
    return (<>
        <TopBar title="Type Rumah" icon={<AddIcon onClick={() => setDialog(true)} />} />
        <Layout center={<Content />} right={<Menu />} />
        <Dialogs />
        {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Gagal menambahkan!</Typography> : []}
    </>);
}
    
export default TypeRumah;