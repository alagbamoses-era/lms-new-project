import React, { useState } from "react";
import "../css/Contact.css";
import AxiosInstance from "../Components/Axios";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");


    try {

      const response = await AxiosInstance.post(
        "contact/",
        formData
      );


      console.log(
        "Contact response:",
        response.data
      );


      setMessage(
        "Message sent successfully!"
      );


      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });


    } catch (error) {


      console.error(
        "Contact error:",
        error.response?.data || error.message
      );


      setMessage(
        error.response?.data?.detail ||
        "Unable to send message. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="contact-container">


      <div className="contact-header">

        <h1>
          Contact Us
        </h1>

        <p>
          We'd love to hear from you. Send us a message!
        </p>

      </div>




      <div className="contact-content">


        <div className="contact-info">

          <h2>
            Get In Touch
          </h2>


          <div className="info-box">

            <h3>
              📍 Address
            </h3>

            <p>
              Newcastle-Under-Lyme
            </p>

          </div>



          <div className="info-box">

            <h3>
              📞 Phone
            </h3>

            <p>
              XXXXXXXXXXXXXX
            </p>

          </div>



          <div className="info-box">

            <h3>
              📧 Email
            </h3>

            <p>
              mosesalagba22@gmail.com
            </p>

          </div>


        </div>





        <div className="contact-form">


          <h2>
            Send a Message
          </h2>



          {message && (
            <p className="contact-message">
              {message}
            </p>
          )}




          <form onSubmit={handleSubmit}>


            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />



            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />



            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />



            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />



            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >

              {loading
                ? "Sending..."
                : "Send Message"
              }

            </button>


          </form>


        </div>


      </div>


    </div>

  );
}


export default Contact;