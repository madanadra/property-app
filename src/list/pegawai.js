import { Typography, CardActionArea, TableContainer, Table, TableHead, TableBody,
    TableRow, TableCell, useMediaQuery, Dialog, DialogTitle, DialogActions, Button, LinearProgress, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { TopBar, Layout } from '../App';

function Pegawai() {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const api = 'https://inmu-property-api.dgrande.com/api/'
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pegawai, setPegawai] = useState([])
    const [error, setError] = useState(false)
    const satu = useRef()
    const dua = useRef()
    const tiga = useRef()
    const empat = useRef()
    const lima = useRef()

    useEffect(() => {
      setDialog(false);
    }, [isMobile]);

    const loadPegawai = async () => {
      if (!loading) {
        setLoading(true);
      } 
      const result = await axios.get(`${api}pegawai`);
      setPegawai(result.data.pegawais);
      setLoading(false);
      console.log(result);
    }

    useEffect(() => {
      setTimeout(()=>{
       setError(false)
      }, 3000)
    }, [error])

    useEffect(() => {
      loadPegawai();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Content = () => {
      return (<>
        {loading ? <LinearProgress /> :
        <TableContainer sx={{ ...(dialog && {position: 'fixed'}) }}>
          <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Nama</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Email</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Alamat</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Telephone</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgb(250, 250, 250)' }}>Created at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { pegawai.length !== 0 ? pegawai.map((item) => 
                <TableRow>
                    <TableCell>{item.name ? item.name : '-'}</TableCell>
                    <TableCell>{item.email ? item.email : '-'}</TableCell>
                    <TableCell>{item.alamat ? item.alamat : '-'}</TableCell>
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

    const handlePegawai = () => {
      setDialog(false);
      setLoading(true);
      axios.post(`${api}add-pegawai`, 
      {name: satu.current.value,
      email: dua.current.value,
      password: tiga.current.value,
      alamat: empat.current.value,
      telp: lima.current.value})
      .then((response) => {
        loadPegawai();
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
    }

    const Dialogs = () => {
      return (
        <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth={isMobile}>
            <DialogTitle>Pegawai</DialogTitle>
            <TextField inputRef={satu} label="Nama" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={dua} label="Email" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={tiga} type="password" label="Password" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={empat} label="Alamat" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <TextField inputRef={lima} label="Telephone" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <DialogActions sx={{ m: '0 7px 5px 0' }}>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => handlePegawai()}>Submit</Button>
            </DialogActions>
        </Dialog>
      );
    }
    
    return (<>
        <TopBar title="Pegawai" icon={<AddIcon onClick={() => setDialog(true)} />} />
        <Layout center={<Content />} right={<Menu />} />
        <Dialogs />
        {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Gagal menambahkan!</Typography> : []}
    </>);
}
    
export default Pegawai;