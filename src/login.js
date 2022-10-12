import { Container, Box, Typography, Button, TextField, LinearProgress } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const api = 'http://inmu-property-api.dgrande.com/api/'
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const satu = useRef()
    const dua = useRef()

    useEffect(() => {
        setTimeout(()=>{
         setError(false)
        }, 3000)
      }, [error])

    const handleLogin = () => {
        setLoading(true);
        axios.post(`${api}login`, 
        {email: satu.current.value,
        password: dua.current.value})
        .then((response) => {
            localStorage.setItem('user', response.data.user)
            window.location.reload(false)
        })
        .catch((error) => {
            setLoading(false)
            setError(true)
        });
    }

    return (<>
        {loading ? <LinearProgress sx={{ position: 'fixed', width: '100%' }} /> : []}
        <Container fixed sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ px: '30px', display: 'grid', textAlign: 'center', mx: 'auto', width: '390px' }}>
                <Typography sx={{ mb: '30px', fontSize: '30px' }}>Property App</Typography>
                <TextField inputRef={satu} label="Email" size="small" autoComplete="off" sx={{ my: '5px' }} />
                <TextField inputRef={dua} type="password" label="Password" size="small" autoComplete="off" sx={{ my: '5px' }} />
                <Button variant="contained" sx={{ mt: '25px' }} onClick={() => handleLogin()}>Login</Button>
            </Box>
        </Container>
        {error ? <Typography sx={{ p: '5px 10px', position: 'fixed', backgroundColor: 'red', color: '#ffffff', right: '5px', bottom: '5px', borderRadius: '3px', fontSize: '13px' }}>
          Login gagal!</Typography> : []}
    </>);
}
    
export default Login;
