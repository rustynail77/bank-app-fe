import React, { useState, useEffect, createContext } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/bank.png';

import SearchBar from './components/SearchBar/SearchBar';

export const AppContext = createContext(null);

const App = () => {

  const [filterParams, setFilterParams] = useState({});
  const [cities, setCities] = useState();
  const [filterBar, setFilterBar] = useState('Show');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const toggleFilter = () => {
    if (filterBar==='Show') {
      document.querySelector('#searchBar').classList.remove('hidden');
      setFilterBar('Hide');
    } else {
      document.querySelector('#searchBar').classList.add('hidden');
      setFilterBar('Show');
    }
  }

  return (
    <AppContext.Provider value={{filterParams, setFilterParams,cities, setCities, filterBar, setFilterBar}}>
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">Bank Clients</Typography>
          <img className={classes.image} src={memories} alt="icon" height="60" />
          <button className='filter-button' onClick={()=>toggleFilter()}>{filterBar} Filter Bar</button>
        </AppBar>
        <AppBar id='searchBar' className='search-bar hidden' position="static" color="inherit" >
          <SearchBar />  
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </AppContext.Provider>
  );
};

export default App;
