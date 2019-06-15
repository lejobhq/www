import preact, { Component } from "preact";

import styles from "./AddJob.css";

import Button from "../../components/Button";

class AddJob extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      notes: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render({ onDismissOverlay, onAddNewJob }, { url, notes }) {
    return (
      <div class={styles["add-job"]}>
        <div class={styles.close}>
          <Button type="close" handler={onDismissOverlay}>
            Close
          </Button>
        </div>
        <h2 class={styles.title}>Add a new job application</h2>
        <div class={styles.form}>
          <label>
            <span>Job offer link</span>
            <input
              type="text"
              name="url"
              placeholder="https://stackoverflow.com/jobs/1234"
              value={url}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <span>Notes</span>
            <textarea
              name="notes"
              placeholder="(Optional)"
              onChange={this.handleChange}
            >
              {notes}
            </textarea>
          </label>
        </div>
        <Button
          type="primary"
          handler={() => {
            this.setState({ url: "", notes: "" });
            onAddNewJob({ url, notes });
          }}
        >
          Add a new job application
        </Button>
      </div>
    );
  }
}

export default AddJob;
