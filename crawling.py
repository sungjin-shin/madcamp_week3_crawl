import requests
from bs4 import BeautifulSoup


def crawler():
    url = 'https://finance.naver.com/sise/entryJongmok.nhn?&page=2'
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')
    # print(soup)
    company_names = soup.find_all("td", {"class": "ctg"})
    stock_prices = soup.find_all("td", {"class": "number_2"})
    # print(soup.body)

    total_company = []
    for company_name in company_names:
        print(company_name.text.strip())
        total_company.append(company_name.text.strip())
    print(total_company)

    total_prices = []
    for index, stock_price in enumerate(stock_prices):
        if index % 4 == 0:
            print(stock_price.text.strip())
            total_prices.append(int(stock_price.text.strip().replace(',', '')))
    print(total_prices)

    total = []
    total = list(zip(total_company, total_prices))
    print(total)


    # select = soup.head.find_all('meta')
    # for meta in select:
    #     print(meta.get('content'))


# <td class="ctg"><a href="/item/main.nhn?code=028260" target="_parent">삼성물산</a></td>

# <meta content="The official home of the Python Programming Language" name="description"/>
# print (bsObject.head.find("meta", {"name":"description"}))

crawler()
