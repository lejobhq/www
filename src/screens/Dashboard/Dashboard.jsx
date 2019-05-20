import preact from "preact";

import styles from "./Dashboard.css";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

import Button from "../../components/Button";
import { STATUS } from "../../consts";

const Banner = ({ name, onLogOut, onAddNewJob }) => (
  <div class={styles.banner}>
    <div>
      <p class={styles.welcome}>Welcome {name}!</p>
      <Button type="secondary" handler={onLogOut}>
        Logout
      </Button>
    </div>
    <div>
      <Button type="primary" handler={onAddNewJob}>
        + Add a new job
      </Button>
    </div>
  </div>
);

const Dashboard = ({ user, jobs, onLogOut, onAddNewJob }) => {
  const jobsCreated = jobs.filter(
    // TODO: Directly read the 'status' value
    ({ timeline }) => timeline.slice(-1).pop().status === STATUS.CREATED
  );
  const jobsApplied = jobs.filter(
    // TODO: Directly read the 'status' value
    ({ timeline }) => timeline.slice(-1).pop().status === STATUS.APPLIED
  );

  return (
    <div class={styles.dashboard}>
      <Header>LeJob HQ</Header>
      <Main>
        <Banner
          name={user.given_name}
          onLogOut={onLogOut}
          onAddNewJob={onAddNewJob}
        />
        <div class={styles.overview}>
          <p class={styles.subtitle}>Your job applications' status</p>
          <ul class={styles.list}>
            <li>{jobsCreated.length} created</li>
            <li>{jobsApplied.length} applied</li>
          </ul>
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default Dashboard;
