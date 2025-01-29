import { useState } from 'react';
// import Button from './Button.jsx';
import TabButton from './TabButton.jsx';
import Section from './Section.jsx';
import Tabs from './Tabs.jsx';
import { EVENT_TYPES } from './EventTypes.js';

export default function EventTypes() {
  const [selectedEventType, setSelectedEventType ] = useState();
  	
    let eventTypeTabContent = null;
  
    if (selectedEventType) {
      eventTypeTabContent = (
        <div id="tab-content">
          <h3>{EVENT_TYPES[selectedEventType].title}</h3>
          <p>{EVENT_TYPES[selectedEventType].description}</p>
          <pre>
            <code>{EVENT_TYPES[selectedEventType].image}</code>
          </pre>
        </div>
      )
    }
  
    function handlePress(pressedButton) {
      // pressedButton = "", "", "", ""
      setSelectedEventType(pressedButton);
    }
  
  return (
    <Section title="Co nabízíme?" id="tab-buttons">
      {/* <Button /> */}
      <Tabs 
        buttons={
          <>
            <TabButton isSelected={selectedEventType === 'seminar'} onClick={() => handlePress('seminar')}>Semináře</TabButton>
            <TabButton isSelected={selectedEventType === 'webinar'}onClick={() => handlePress('webinar')}>Webináře</TabButton>
            <TabButton isSelected={selectedEventType === 'video_zaznam'}onClick={() => handlePress('video_zaznam')}>Video záznamy</TabButton>
            <TabButton isSelected={selectedEventType === 'audio_nahravka'}onClick={() => handlePress('audio_nahravka')}>Audio nahrávky</TabButton>
          </>
        } 
      >
        {eventTypeTabContent}
      </Tabs>
    </Section>
  );
}