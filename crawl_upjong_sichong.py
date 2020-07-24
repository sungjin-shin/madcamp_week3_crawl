import requests
import numpy as np
import pandas as pd

from bs4 import BeautifulSoup


def crawler():
    total_sichong = []
    total_upjong = []
    for page_num in range(1, 21):
        result_sichong = crawler_one_page(page_num)
        result_upjong = crawler_total_upjong(page_num)
        total_sichong = total_sichong + result_sichong
        total_upjong = total_upjong + result_upjong
    return np.hstack([total_sichong, total_upjong]).tolist()


def crawler_one_page(page_num):
    url = 'https://finance.naver.com/sise/entryJongmok.nhn?&page=' + str(page_num)
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')
    company_names = soup.find_all("td", {"class": "ctg"})
    stock_prices = soup.find_all("td", {"class": "number_2"})
    total_company = find_company_name(company_names)
    total_prices = find_sichong(stock_prices)
    return np.hstack([total_company, total_prices]).tolist()


def find_company_name(company_names):
    total_company = []
    for company_name in company_names:
        total_company.append([company_name.text.strip()])
    return total_company


def find_sichong(stock_prices):
    total_prices = []
    for index, stock_price in enumerate(stock_prices):
        if index % 4 == 3:
            total_prices.append([stock_price.text.strip().replace(',', '')])
    return total_prices


def crawler_company_upjong(code):
    url = 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd='+code
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')
    company = soup.find("div", {"class": "cmp-table-div"})
    company_infos = company.find_all("dt", {"class": "line-left"})
    for index, company_upjong in enumerate(company_infos):
        if index % 8 == 1:
            return company_upjong.text.strip().split(': ')[1]


def crawler_total_upjong(page_num):
    total_upjong = []
    url = 'https://finance.naver.com/sise/entryJongmok.nhn?&page=' + str(page_num)
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')
    company_codes = soup.find_all("td", {"class": "ctg"})

    for company_code in company_codes:
        total_upjong.append([crawler_company_upjong(company_code.a['href'].split('=')[1]), company_code.a['href'].split('=')[1]])
    return total_upjong


if __name__ == "__main__":
    result = crawler()
    df = pd.DataFrame(result)
    df.to_csv("upjong_sichong.csv", header=None, index=None)
    # print(crawler())