import { Grid, Box, Typography, LinearProgress, CardActionArea, SwipeableDrawer, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import HouseIcon from '@mui/icons-material/House';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TopBar, Layout, House, Left } from './App';

function Home() {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const api = 'http://inmu-property-api.dgrande.com/api/'
    const [bottom, setBottom] = useState(false)
    const [left, setLeft] = useState(false)
    const [loading, setLoading] = useState(false)
    const [keterangan, setKeterangan] = useState([])
    const [houses, setHouses] = useState([])

    useEffect(() => {
        if (!isMobile) {
          setBottom(false);
          setLeft(false);
        }
      }, [isMobile]);

    const loadHouses = async () => {
      setLoading(true);
      const res = await axios.get(`${api}index`);
      setKeterangan(res.data);
      setHouses(res.data.houses);
      setLoading(false);
      console.log(res);
    }

    useEffect(() => {
      loadHouses();
    }, []);

    const Content = () => {
      return (<>
        {loading ? <LinearProgress sx={{ width: '100%' }} /> : 
        <Grid container sx={{ p: '15px', ...(bottom && {position: 'fixed'}), ...(left && {position: 'fixed'}) }}>{houses.map(house => 
          <CardActionArea sx={{ borderRadius: '3px', textAlign: 'center', width: '10%', ...(isMobile && {width: '20%'}) }}>
            <Link to={`/detail/${house.id}`} style={{ textDecoration: 'none', color: '#333' }}>
              <House status={house.status} />
              <Typography sx={{ mt: '-11px' }}>{house.blok}/{house.no}</Typography>
            </Link>
          </CardActionArea>)}
        </Grid>}
      </>);
    }
  
    const Keterangan = () => {
      return (<>
        <Typography sx={{ p: '7px 25px', color: '#c0c0c0', fontSize: '15px' }}>Keterangan</Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HomeOutlinedIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'red' }} />Belum Siap Jual : {keterangan.bsj}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HomeOutlinedIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'green' }} />Siap Jual : {keterangan.sj}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HomeOutlinedIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'blue' }} />Yang Dipasarkan : {keterangan.yp}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HouseSidingIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'red' }} />Booking : {keterangan.b}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HouseSidingIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'green' }} />Pemberkasan : {keterangan.p}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HouseSidingIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'blue' }} />Wawancara : {keterangan.w}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HomeIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'red' }} />OTS : {keterangan.ots}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HomeIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'green' }} />SP3K : {keterangan.sp3k}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HomeIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'blue' }} />Akad Via KPR : {keterangan.avk}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          <HouseIcon sx={{ m: '0 5px -5px 0', width: '25px', height: '25px', color: 'black' }} />Akad Via Cash : {keterangan.avc}
        </Typography>
        <Typography sx={{ p: '7px 25px' }}>
          Total : {keterangan.bsj+keterangan.sj+keterangan.yp+keterangan.b+keterangan.p+keterangan.w+keterangan.ots+keterangan.sp3k+keterangan.avk+keterangan.avc}
        </Typography>
      </>);
    }

    return (<>
      <TopBar home={<MenuIcon sx={{ m: '0 22px -5px 0' }} onClick={() => setLeft(true)} />} title="Property App" icon={<InfoIcon onClick={() => setBottom(true)} />} />
      <Layout center={<Content />} right={<Keterangan />} />
      <SwipeableDrawer sx={{ display: { xs: 'block', md: 'none' } }} PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
          anchor="bottom" open={bottom} onClose={() => setBottom(false)} disableSwipeToOpen>
          <Box sx={{ py: '5px', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#ffffff' }}><Keterangan /></Box>
      </SwipeableDrawer>
      <SwipeableDrawer sx={{ display: { xs: 'block', md: 'none' } }} anchor="left" open={left} onClose={() => setLeft(false)} disableSwipeToOpen>
        <Box sx={{ py: '5px', width: '75vw' }}><Left /></Box>
      </SwipeableDrawer>
    </>);
}
    
export default Home;