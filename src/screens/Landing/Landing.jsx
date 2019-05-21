import preact from "preact";

import styles from "./Landing.css";

import logo from "../../images/logo.png";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

import Button from "../../components/Button";

const Hero = () => (
  <div class={styles.hero}>
    <div>
      <h1 class={styles.title}>LeJob HQ</h1>
      <h2 class={styles.subtitle}>Job application tracking done right!</h2>
    </div>
    <div>
      <img class={styles.logo} src={logo} alt="LeJob HQ logo" />
    </div>
  </div>
);

const Features = () => (
  <ul class={styles.features}>
    <li class={styles.feature}>Bookmark the job offers that interest you!</li>
    <li class={styles.feature}>
      View at a glance your progress into landing a new job!
    </li>
    <li class={styles.feature}>
      Centralise all the information about your job hunt in one place!
    </li>
    <li class={styles.feature}>Free and open-source!</li>
  </ul>
);

const Landing = ({ onSignIn }) => (
  <div class={styles.landing}>
    <Header />
    <Main>
      <Hero />
      <Button type="primary" handler={onSignIn}>
        Sign-in with Google
      </Button>
      <Features />
    </Main>
    <Footer />
  </div>
);

export default Landing;
export { Hero, Features };
