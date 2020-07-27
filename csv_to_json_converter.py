import pandas as pd
import json

corr = pd.read_csv('./parsed_stock_data.csv')
del corr['0']
corr.reset_index(drop=True, inplace=True)
company_names = corr.columns.tolist()
corr.columns = range(corr.shape[1])
print(corr.shape)
corr_json = []
corr_dict = corr.to_dict(orient='index')
for source_index, targets in enumerate(corr_dict.values()):
    for target_index, weight in enumerate(targets.values()):
        if source_index != target_index:
            corr_json.append(
                {'source': company_names[source_index], 'target': company_names[target_index], 'weight': round(weight, 4)})
parsed_result = {'links': corr_json}
with open('correlations.json', 'w') as output_file:
    json.dump(parsed_result, output_file, ensure_ascii=False)
