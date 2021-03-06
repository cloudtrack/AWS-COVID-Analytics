# 1. Upload local file to S3 bucket
# 1-1. Method 1: use console
# 1-2. Method 2: use sdk
# 1-3. Method 3: use CLI (maybe not do but just mention?)

# 2. Use Glue to create metadata and parse if necessary

# 3. Use Athena to perform SQL queries
# Try using EMR

# 4. Use quicksight console

import boto3
from boto3 import session
from botocore.exceptions import NoCredentialsError
import time

class AWS:
    # Not necessary if aws configure is already set
    access_key = ''
    secret_key = ''
    session = None

    def __init__(self, access_key, secret_key) -> None:
        self.access_key=access_key
        self.secret_key=secret_key
        self.session = boto3.Session(access_key, secret_key)

    '''
    description:
    Upload local file to s3 bucket. Credentials must be set earlier

    args:
    - access_key: access key to personnal account
    - secret_key: secret key for the access key
    - local_file_path: path for local file to upload
    - bucket: s3's bucket name

    return:
    boolean: safely updated or not
    '''
    def upload_to_S3(self, local_file_path, bucket, upload_file_name):
        # s3 = boto3.client('s3', aws_access_key_id=self.access_key, aws_secret_access_key=self.secret_key)
        s3 = session.client('s3')

        try:
            s3.upload_file(local_file_path, bucket, upload_file_name)
            print('Uploaded successfully')
            return True
        except FileNotFoundError:
            print('File not found...')
            return False
        except NoCredentialsError:
            print('No credentials...')
            return False

    '''
    description: create and run a glue job

    args:
    - job_name: job's name
    - role_arn: role of arn
    - etlType: 0 == spark, 1 == python shell, 2 == spark streaming
    - scriptLocation: s3 path to script
    '''
    def create_run_glue_job(self, job_name, role_arn, etlType, scriptLocation ):
        glue = session.client('glue')
        glue.create_job(Name=job_name,
                                Role=role_arn,
                                Command={
                                    'Name': 'glueetl' if etlType==0 else 'pythonshell' if etlType == 1 else 'gluestreaming',
                                    'ScriptLocation': scriptLocation,
                                    'PythonVersion': 3
        })
        glue.start_job_run(JobName = job_name)


    '''
    description: create and run a glue crawler to create metadata

    args:
    - crawler_name: crawler's name
    - role_arn: arn of role
    - target_path: S3 file/folder to crawl
    '''
    def create_run_glue_crawler(self, crawler_name, role_arn, target_path):
        crawler = session.client('crawler')
        crawler.create_crawler(Name=crawler_name,
                            Role=role_arn,
                            Targets={
                                'S3Targets': [
                                    {
                                        'Path': target_path,
                                        'Exclusions': []
                                    }
                                ]
                            })
        crawler.start_crawler(crawler_name)
        obj = crawler.get_crawler(crawler_name)
        while(obj.state != 'Ready'):
            time.sleep(1)
            obj = crawler.get_crawler(crawler_name)


    '''
    description: execute SQL query and get results

    args:
    - script: SQL script in string

    return:
    result of SQL query
    '''
    def execute_query(self, script):
        athena = session.client('athena')
        response = athena.start_query_execution(QueryString = script)

        # TODO

        return response

    '''
    description:
        create estimater

    args:
        - role_arn: arn of role
        - model: type of model (LinearLearner, XGBoost...)
        - instance_type: type of instance used for running the model

    return:
        estimator
    '''
    def create_estimator(self, role_arn, model, instance_type):
        # https://docs.aws.amazon.com/sagemaker/latest/dg/ex1-train-model.html
        pass

    '''
    description:
        set the parameters of the estimator

    args:
        - estimator: estimator instance
        - params: dictionary of parameters to set the estimator to

    return:
        estimator with parameters set
    '''
    def set_est_parameters(e):
        # TODO
        pass

    '''
    description:
        train model

    args:
        - training_data_path: path to training data
        - validation_data_path: path to validation data

    return:
        (trained model, link to training report)
    '''

    def train_model(self, estimator, training_data_path, validation_data_path):
        pass



    '''
    description:
        deploy model for using the model for predictions

    args:
        - model: estimator
        - serializer_type: type of input file for the predicitons (csv, json...)
        - instance_type: type of instance the deployed model will run on

    return:
        predicator used for predictions
    '''
    def deploy_model(self, estimator, serializer_type, instance_type):
        pass

    '''
    description:
        use model for predictions

    args:
        - predicator: predicator instance
        - data: testing data

    return:
        prediction results in csv
    '''
    def predict(self, predicator, data):
        pass