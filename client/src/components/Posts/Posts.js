import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {

  const { filterParams, setFilterParams,
          cities, setCities} = useContext(AppContext);
  
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  
  useEffect (()=>{
    const setTheCities = () => {
      console.log('checking cities');
      if (posts.length>0 && !cities) {
        console.log('entered if');
        let cityList = [];
        posts.map(post=>{
          if (!cityList.includes(post.city) &&post.city && post.city!=='') cityList.push(post.city)
        });
        console.log('city list:',cityList);
        cityList.sort(function(a, b) {
          const nameA = a.toUpperCase();
          const nameB = b.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        });
        setCities(cityList);
      }
    }
    setTheCities();
  }) 

  const filter = (post) => {
    if (Object.keys(filterParams).length===0) {
      return true;
    } else {
      if (filterParams.credit_cards){
        if (Number(post.numCreditCards)!==Number(filterParams.credit_cards)) return false};
      if (((filterParams.balance_from) && (Number(post.balance)<Number(filterParams.balance_from))) 
          || ((filterParams.balance_to) && (Number(post.balance)>Number(filterParams.balance_to))))
          return false;
      if ((post.haveMortgage) && (filterParams.has_mortgage)) {
        if (post.haveMortgage.toLowerCase()!==filterParams.has_mortgage.toLowerCase()) return false;
      }
      if (filterParams['cities[]'] && filterParams['cities[]'].length>0) {
        if (post.city) {
          if (filterParams['cities[]'].filter(city=>city.toLowerCase()===post.city.toLowerCase())<1) return false;
        } else return false; 
      }
      return true;
    }
  }

  return (
    !posts.length ? <CircularProgress /> : (
    
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => 
          (filter(post)) ? 
              <Grid key={post._id} item xs={12} sm={6} md={6}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
           : ''
          )}
        </Grid>
      
    )
  );
};

export default Posts;
