import * as docElement from './doc-object-script.js';
import { LogDisplay } from './game-loop-script.js';

import { hide } from "./helper-functions.js";
import { show } from "./helper-functions.js";

// Event Log Class
export class EventLogger {
    constructor() {
        this.log = [];
        this.logLengthVariable = this.log.length;
    }

    // Method to log events
    eventLog(event, color, alert) {
        if (alert === 'alert') {
            let x = `<pre class="event-container ${color}"> <img class="log-img-scale" src="./BasilLand/images/bad.png"> ${event} </pre>`;
            this.log.push(x);
        } else {
            let x = `<pre class="event-container ${color}"> ${event} </pre>`;
            this.log.push(x);
        }
    }

    // Method to display events
    displayEvents() {
        if (this.log.length > this.logLengthVariable) {
            docElement.eventLogDisplay.innerHTML += this.log[this.log.length - 1];
            scrollEvents();
            this.logLengthVariable = this.log.length;
        }
        if (this.log.length >= 210) {
            this.reset();
        }
    }

    // Method to reset log
    reset() {
        this.log = [];
        this.logLengthVariable = this.log.length;
        docElement.eventLogDisplay.innerHTML = '';
        this.eventLog('Event Log reset', 'orange');
    }
}

// Function to scroll log events to the bottom
export function scrollEvents() {
    docElement.eventLogDisplay.scrollTop = docElement.eventLogDisplay.scrollHeight;
}

// Function to display red alerts
export function redAlert(message) {
    LogDisplay.eventLog(message, 'red', 'alert');
}

// Event listener for show/hide event log button
docElement.showEventLogBtn.addEventListener('click', function(e) {
    if (e.srcElement.innerHTML == 'Hide') {
        hide(docElement.eventLogDisplay);
        docElement.showEventLogBtn.innerHTML = 'Show';
    } else {
        show(docElement.eventLogDisplay);
        docElement.showEventLogBtn.innerHTML = 'Hide';
    }
});
