# Files Uploader Next.js App

This is a basic Next.js app that:

- uploads one or more files from the browser
- stores the file data in MongoDB
- lists uploaded files
- downloads stored files, including PDF files

## Setup

1. Install packages:

   ```bash
   npm install
   ```

2. Copy `.env.local.example` to `.env.local`.

3. Add your MongoDB connection string in `.env.local`.

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

## Notes

- Uploaded files are stored directly in MongoDB as binary data.
- This is fine for a basic project, but for large files you would usually use GridFS or object storage.
