import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styled from 'styled-components';
function ContactForm() {
  const [state, handleSubmit] = useForm("mqkngkqn");
  if (state.succeeded) {
      return <div className='w-[60%] m-[auto] text-center flex justify-center flex-col mt-[100px]'>
          <h1 className='text-[35px]'>
          Mesajınız üçün təşəkkürlər!
          </h1>
          <br/>
          <p className='text-[15px]'>
            Sizinlə tez bir zamanda əlaqə saxlanılacaq.
          </p>
          </div>;
  }
  return (
      <Wrapper>
       <div className='contacttitle'>
           <h1>Əlaqə</h1>
       </div>
      <form onSubmit={handleSubmit} className="contactform">
      <label htmlFor="name">
       Ad
      </label>
      <input
        id="name"
        type="name" 
        name="name"
      />
      <ValidationError 
        prefix="Name" 
        field="name"
        errors={state.errors}
      />
      <label htmlFor="email">
        Email 
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
       <label htmlFor="email">
        Mesajınız
      </label>
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting} className="w-[100%] bg-[#08AD76] p-[1rem] text-[white] mt-[15px]">
        Göndər
      </button>
    </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
width: 60%;
margin: auto;
margin-top: 60px;
.contacttitle {
    font-size: 50px;
    text-align: center;
}
.contactform {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
}
.contactform  input {
    padding: 1rem;
    outline: none;
    border-color: #08AD76;
}



`

export default ContactForm;