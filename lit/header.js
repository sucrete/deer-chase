import { LitElement, html } from "../../assets/js/vendor/lit.js";

export class Header extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="header-four-wrapper">
              <div class="nav-area">
                <nav>
                  <ul>
                    <li>
                      <a class="nav-link" href="rates.html"> Greens Fees </a>
                    </li>
                    <li class="has-dropdown">
                      <a class="nav-link with-chevron" href="#"
                        >Events
                        <i class="fa-duotone fa-regular fa-chevron-down"></i>
                      </a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="events.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Calendar</a
                          >
                        </li>
                        <li>
                          <a href="host-your-event.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Host Your Event</a
                          >
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a class="nav-link" href="membership.html">Membership</a>
                    </li>

                    <li class="has-dropdown">
                      <a class="nav-link with-chevron" href="#"
                        >Pool
                        <i class="fa-duotone fa-regular fa-chevron-down"></i>
                      </a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="pool.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Membership</a
                          >
                        </li>
                        <li>
                          <a href="pool.html#rules"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Pool Rules</a
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="button-area-right-header">
                <div class="menu-btn-toggle">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="14" width="20" height="2" fill="#1F1F25"></rect>
                    <rect y="7" width="20" height="2" fill="#1F1F25"></rect>
                    <rect width="20" height="2" fill="#1F1F25"></rect>
                  </svg>
                </div>
              </div>
              <a href="index.html" class="logo">
                
               <img src="/assets/images/logo/deer-chase-badge.svg" alt="" class="deer-chase-logo-badge" />

                <img src="/assets/images/logo/deer-chase-roman.svg" alt="" class="deer-chase-logo-roman injectable" />
              </a>
              <div class="nav-area">
                <nav>
                  <ul>
                    <li>
                      <a class="nav-link" href="online-store.html"
                        >Online Store</a
                      >
                    </li>
                    <li class="has-dropdown">
                      <a class="nav-link" href="#">
                        About
                        <i class="fa-duotone fa-regular fa-chevron-down"></i>
                      </a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="about.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Contact</a
                          >
                        </li>
                        <li>
                          <a href="about.html#clubhouse-rental"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Clubhouse Rental</a
                          >
                        </li>
                        <li>
                          <a href="scorecard.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Scorecard</a
                          >
                        </li>
                        <li>
                          <a href="holes-in-one.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Holes-in-One!</a
                          >
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="book-tee-time.html"
                        class="rts-btn btn-primary my-btn"
                      >
                        Book tee time
                        <img
                          class="injectable"
                          src="assets/images/service/icons/13.svg"
                          alt=""
                        />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("my-header", Header);
