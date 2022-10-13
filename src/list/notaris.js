import { Typography, CardActionArea, TableContainer, Table, TableHead, TableBody,
    TableRow, TableCell, useMediaQuery, Dialog, DialogTitle, DialogActions, Button, LinearProgress, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { TopBar, Layout } from '../App';

function Notaris() {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const api = 'https://inmu-property-api.dgrande.com/api/'
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [notaris, setNotaris] = useState([])
    const satu = useRef()
    const dua = useRef()
    const tiga = useRef()

    useEffect(() => {
      setDialog(false);
    }, [isMobile]);

    const loadNotaris = async () => {
      if (!loading) {
        setLoading(true);
      } 
      const result = await axios.get(`${api}notaris`);
      setNotaris(result.data.notarises);
      setLoading(false);
      console.log(result);
    }

    useEffect(() => {
      setTimeout(()=>{
       setError(false)
      }, 3000)
    }, [error])

    useEffect(() => {
      loadNotaris();
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
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Telephone</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Created at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { notaris.length !== 0 ? notaris.map((item) => 
                <TableRow>
                    <TableCell>{item.nama ? item.nama : '-'}</TableCell>
                    <TableCell>{item.alamat ? item.alamat : '-'}</TableCell>
                    <TableCell>{item.telp ? item.telp : '-'}</TableCell>
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

    const handleNotaris = () => {
      setDialog(false);
      setLoading(true);
      axios.post(`${api}add-notaris`, 
      {nama: satu.current.value,
      alamat: dua.current.value,
      telp: tiga.current.value})
      .then((response) => {
        loadNotaris();
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
    }

    const Dialogs = () => {
      return (
        <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth={isMobile}>
            <DialogTitle>Notaris</DialogTitle>
            <TextField inputRef={satu} label="Nama" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={dua} label="Alamat" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={tiga} label="Telephone" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <DialogActions sx={{ m: '0 7px 5px 0' }}>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => handleNotaris()}>Submit</Button>
            </DialogActions>
        </Dialog>
      );
    }
    
    return (<>
        <TopBar title="Notaris" icon={<AddIcon onClick={() => setDialog(true)} />} />
        <Layout center={<Content />} right={<Menu />} />
        <Dialogs />
        {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Gagal menambahkan!</Typography> : []}
    </>);
}
    
export default Notaris;