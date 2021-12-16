from datetime import date
import pandas as pd
import boto3
import json

region = "ap-northeast-2"
dirName = "./data"


def rate():
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket='curated-data-covid',
                        Key='unemployment/unemploymentAggregateByLocationFrequencyQWithAvg/2021/12/16/unemployment_rate_Q.csv')
    # Key='unemployment/unemploymentAggregateByLocationWithAvg/2021/12/16/91637a27-d18a-4ff3-a58d-0a89c74b24bc.csv')
    result = pd.read_csv(obj['Body'])
    data = []
    for row in result.iterrows():
        row_data = row[1]
        ue_rates = json.loads(row_data['unemployment_rate'])
        data.append(
            {'location': row_data['location'], 'average': row_data['average'], 'median': row_data['median'], 'rates': ue_rates})

    return {'body': data}


def youth():
    """
    Latest youth unemployment rate by gender
    """
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket='curated-data-covid',
                        Key='unemployment/latestYouthUnemployment/2021/12/16/youth_ue_latest.csv')
    result = pd.read_csv(obj['Body'])
    data = []
    for row in result.iterrows():
        row_data = row[1]
        data.append(
            {'location': row_data['location'], 'gender': row_data['gender'], 'unemployment_rate': row_data['unemployment_rate']})

    return {'body': data}
