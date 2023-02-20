import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FormHelperText } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Products = {
  "6ltr bucket": {
    "Handle": "18 gm",
    "Lid": "40 gm",
    "Body": "116 gm"
  },
  "9ltr bucket": {
    "Handle": "27 gm",
    "Body": "190 gm",
  },
  "14ltr bucket": {
    "Handle": "40 gm",
    "Lid": "100 gm",
    "Body": "280 gm"
  },
  "30ltr drum": {
    "Lid": "135 gm",
    "Body": "530 gm"
  }
}


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function App() {
  const [product, setProduct] = React.useState("");
  const [productParts, setProductParts] = React.useState("");
  const [denominator, setDenominator] = React.useState();

  React.useEffect(() => {
    if (product !== "") {
      let sum = 0;

      Object.keys(Products[product]).forEach((part) => {
        sum += Number(Products[product][part].split(" ")[0]);
      });

      setDenominator(sum);
    }
    setProductParts("");
  }, [product]);

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handleRawMaterialBagChange = (event) => {
    setProductParts(event.target.value);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item><Typography variant="h4">
          Calculator
        </Typography></Item>
        <Item>
          <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
            <InputLabel id="demo-select-small">Product</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={product}
              label="Product"
              onChange={handleProductChange}
              sx={{ minHeight: 60 }}
            >
              {Object.keys(Products).map((product) => {
                return (<MenuItem value={product}>{product}</MenuItem>);
              })}
            </Select>
            <FormHelperText id="outlined-weight-helper-text" sx={{ fontSize: "1rem" }}>Enter the product</FormHelperText>
          </FormControl>
        </Item>
        <Item>
          <FormControl sx={{ m: 1, minWidth: 300 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Total Raw Material</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="end">bags</InputAdornment>
              }
              label="Total Raw Material"
              value={productParts}
              onChange={handleRawMaterialBagChange}
              disabled={product === ""}
            />
            <FormHelperText id="outlined-weight-helper-text" sx={{ fontSize: "1rem" }}>Enter total bags of raw material</FormHelperText>
          </FormControl>
        </Item>
        {
          product !== "" && productParts !== "" ?
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Part</TableCell>
                    <TableCell align="right">Raw Material</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.keys(Products[product]).map((part, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {part}
                          </TableCell>
                          <TableCell align="right">{((Number(Products[product][part].split(" ")[0]) / denominator) * productParts).toFixed(1)}</TableCell>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
            :
            null
        }

      </Stack>
    </Box >

  );
}

export default App;
