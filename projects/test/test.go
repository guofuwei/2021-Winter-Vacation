package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	word := "汽车"
	url := fmt.Sprintf("https://www.5guanjianci.com/ciku/search?word=%s", word)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Println(err)
		return
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36")
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		log.Println(err)
		return
	}
	// 利用goquery进行爬取
	dom, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Println(err)
		return
	}
	// ret := make([]string, 0, 5)
	dom.Find("tr[class!=table-hd] td:first-child a").EachWithBreak(func(i int, s *goquery.Selection) bool {
		// ret, err := s.Html()
		// if err != nil {
		// 	log.Println(err)
		// 	return false
		// }
		// fmt.Println(ret)
		fmt.Println(s.Text())
		return i < 4
	})
}
