import './Login.scss';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DispatchProp, connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import axios from 'axios';

interface LoginProps extends DispatchProp, RouteComponentProps, WithStyles {}

const Login: React.FC<LoginProps> = props => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { classes, history } = props;

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    setLoading(true);

    axios
      .post('/login', { email, password })
      .then(response => {
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
        setLoading(false);
        props.history.push('/');
      })
      .catch(error => {
        setErrors(error.response.data);
        setLoading(false);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading || !email || !password}
          >
            Sign In
            {loading && <CircularProgress size={30} className={classes.progess} />}
          </Button>
          <Grid container>
            <Grid item>
              <Link href='signup' variant='body2'>
                {`Don't have an account? Sign Up`}
              </Link>
            </Grid>
          </Grid>
          {errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}
        </form>
      </div>
    </Container>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progess: {
      position: 'absolute',
    },
  });

export default withStyles(styles)(withRouter(connect()(Login)));
