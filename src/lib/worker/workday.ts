import { profile } from "@/config/profile";
import { JobListing } from "@/types/listing";
import path from "path";
import { z } from "zod";
import { BaseWorker } from "./base";
import { getPassword } from "@/lib/password";

const password = getPassword(profile.contactInfo.password);

const selectorMap = {
    "input[data-automation-id='email']": profile.contactInfo.email,
    "input[data-automation-id='password']": password,
    "input[data-automation-id='verifyPassword']": password,
}

export default class WorkdayWorker extends BaseWorker {
    constructor() {
        super();
    };

    async apply(listing: JobListing): Promise<void> {

    }
}