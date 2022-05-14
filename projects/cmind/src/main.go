package main

import (
	"cmind/src/middleware"
	"cmind/src/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.Cors())
	routes.LoadRelated(r)
	r.Run("0.0.0.0:8000")
}
