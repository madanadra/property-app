import { Box, Avatar, Typography, Button, TextField, LinearProgress, CardActionArea, SwipeableDrawer, Dialog, DialogActions, DialogTitle, useMediaQuery } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { TopBar, Layout } from './App';

function Profile() {
    const isMobile = useMediaQuery('(max-width: 900px)')
    const api = 'https://inmu-property-api.dgrande.com/api/'
    const id = localStorage.getItem('user')
    const [drawer, setDrawer] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [menu, setMenu] = useState([])
    const [profile, setProfile] = useState([])
    const satu = useRef()

    useEffect(() => {
        if (!isMobile) {
          setDrawer(false);
        }
        setDialog(false);
      }, [isMobile]);

    const loadProfile =  () => {
        if (!loading) {
            setLoading(true);
        } 
        axios.get(`${api}profile/${id}`)
        .then((response) => {
            setProfile(response.data.profile);
            setLoading(false);
            console.log(response);
        })
        .catch((error) => {
            setLoading(false)
        });
    }

    useEffect(() => {
        setTimeout(()=>{
         setError(false)
        }, 3000)
      }, [error])

    useEffect(() => {
        loadProfile();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Content = () => {
        return (<>
          {loading ? <LinearProgress sx={{ width: '100%' }} /> : <Box sx={{ p: '20px', ...(dialog && {overflow: 'hidden'}), ...(drawer && {overflow: 'hidden'}) }}>
          <Avatar alt="Profile Image" src={`https://inmu-property-api.dgrande.com/images/${profile.image}`} sx={{ mx: 'auto', width: '210px', height: '210px' }} />
          <Typography sx={{ mt: '15px', color: '#c0c0c0', fontSize: '15px', width: '100%' }}>Nama</Typography>
          <Typography sx={{ mb: '10px', fontSize: '19px' }}>{profile.name}</Typography>
          <Typography sx={{ color: '#c0c0c0', fontSize: '15px' }}>Email</Typography>
          <Typography sx={{ mb: '10px', fontSize: '19px' }}>{profile.email}</Typography>
          <Typography sx={{ color: '#c0c0c0', fontSize: '15px' }}>Alamat</Typography>
          <Typography sx={{ mb: '10px', fontSize: '19px' }}>{profile.alamat || '-'}</Typography>
          <Typography sx={{ color: '#c0c0c0', fontSize: '15px' }}>Telephone</Typography>
          <Typography sx={{ mb: '10px', fontSize: '19px' }}>{profile.telp || '-'}</Typography>
          </Box>}
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
              <Typography sx={{ p: '7px 25px' }} onClick={() => document.getElementById('file').click()}>Edit Foto</Typography>
              <TextField id="file" type="file" sx={{ display: 'none' }} onChange={handleEditFoto} />
          </CardActionArea>
          <CardActionArea>
              <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<EditNama/>)}>Edit Nama</Typography>
          </CardActionArea>
          <CardActionArea>
              <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<EditAlamat/>)}>Edit Alamat</Typography>
          </CardActionArea>
          <CardActionArea>
              <Typography sx={{ p: '7px 25px' }} onClick={() => handleMenu(<EditTelp/>)}>Edit Telephone</Typography>
          </CardActionArea>
      </>);
    }

    const Dialogs = (props) => {
        return (
          <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth={isMobile}>
            {menu}
          </Dialog>
        );
    }

    const handleEditFoto = (event) => {
        setDrawer(false);
        setLoading(true);
        const img = new FormData();
        img.append('image', event.target.files[0]);
        axios.post(`${api}edit-foto/${id}`, img)
        .then((response) => {
            loadProfile();
        })
        .catch((error) => {
            setLoading(false)
            setError(true)
        });
    }

    const handleEditNama = () => {
        setDialog(false);
        setLoading(true);
        axios.post(`${api}edit-nama/${id}`, {name: satu.current.value})
        .then((response) => {
            loadProfile();
        })
        .catch((error) => {
            setLoading(false)
            setError(true)
        });
    }

    const handleEditAlamat = () => {
        setDialog(false);
        setLoading(true);
        axios.post(`${api}edit-alamat/${id}`, {alamat: satu.current.value})
        .then((response) => {
            loadProfile();
        })
        .catch((error) => {
            setLoading(false)
            setError(true)
        });
    }

    const handleEditTelp = () => {
        setDialog(false);
        setLoading(true);
        axios.post(`${api}edit-telp/${id}`, {telp: satu.current.value})
        .then((response) => {
            loadProfile();
        })
        .catch((error) => {
            setLoading(false)
            setError(true)
        });
    }

    const EditNama = () => {
        return (<>
            <DialogTitle>Edit Nama</DialogTitle>
            <TextField inputRef={satu} label="Nama" defaultValue={profile.name} variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <DialogActions sx={{ m: '0 7px 5px 0' }}>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => handleEditNama()}>Submit</Button>
            </DialogActions>
        </>);
    }

    const EditAlamat = () => {
        return (<>
            <DialogTitle>Edit Alamat</DialogTitle>
            <TextField inputRef={satu} label="Alamat" defaultValue={profile.alamat} variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <DialogActions sx={{ m: '0 7px 5px 0' }}>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => handleEditAlamat()}>Submit</Button>
            </DialogActions>
        </>);
    }

    const EditTelp = () => {
        return (<>
            <DialogTitle>Edit Telephone</DialogTitle>
            <TextField inputRef={satu} type="tel" label="Telephone" defaultValue={profile.telp} variant="outlined" size="small" autoComplete="off" sx={{ m: '0 30px 10px 30px' }} />
            <DialogActions sx={{ m: '0 7px 5px 0' }}>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => handleEditTelp()}>Submit</Button>
            </DialogActions>
        </>);
    }

    return (<>
        <TopBar title="Profile" icon={<ManageAccountsIcon onClick={() => setDrawer(true)} />} />
        <Layout center={<Content />} right={<Menu />} />
        <SwipeableDrawer sx={{ display: { xs: 'block', md: 'none' } }} PaperProps={{ elevation: 0, style: { backgroundColor: "transparent" } }}
            anchor="bottom" open={drawer} onClose={() => setDrawer(false)} disableSwipeToOpen>
            <Box sx={{ py: '5px', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#ffffff' }}><Menu /></Box>
        </SwipeableDrawer>
        <Dialogs />
        {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Gagal memperbarui!</Typography> : []}
    </>);
}
    
export default Profile;
