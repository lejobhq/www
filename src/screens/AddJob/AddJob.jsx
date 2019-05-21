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
    console.log({ name: value });
    this.setState({ [name]: value });
  }

  render({ dismissOverlay, onAddNewJob }, { url, notes }) {
    return (
      <div class={styles["add-job"]}>
        <div class={styles.close}>
          <Button type="close" handler={dismissOverlay}>
            Close
          </Button>
        </div>
        <h2 class={styles.title}>Add a new job application</h2>
        <div class={styles.form}>
          <label>
            Job offer link
            <input
              type="text"
              name="url"
              placeholder="https://stackoverflow.com/jobs/1234"
              value={url}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Notes
            <textarea name="notes" placeholder="(Optional)">
              {notes}
            </textarea>
          </label>
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
      </div>
    );
  }
}

export default AddJob;
