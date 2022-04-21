import React from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <div className="footer">
        <div className="nav-header">
          <a href="/">
            <h2 className="navtitle">
              <Link className="brandfooter" to="/">
                VS-<span className="greenlink">Fashion</span>
              </Link>
            </h2>
          </a>
        </div>

        <div>
          Haqqımızda
          <ul>
            <li>050-519-87-54</li>
            <li>info@vsfashion.az</li>
          </ul>
        </div>

        <div>
          Profil
          <ul>
            <li>Daxil Olmaq</li>
            <li>Qeydiyyatdan keçmək</li>
            <li>Sifarişlərim</li>
            <li>Səbət</li>
          </ul>
        </div>

        <div>
          Social Media
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Tumbir</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.footer`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #e7f6f3;
  color: black;
  margin-top: 80px;
  padding-top: 15px;

  h5 {
    color: white;
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  .navtitle {
    font-family: Poppins;
    font-style: normal;
    font-weight: bolder;
    font-size: 36px;
    line-height: 54px;
  }

  .footer {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin: auto;
  }
  .footerinfo div {
    text-align: left;
  }
  .footer ul {
    margin-top: 10px;
  }
  .footer .icons {
    display: flex;
    font-size: 1.5rem;
    padding: 10px;
    padding-top: 0px;
  }

  @media (max-width: 776px) {
    flex-direction: column;
    height: auto;
    justify-content: center;
    background: #e7f6f3;
    text-align: center;
    padding-bottom: 10px;

    .navtitle {
      color: black;
    }

    .footer {
      flex-direction: column;
    }
    ul li {
      margin-top: 10px;
    }
  }
`;

export default Footer;
