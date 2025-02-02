"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadResume(formData: FormData) {
  const id = uuidv4();
  const file = formData.get("resume") as File;
  if (!file) {
    return { success: false, message: "No file uploaded" };
  }

  const newFormData = new FormData();
  newFormData.set("file", file);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With real auth, you'd use the user's ID in the path
  const path = join("public", "uploads", `${id}-${file.name}`);
  await writeFile(path, buffer);
  console.log("sending request");
  const response = await fetch("http://localhost:3000/api/parse", {
    method: "POST",
    body: newFormData,
  });

  if (!response.ok) {
    console.log("failed to upload resume", await response.text());
    return { success: false, message: "Failed to upload resume" };
  }

  console.log(`Uploaded file ${file.name}`);

  // Here you would typically save the file path to a database
  // associated with the user's account

  return {
    success: true,
    id: id,
    message: "Resume uploaded successfully. Starting AI application process.",
  };
}
