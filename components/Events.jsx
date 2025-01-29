import Event from './Event.jsx';
import { EVENTS } from '../RecentEvents.js';

export default function Events({image, title, description}) {
    return (  
    <section id="events">
        <h2>Brzy proběhne</h2>
        <ul>
            {EVENTS.map((eventItem) => <Event key={eventItem.title} {...eventItem} />)}
        </ul>
    </section>
    );
}