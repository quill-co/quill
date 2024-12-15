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

export const buildApplyPrompt = () => {
  return `Apply to the job listing.
  Here's the information you need to fill out:
  ${JSON.stringify(profile, null, 2)}
  
  If there is any information you do not have, just leave it blank. Do not submit the form, simply fill it out. Do not try to upload a resume or other files, just simple inputs.`;
};

export const buildFillInputPrompt = (input: string, filledInputs: string[]) => {
  if (filledInputs.includes(input)) {
    return `Input field ${input} is already filled.`;
  }
  return `Fill out the input field: ${input}
  Use this information to fill out the input field:
  ${JSON.stringify(profile, null, 2)}
  
  If there is any information you do not have, just leave it blank. Do not submit the form, simply fill it out. Do not try to upload a resume or other files, just simple inputs.
  If the provided input field is not a simple input, do no action here.`;
};
