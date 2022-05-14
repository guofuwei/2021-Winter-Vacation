import url from "url";
import {
    createServer
} from "http";
import {
    eventEmitter
} from "./router";
import events from "events";



function start() {
    function onRequest(request, response) {
        console.log("url:" + request.url);
        if (eventEmitter.listenerCount(request.url) > 0) {
            eventEmitter.emit(request.url, request.method, response);
        } else {
            eventEmitter.emit("404", request.method, request.url, response);
        }
    }
    createServer(onRequest).listen(8888);
    console.log("Server start on http://127.0.0.1:8888");
}

const _start = start;
export {
    _start as start
};