import json
import pymysql


def getCompanyNameAndCode():
    sql = 'SELECT name, code from company_info;'
    cursor.execute(sql)
    rows = cursor.fetchall()
    result = {}
    for row in rows:
        result[row['name']] = row['code']
    return result


# == 시작
company_db = pymysql.connect(
    user='kaist',
    passwd='kaist',
    host='127.0.0.1',
    charset='utf8',
    db='week3',
)
cursor = company_db.cursor(pymysql.cursors.DictCursor)

company_name_code = getCompanyNameAndCode()

with open('correlations.json') as json_file:
    json_data = json.load(json_file)
    links = json_data['links']

    # 이름으로 저장되어있는 것을 code로 바꿔줌
    for link in links:
        link['source'] = company_name_code[link['source']]
        link['target'] = company_name_code[link['target']]

    # 기존에 존재하는 데이터 삭제
    cursor.execute("TRUNCATE TABLE `company_corr`;")
    company_db.commit()

    # 새로운 데이터 삽입
    sql = "INSERT INTO `company_corr`(sourceCode, targetCode, weight) VALUES (%(source)s, %(target)s, %(weight)s);"
    cursor.executemany(sql, links)
    company_db.commit()
    company_db.close()
    print("DB에 저장하기 끝!")
