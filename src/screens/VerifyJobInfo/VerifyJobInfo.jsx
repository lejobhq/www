import preact, { Component } from "preact";

import styles from "./VerifyJobInfo.css";

import Button from "../../components/Button";

class VerifyJobInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: props.job && props.job.company,
      title: props.job && props.job.title,
      company_size: props.job && props.job.company_size,
      experience: props.job && props.job.experience,
      location: props.job && props.job.location,
      logo: props.job && props.job.logo,
      compensation: props.job && props.job.compensation,
      relocation: props.job && props.job.relocation,
      visa: props.job && props.job.visa,
      technologies: (props.job && props.job.technologies) || []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    if (name === "technologies") {
      this.setState({ [name]: value.split(",").map(str => str.trim()) });
    } else {
      this.setState({ [name]: value });
    }
  }

  render(
    { job, onDismissOverlay, onUpdateJobInfo },
    {
      company,
      title,
      company_size,
      experience,
      location,
      logo,
      technologies,
      compensation,
      relocation,
      visa
    }
  ) {
    return (
      <div class={styles["edit-job"]}>
        <div class={styles.header}>
          <Button type="close" handler={onDismissOverlay}>
            Close
          </Button>
        </div>
        <h2 class={styles.title}>Verify Job Info</h2>
        <div class={styles.form}>
          <div class={styles.body}>
            <label>
              <span>Company</span>
              <input
                type="text"
                name="company"
                placeholder="Name of the company (ex.: Google)"
                value={company}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span>Title</span>
              <input
                type="text"
                name="title"
                placeholder="Title of the position (ex.: Software Engineer)"
                value={title}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span>Experience</span>
              <select
                name="experience"
                value={experience}
                onInput={this.handleChange}
              >
                {[
                  "Junior",
                  "Junior, Mid-Level",
                  "Mid-Level",
                  "Mid-Level, Senior",
                  "Senior",
                  "Senior, Lead",
                  "Lead"
                ].map(value => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Company Size</span>
              <select
                name="company_size"
                value={company_size}
                onInput={this.handleChange}
              >
                {[
                  "1 - 10 Employees",
                  "11 - 50 Employees",
                  "51 - 200 Employees",
                  "201 - 500 Employees",
                  "501 - 1k Employees",
                  "1k - 5k Employees",
                  "5k+ Employees"
                ].map(value => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Location</span>
              <input
                type="text"
                name="location"
                placeholder="Location of the company (ex.: Mountain View, CA)"
                value={location}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span>Compensation</span>
              <input
                type="text"
                name="compensation"
                placeholder="Compensation for the job (ex.: $100k - $120k)"
                value={compensation}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span>Technologies</span>
              <textarea
                name="technologies"
                placeholder="Technologies for the job (ex.: React, Redux, ES6, SASS)"
                onChange={this.handleChange}
              >
                {technologies.join(", ")}
              </textarea>
            </label>
            <label>
              <span>Relocation</span>
              <input
                type="checkbox"
                name="relocation"
                value={relocation}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span>Visa sponsorship</span>
              <input
                type="checkbox"
                name="visa"
                value={visa}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <span>Logo</span>
              <input
                type="text"
                name="logo"
                placeholder="Logo of the company (ex.: https://commons.wikimedia.org/wiki/File:Google_%22G%22_Logo.svg)"
                value={logo}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div class={styles.footer}>
            <Button
              type="primary"
              handler={() => {
                onUpdateJobInfo({
                  jobId: job.id,
                  data: this.state
                });

                this.setState({
                  company: "",
                  title: "",
                  company_size: "",
                  experience: "",
                  location: "",
                  logo: "",
                  technologies: [],
                  compensation: "",
                  relocation: false,
                  visa: false
                });
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

export default VerifyJobInfo;
