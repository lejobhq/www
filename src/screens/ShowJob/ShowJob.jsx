import preact from "preact";

import styles from "./ShowJob.css";

import Button from "../../components/Button";

import tagApplied from "../../images/tag_applied.svg";
import tagCreated from "../../images/tag_created.svg";
import tagInterview from "../../images/tag_interview.svg";
import tagNegotiating from "../../images/tag_negotiating.svg";
import tagNoResponse from "../../images/tag_no-response.svg";
import tagNotInterested from "../../images/tag_not-interested.svg";
import tagOffer from "../../images/tag_offer.svg";
import tagRejected from "../../images/tag_rejected.svg";

import editIcon from "../../images/edit.svg";

function statusToTag(
  {
    CREATED,
    APPLIED,
    REJECTED,
    NO_RESPONSE,
    NO_LONGER_INTERESTED,
    INTERVIEW_ROUND_1,
    INTERVIEW_ROUND_2,
    INTERVIEW_ROUND_3,
    INTERVIEW_ROUND_4,
    INTERVIEW_ROUND_5,
    INTERVIEW_ROUND_6,
    INTERVIEW_ROUND_7,
    INTERVIEW_ROUND_8,
    INTERVIEW_ROUND_9,
    INTERVIEW_ROUND_10,
    OFFER,
    NEGOTIATING,
    ACCEPTED
  },
  status
) {
  switch (status) {
    case APPLIED:
      return tagApplied;
    case CREATED:
      return tagCreated;
    case INTERVIEW_ROUND_1:
    case INTERVIEW_ROUND_2:
    case INTERVIEW_ROUND_3:
    case INTERVIEW_ROUND_4:
    case INTERVIEW_ROUND_5:
    case INTERVIEW_ROUND_6:
    case INTERVIEW_ROUND_7:
    case INTERVIEW_ROUND_8:
    case INTERVIEW_ROUND_9:
    case INTERVIEW_ROUND_10:
      return tagInterview;
    case NEGOTIATING:
      return tagNegotiating;
    case NO_RESPONSE:
      return tagNoResponse;
    case NO_LONGER_INTERESTED:
      return tagNotInterested;
    case OFFER:
      return tagOffer;
    case REJECTED:
      return tagRejected;
    default:
      return tagCreated;
  }
}

const ShowJob = ({ job, status, onDismissOverlay, onEditJob }) => (
  <div class={styles["show-job"]}>
    <div class={styles.header}>
      <Button type="close" handler={onDismissOverlay}>
        Close
      </Button>
    </div>
    <h2 class={styles.title}>
      <a href={job.url} taget="_blank">
        {job.title} <span>at</span> {job.company}
      </a>
      <img
        class={styles.icon}
        src={editIcon}
        alt="edit"
        title="Edit"
        onClick={() => onEditJob(job)}
        role="presentation"
      />
    </h2>
    <div class={styles.body}>
      <div class={styles.right}>
        <img src={job.logo} class={styles.logo} alt="logo" />
        <div class={styles.status}>
          <p class={styles.label}>Status</p>
          <div class={styles.content}>
            <img src={statusToTag(status, job.status)} alt="Tag" />
            <span>
              {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
            </span>
          </div>
        </div>
        <div class={styles.timeline}>
          <p class={styles.label}>Timeline</p>
          <div class={styles.content}>
            <ul>
              {job.timeline.map(event => (
                <li>
                  <span class={styles.date}>
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <div class={styles.tag}>
                    <img src={statusToTag(status, event.status)} alt="Tag" />
                    <span>
                      {event.status.charAt(0) +
                        event.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div class={styles.left}>
        <div class={styles.technologies}>
          <p class={styles.label}>Technologies</p>
          <div class={styles.content}>
            {job.technologies.map(tech => (
              <span>{tech}</span>
            ))}
          </div>
        </div>
        <div class={styles.experience}>
          <p class={styles.label}>Experience</p>
          <div class={styles.content}>{job.experience}</div>
        </div>
        <div class={styles.visa}>
          <p class={styles.label}>Visa Sponsorship</p>
          <div class={styles.content}>{job.visa ? "Yes" : "No"}</div>
        </div>
        <div class={styles.relocation}>
          <p class={styles.label}>Relocation</p>
          <div class={styles.content}>{job.relocation ? "Yes" : "No"}</div>
        </div>
        <div class={styles.size}>
          <p class={styles.label}>Company Size</p>
          <div class={styles.content}>{job.company_size}</div>
        </div>
      </div>
    </div>
  </div>
);

export default ShowJob;
export { statusToTag };
