$( document ).ready( onReady );

let operator;

function onReady(){
    $( '#addBtn' ).on( 'click', selectOp );
    $( '#minusBtn' ).on( 'click', selectOp );
    $( '#timesBtn' ).on( 'click', selectOp );
    $( '#divideBtn' ).on( 'click', selectOp );
    $( '#equalBtn' ).on( 'click', selectOp, calculate );
    $( '#refreshBtn' ).on( 'click', clearInputs );
    $( '#deleteBtn' ).on( 'click', deleteAll );
    displayProblems();
} // end onReady

function selectOp(){
    operator = $(this).data('ops');
}

function calculate(event) {
    event.preventDefault;
    num1 = $('.num1').val();
    num2 = $('.num2').val();

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
        displayAnswer(response);
        displayProblems();
    }).catch( function( err ){
        alert( err );
    }) // end POST
} // end calculate

function displayProblems() {
    $.ajax({
        type: 'GET', 
        url: '/addProblems'
    }).then( function( response ){
        let el = $('#numberOut');
        el.empty();
        for( let item of response){
            el.append( `<li> ${item.num1} ${item.operator} ${item.num2}</li>`);
        } // end loop
    }).catch( function( err ){
        alert( err ); 
    }) // end catch
} // end displayProblems

function clearInputs() {
    $('.num1').val('');
    $('.num2').val('');
} //end clearInputs

function displayAnswer(response) {
    let el = $('#answer');
    el.empty();
    el.append('<h3>' + response + '</h3>');
} //end answer

function  deleteAll() {
    $.ajax({
        type: 'delete',
        url: '/addProblems'
    }).then(function (response) {
    })
    displayProblems();
} // end deleteAll