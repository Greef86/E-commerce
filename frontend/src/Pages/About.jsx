import React from 'react'
import "./About.css"
import NewsLetter from "../Components/NewsLetter/NewsLetter.jsx"
import founder1 from "../Components/Assets/founder1.jpg"
import founder2 from "../Components/Assets/founder2.jpg"
import founder3 from "../Components/Assets/founder3.jpg"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaRegCopyright, FaWhatsapp } from 'react-icons/fa'

const About = (props) => {
  return (
    <div className='aboutUs'>
      <div className="banner">
        <img src={props.banner} alt="" />
      </div>
      <div className="aboutUsContainer">
        <h1>Who We Are</h1>
        <hr className='horizontalrole' />
        <p>We are an E-commerce online store and we also have a physical store, it was first a physical store but we decided to expand in to online because we saw the need, we want to sell our products throughout the globe especially now that the technology allows us, we are a South African based clothing line trying to reach out to the whole world and make ourselfs known, we have a great passion for quality clothes.</p>
        <h1>Where It All Began</h1>
        <hr className='horizontalrole' />
        <p>Couple of years ago we were just a couple of kids at school who took greate pride in what we wore, and as we grew older so did our passion, so one day we decided to sit down and have a little talk and we came to a conclusion that we want to spread our idea of clothing with the rest of the world but back then we did not have the technology that we have today, so we settled for a physical store which is also great by the way.</p>
        <p>As you might know starting a business from scratch is never an easy task, we did not have the capital or the know how to start any kind of business from the ground, so we decided that some of us will go to school and study fashion while others study business, and after completion we came back and started the business from the ground with the little money that we got from our short term employments, we also lost few of our members along the way, they got permanent jobs at reputable companies and decided that they are never coming back, and the rest is history.</p>
        <h1>Meet The Founders</h1>
        <hr className='horizontalrole' />
        <div className="teamContainer">
          <div className="personMainContainer">
            <div className="person">
              <img src={founder1} alt="" />
            </div>
            <p>Lesley Mooketsi Greef</p>
            <div className="socialIcons">
              <FaFacebook size={20} className='icon' />
              <FaTwitter size={20} className='icon' />
              <FaInstagram size={20} className='icon' />
              <FaLinkedin size={20} className='icon' />
              <FaWhatsapp size={20} className='icon' />
            </div>
          </div>
          <div className="personMainContainer">
            <div className="person">
              <img src={founder2} alt="" />
            </div>
            <p>Harry Onoku Kwande</p>
            <div className="socialIcons">
              <FaFacebook size={20} className='icon' />
              <FaTwitter size={20} className='icon' />
              <FaInstagram size={20} className='icon' />
              <FaLinkedin size={20} className='icon' />
              <FaWhatsapp size={20} className='icon' />
            </div>
          </div>
          <div className="personMainContainer">
            <div className="person">
              <img src={founder3} alt="" />
            </div>
            <p>Lerato Mokawana</p>
            <div className="socialIcons">
              <FaFacebook size={20} className='icon' />
              <FaTwitter size={20} className='icon' />
              <FaInstagram size={20} className='icon' />
              <FaLinkedin size={20} className='icon' />
              <FaWhatsapp size={20} className='icon' />
            </div>
          </div>
        </div>
        <h1>Our Mission</h1>
        <hr className='horizontalrole' />
        <p><strong>Our mission is to provide the world with quality clothing for a lesser price</strong></p>
        <h1>Our Vision</h1>
        <hr className='horizontalrole' />
        <p><strong>Our vision is to become the house hold brand and to be trusted for delivering quality clothing at a cheaper price</strong></p>
      </div>
      <NewsLetter />
    </div>
  )
}

export default About
