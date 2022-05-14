package handle

import (
	"fmt"
	"net/http"
	"unicode/utf16"

	"github.com/PuerkitoBio/goquery"
)

func GetRelatedWords(word string) ([]string, error) {
	ret1, err := getaizhanWords(word)
	if err != nil {
		return nil, err
	}
	if len(ret1) > 5 {
		return ret1, nil
	}
	ret2, err := getGuanjianciWords(word)
	if err != nil {
		return nil, err
	}
	if len(ret2) > 5 {
		return ret2, nil
	}
	ret3, err := getChinazWords(word)
	if err != nil {
		return nil, err
	}
	return ret3, nil
}

// ci.aizhan.com+goquery爬虫完成关键词挖掘
func getaizhanWords(word string) ([]string, error) {
	// 先生成关键词的utf16编码，用于生成get-url
	encoded := ""
	for _, i := range utf16.Encode([]rune(word)) {
		if i < 256 {
			encoded += "n"
		}
		encoded += fmt.Sprintf("%x", i)
	}
	url := fmt.Sprintf("https://ci.aizhan.com/%s/", encoded)
	// 发起请求
	res, err := requestForAizhan(url)
	if err != nil {
		return nil, err
	}
	// 利用goquery进行爬取
	dom, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return nil, err
	}
	ret := make([]string, 0, 10)
	dom.Find(".title a").EachWithBreak(func(i int, s *goquery.Selection) bool {
		ret = append(ret, s.Text())
		return i < 9
	})
	return ret, nil
}

func requestForAizhan(url string) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36")
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

// data.chinaz.com+goquery爬虫完成关键词挖掘
func getChinazWords(word string) ([]string, error) {
	url := fmt.Sprintf("https://data.chinaz.com/keyword/allindex/%s", word)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36")
	req.Header.Set("Cookie", "UM_distinctid=17e8fbbf2dbf3f-0711232ef1afe-f791539-fa000-17e8fbbf2dc1186; CNZZDATA5082706=cnzz_eid=1343017529-1643086703-&ntime=1643086703; Hm_lvt_ca96c3507ee04e182fb6d097cb2a1a4c=1643088967; ucvalidate=26461198-7ceb-a5dd-7688-758e877e843f; bbsmax_user=e822576d-87e8-d09e-0d9e-64e414b66405; Hm_lpvt_ca96c3507ee04e182fb6d097cb2a1a4c=1643089881")
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	// 利用goquery进行爬取
	dom, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return nil, err
	}
	ret := make([]string, 0, 10)
	dom.Find(".nofoldtxt a").EachWithBreak(func(i int, s *goquery.Selection) bool {
		ret = append(ret, s.Text())
		return i < 9
	})
	return ret, nil
}

// www.5guanjianci.com+goquery爬虫完成关键词挖掘
func getGuanjianciWords(word string) ([]string, error) {
	url := fmt.Sprintf("https://www.5guanjianci.com/ciku/search?word=%s", word)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36")
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return nil, err

	}
	// 利用goquery进行爬取
	dom, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return nil, err
	}
	ret := make([]string, 0, 10)
	dom.Find("tr[class!=table-hd] td:first-child a").EachWithBreak(func(i int, s *goquery.Selection) bool {
		ret = append(ret, s.Text())
		return i < 9
	})
	return ret, nil
}
