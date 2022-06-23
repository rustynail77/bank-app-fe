import React from 'react';
import {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../App';
import { Box, TextField, Select, MenuItem, Button, Typography, Paper, FormControl, InputLabel } from '@material-ui/core';

const SearchBar = (props) => {

    const {cities, filterParams, setFilterParams} = useContext(AppContext);
    const [tempFilter, setTempFilter] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted');
        setFilterParams(tempFilter);
    }

    const handleChange = (formField) => {
        const currFilter = {...tempFilter};
        if (formField.value==='') {
            delete currFilter[formField.name];
        } else {
            if (formField.name==='cities[]') {
                let tempValues = [...formField.selectedOptions];
                let valuesToSave = [];
                for (let i=0; i<tempValues.length; i++) {
                    let itemVal = tempValues[i].attributes[0].nodeValue;
                    if (valuesToSave.includes(itemVal)) {
                        let index = valuesToSave.indexOf(itemVal);
                        valuesToSave.splice(index, 1);
                    } else {
                        valuesToSave.push(itemVal);
                    }
                    console.log(valuesToSave);
                }  
                currFilter[formField.name] = valuesToSave;
            } else {
                currFilter[formField.name] = formField.value;
            }
            
        }
        console.log('currFilter:',currFilter,formField.value);
        setTempFilter(currFilter);
    }

    const clearFilter = () => {
        let myForm = document.forms[0];
        myForm['balance_from'].value = '';
        myForm['balance_to'].value = '';
        myForm['credit_cards'].value = '';
        myForm['has_mortgage'].value = '';
        myForm['cities[]'].value = '';
        setTempFilter({});
    }

    return (
        <>
            <Typography variant="h4">Filter Bar</Typography>
            <form onSubmit={handleSubmit}>
                <TextField type='number' name="balance_from" variant="outlined" label="Balance from" onChange={(e)=>handleChange(e.target)} />
                <TextField type='number' name="balance_to" variant="outlined" label="Balance to" onChange={(e)=>handleChange(e.target)} />
                <TextField type='number' name="credit_cards" variant="outlined" label="Number of credit cards" onChange={(e)=>handleChange(e.target)} />
                
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="has-mortgage-label">Has a mortgage?</InputLabel>
                    <Select
                        labelId="has-mortgage-label"
                        id="has_mortgage"
                        name='has_mortgage'
                        label="Mortgage"
                        onChange={(e)=>handleChange(e.target)}
                        autoWidth
                    >
                        <MenuItem value='Yes'>Yes</MenuItem>
                        <MenuItem value='No'>No</MenuItem>
                    </Select>
                </FormControl>
                
                <br/>
                Filter cities (hold "ctrl" to select multiple cities)
                
                <select className='dropdown' multiple name='cities[]' type='text' onChange={(e)=>handleChange(e.target)}>
                    <option value='' disabled>---Select---</option>
                    {
                        (!cities) ? <></> :
                            cities.map((city,i)=>
                                <option key={i} value={city}>
                                    {city}
                                </option>
                        )
                    }
                </select>
                <input type='submit' value='Filter' />
                <button onClick={clearFilter}>Clear</button>
            </form>
        </>
    )

}

export default SearchBar;