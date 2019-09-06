// import { setupMaster } from "cluster";

console.log('js');

$( document ).ready( onReady );

function onReady(){
    $( '#addBtn' ).on( 'click', add );
    $( '#minusBtn' ).on( 'click', minus );
    $( '#timesBtn' ).on( 'click', times );
    $( '#divideBtn' ).on( 'click', divide );
    // $( '#equalBtn' ).on( 'click', bodyInput );
    // $( '#refreshBtn' ).on( 'click', refresh );
    getNumbers();
}

function add(num1, num2){
    $( '#equalBtn' ).on( 'click', bodyInput );
   return num1 + num2;
}

function minus(num1, num2){
    $( '#equalBtn' ).on( 'click', bodyInput );
   return num1 - num2;
}

function times(num1, num2){
    $( '#equalBtn' ).on( 'click', bodyInput );
   return num1 * num2;
}

function divide(num1, num2){
    $( '#equalBtn' ).on( 'click', bodyInput );
   return num1 / num2;
}

function bodyInput(){
    let numbers = {
        num1: $( '#firstN' ).val(),
        num2: $( '#secondN' ).val()
    }
    $.ajax({
        type: 'POST',
        url: '/numbers',
        data: numbers
    }).then( function( response ){
        console.log( 'back from server with:', response );
        getNumbers();
    }).catch( function( err ){
        alert( err );
    }) // end POST
    $( '#firstN' ).val(''),
    $( '#secondN' ).val('')
} // end bodyInput

function getNumbers(){
    // use AJAX to make a GET request
    $.ajax({
        type: 'GET', 
        url: '/numbers'
    }).then( function( response ){
        // console log out response
        console.log( 'back from server with:', response );
        // display things on DOM
        let el = $('#numberOut');
        el.empty();
        for( let i = 0; i< response.length; i++){
            el.append( `
            <li>${response[i].num1}</li>
            <li>${response[i].num2}</li>`
            );
        } // end loop
    }).catch( function( err ){
        // catch errors here
        alert( err ); 
    }) // end catch
} // end getNumbers