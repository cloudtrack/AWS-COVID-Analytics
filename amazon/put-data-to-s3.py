
import boto3
import requests
import json

# Retrieve data from source (api) and save to local file
def get_file_api_local_save(api, file=None):
    '''
    Example:
        response = requests.get("https://aqicn.org/data-platform/covid19/airquality-covid19-cities.json")
        if file is None:
            file = open('save_local.csv')
        data = response.text
        parsed = json.loads(data)
        file.write(parsed)
        file.close()
        return file
    '''
    # return saved file pointer
    pass


# Send file to s3 bucket
def send_file_to_s3(filePath, bucket):
    '''
        client = boto3.client(
            's3',
            aws_access_key_id = 'AK********XC',
            aws_secret_access_key = 'RONA2yOUws7QZ************0Lv+DnHy',
            region_name = 'ap-northeast-2'
        )
        clientResponse = client.Bucket(bucket).upload_file(filepath)
    '''
    # return true if data is file in filePath is safely saved in s3Path else false
    pass





cities = ['seoul']
for city in cities:
    response = requests.get("http://api.waqi.info/feed/{}/?token=94ed3c5487f2c06b966d4745899e0014192f66b9".format(city))
    data = response.text
    parsed = json.loads(data)
    print(parsed)


client = boto3.client(
    's3',
    aws_access_key_id = 'AKIAYUWSW2LQM5AQEIXC',
    aws_secret_access_key = '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',
    region_name = 'ap-northeast-2'
)

clientResponse = client.list_buckets()

for bucket in clientResponse['Buckets']:
    print('Bucket {}'.format(bucket["Name"]))