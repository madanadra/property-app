import { Grid, Typography, ThemeProvider, createTheme, AppBar, Toolbar, CardActionArea } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import HouseIcon from '@mui/icons-material/House';
import ViewListIcon from '@mui/icons-material/ViewList';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Detail from './detail';
import TypeRumah from './list/type-rumah';
import JenisPembelian from './list/jenis-pembelian';
import InstansiCustomer from './list/instansi-customer';
import Pegawai from './list/pegawai';
import Notaris from './list/notaris';
import GantiKavling from './edit/ganti-kavling';
import Profile from './profile';

export const House = (props) => {
  if (props.status === "belum siap jual") {
    return (
      <HomeOutlinedIcon sx={{ width: '100%', height: 'auto', color: 'red' }} />
    );
  } else if (props.status === "siap jual") {
    return (
      <HomeOutlinedIcon sx={{ width: '100%', height: 'auto', color: 'green' }} />
    );
  } else if (props.status === "yang dipasarkan") {
    return (
      <HomeOutlinedIcon sx={{ width: '100%', height: 'auto', color: 'blue' }} />
    );
  } else if (props.status === "booking") {
    return (
      <HouseSidingIcon sx={{ width: '100%', height: 'auto', color: 'red' }} />
    );
  } else if (props.status === "pemberkasan") {
    return (
      <HouseSidingIcon sx={{ width: '100%', height: 'auto', color: 'green' }} />
    );
  } else if (props.status === "wawancara") {
    return (
      <HouseSidingIcon sx={{ width: '100%', height: 'auto', color: 'blue' }} />
    );
  } else if (props.status === "ots") {
    return (
      <HomeIcon sx={{ width: '100%', height: 'auto', color: 'red' }} />
    );
  } else if (props.status === "sp3k") {
    return (
      <HomeIcon sx={{ width: '100%', height: 'auto', color: 'green' }} />
    );
  } else if (props.status === "akad via kpr") {
    return (
      <HomeIcon sx={{ width: '100%', height: 'auto', color: 'blue' }} />
    );
  } else if (props.status === "akad via cash") {
    return (
      <HouseIcon sx={{ width: '100%', height: 'auto', color: 'black' }} />
    );
  } else {
    return (<></>);
  }
}

export const TopBar = (props) => {
  const path = useLocation()

  return ( 
  <AppBar position='sticky' color='inherit' elevation={0} sx={{ display: { md: 'none' }, borderBottom: '1px solid #d9d9d9' }}>
    <Toolbar sx={{ px: '15px', justifyContent: 'space-between' }} variant='dense'>
      <Typography sx={{ fontSize: '22px' }}>
        {path.pathname === '/' ? props.home : 
        <Link to="/" style={{ color: '#333' }}><ArrowBackIcon sx={{ m: '0 22px -5px 0' }} /></Link>}{props.title}
      </Typography>
      {props.icon}
    </Toolbar>
  </AppBar>
  );
}

