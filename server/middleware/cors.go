package middleware

import "github.com/gin-gonic/gin"

// Manage all cors settings here

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		// c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // For Production: // all origin or our domain
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // FIXME: // For development only, Read it from env
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")             // To all credentials
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE") // allowed methods

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204) // return without any response
			return
		}
		c.Next()
	}
}

// Issue in development:
// When you set Access-Control-Allow-Credentials to true, you're telling the browser
// it's okay to send sensitive information like cookies or Authorization headers with the request.

// For security, the browser enforces a strict rule:
// if credentials are involved, the server must explicitly state exactly which origin it trusts.
// A wildcard (*) means "I trust everyone," which is too dangerous when credentials are being sent.
// The server must specify the exact frontend domain that is allowed to make these credentialed requests.
