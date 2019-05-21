import preact from "preact";

import styles from "./Dashboard.css";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

import Button from "../../components/Button";

import tagApplied from "../../images/tag_applied.svg";
import tagCreated from "../../images/tag_created.svg";
import tagInterview from "../../images/tag_interview.svg";
import tagNegotiating from "../../images/tag_negotiating.svg";
import tagNoResponse from "../../images/tag_no-response.svg";
import tagNotInterested from "../../images/tag_not-interested.svg";
import tagOffer from "../../images/tag_offer.svg";
import tagRejected from "../../images/tag_rejected.svg";

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

const Overview = ({ number, jobAccepted }) => (
  <div class={styles.overview}>
    <p class={styles.subtitle}>Your job applications' status</p>
    {number.jobsAccepted ? (
      <p>Congrats on your new job at {jobAccepted.company}!</p>
    ) : number.jobs ? (
      <ul class={styles.list}>
        {number.jobsCreated ? (
          <li>
            <img src={tagCreated} alt="Tag Created" />
            <span>{number.jobsCreated} created</span>
          </li>
        ) : null}
        {number.jobsApplied ? (
          <li>
            <img src={tagApplied} alt="Tag Applied" />
            <span>{number.jobsApplied} applied</span>
          </li>
        ) : null}
        {number.jobsInterview ? (
          <li>
            <img src={tagInterview} alt="Tag Interview" />
            <span>{number.jobsInterview} interviews</span>
          </li>
        ) : null}
        {number.jobsOffer ? (
          <li>
            <img src={tagOffer} alt="Tag Offer" />
            <span>{number.jobsOffer} offers</span>
          </li>
        ) : null}
        {number.jobsNegotiating ? (
          <li>
            <img src={tagNegotiating} alt="Tag Negotiating" />
            <span>{number.jobsNegotiating} negotiating</span>
          </li>
        ) : null}
        {number.jobsRejected ? (
          <li>
            <img src={tagRejected} alt="Tag Rejected" />
            <span>{number.jobsRejected} rejected</span>
          </li>
        ) : null}
        {number.jobsNoResponse ? (
          <li>
            <img src={tagNoResponse} alt="Tag No Response" />
            <span>{number.jobsNoResponse} no reponse</span>
          </li>
        ) : null}
        {number.jobsNotInterested ? (
          <li>
            <img src={tagNotInterested} alt="Tag Not Interested" />
            <span>{number.jobsNotInterested} not interested</span>
          </li>
        ) : null}
      </ul>
    ) : (
      <p>No jobs ...</p>
    )}
  </div>
);

const Dashboard = ({ user, jobs, status, onLogOut, onAddNewJobButton }) => {
  const jobsCreated = jobs.filter(job => job.status === status.CREATED);
  const jobsApplied = jobs.filter(job => job.status === status.APPLIED);
  const jobsRejected = jobs.filter(job => job.status === status.REJECTED);
  const jobsNoResponse = jobs.filter(job => job.status === status.NO_RESPONSE);
  const jobsNotInterested = jobs.filter(
    job => job.status === status.NO_LONGER_INTERESTED
  );
  const jobsInterview = jobs.filter(job =>
    [
      job.status.INERVIEW_ROUND_1,
      job.status.INERVIEW_ROUND_2,
      job.status.INERVIEW_ROUND_3,
      job.status.INERVIEW_ROUND_4,
      job.status.INERVIEW_ROUND_5,
      job.status.INERVIEW_ROUND_6,
      job.status.INERVIEW_ROUND_7,
      job.status.INERVIEW_ROUND_8,
      job.status.INERVIEW_ROUND_9,
      job.status.INERVIEW_ROUND_10
    ].includes(status)
  );
  const jobsOffer = jobs.filter(job => job.status === status.OFFER);
  const jobsNegotiating = jobs.filter(job => job.status === status.NEGOTIATING);
  const jobsAccepted = jobs.filter(job => job.status === status.ACCEPTED);

  return (
    <div class={styles.dashboard}>
      <Header>LeJob HQ</Header>
      <Main>
        <Banner
          name={user.given_name}
          onLogOut={onLogOut}
          onAddNewJobButton={onAddNewJobButton}
        />
        <Overview
          number={{
            jobs: jobs.length,
            jobsCreated: jobsCreated.length,
            jobsApplied: jobsApplied.length,
            jobsRejected: jobsRejected.length,
            jobsNoResponse: jobsNoResponse.length,
            jobsNotInterested: jobsNotInterested.length,
            jobsInterview: jobsInterview.length,
            jobsOffer: jobsOffer.length,
            jobsNegotiating: jobsNegotiating.length,
            jobsAccepted: jobsAccepted.length
          }}
          jobAccepted={jobsAccepted.length && jobsAccepted.slice(-1).pop()}
        />
      </Main>
      <Footer />
    </div>
  );
};

export default Dashboard;
export { Banner, Overview };
