import preact, { Component } from "preact";

import styles from "./EditJob.css";

import Button from "../../components/Button";

class EditJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.job.status
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render({ job, status, onDismissOverlay, onSaveJob }) {
    return (
      <div class={styles["edit-job"]}>
        <div class={styles.header}>
          <Button type="close" handler={onDismissOverlay}>
            Close
          </Button>
        </div>
        <h2 class={styles.title}>
          <a href={job.url} taget="_blank">
            {job.title} <span>at</span> {job.company}
          </a>
        </h2>
        <div class={styles.form}>
          <div class={styles.body}>
            <label>
              <span>Status</span>
              <select
                name="status"
                value={this.state.status}
                onInput={this.handleChange}
              >
                {Object.values(status).map(value => (
                  <option value={value}>
                    {value.charAt(0) +
                      value
                        .slice(1)
                        .toLowerCase()
                        .replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </label>
            {[
              status.INTERVIEW_ROUND_1,
              status.INTERVIEW_ROUND_2,
              status.INTERVIEW_ROUND_3,
              status.INTERVIEW_ROUND_4,
              status.INTERVIEW_ROUND_5,
              status.INTERVIEW_ROUND_6,
              status.INTERVIEW_ROUND_7,
              status.INTERVIEW_ROUND_8,
              status.INTERVIEW_ROUND_9,
              status.INTERVIEW_ROUND_10
            ].includes(this.state.status) ? (
              <label>
                <span>Date</span>
                <input
                  type="date"
                  name="date"
                  onChange={this.handleChange}
                  value={this.state.date}
                />
              </label>
            ) : null}
            <label>
              <span>Notes</span>
              <textarea
                name="notes"
                placeholder="(Optional)"
                onChange={this.handleChange}
              >
                {this.state.notes}
              </textarea>
            </label>
          </div>
          <div class={styles.footer}>
            <Button
              type="primary"
              handler={() => {
                if (this.state.status !== job.status) {
                  onSaveJob({
                    usersJobId: job.usersJobId,
                    status: this.state.status,
                    metadata: Object.entries(this.state)
                      .filter(el => el[0] !== "status")
                      .reduce(
                        (obj, el) => Object.assign(obj, { [el[0]]: el[1] }),
                        {}
                      )
                  });
                }
              }}
            >
              Save Changes
            </Button>
            <Button type="secondary" handler={onDismissOverlay}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditJob;
