// Fake environment variables for tests
process.env.JWT_SECRET = "test-secret-key";
process.env.FRONTEND_URL = "http://localhost:3000";
process.env.UPLOAD_SERVICE_URL = "http://localhost:5004";

// Silence console.log noise during test runs
global.console.log = jest.fn();
global.console.error = jest.fn();
