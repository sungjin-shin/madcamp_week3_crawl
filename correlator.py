import csv
import pandas as pd


if __name__ == "__main__":
    f = open('crawled_data.csv', 'r', encoding='utf-8')
    rdr = list(csv.reader(f))

    df = pd.DataFrame(rdr).T

    df.columns = df.iloc[0]
    df = df.drop(df.index[0])
    print(df)

    df = df.astype('float')

    corr = df.corr(method='pearson')
    print(corr)
    f.close()