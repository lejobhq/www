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

import viewIcon from "../../images/view.svg";
import editIcon from "../../images/edit.svg";

function calculateDifferenceInDays(date) {
  return Math.ceil(
    Math.abs((Date.now() - new Date(date)) / (24 * 60 * 60 * 1000))
  );
}

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

const JobApplicationList = ({
  jobs,
  jobsAccepted,
  jobsApplied,
  jobsCreated,
  jobsInterview,
  jobsNegotiating,
  jobsNoResponse,
  jobsNotInterested,
  jobsOffer,
  jobsRejected,
  onViewJob,
  onEditJob
}) => (
  <div class={styles["job-list"]}>
    {jobsInterview.length ? (
      <div class={styles["job-category"]}>
        <div class={styles["job-category-header"]}>
          <img src={tagInterview} alt="Tag Interview" />
          <h3>{jobsInterview.length} interview(s) coming up!</h3>
        </div>
        <ul class={styles["job-category-body"]}>
          {jobsInterview.map(job => (
            <li>
              <span class={styles.company}>{job.company}</span>
              <span class={styles.title}>{job.title}</span>
              <span class={styles.days}>
                in{" "}
                {calculateDifferenceInDays(
                  job.timeline[job.timeline.length - 1].metadata.date
                )}{" "}
                days
              </span>
              <span class={styles.icons}>
                <img
                  class={styles.icon}
                  src={viewIcon}
                  alt="view"
                  title="View"
                  onClick={() => onViewJob(job)}
                  role="presentation"
                />
                <img
                  class={styles.icon}
                  src={editIcon}
                  alt="edit"
                  title="Edit"
                  onClick={() => onEditJob(job)}
                  role="presentation"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
    {jobsNegotiating.length ? (
      <div class={styles["job-category"]}>
        <div class={styles["job-category-header"]}>
          <img src={tagNegotiating} alt="Tag Negotiating" />
          <h3>{jobsNegotiating.length} negotiating(s) in progress!</h3>
        </div>
        <ul class={styles["job-category-body"]}>
          {jobsNegotiating.map(job => (
            <li>
              <span class={styles.company}>{job.company}</span>
              <span class={styles.title}>{job.title}</span>
              <span class={styles.days}>
                {calculateDifferenceInDays(job.updated_at._seconds * 1000)}{" "}
                day(s) ago
              </span>
              <span class={styles.icons}>
                <img
                  class={styles.icon}
                  src={viewIcon}
                  alt="view"
                  title="View"
                  onClick={() => onViewJob(job)}
                  role="presentation"
                />
                <img
                  class={styles.icon}
                  src={editIcon}
                  alt="edit"
                  title="Edit"
                  onClick={() => onEditJob(job)}
                  role="presentation"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
    {jobsOffer.length ? (
      <div class={styles["job-category"]}>
        <div class={styles["job-category-header"]}>
          <img src={tagOffer} alt="Tag Offer" />
          <h3>{jobsOffer.length} offer(s) received!</h3>
        </div>
        <ul class={styles["job-category-body"]}>
          {jobsOffer.map(job => (
            <li>
              <span class={styles.company}>{job.company}</span>
              <span class={styles.title}>{job.title}</span>
              <span class={styles.days}>
                {calculateDifferenceInDays(job.updated_at._seconds * 1000)}{" "}
                day(s) ago
              </span>
              <span class={styles.icons}>
                <img
                  class={styles.icon}
                  src={viewIcon}
                  alt="view"
                  title="View"
                  onClick={() => onViewJob(job)}
                  role="presentation"
                />
                <img
                  class={styles.icon}
                  src={editIcon}
                  alt="edit"
                  title="Edit"
                  onClick={() => onEditJob(job)}
                  role="presentation"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
    {jobsApplied.length ? (
      <div class={styles["job-category"]}>
        <div class={styles["job-category-header"]}>
          <img src={tagApplied} alt="Tag Applied" />
          <h3>{jobsApplied.length} applications sent!</h3>
        </div>
        <ul class={styles["job-category-body"]}>
          {jobsApplied.map(job => (
            <li>
              <span class={styles.company}>{job.company}</span>
              <span class={styles.title}>{job.title}</span>
              <span class={styles.days}>
                {calculateDifferenceInDays(job.updated_at._seconds * 1000)}{" "}
                day(s) ago
              </span>
              <span class={styles.icons}>
                <img
                  class={styles.icon}
                  src={viewIcon}
                  alt="view"
                  title="View"
                  onClick={() => onViewJob(job)}
                  role="presentation"
                />
                <img
                  class={styles.icon}
                  src={editIcon}
                  alt="edit"
                  title="Edit"
                  onClick={() => onEditJob(job)}
                  role="presentation"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
    {jobsCreated.length ? (
      <div class={styles["job-category"]}>
        <div class={styles["job-category-header"]}>
          <img src={tagCreated} alt="Tag Created" />
          <h3>{jobsCreated.length} jobs you haven't applied to yet!</h3>
        </div>
        <ul class={styles["job-category-body"]}>
          {jobsCreated.map(job => (
            <li>
              <span class={styles.company}>{job.company}</span>
              <span class={styles.title}>{job.title}</span>
              <span class={styles.days}>
                {calculateDifferenceInDays(job.updated_at._seconds * 1000)}{" "}
                day(s) ago
              </span>
              <span class={styles.icons}>
                <img
                  class={styles.icon}
                  src={viewIcon}
                  alt="view"
                  title="View"
                  onClick={() => onViewJob(job)}
                  role="presentation"
                />
                <img
                  class={styles.icon}
                  src={editIcon}
                  alt="edit"
                  title="Edit"
                  onClick={() => onEditJob(job)}
                  role="presentation"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
    {jobsNoResponse.length ? (
      <div class={styles["job-category"]}>
        <div class={styles["job-category-header"]}>
          <img src={tagNoResponse} alt="Tag No Response" />
          <h3>{jobsNoResponse.length} jobs applications without response!</h3>
        </div>
        <ul class={styles["job-category-body"]}>
          {jobsNoResponse.map(job => (
            <li>
              <span class={styles.company}>{job.company}</span>
              <span class={styles.title}>{job.title}</span>
              <span class={styles.days}>
                {calculateDifferenceInDays(job.updated_at._seconds * 1000)}{" "}
                day(s) ago
              </span>
              <span class={styles.icons}>
                <img
                  class={styles.icon}
                  src={viewIcon}
                  alt="view"
                  title="View"
                  onClick={() => onViewJob(job)}
                  role="presentation"
                />
                <img
                  class={styles.icon}
                  src={editIcon}
                  alt="edit"
                  title="Edit"
                  onClick={() => onEditJob(job)}
                  role="presentation"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
    {jobsRejected.length ? (
      <div class={styles["job-category"]}>
        <div class={styles["job-category-header"]}>
          <img src={tagRejected} alt="Tag Rejected" />
          <h3>{jobsRejected.length} job applications rejected ...</h3>
        </div>
        <ul class={styles["job-category-body"]}>
          {jobsRejected.map(job => (
            <li>
              <span class={styles.company}>{job.company}</span>
              <span class={styles.title}>{job.title}</span>
              <span class={styles.days}>
                {calculateDifferenceInDays(job.updated_at._seconds * 1000)}{" "}
                day(s) ago
              </span>
              <span class={styles.icons}>
                <img
                  class={styles.icon}
                  src={viewIcon}
                  alt="view"
                  title="View"
                  onClick={() => onViewJob(job)}
                  role="presentation"
                />
                <img
                  class={styles.icon}
                  src={editIcon}
                  alt="edit"
                  title="Edit"
                  onClick={() => onEditJob(job)}
                  role="presentation"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
    {jobsNotInterested.length ? (
      <div class={styles["job-category"]}>
        <div class={styles["job-category-header"]}>
          <img src={tagNotInterested} alt="Tag Not Interested" />
          <h3>
            {jobsNotInterested.length} jobs you aren't interested anymore!
          </h3>
        </div>
        <ul class={styles["job-category-body"]}>
          {jobsNotInterested.map(job => (
            <li>
              <span class={styles.company}>{job.company}</span>
              <span class={styles.title}>{job.title}</span>
              <span class={styles.days}>
                {calculateDifferenceInDays(job.updated_at._seconds * 1000)}{" "}
                day(s) ago
              </span>
              <span class={styles.icons}>
                <img
                  class={styles.icon}
                  src={viewIcon}
                  alt="view"
                  title="View"
                  onClick={() => onViewJob(job)}
                  role="presentation"
                />
                <img
                  class={styles.icon}
                  src={editIcon}
                  alt="edit"
                  title="Edit"
                  onClick={() => onEditJob(job)}
                  role="presentation"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </div>
);

const Dashboard = ({
  user,
  jobs,
  status,
  onLogOut,
  onAddNewJobButton,
  onViewJob,
  onEditJob
}) => {
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
        <JobApplicationList
          jobs={jobs}
          jobsCreated={jobsCreated}
          jobsApplied={jobsApplied}
          jobsRejected={jobsRejected}
          jobsNoResponse={jobsNoResponse}
          jobsNotInterested={jobsNotInterested}
          jobsInterview={jobsInterview}
          jobsOffer={jobsOffer}
          jobsNegotiating={jobsNegotiating}
          jobsAccepted={jobsAccepted}
          onViewJob={onViewJob}
          onEditJob={onEditJob}
        />
      </Main>
      <Footer />
    </div>
  );
};

export default Dashboard;
export { Banner, Overview, JobApplicationList, calculateDifferenceInDays };
