const express =require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const port = 5000;

let cal = [];

app.use( express.static( 'server/public' ));
app.use( bodyParser.urlencoded( { extended: true } ) )

app.listen(port, () =>{
    console.log( 'server is up:', port );
    
}); // end server up

app.get( '/cal', ( req, res ) => {
    console.log( 'in /cal GET' );
    res.send( cal );
}) // end cal

app.post( '/cal', ( req, res) => {
    console.log( 'in /cal POST', req.body );
    cal.push( req.body );
    res.send( 'woof' );
}) // end things POST