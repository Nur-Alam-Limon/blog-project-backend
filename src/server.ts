// Import necessary modules and configurations
import app from './app';
import config from './app/config';  // Configuration module for environment variables
import mongoose from 'mongoose';

async function main() {
  try {
    // Connect to MongoDB using the URL from the configuration
    await mongoose.connect(config.mongo_url as string);
    console.log('Connected to MongoDB');

    // Start the Express server
    app.listen(config.port, () => {
      console.log(`Blog Project app listening on port ${config.port}`);
    });
  } catch (err) {
    // Log any errors related to database connection
    console.error('Error connecting to database:', err);
  }
}

main();
