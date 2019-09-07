console.log('js');

$( document ).ready( onReady );

let operator;

function onReady(){
    $( '#addBtn' ).on( 'click', selectOp );
    $( '#minusBtn' ).on( 'click', selectOp );
    $( '#timesBtn' ).on( 'click', selectOp );
    $( '#divideBtn' ).on( 'click', selectOp );
    $( '#equalBtn' ).on( 'click', calculate );
    $( '#refreshBtn' ).on( 'click', clearInputs );
    $( '#deleteBtn' ).on( 'click', deleteAll );
    displayProblems();
} // end onReady

function selectOp(){
    operator = $(this).data('ops');
    console.log('symbol', operator);
}

function calculate(event) {
    event.preventDefault;
    num1 = $('.num1').val();
    num2 = $('.num2').val();
    console.log(num1 + ' ' + num2);

    let sendProblem = { 
        num1: num1, 
        operator: operator, 
        num2: num2 
    };

    if( num1 === '' || num2 === '') {
        alert('Please fill out all the inputs');
        return;
    }
    else if( operator == null) {
        alert('Please select an operator');
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/problems',
        data: sendProblem
    }).then( function( response ){
        console.log( 'answer', response );
        displayAnswer(response);
        displayProblems();
    }).catch( function( err ){
        alert( err );
    }) // end POST
} // end calculate

function displayProblems() {
    console.log( 'in displayProblems');
    // use AJAX to make a GET request
    $.ajax({
        type: 'GET', 
        url: '/addProblems'
    }).then( function( response ){
        console.log( 'back from server with:', response );
        // display things on DOM
        let el = $('#numberOut');
        el.empty();
        for( let item of response){
            el.append( '<li>' + item.num1 + ' ' + item.operator + ' ' + item.num2 + '</li>');
        }
        // end loop
    }).catch( function( err ){
        // catch errors here
        alert( err ); 
    }) // end catch
} // end displayProblems

function clearInputs() {
    console.log('in clearInputs,');
    $('.num1').val('');
    $('.num2').val('');
//   $.ajax({
//     method: 'GET',
//     url: '/clearInput'
//   }).then(function (response) {
//       console.log(response);
//     $('.num1').val('');
//     $('.num2').val('');
//   }).catch(function (err) {
//     alert( err );
//   });
} //end clearInputs

function displayAnswer(response) {
    console.log('in answer');
    let el = $('#answer');
    el.empty();
    el.append('<h3>' + response + '</h3>');
} //end answer

function  deleteAll() {
    console.log( 'delete Btn click' );
    $.ajax({
        type: 'delete',
        url: '/addProblems'
    }).then(function (response) {
        console.log(response);
    })
    displayProblems();
} // end deleteAll