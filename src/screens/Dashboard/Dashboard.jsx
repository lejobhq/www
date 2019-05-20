import preact from "preact";

import styles from "./Dashboard.css";

import Button from "../../components/Button";

const Dashboard = ({ user, jobs, onLogOut }) => (
  <div class={styles.dashboard}>
    <div class={styles.banner}>
      <p>Welcome {user.first_name}!</p>
      <Button type="secondary" handler={onLogOut}>
        Logout
      </Button>
      <Button type="primary">+ Add New Job</Button>
    </div>
    <div class={styles.overview}>{jobs.length} Jobs</div>
  </div>
);

export default Dashboard;
