import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function ContactForm() {
  const [state, handleSubmit] = useForm("mqkngkqn");
  if (state.succeeded) {
    return (
      <div className="row center column wmin text-center mt-[100px]">
        <h1 className="text-[35px] md:text-[25px]">
          Mesajınız üçün təşəkkürlər!
        </h1>
        <br />
        <p className="text-[15px]">
          Sizinlə tez bir zamanda əlaqə saxlanılacaq.
        </p>

        <Link to="/">
          <p className="text-[18px] mt-[10px] font-[bold] text-[#08AD76]">Ana səhifəyə dön</p>
        </Link>
      </div>
    );
  }
  return (
    <Wrapper>
      <div className="contacttitle">
        <h1>Əlaqə</h1>
      </div>
      <form onSubmit={handleSubmit} className="contactform">
        <label htmlFor="name">Ad</label>
        <input id="name" type="name" name="name" />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="email">Mesajınız</label>
        <textarea id="message" name="message" />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <button
          type="submit"
          disabled={state.submitting}
          className="w-[100%] bg-[#08AD76] p-[1rem] text-[white] mt-[15px]"
        >
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
  .contactform input {
    padding: 1rem;
    outline: none;
    border-color: #08ad76;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: auto;
    margin-top: 60px;
    .contacttitle {
      font-size: 25px;
      text-align: center;
    }
  }
`;

export default ContactForm;
