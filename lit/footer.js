import { LitElement, html } from "../../assets/js/vendor/lit.js";

export class Footer extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="gradient-footer-wrapper">
        <!-- rts footer area start -->
        <div class="rts-footer-area rts-section-gapTop">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-6 center-please logo-column">
                <div>
                  <div class="logo-brick row">
                    <div class="logo-col">
                      <a href="index.html" class="logo">
                        <img
                          class="footer-logo"
                          src="assets/images/logo/deer-chase-badge.svg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="col"></div>
                  </div>

                  <form action="" class="footer-form">
                    <div class="single">
                      <p class="mb-4">
                        Join our email list to get exclusive discounts!
                      </p>
                      <!-- <label for="name">Email</label> -->
                      <div class="that-group">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email"
                          required=""
                        />
                        <button class="rts-btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </form>
                  <div class="link-group d-flex flex-row flex-start">
                    <div class="contact-stack">
                      <a
                        href="tel:5733466117"
                        class="link phone-link no-underline"
                      >
                        <img
                          class="icon phone-icon"
                          src="./assets/images/icons/phone.svg"
                          alt=""
                        />(573) 346-6117
                      </a>
                      <a
                        href="https://maps.app.goo.gl/Bzrg9oSfx67wBW1E7"
                        target="_blank"
                        class="link map-link d-flex flex-row align-items-start no-underline"
                      >
                        <img
                          class="icon map-icon"
                          src="./assets/images/icons/map-icon.svg"
                          alt=""
                        />
                        <div>
                          770 Deer Chase Road<br />
                          Linn Creek, MO 65052
                        </div>
                      </a>
                    </div>

                    <div class="social-stack">
                      <a
                        href="https://www.facebook.com/DeerChaseGolf"
                        class="social-link link"
                        target="_blank"
                      >
                        <img src="./assets/images/icons/facebook.svg" alt="" />
                        Facebook
                      </a>
                      <a
                        href="https://www.instagram.com/thegolfclubatdeerchase1/"
                        class="social-link link"
                        target="_blank"
                      >
                        <img src="./assets/images/icons/instagram.svg" alt="" />
                        Instagram
                      </a>
                      <a
                        href="https://www.pinterest.com/thegolfclubatde/"
                        class="social-link link"
                        target="_blank"
                      >
                        <img src="./assets/images/icons/pinterest.svg" alt="" />
                        Pinterest
                      </a>
                      <a
                        href="https://www.tripadvisor.com/Attraction_Review-g44606-d4460120-Reviews-The_Golf_Club_at_Deer_Chase-Linn_Creek_Lake_of_the_Ozarks_Missouri.html"
                        class="social-link link"
                        target="_blank"
                      >
                        <img src="./assets/images/icons/trip-advisor.svg" alt="" />
                        Trip Advisor
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-12 col-md-5 justify-content-md-end d-flex weather-col pt-5 pt-md-0 mt-5 pt-md-0"
              >
                <div class="weather-card">
                  <div class="card-body">
                    <div class=" _500 fs-24 weather-heading">
                      Weather
                      <span class="grey-text">
                        <span class="hyphen">-</span>
                        <br class="break" />
                        Linn Creek, MO</span
                      >
                    </div>
                    <!--~ Top Row -->
                    <div class="row today-row">
                      <div class="col today-icon">
                        <img
                          src="./assets/images/icons/cloudy.png"
                          alt=""
                          class="img-fluid icon-img"
                        />
                      </div>
                      <div class="col today-temp text-center">
                        <div>
                          <span class="the-temp"> 35 </span>
                          <!-- <span class="degree align-top"> °F</span> -->
                        </div>
                      </div>
                      <div class="col today-weather">
                        <div class="today-weather-wrapper">
                          <div class="what-weather">snow</div>
                          <div class="light-white">
                            <svg
                              class="wind-icon"
                              xmlns="http://www.w3.org/2000/svg"
                              width="64"
                              height="64"
                              fill="#ffffffa6"
                              viewBox="0 0 256 256"
                            >
                              <path
                                d="M184,184a32,32,0,0,1-32,32c-13.7,0-26.95-8.93-31.5-21.22a8,8,0,0,1,15-5.56C137.74,195.27,145,200,152,200a16,16,0,0,0,0-32H40a8,8,0,0,1,0-16H152A32,32,0,0,1,184,184Zm-64-80a32,32,0,0,0,0-64c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C105.74,60.73,113,56,120,56a16,16,0,0,1,0,32H24a8,8,0,0,0,0,16Zm88-32c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C193.74,92.73,201,88,208,88a16,16,0,0,1,0,32H32a8,8,0,0,0,0,16H208a32,32,0,0,0,0-64Z"
                              ></path>
                            </svg>
                            <span class="wind">14</span> mph
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--~ Future Row 1 -->
                    <div
                      class="row future-row future-row-1 justify-content-between"
                    >
                      <div class="col-5 day my-auto tomorrow text-center">
                        Tuesday
                      </div>
                      <div class="col-2 icon">
                        <img
                          src="./assets/images/icons/cloudy.svg"
                          alt=""
                          class="tomorrow-icon"
                        />
                      </div>
                      <div class="col-5 temp my-auto text-center">
                        <span class="hi">72</span>°F /
                        <span class="lo">57</span>°F
                      </div>
                    </div>
                    <!--~ Future Row 2 -->
                    <div
                      class="row future-row future-row-2 justify-content-between"
                    >
                      <div
                        class="col-5 day my-auto day-after-tomorrow text-center"
                      >
                        Wednesday
                      </div>
                      <div class="col-2 icon">
                        <img
                          src="./assets/images/icons/wind.svg"
                          alt=""
                          class="day-after-tomorrow-icon"
                        />
                      </div>
                      <div class="col-5 temp my-auto text-center">
                        <span class="hi">72</span>°F /
                        <span class="lo">57</span>°F
                      </div>
                    </div>
                    <!--~ Future Row 3 -->
                    <div
                      class="row future-row future-row-3 justify-content-between"
                    >
                      <div
                        class="col-5 day my-auto three-days-from-today text-center"
                      >
                        Thursday
                      </div>
                      <div class="col-2 icon">
                        <img
                          src="./assets/images/icons/snow.svg"
                          alt=""
                          class="three-days-from-today-icon"
                        />
                      </div>
                      <div class="col-5 temp my-auto text-center">
                        <span class="hi">72</span>°F /
                        <span class="lo">57</span>°F
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- rts copyright area start -->
            <div class="rts-copyright-area-one">
              <div class="row">
                <div class="col-lg-12">
                  <div class="copyright-wrapper">
                    <div class="new-row">
                      <p>
                        © The Golf Club at Deer Chase
                        ${new Date().getFullYear()}
                      </p>
                    </div>
                    <a
                      class="teequest-link no-underline"
                      target="_blank"
                      href="https://www.teequestsolutions.com"
                    >
                      <svg
                        class="svg-inline--fa fa-gears"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="gears"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="white"
                          d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                        ></path>
                      </svg>
                      Powered by TeeQuest
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- rts copyright area end -->
          </div>
        </div>
        <!-- rts footer area end -->
      </div>

      <div id="side-bar" class="side-bar header-two" dir="ltr">
        <button class="close-icon-menu" aria-label="footer_Button">
          <i class="far fa-times"></i>
        </button>
        <div class="mobile-menu-main">
          <nav class="nav-main mainmenu-nav mt--30">
            <ul class="mainmenu metismenu" id="mobile-menu-active">
              <li>
                <a href="rates.html" class="main">Greens Fees</a>
              </li>
              <li class="has-droupdown">
                <a href="#" class="main" aria-expanded="false">Events</a>
                <ul class="submenu mm-collapse">
                  <li><a href="events.html">Calendar</a></li>
                  <li><a href="host-your-event.html">Host Your Event</a></li>
                </ul>
              </li>
              <li>
                <a href="membership.html" class="main">Membership</a>
              </li>

              <li class="has-droupdown">
                <a href="#" class="main" aria-expanded="false">Pool</a>
                <ul class="submenu mm-collapse">
                  <li><a href="pool.html">Membership</a></li>
                  <li><a href="pool.html#rules">Pool Rules</a></li>
                </ul>
              </li>
              <li>
                <a href="online-store.html" class="main">Online Store</a>
              </li>
              <li class="has-droupdown">
                <a href="#" class="main" aria-expanded="false">About</a>
                <ul class="submenu mm-collapse">
                  <li><a href="about.html">Contact</a></li>
                  <li>
                    <a href="about.html#clubhouse-rental">Clubhouse Rental</a>
                  </li>

                  <li><a href="scorecard.html">Scorecard</a></li>
                  <li><a href="holes-in-one.html">Holes-in-One!</a></li>
                </ul>
              </li>
              <li>
                <a
                  href="book-tee-time.html"
                  class="rts-btn btn-primary my-btn sidebar-btn"
                >
                  Book tee time
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    data-inject-url="http://127.0.0.1:5500/assets/images/service/icons/13.svg"
                    class="injectable"
                  >
                    <path
                      d="M9.3335 22.6667L22.6668 9.33337M22.6668 9.33337H9.3335M22.6668 9.33337V22.6667"
                      stroke="#999999"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- mobile menu area end -->
      </div>
    `;
  }
}
customElements.define("my-footer", Footer);
