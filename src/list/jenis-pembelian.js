import { Typography, CardActionArea, TableContainer, Table, TableHead, TableBody,
    TableRow, TableCell, useMediaQuery, Dialog, DialogTitle, DialogActions, Button, LinearProgress, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { TopBar, Layout } from '../App';

function JenisPembelian() {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const api = 'https://inmu-property-api.dgrande.com/api/'
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [jpembelian, setJpembelian] = useState([])
    const satu = useRef()

    useEffect(() => {
      setDialog(false);
    }, [isMobile]);

    const loadJpembelian = async () => {
      if (!loading) {
        setLoading(true);
      } 
      const result = await axios.get(`${api}jenis-pembelian`);
      setJpembelian(result.data.jpembelians);
      setLoading(false);
      console.log(result);
    }

    useEffect(() => {
      setTimeout(()=>{
       setError(false)
      }, 3000)
    }, [error])

    useEffect(() => {
        loadJpembelian();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    const Content = () => {
      return (<>
        {loading ? <LinearProgress /> :
        <TableContainer sx={{ ...(dialog && {position: 'fixed'}) }}>
          <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Nama</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Created at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { jpembelian.length !== 0 ? jpembelian.map((item) => 
                <TableRow>
                    <TableCell>{item.nama ? item.nama : '-'}</TableCell>
                    <TableCell>{item.created_at ? item.created_at : '-'}</TableCell>
                </TableRow>) : 
                <TableRow>
                    <TableCell colSpan={2} align='center' sx={{ color: '#c0c0c0' }}>Belum ada data</TableCell>
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

    const handleJpembelian = () => {
      setDialog(false);
      setLoading(true);
      axios.post(`${api}add-jpembelian`, 
      {nama: satu.current.value})
      .then((response) => {
        loadJpembelian();
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
    }

    const Dialogs = () => {
      return (
        <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth={isMobile}>
            <DialogTitle>Jenis Pembelian</DialogTitle>
            <TextField inputRef={satu} label="Nama" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <DialogActions sx={{ m: '0 7px 5px 0' }}>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => handleJpembelian()}>Submit</Button>
            </DialogActions>
        </Dialog>
      );
    }
    
    return (<>
        <TopBar title="Jenis Pembelian" icon={<AddIcon onClick={() => setDialog(true)} />} />
        <Layout center={<Content />} right={<Menu />} />
        <Dialogs />
        {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Gagal menambahkan!</Typography> : []}
    </>);
}
    
export default JenisPembelian;