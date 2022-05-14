import {
    EventEmitter
} from "events";

class route {
    constructor() {
        this.eventEmitter = EventEmitter();

        eventEmitter.on("/", function (method, response) {
            response.writeHead(200, {
                "Content-Type": "text/plain"
            });
            response.write("Hello node.js");
            response.end();
        });

        eventEmitter.on("404", function (method, pathname, response) {
            response.writeHead(200, {
                "Content-Type": "text/plain"
            });
            response.write("You have request for " + url + "\n");
            response.write("404 Not Found\n ");
            response.end();
        });
    }
}

export default route;