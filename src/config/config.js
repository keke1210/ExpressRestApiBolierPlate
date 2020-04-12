const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })

module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    VERSION_API_URL: '/api/v1',
    BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
    JWT_KEY: process.env.JWT_KEY || 'TestJwtKeySkerdi2020',
    MONGODB_URI: process.env.MONGODB_URI || 'YOUR_URI'
}