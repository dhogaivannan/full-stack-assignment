import "./App.css";
import { Unsplash } from "./components/Unsplash";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        setImage([...image, ...res.data]);
      });
  };
  return (
    <div className="App">
      <header class="header-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-3">
              <div class="logo">
                <h2 class="site-logo">Riddle</h2>
              </div>
            </div>
            <div class="col-lg-8 col-md-9">
              <a href="" class="site-btn header-btn">
                Get in touch
              </a>
              <nav class="main-menu">
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Work</li>
                  <li>Contact</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="nav-switch">
          <i class="fa fa-bars"></i>
        </div>
      </header>

      <section class="intro-section">
        <div class="container text-center">
          <div class="row">
            <div class="col-xl-10 offset-xl-1">
              <h2 class="section-title">
                I’m a freelance <span>digital designer</span>, with +10 years of
                experience
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section class="portfolio-section">
        <div class="container">
          <ul class="portfolio-filter controls">
            <li class="control" data-filter="all">
              All
            </li>
            <li class="control" data-filter=".web">
              Web design
            </li>
            <li class="control" data-filter=".digital">
              Digital design
            </li>
            <li class="control" data-filter=".rened">
              3D Renedering
            </li>
            <li class="control" data-filter=".brand">
              Brand Identity
            </li>
          </ul>
        </div>
        <InfiniteScroll
          dataLength={image.length}
          next={fetchImage}
          hasMore={true}
        >
          <div class="WrapperImages">
            {image.map((image) => (
              <Unsplash url={image.urls.thumb} key={image.id} />
            ))}
          </div>
        </InfiniteScroll>
      </section>
    </div>
  );
}

export default App;
