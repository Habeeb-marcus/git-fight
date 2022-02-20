const req = new XMLHttpRequest()
req.open('GET', 'data.json', true)
req.send();

req.onload = function() {
    if(req.status === 200) {
        const myStuff = JSON.parse(req.responseText)
        console.log(myStuff);
        console.log(myStuff[1].last);
    }
}