export const Left = () => {
  const path = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.reload(false)
  }

  return (<>
    <Typography sx={{ fontSize: '23px', p: '5px 30px', display: { xs: 'none', md: 'block' } }}>Property App</Typography>
    <CardActionArea sx={{ display: { xs: 'none', md: 'block' } }}><Link to="/" style={{ color: '#333', textDecoration: 'none' }}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', ...(path.pathname === '/' && {color: '#1976d2'}), ...(path.pathname.includes('/detail') && {color: '#1976d2'}) }}>Home</Typography>
    </Link></CardActionArea>
    <Typography sx={{ fontSize: '15px', p: '3px 30px', mt: '5px', color: '#c0c0c0' }}><ViewListIcon sx={{ m: '0 5px -4px 0', fontSize: '21px' }} />List</Typography>
    <CardActionArea><Link to="/list/type-rumah" style={{ color: '#333', textDecoration: 'none' }}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', ...(path.pathname === '/list/type-rumah' && {color: '#1976d2'}) }}>Type Rumah</Typography>
    </Link></CardActionArea>
    <CardActionArea><Link to="/list/jenis-pembelian" style={{ color: '#333', textDecoration: 'none' }}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', ...(path.pathname === '/list/jenis-pembelian' && {color: '#1976d2'}) }}>Jenis Pembelian</Typography>
    </Link></CardActionArea>
    <CardActionArea><Link to="/list/instansi-customer" style={{ color: '#333', textDecoration: 'none' }}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', ...(path.pathname === '/list/instansi-customer' && {color: '#1976d2'}) }}>Instansi Customer</Typography>
    </Link></CardActionArea>
    <CardActionArea><Link to="/list/pegawai" style={{ color: '#333', textDecoration: 'none' }}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', ...(path.pathname === '/list/pegawai' && {color: '#1976d2'}) }}>Pegawai</Typography>
    </Link></CardActionArea>
    <CardActionArea><Link to="/list/notaris" style={{ color: '#333', textDecoration: 'none' }}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', ...(path.pathname === '/list/notaris' && {color: '#1976d2'}) }}>Notaris</Typography>
    </Link></CardActionArea>
    <Typography sx={{ fontSize: '15px', p: '3px 30px', mt: '5px', color: '#c0c0c0' }}><EditIcon sx={{ m: '0 5px -4px 0', fontSize: '21px' }} />Edit</Typography>
    <CardActionArea><Link to="/edit/ganti-kavling" style={{ color: '#333', textDecoration: 'none' }}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', ...(path.pathname === '/edit/ganti-kavling' && {color: '#1976d2'}) }}>Ganti Kavling</Typography>
    </Link></CardActionArea>
    <CardActionArea><Typography sx={{ fontSize: '17px', p: '3px 30px'}}>Edit Pembayaran</Typography></CardActionArea>
    <Typography sx={{ fontSize: '15px', p: '3px 30px', mt: '5px', color: '#c0c0c0' }}><InsertDriveFileIcon sx={{ m: '0 5px -4px 0', fontSize: '21px' }} />Report</Typography>
    <CardActionArea href='http://inmu-property-api.dgrande.com/penerimaan-harian'>
      <Typography sx={{ fontSize: '17px', p: '3px 30px'}}>Penerimaan Harian</Typography>
    </CardActionArea>
    <CardActionArea href='http://inmu-property-api.dgrande.com/saldo-piutang'>
      <Typography sx={{ fontSize: '17px', p: '3px 30px'}}>Saldo Piutang</Typography>
    </CardActionArea>
    <CardActionArea href='http://inmu-property-api.dgrande.com/data-kavling'>
      <Typography sx={{ fontSize: '17px', p: '3px 30px' }}>Data Kavling</Typography>
    </CardActionArea>
    <Typography sx={{ fontSize: '15px', p: '3px 30px', mt: '5px', color: '#c0c0c0' }}><PersonIcon sx={{ m: '0 5px -4px 0', fontSize: '21px' }} />Account</Typography>
    <CardActionArea><Link to="/profile" style={{ color: '#333', textDecoration: 'none' }}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', ...(path.pathname === '/profile' && {color: '#1976d2'}) }}>Profile</Typography>
    </Link></CardActionArea>
    <CardActionArea onClick={() => handleLogout()}>
      <Typography sx={{ fontSize: '17px', p: '3px 30px', color: 'red'}}>Logout</Typography>
    </CardActionArea>
  </>);
}

export const Layout = (props) => {
  return (
  <Grid container>
    <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' }, py: '10px', borderRight: '1px solid #e9edf1', height: '100vh', position: 'sticky', top: 0 }}><Left /></Grid>
    <Grid item xs={12} md={6}>{props.center}</Grid>
    <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' }, py: '10px ', borderLeft: '1px solid #e9edf1', height: '100vh', position: 'sticky', top: 0 }}>{props.right}</Grid>
  </Grid>
  );
}

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Work Sans, sans-serif'
    },
  })

  return ( 
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/login" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Login /> : <Navigate to="/" />} />
          <Route exact path="/" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <Home /> } />
          <Route path="/detail/:id" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <Detail />} />
          <Route path="/list/type-rumah" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <TypeRumah />} />
          <Route path="/list/jenis-pembelian" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <JenisPembelian />} />
          <Route path="/list/instansi-customer" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <InstansiCustomer />} />
          <Route path="/list/pegawai" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <Pegawai />} />
          <Route path="/list/notaris" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <Notaris />} />
          <Route path="/edit/ganti-kavling" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <GantiKavling />} />
          <Route path="/profile" element={!localStorage.getItem('user') || isNaN(+localStorage.getItem('user')) ? <Navigate to="/login" /> : <Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;