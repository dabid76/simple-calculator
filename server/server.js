const express =require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const PORT = process.env.PORT || 5000;

let numHistory = [];

app.use( express.static( 'server/public' ));
app.use( bodyParser.urlencoded( { extended: true } ) )

app.listen(PORT, () =>{    
}); // end server up

app.post( '/problems', ( req, res) => {
    numHistory.push( req.body );
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let operator = req.body.operator;
    let answer = num1 + operator + num2;
    answer = eval(answer);
    res.send(String( answer ));
    res.sendStatus(201);
}) // end of app.post

app.get( '/addProblems', ( req, res ) => {
    res.send( numHistory );
}) // end of app.get

app.delete( '/addProblems', ( req, res ) => {
    while(numHistory.length > 0) {
        numHistory.pop();
    }
    res.send( numHistory );
}) // end app.delete