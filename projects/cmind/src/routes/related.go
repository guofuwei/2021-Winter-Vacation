package routes

import (
	"cmind/src/handle"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoadRelated(e *gin.Engine) {
	e.GET("/related", relatedHandle)
}

func relatedHandle(c *gin.Context) {
	word := c.Query("word")
	data, err := handle.GetRelatedWords(word)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"data":   err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": 200,
		"data":   data,
	})
}
