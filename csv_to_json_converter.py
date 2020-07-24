import pandas as pd
import json

corr = pd.read_csv('./parsed_stock_data.csv')
corr.reset_index(drop=True, inplace=True)
corr.columns = range(corr.shape[1])
print(corr)
corr_json = []
corr_dict = corr.to_dict(orient='index')
for source_index, targets in enumerate(corr_dict.values()):
    for target_index, weight in enumerate(targets.values()):
        if source_index != target_index:
            corr_json.append({'source': source_index, 'target': target_index, 'weight': round(weight, 4)})
parsed_result = {'links': corr_json}
with open('parsed_data.json', 'w') as output_file:
    json.dump(parsed_result, output_file)