import tagApplied from "../images/tag_applied.svg";
import tagCreated from "../images/tag_created.svg";
import tagInterview from "../images/tag_interview.svg";
import tagNegotiating from "../images/tag_negotiating.svg";
import tagNoResponse from "../images/tag_no-response.svg";
import tagNotInterested from "../images/tag_not-interested.svg";
import tagOffer from "../images/tag_offer.svg";
import tagRejected from "../images/tag_rejected.svg";

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

export default statusToTag;
