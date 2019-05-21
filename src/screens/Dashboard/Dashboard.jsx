import preact from "preact";

import styles from "./Dashboard.css";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

import Button from "../../components/Button";

const Banner = ({ name, onLogOut, onAddNewJobButton }) => (
  <div class={styles.banner}>
    <div>
      <p class={styles.welcome}>Welcome {name}!</p>
      <Button type="secondary" handler={onLogOut}>
        Logout
      </Button>
    </div>
    <div>
      <Button type="primary" handler={onAddNewJobButton}>
        + Add a new job
      </Button>
    </div>
  </div>
);

const Dashboard = ({ user, jobs, status, onLogOut, onAddNewJobButton }) => {
  const jobsCreated = jobs.filter(
    // TODO: Directly read the 'status' value
    ({ timeline }) => timeline.slice(-1).pop().status === status.CREATED
  );
  const jobsApplied = jobs.filter(
    // TODO: Directly read the 'status' value
    ({ timeline }) => timeline.slice(-1).pop().status === status.APPLIED
  );

  return (
    <div class={styles.dashboard}>
      <Header>LeJob HQ</Header>
      <Main>
        <Banner
          name={user.given_name}
          onLogOut={onLogOut}
          onAddNewJobButton={onAddNewJobButton}
        />
        <div class={styles.overview}>
          <p class={styles.subtitle}>Your job applications' status</p>
          {jobs.length ? (
            <ul class={styles.list}>
              {jobsCreated.length && <li>{jobsCreated.length} created</li>}
              {jobsApplied.length && <li>{jobsApplied.length} applied</li>}
            </ul>
          ) : (
            <p>No jobs ...</p>
          )}
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default Dashboard;
