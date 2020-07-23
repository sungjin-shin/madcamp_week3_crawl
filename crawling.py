import requests
from bs4 import BeautifulSoup


def crawler():
    total = []
    for page_num in range(1, 21):
        result = crawler_one_page(page_num)
        total = total + result
    return total


def crawler_one_page(page_num):
    url = 'https://finance.naver.com/sise/entryJongmok.nhn?&page=' + str(page_num)
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')
    company_names = soup.find_all("td", {"class": "ctg"})
    stock_prices = soup.find_all("td", {"class": "number_2"})
    total_company = find_company_name(company_names)
    total_prices = find_stock_price(stock_prices)
    return list(zip(total_company, total_prices))


def find_company_name(company_names):
    total_company = []
    for company_name in company_names:
        # print(company_name.text.strip())
        total_company.append(company_name.text.strip())
    return total_company


def find_stock_price(stock_prices):
    total_prices = []
    for index, stock_price in enumerate(stock_prices):
        if index % 4 == 0:
            # print(stock_price.text.strip())
            total_prices.append(int(stock_price.text.strip().replace(',', '')))
    return total_prices


if __name__ == "__main__":
    kospi200 = crawler()
    print(kospi200)
