const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;

// defining middleware for static files 
    app.use(express.static('server/public'));

// passing url encoded body request
    app.use(bodyParser.urlencoded({extended: true}));

// Start Listening on Port 8000
app.listen(PORT, () => {
    console.log(`server running on port, ${PORT}... `);
});

//Routes for player 1 and 2
    let inputs = {
     number1   : {
            //store past inputs for number1
            pastInputs: [],
            lastInput: '',
        },
        number2: {
            //store past inputs for number2
            pastInputs: [],
            lastInput: '',
        }
    };

// 'GET' express middleware
app.get('/calculations', (req, res) => {
    // respond/ send data to the client 
    res.send(inputs);
});

//POST
app.post('/calculateInputs', (req, res) => {

    let result;

    const {number1, number2, operation} = req.body;
    const value1 = parseFloat(number1);
    const value2 = parseFloat(number2);

    switch (operation){
        case '+':
            result = value1 + value2;
            break;
        case '-':
                result = value1 - value2;
            break;
        case '*':
                result = value1 * value2;
            break;
        case '/':
                result = value1 / value2;
            break;
        default:
                result = 'invalid options';
    
    }
    //Store the inputs
    inputs.number1.pastInputs.push(req.body.result);
    inputs.number1.lastInput = result.toString();
    inputs.number2.pastInputs.push(req.body.result);
    inputs.number2.lastInput = result.toString();

// respond 
res.send(result.toString());
});


