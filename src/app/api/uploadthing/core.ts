import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
export const ourFileRouter = {
   pdfUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1} })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { file: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;