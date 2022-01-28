package main

import (
	"cmind/middleware"

	"cmind/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.Cors())
	routes.LoadRelated(r)
	r.Run("127.0.0.1:8000")
}
