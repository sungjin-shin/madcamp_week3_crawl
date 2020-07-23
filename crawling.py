import requests
import csv
from bs4 import BeautifulSoup


def crawler():
    total = []
    for page_num in range(1, 21):
        result = crawler_total_past_prices(page_num)
        total = total + result
    return total


def crawler_total_past_prices(page_num):
    url = 'https://finance.naver.com/sise/entryJongmok.nhn?&page=' + str(page_num)
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')
    company_codes = soup.find_all("td", {"class": "ctg"})

    total_past_prices = []
    for company_code in company_codes:
        total_past_prices.append(crawler_one_past_prices(company_code.a['href'].split('=')[1]))
    return total_past_prices


def crawler_one_past_prices(code):
    url = 'https://finance.naver.com/item/sise_day.nhn?code=' + code + '&page=' + str(1)
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')
    company_past_prices = soup.find_all("td", {"class": "num"})

    past_prices = []
    for index, company_past_price in enumerate(company_past_prices):
        if index % 6 == 0:
            past_prices.append(company_past_price.text.strip().replace(',', ''))
    return past_prices


if __name__ == "__main__":
    f = open('crawled_data.csv', 'w', encoding='utf-8')
    wr = csv.writer(f)
    result_data = crawler()
    wr.writerows(result_data)
    print('끝남')
    """
    1. 모든 페이지에서 회사의 code값들을 모아야겠군
    2. 모은 code값으로 들어가서 회사의 과거 주식값들을 모아야겠군
    """
