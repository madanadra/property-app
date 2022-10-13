import { Grid, Box, Typography, LinearProgress, CardActionArea, SwipeableDrawer, InputAdornment, Select, MenuItem,
    useMediaQuery, Dialog, DialogTitle, DialogActions, Button, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TopBar, Layout, House } from './App';

function Detail() {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const api = 'https://inmu-property-api.dgrande.com/api/'
    const [drawer, setDrawer] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {id} = useParams()
    const [customer, setCustomer] = useState([])
    const [house, setHouse] = useState([])
    const [type, setType] = useState([])
    const [menu, setMenu] = useState('')
    const ket = useRef()
    const panjang = useRef()
    const lebar = useRef()
    const harga_m = useRef()
    const nama = useRef()
    const email = useRef()
    const telp = useRef()
    const fee = useRef()
    const date = new Date().toISOString().slice(0, 10)

    useEffect(() => {
      if (!isMobile) {
        setDrawer(false);
      }
      setDialog(false);
    }, [isMobile]);

    const loadHouse = async () => {
      if (!loading) {
        setLoading(true);
      } 
      const result = await axios.get(`${api}detail/${id}`);
      setCustomer(result.data.customer);
      setHouse(result.data.item);
      setType(result.data.type);
      setLoading(false);
      console.log(result);
    }

    useEffect(() => {
      setTimeout(()=>{
       setError(false)
      }, 3000)
    }, [error])

  
    const handleHook = async () => {
      setDialog(false);
      setLoading(true);
      await axios.patch(`${api}hook/${id}`, 
      {keterangan: ket.current.value,
      panjang: panjang.current.value,
      lebar: lebar.current.value,
      harga_m: harga_m.current.value});
      loadHouse();
    }
  
    const handleStatus = async (evt) => {
      setDialog(false);
      setLoading(true);
      await axios.patch(`${api}update-status/${id}`, {status: evt});
      loadHouse();
    }
  
    const handleBooking = () => {
      setDialog(false);
      setLoading(true);
      axios.post(`${api}booking/${id}`, 
      {nama: nama.current.value,
      email: email.current.value,
      telp: telp.current.value,
      fee: fee.current.value})
      .then((response) => {
        loadHouse();
      })
      .catch((error) => {
        setLoading(false)
        setError(true)
      });
    }
  
    const handlePemberkasan = async () => {
      setDialog(false);
      setLoading(true);
      await axios.patch(`${api}pemberkasan/${id}`);
      loadHouse();
    }
  
    const handleWawancara = async () => {
      setDialog(false);
      setLoading(true);
      await axios.patch(`${api}wawancara/${id}`);
      loadHouse();
    }

    const handleOts = async () => {
      setDialog(false);
      setLoading(true);
      await axios.patch(`${api}ots/${id}`, {tgl_ots: date});
      loadHouse();
    }

    const handleSp3k = async () => {
      setDialog(false);
      setLoading(true);
      await axios.patch(`${api}sp3k/${id}`, {tgl_sp3k: date});
      loadHouse();
    }

    const handleAkad = async (e) => {
      setDialog(false);
      setLoading(true);
      await axios.patch(`${api}akad/${id}`, {akad_via: e, tgl_akad: date});
      loadHouse();
    }
  
    useEffect(() => {
      loadHouse();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const Content = () => {
      return (<>
        {loading ? <LinearProgress sx={{ width: '100%' }} /> : 
        <Grid container sx={{ p: '20px', ...(dialog && {position: 'fixed'}), ...(drawer && {position: 'fixed'}) }}>
          <Grid item md={4} xs={5} sx={{ px: 1, mb: 2, backgroundColor: 'rgb(250, 250, 250)', borderRadius: '2px' }}>
            <House status={house.status} />
          </Grid>
          <Grid item md={8} xs={7} sx={{ pl: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography sx={{ my: '10px' }}>ID : {id && house ? house.id : '-'}</Typography>
              <Typography sx={{ my: '10px' }}>Blok : {id && house ? house.blok : '-'}</Typography>
              <Typography sx={{ my: '10px' }}>No. Rumah : {id && house ? house.no : '-'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ m: '15px 0 10px 0', color: '#c0c0c0', fontSize: '15px' }}>Detail Rumah</Typography>
            <Typography sx={{ my: '10px' }}>Type : {id && type ? <>{type.luas_b}/{type.luas_t}</> : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Keterangan : {id && house.keterangan ? house.keterangan : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Luas Hook : {id && house.panjang ? <>{house.panjang*house.lebar} M<sup>2</sup></> : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Harga/M<sup>2</sup> : {id && house.harga_m ? house.harga_m : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Harga Jual : {id && house ? house.harga : '-'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ m: '15px 0 10px 0', color: '#c0c0c0', fontSize: '15px' }}>Detail Status</Typography>
            <Typography sx={{ my: '10px' }}>Status : {id && house ? house.status : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Tanggal Booking : {id && customer ? customer.created_at : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Tanggal OTS : {id && house.tgl_ots ? house.tgl_ots : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Tanggal SP3K : {id && house.tgl_sp3k ? house.tgl_sp3k : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Tanggal Akad: {id && house.tgl_akad ? house.tgl_akad : '-'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ m: '15px 0 10px 0', color: '#c0c0c0', fontSize: '15px' }}>Detail Customer</Typography>
            <Typography sx={{ my: '10px' }}>ID Customer : {id && customer ? customer.id : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Nama : {id && customer ? customer.nama : '-'}</Typography>
            <Typography sx={{ my: '10px' }}>Email : {id && customer ? customer.email : '-'}</Typography>
          </Grid>
        </Grid>}
      </>);
    }
  
    const handleMenu = (content) => {
      setDialog(true); 
      setDrawer(false); 
      setMenu(content)
    }
  
    const Menu = () => {
      return(<>
        <Typography sx={{ p: '7px 25px', color: '#c0c0c0', fontSize: '15px' }}>Menu</Typography>
        <CardActionArea>
            <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<Hook />)}>Hook</Typography>
        </CardActionArea>
        <CardActionArea>
            <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<Status />)}>Status</Typography>
        </CardActionArea>
        <CardActionArea sx={{ ...(house.status !== 'yang dipasarkan' && {display: 'none'}) }}>
          <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<Booking />)}>Booking</Typography>
        </CardActionArea>
        <CardActionArea sx={{ ...(house.status === 'belum siap jual' && {display: 'none'}), ...(house.status === 'siap jual' && {display: 'none'}), ...(house.status === 'yang dipasarkan' && {display: 'none'}) }}>
          <Typography sx={{ p: '7px 25px' }}>SPR</Typography>
        </CardActionArea>
        <CardActionArea sx={{ ...(house.status === 'belum siap jual' && {display: 'none'}), ...(house.status === 'siap jual' && {display: 'none'}), ...(house.status === 'yang dipasarkan' && {display: 'none'}) }}>
          <Typography sx={{ p: '7px 25px' }}>Pembayaran</Typography>
        </CardActionArea>
        <CardActionArea sx={{ ...(house.status !== 'booking' && {display: 'none'}) }}>
          <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<Pemberkasan />)}>Pemberkasan</Typography>
        </CardActionArea>
        <CardActionArea sx={{ ...(house.status !== 'pemberkasan' && {display: 'none'}) }}>
          <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<Wawancara />)}>Wawancara</Typography>
        </CardActionArea>
        <CardActionArea sx={{ ...(house.status !== 'wawancara' && {display: 'none'}) }}>
          <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<Ots />)}>OTS</Typography>
        </CardActionArea>
        <CardActionArea sx={{ ...(house.status !== 'ots' && {display: 'none'}) }}>
          <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<Sp3k />)}>SP3K</Typography>
        </CardActionArea>
        <CardActionArea sx={{ ...(house.status !== 'sp3k' && {display: 'none'}) }}>
          <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<Akad />)}>Akad</Typography>
        </CardActionArea>
    </>);
    }

    const Dialogs = () => {
      return (
        <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth={isMobile}>
          {menu}
        </Dialog>
      );
    }
  
    const Hook = () => {
      return (
        <>
          <DialogTitle>Hook</DialogTitle>
          <Select inputRef={ket} displayEmpty inputProps={{ 'aria-label': 'Without label' }} defaultValue={house.keterangan} size="small" sx={{ m: '0 30px 10px 30px' }}>
            <MenuItem value="">-</MenuItem>
            <MenuItem value="hook">Hook</MenuItem>
            <MenuItem value="kelebihan tanah">Kelebihan Tanah</MenuItem>
          </Select>
          <TextField inputRef={panjang} type="number" label="Panjang" defaultValue={house.panjang} variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
          <TextField inputRef={lebar} type="number" label="Lebar" defaultValue={house.lebar} variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
          <TextField inputRef={harga_m} InputProps={{startAdornment: <InputAdornment position="start">Rp</InputAdornment>}} type="number" 
          label={<>Harga/M<sup>2</sup></>} defaultValue={house.harga_m} variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
          <DialogActions sx={{ m: '0 7px 5px 0' }}>
            <Button onClick={() => setDialog(false)}>Cancel</Button>
            <Button onClick={() => handleHook()}>Submit</Button>
          </DialogActions>
        </>
      );
    }
  
    const Status = () => {
      return (
        <>
          <DialogTitle>Status</DialogTitle>
          <RadioGroup defaultValue={house.status} sx={{ m: '0 20px 20px 30px' }} onChange={(e) => handleStatus(e.target.value)}>
            <FormControlLabel value="belum siap jual" label="Belum siap jual" control={<Radio />} />
            <FormControlLabel value="siap jual" label="Siap jual" control={<Radio />} />
            <FormControlLabel value="yang dipasarkan" label="Yang dipasarkan" control={<Radio />} />
          </RadioGroup>
        </>
      );
    }
  
    const Booking = () => {
      return (
        <>
          <DialogTitle>Booking</DialogTitle>
          <TextField inputRef={nama} label="Nama Customer" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
          <TextField inputRef={email} type="email" label="Email" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
          <TextField inputRef={telp} type="tel" label="Telephone" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
          <TextField inputRef={fee} InputProps={{startAdornment: <InputAdornment position="start">Rp</InputAdornment>}} type="number" defaultValue="2000000" 
          label="Jumlah yang dibayar" variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
          <DialogActions sx={{ m: '0 7px 5px 0' }}>
            <Button onClick={() => setDialog(false)}>Cancel</Button>
            <Button onClick={() => handleBooking()}>Submit</Button>
          </DialogActions>
        </>
      );
    }
  
    const Pemberkasan = () => {
      return (
        <>
          <DialogTitle>Memasuki tahap pemberkasan</DialogTitle>
          <DialogActions sx={{ m: '0 7px 5px 0' }}>
            <Button onClick={() => setDialog(false)}>Cancel</Button>
            <Button onClick={() => handlePemberkasan()}>Oke</Button>
          </DialogActions>
        </>
      );
    }
  
    const Wawancara = () => {
      return (
        <>
          <DialogTitle>Memasuki tahap wawancara</DialogTitle>
          <DialogActions sx={{ m: '0 7px 5px 0' }}>
            <Button onClick={() => setDialog(false)}>Cancel</Button>
            <Button onClick={() => handleWawancara()}>Oke</Button>
          </DialogActions>
        </>
      );
    }

    const Ots = () => {
      return (
        <>
          <DialogTitle>Memasuki tahap OTS</DialogTitle>
          <DialogActions sx={{ m: '0 7px 5px 0' }}>
            <Button onClick={() => setDialog(false)}>Cancel</Button>
            <Button onClick={() => handleOts()}>Oke</Button>
          </DialogActions>
        </>
      );
    }

    const Sp3k = () => {
      return (
        <>
          <DialogTitle>Memasuki tahap SP3K</DialogTitle>
          <DialogActions sx={{ m: '0 7px 5px 0' }}>
            <Button onClick={() => setDialog(false)}>Cancel</Button>
            <Button onClick={() => handleSp3k()}>Oke</Button>
          </DialogActions>
        </>
      );
    }

    const Akad = () => {
      return (
        <>
          <DialogTitle>Akad</DialogTitle>
          <RadioGroup sx={{ m: '0 20px 20px 30px' }} onChange={(e) => handleAkad(e.target.value)}>
            <FormControlLabel value="akad via kpr" label="Akad Via KPR" control={<Radio />} />
            <FormControlLabel value="akad via cash" label="Akad Via Cash" control={<Radio />} />
          </RadioGroup>
        </>
      );
    }

    return (<>
      <TopBar title={loading ? '-' : <>{house.blok}/{house.no}</>} icon={<MoreVertIcon onClick={() => setDrawer(true)} />} />
      <Layout center={<Content />} right={<Menu />} />
      <SwipeableDrawer sx={{ display: { xs: 'block', md: 'none' } }} PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
          anchor="bottom" open={drawer} onClose={() => setDrawer(false)} disableSwipeToOpen>
          <Box sx={{ py: '5px', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#ffffff' }}><Menu /></Box>
      </SwipeableDrawer>
      <Dialogs />
      {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Gagal input!</Typography> : []}
    </>);
}
    
export default Detail;