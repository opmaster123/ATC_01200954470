import React from "react";
import { FaTicketAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import "./file.css";
import HeroImage from "./assets/Hero.png";

const events = [
  {
    id: 1,
    date: "25-26",
    month: "NOV",
    title: "Lakeside Camping at Pawna",
    location: "Adventure Geek - Explore the Unexplored, Mumbai",
    time: "8:30 AM - 7:30 PM",
    price: "INR 1,400",
    interested: 14,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ef66eb9d0678b1475fbca4f18a73a4184543da37",
  },
  {
    id: 2,
    date: "02",
    month: "DEC",
    title: "Sound Of Christmas 2023",
    location: "Bal Gandharva Rang Mandir, Mumbai",
    time: "6:30 PM - 9:30 PM",
    price: "INR 499",
    interested: 16,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/243f7859484bac72efe7edb86c64dd3e146f623e",
  },
];

export default function File() {
  return (
    <>
      <div className="hero">
        <img src={HeroImage} alt="Hero" className="hero-img" />
        <div className="hero-text">
          <h2>Don’t miss out!</h2>
          <p>
            Explore the <span className="highlight">vibrant events</span>{" "}
            happening locally and globally.
          </p>
        </div>
      </div>

      <div className="container">
        <h2 className="header">Popular Events Taking Place Right Now</h2>
        <div className="grid">
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt={event.title} className="card-image" />
              <div className="card-body">
                <div className="card-date">
                  <p className="month">{event.month}</p>
                  <p className="date">{event.date}</p>
                </div>
                <div className="card-details">
                  <h3>{event.title}</h3>
                  <p>{event.location}</p>
                  <p className="time">{event.time}</p>
                  <div className="card-meta">
                    <span>
                      <FaTicketAlt /> {event.price}
                    </span>
                    <span className="dot" />
                    <span>
                      <AiFillStar color="purple" /> {event.interested}{" "}
                      interested
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cta">
          <h3>Create an event with Eventify</h3>
          <p>
            Got a show, event, activity or a great experience? Partner with us &
            get listed on Eventify
          </p>
          <button>Create Event</button>
        </div>
      </div>
    </>
  );
}
