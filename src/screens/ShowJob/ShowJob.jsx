import preact from "preact";

import styles from "./ShowJob.css";

import statusToTag from "../../utils/status-to-tag";

import Button from "../../components/Button";

import editIcon from "../../images/edit.svg";

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
              {job.status.charAt(0) +
                job.status
                  .slice(1)
                  .toLowerCase()
                  .replace(/_/g, " ")}
            </span>
          </div>
        </div>
        <div class={styles.timeline}>
          <p class={styles.label}>Timeline</p>
          <div class={styles.content}>
            <ul>
              {job.timeline
                .slice(0)
                .reverse()
                .map(event => (
                  <li>
                    <span class={styles.date}>
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <div>
                      <div class={styles.tag}>
                        <img
                          src={statusToTag(status, event.status)}
                          alt="Tag"
                        />
                        <span>
                          {event.status.charAt(0) +
                            event.status
                              .slice(1)
                              .toLowerCase()
                              .replace(/_/g, " ")}
                        </span>
                      </div>
                      {event.metadata ? (
                        <div class={styles.metadata}>
                          {event.metadata.notes ? (
                            <p class={styles["metadata-notes"]}>
                              {event.metadata.notes}
                            </p>
                          ) : null}
                          {event.metadata.date ? (
                            <p class={styles["metadata-date"]}>
                              {new Date(
                                event.metadata.date
                              ).toLocaleDateString()}
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div class={styles.left}>
        {job.technologies && job.technologies.length ? (
          <div class={styles.technologies}>
            <p class={styles.label}>Technologies</p>
            <div class={styles.content}>
              {job.technologies.map(tech => (
                <span>{tech}</span>
              ))}
            </div>
          </div>
        ) : null}
        {job.experience ? (
          <div class={styles.experience}>
            <p class={styles.label}>Experience</p>
            <div class={styles.content}>{job.experience}</div>
          </div>
        ) : null}
        {job.compensation ? (
          <div class={styles.compensation}>
            <p class={styles.label}>Compensation</p>
            <div class={styles.content}>{job.compensation}</div>
          </div>
        ) : null}
        {job.location ? (
          <div class={styles.location}>
            <p class={styles.label}>Office Location</p>
            <div class={styles.content}>{job.location}</div>
          </div>
        ) : null}
        {job.visa != null ? (
          <div class={styles.visa}>
            <p class={styles.label}>Visa Sponsorship</p>
            <div class={styles.content}>{job.visa ? "Yes" : "No"}</div>
          </div>
        ) : null}
        {job.relocation != null ? (
          <div class={styles.relocation}>
            <p class={styles.label}>Relocation</p>
            <div class={styles.content}>{job.relocation ? "Yes" : "No"}</div>
          </div>
        ) : null}
        {job.company_size ? (
          <div class={styles.size}>
            <p class={styles.label}>Company Size</p>
            <div class={styles.content}>{job.company_size}</div>
          </div>
        ) : null}
      </div>
    </div>
  </div>
);

export default ShowJob;
export { statusToTag };
