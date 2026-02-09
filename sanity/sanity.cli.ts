import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'vtvto3et', // Placeholder, user will verify
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  },
  deployment: {
    appId: 'bokj44rs0jlc1s3djga14w69',
  }
})
