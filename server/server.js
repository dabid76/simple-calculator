const express =require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const port = 5000;

let numHistory = [];

app.use( express.static( 'server/public' ));
app.use( bodyParser.urlencoded( { extended: true } ) )

app.listen(port, () =>{
    console.log( 'server is up:', port );
    
}); // end server up

app.post( '/problems', ( req, res) => {
    console.log( 'in /problems POST', req.body );
    numHistory.push( req.body );
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let operator = req.body.operator;
    let answer = num1 + operator + num2;
    console.log(answer);
    answer = eval(answer);
    res.send(String( answer ));
}) // end of app.post

app.get( '/addProblems', ( req, res ) => {
    console.log( 'in /problems GET' );
    res.send( numHistory );
}) // end of app.get

// app.get( '/clearInput', ( req, res ) => {
//     console.log( 'in /clearInput GET' );
//     res.sendStatus(200);
// }) // end app.get

app.delete( '/addProblems', ( req, res ) => {
    console.log( ' in /addProblems delete', req.body );
    // numHistory = [];
    while(numHistory.length > 0) {
        numHistory.pop();
    }
    res.send( numHistory );
}) // end app.delete