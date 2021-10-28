import utils
import boto3

ACCESS_KEY = ''
SECRET_KEY = ''
# iam = boto3.resource('iam')
# user = iam.User('hyunsoo')
# iter = (user.attached_policies.all())
# for it in iter:
#     print(it)

aws = utils.AWS(ACCESS_KEY, SECRET_KEY)

# upload
aws.upload_to_S3('./data/owid-covid-data.csv', 'covid-data', 'confirmed-cases')

# clean data
# crawler
aws.create_run_glue_crawler('covid-data-crawler', 'arn:aws:iam::594221126368:role/service-role/AWSGlueServiceRole-hyunsoo', 's3://cleaned-data-covid/covid/')

# make job --> use console?

# run job
aws.create_run_glue_job('clean-covid-data', 'arn:aws:iam::594221126368:role/service-role/AWSGlueServiceRole-hyunsoo', 0, 's3://teamn-glue/')


# import data to athena
