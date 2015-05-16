// Taken from http://marcgrabanski.com/simulating-mouse-click-events-in-javascript/
function mouseEvent(type, sx, sy, cx, cy) {
    var evt;
    var e = {
        bubbles: true,
        cancelable: (type != "mousemove"),
        view: window,
        detail: 0,
        screenX: sx, 
        screenY: sy,
        clientX: cx, 
        clientY: cy,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: undefined
    };
    if (typeof( document.createEvent ) == "function") {
        evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(type, 
            e.bubbles, e.cancelable, e.view, e.detail,
            e.screenX, e.screenY, e.clientX, e.clientY,
            e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
            e.button, document.body.parentNode);
    } else if (document.createEventObject) {
        evt = document.createEventObject();
        for (prop in e) {
            evt[prop] = e[prop];
        }
        evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
    }
    return evt;
}
// End taken section

// Wrap around the above
function simpleMouseMove(x, y) {
    return mouseEvent("mousemove", x, y, x, y);
}

// Restart the game every t milliseconds
function setNicks(name, t) { setNick(name); if(AGAR.go) { setTimeout(function(){setNicks(name, t)}, t) } } 

//-----------------------------------------------------------------------------
AGAR = {}
AGAR.canvas = document.getElementById('canvas')
AGAR.cx = AGAR.canvas.width/2;
AGAR.cy = AGAR.canvas.height/2;
AGAR.go = true;
AGAR.moveRandomly = function(mint, maxt) {
    var time = (maxt-mint)*Math.random() + mint;
    var theta = 2*Math.PI*Math.random();
    var radius = 250;
    var x = Math.floor(AGAR.cx + radius*Math.cos(theta));
    var y = Math.floor(AGAR.cy + radius*Math.sin(theta));
    var evnt = simpleMouseMove(x, y);
    AGAR.canvas.dispatchEvent(evnt);
    if(AGAR.go) {
        setTimeout(
            function() { AGAR.moveRandomly(mint, maxt); },
            time
        )
    }
}