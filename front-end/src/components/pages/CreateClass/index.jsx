
import {
    Avatar,
    Box,
    Container,
    FormControlLabel,
    FormLabel,
    Grid,
    Link,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useRegister } from '../../../hooks/register';
import { Toast } from '../../molecules/Toast';
import { displayErrorMessage } from '../../../utils';
import { useCreateClass } from '../../../hooks/classes';
import database from '../../../../../fake-back-end/db.json';
import { useUserProfile } from '../../../store/profile';


export const CreateClass = () => {
    const { createClassMutation, isCreateClassLoading } = useCreateClass()
    const navigateTo = useNavigate();

    const handleSubmit = async (values) => {
        try {
            await createClassMutation({ payload: values });
            Toast(
                `¡Enhorabuena! ¡La clase ${values.name}ha sido existomente creada!`
            );
            navigateTo('/user/classes');
        } catch (error) {
            Toast(displayErrorMessage(error), 'error');
        }
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            subject: '',
            description: '',
            duration: '',
            frequency: '',
            cost: '',
            type: ""
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h5'>
                    Crea tu clase
                </Typography>
                <Box
                    component='form'
                    noValidate
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name='name'
                                required
                                fullWidth
                                id='className'
                                label='Nombre'
                                autoFocus
                                value={formik.values.name}
                                onChange={formik.handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='subject'
                                label='Materia'
                                name='subject'
                                value={formik.values.subject}
                                onChange={formik.handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='description'
                                label='Descripción'
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                minRows={3}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='duration'
                                label='Duración'
                                id='duration'
                                value={formik.values.duration}
                                onChange={formik.handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="frequency">Frecuencia</InputLabel>
                                <Select
                                    labelId="frequency"
                                    value={formik.values.frequency}
                                    label="Frecuencia"
                                    onChange={formik.handleChange}
                                    required
                                >
                                    <MenuItem value="unique">Única</MenuItem>
                                    <MenuItem value="weekly">Semanal</MenuItem>
                                    <MenuItem value="monthly">Mensual</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel id='demo-controlled-radio-buttons-group'>
                                Tipo:
                            </FormLabel>
                            <RadioGroup
                                row
                                name='type'
                                value={formik.values.type}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel
                                    value='individual'
                                    control={<Radio />}
                                    label='Individual'
                                />
                                <FormControlLabel
                                    value='groupal'
                                    control={<Radio />}
                                    label='Grupal'
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='cost'
                                label='Costo'
                                id='cost'
                                value={formik.values.cost}
                                onChange={formik.handleChange}

                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Crear Clase
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    )
}
