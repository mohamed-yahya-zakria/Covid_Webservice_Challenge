'use strict';

const express = require('express');
const Axios = require('axios')
const data = require('./data')
// Initialize App
const app = express();
app.use(express.json());
require('dotenv').config()
const PORT = process.env.PORT || 5001


/* const data = { CovidData } = Axios.get('https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json').then((response)=>{
	//console.log(response);
}); */

/* app.use('/data',(req,res )=>{
	res.send(JSON.stringify({data}));
	
})
 */
app.use('/', (req, res, next) => {
const filters = req.query;
const filteredState = data.filter(city => {
	let isValid = true;
	for (key in filters) {
        
	console.log(key, city[key], filters[key]);
	isValid = isValid && city[key] == filters[key];
	}
	return isValid;
});
res.send(filteredState);
});

// Start server on PORT 5000

app.listen(PORT, () => {
    console.log(`Server is running...${PORT}}` )
});
