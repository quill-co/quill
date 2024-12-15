import { matchingConfig } from "@/config/match";
import { profile } from "@/config/profile";

export const buildExtractionPrompt = () => {
  return `This is the profile of a job seeker:
  ${JSON.stringify(profile, null, 2)}
  
  Extract all job listings from the page that are relevant to the profile of the job seeker. it's okay if they aren't an exact match, but they should be a good fit.
  Here's the matching criteria:
  ${JSON.stringify(matchingConfig, null, 2)}`;
};

export const buildActionPrompt = () => {
  return `Fill out and submit the inputs on the page to search for jobs that match the criteria.
  Here's the matching criteria:
  ${JSON.stringify(matchingConfig, null, 2)}`;
};
