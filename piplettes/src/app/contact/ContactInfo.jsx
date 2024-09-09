import LocationIcon from '../../components/icons/LocationIcon';
import MailIcon from '../../components/icons/MailIcon';
import PhoneIcon from '../../components/icons/PhoneIcon';
import React from 'react'

const ContactInfo = () => {
  return (
    <div className="flex-2 flex flex-col gap-8 sm:self-center">
      <div className="flex gap-2">
        <MailIcon />
        <h4>contact.lpg@proton.me</h4>
      </div>
      <div className="flex gap-2">
        <LocationIcon />
        <h4>Granville, Normandie</h4>
      </div>
    </div>
  );
}

export default ContactInfo