const express =require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const port = 5000;

let numbers = [];

app.use( express.static( 'server/public' ));
app.use( bodyParser.urlencoded( { extended: true } ) )

app.listen(port, () =>{
    console.log( 'server is up:', port );
    
}); // end server up

app.get( '/numbers', ( req, res ) => {
    console.log( 'in /cal GET' );
    res.send( numbers );
}) // end cal

app.post( '/numbers', ( req, res) => {
    console.log( 'in /cal POST', req.body );
    numbers.push( req.body );
    res.send( numbers );
}) // end things POST