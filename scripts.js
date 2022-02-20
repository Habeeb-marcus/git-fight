var start = '{"favColor": "purple", "favDay": "weekends", "name": "doyin"}'
console.log(start)


// convert from string to object coming from server
var myObject = JSON.parse(start);
// console.log(myObject);



// convert object back to string to send to server using thE Stringfy method


var myObj = JSON.stringify(myObject);




// AJAX request in action xml http request
// 1. set a new obj

const req = new XMLHttpRequest();

// OPEN METHOD, Path to info, asynchronously or not
// 2. set the open status
req.open('GET', 'data.json', true);

// 3. ensure data to receive is in the format you want
req.responseType = 'text'


// 4 create a function when the onload is triggered when the ready state = 4/200 i.e is successful
req.onload = function () {
    if(req.status === 200) {
        const myStuff = JSON.parse(req.responseText);
        console.log(myStuff);
    } 
};

// 5 send
req.send();



