import { Typography, CardActionArea, TableContainer, Table, TableHead, TableBody,
    TableRow, TableCell, useMediaQuery, Dialog, DialogTitle, DialogActions, Button, LinearProgress, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { TopBar, Layout } from '../App';

function InstansiCustomer() {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const api = 'http://inmu-property-api.dgrande.com/api/'
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [instansi, setInstansi] = useState([])
    const satu = useRef()
    const dua = useRef()
    const tiga = useRef()
    const empat = useRef()

    useEffect(() => {
      setDialog(false);
    }, [isMobile]);

    const loadInstansi = async () => {
      if (!loading) {
        setLoading(true);
      } 
      const result = await axios.get(`${api}instansi-customer`);
      setInstansi(result.data.instansis);
      setLoading(false);
      console.log(result);
    }

    useEffect(() => {
      setTimeout(()=>{
       setError(false)
      }, 3000)
    }, [error])

    useEffect(() => {
      loadInstansi();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Content = () => {
      return (<>
        {loading ? <LinearProgress /> :
        <TableContainer sx={{ ...(dialog && {position: 'fixed'}) }}>
          <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Nama</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Alamat</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Koordinator</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Telephone</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Created at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { instansi.length !== 0 ? instansi.map((item) => 
                <TableRow>
                    <TableCell>{item.nama ? item.nama : '-'}</TableCell>
                    <TableCell>{item.alamat ? item.alamat : '-'}</TableCell>
                    <TableCell>{item.koordinator ? item.koordinator : '-'}</TableCell>
                    <TableCell>{item.telp ? item.telp : '-'}</TableCell>
                    <TableCell>{item.created_at ? item.created_at : '-'}</TableCell>
                </TableRow>) : 
                <TableRow>
                    <TableCell colSpan={5} align='center' sx={{ color: '#c0c0c0' }}>Belum ada data</TableCell>
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

    const handleInstansi = () => {
      setDialog(false);
      setLoading(true);
      axios.post(`${api}add-instansi`, 
      {nama: satu.current.value,
      alamat: dua.current.value,
      koordinator: tiga.current.value,
      telp: empat.current.value})
      .then((response) => {
        loadInstansi();
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
    }

    const Dialogs = () => {
      return (
        <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth={isMobile}>
            <DialogTitle>Instansi Customer</DialogTitle>
            <TextField inputRef={satu} label="Nama" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={dua} label="Alamat" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={tiga} label="Koordinator" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={empat} label="Telephone" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <DialogActions sx={{ m: '0 7px 5px 0' }}>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => handleInstansi()}>Submit</Button>
            </DialogActions>
        </Dialog>
      );
    }
    
    return (<>
        <TopBar title="Instansi Customer" icon={<AddIcon onClick={() => setDialog(true)} />} />
        <Layout center={<Content />} right={<Menu />} />
        <Dialogs />
        {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Gagal menambahkan!</Typography> : []}
    </>);
}
    
export default InstansiCustomer;