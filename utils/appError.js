// Create a custom error class that extends the built-in Error class
class AppError extends Error {
  
    // Constructor takes two parameters: a message and a status code
    constructor(message, statusCode) {
      // Call the parent Error constructor with the message
      super(message);
  
      // Set the HTTP status code (e.g., 400, 500)
      this.statusCode = statusCode;
  
      // Determine the type of error based on status code
      // If statusCode starts with '4' → it's a client error → 'fail'
      // Else → it's a server error → 'error'
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  
      // Mark this error as "operational"
      // Operational errors are those we expect (e.g., invalid input, not found)
      this.isOperational = true;
  
      // Capture the stack trace and exclude this constructor from it
      // Helps in debugging by pointing to where the actual error occurred
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Export the custom error class to use in other files
  module.exports = AppError;
  