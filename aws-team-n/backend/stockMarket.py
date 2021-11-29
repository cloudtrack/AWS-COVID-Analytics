from datetime import date
import pandas as pd
import boto3
import io
import json
import time

region="ap-northeast-2"
dirName="./data"
covidStart = '2020-12-28'

def begin():
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket='cleaned-data-covid', Key='stock/africa.csv')
    result = obj['Body'].read()
    return result


def africa():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/continent/africa.csv')
    result = pd.read_csv(obj['Body'])
    result['Egypt'] = result['Egypt']/752.2
    result['South Africa'] = result['South Africa']/52464.8
    result.fillna("NaN", inplace = True) 
    
    date = result['Date'].values.tolist()
    egypt = result['Egypt'].values.tolist()
    sa = result['South Africa'].values.tolist()
    data = {"date":date, "egypt":egypt, "sa":sa}

    return data

def asia():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/continent/asia.csv')
    result = pd.read_csv(obj['Body'])
    result['China'] = result['China']/3044.9
    result['Korea'] = result['Korea']/2129.7
    result['HongKong'] = result['HongKong']/28875.6
    result['India'] = result['India']/220.9
    result['Japan'] = result['Japan']/21730
    result.fillna("NaN", inplace = True) 
    
    date = result['Date'].values.tolist()
    china = result['China'].values.tolist()
    korea = result['Korea'].values.tolist()
    hongkong = result['HongKong'].values.tolist()
    india = result['India'].values.tolist()
    japan = result['Japan'].values.tolist()
    data = {"date":date, "china":china, "korea":korea, "hongkong":hongkong, "india":india, "japan":japan}

    return data

def europe():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/continent/europe.csv')
    result = pd.read_csv(obj['Body'])
    result['UK'] = result['UK']/7497.5
    result['Italy'] = result['Italy']/21183
    result['Swiss'] = result['Swiss']/9970
    result['Germany'] = result['Germany']/12521.4
    result['France'] = result['France']/5567.9
    result['Netherlands'] = result['Netherlands']/568.3
    result.fillna("NaN", inplace = True) 
    
    date = result['Date'].values.tolist()
    uk = result['UK'].values.tolist()
    italy = result['Italy'].values.tolist()
    swiss = result['Swiss'].values.tolist()
    germany = result['Germany'].values.tolist()
    france = result['France'].values.tolist()
    netherlands = result['Netherlands'].values.tolist()
    data = {"date":date, "uk":uk, "italy":italy, "swiss":swiss, "germany":germany, "france":france, "netherlands":netherlands}

    return data

def namerica():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/continent/namerica.csv')
    result = pd.read_csv(obj['Body'])
    result['US'] = result['US']/8109.1
    result['Canada'] = result['Canada']/16471.3
    result['Mexico'] = result['Mexico']/43483.2
    result.fillna("NaN", inplace = True) 
    
    date = result['Date'].values.tolist()
    usa = result['US'].values.tolist()
    canada = result['Canada'].values.tolist()
    mexico = result['Mexico'].values.tolist()
    data = {"date":date, "usa":usa, "canada":canada, "mexico":mexico}

    return data

def samerica():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/continent/samerica.csv')
    result = pd.read_csv(obj['Body'])
    result['Peru'] = result['Peru']/20727.8
    result['Chile'] = result['Chile']/25748.9
    result['Brazil'] = result['Brazil']/101340
    result['Argentina'] = result['Argentina']/41507.5
    result.fillna("NaN", inplace = True) 
    
    date = result['Date'].values.tolist()
    peru = result['Peru'].values.tolist()
    chile = result['Chile'].values.tolist()
    brazil = result['Brazil'].values.tolist()
    argentina = result['Argentina'].values.tolist()
    data = {"date":date, "peru":peru, "chile":chile, "brazil":brazil, "argentina":argentina}

    return data

def oceania():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/continent/oceania.csv')
    result = pd.read_csv(obj['Body'])
    result['Australia'] = result['Australia']/6648.1
    result['NewZealand'] = result['NewZealand']/1777.3
    result.fillna("NaN", inplace = True) 
    
    date = result['Date'].values.tolist()
    australia = result['Australia'].values.tolist()
    newzealand = result['NewZealand'].values.tolist()
    data = {"date":date, "australia":australia, "newzealand":newzealand}

    return data

def krpredict():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/krpredict.csv')
    result = pd.read_csv(obj['Body'])
    result.fillna("NaN", inplace = True) 
    
    date = result['Date'].values.tolist()
    real = result['Price'].values.tolist()
    prediction = result['Prediction'].values.tolist()
    data = {"date":date, "real":real, "prediction":prediction}

    return data

def usapredict():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/usapredict.csv')
    result = pd.read_csv(obj['Body'])
    result.fillna("NaN", inplace = True) 
    
    date = result['Date'].values.tolist()
    real = result['Adj Close'].values.tolist()
    prediction = result['Predict'].values.tolist()
    data = {"date":date, "real":real, "prediction":prediction}

    return data

def sectorDetail():
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='cleaned-data-covid', Key='stock/sectorline.csv')
    result = pd.read_csv(obj['Body'])
    result['CM_Price'] = result['CM_Price']/282.8
    result['CD_Price'] = result['CD_Price']/1430.5
    result['CS_Price'] = result['CS_Price']/1118.9
    result['EC_Price'] = result['EC_Price']/1248.9
    result['F_Price'] = result['F_Price']/728.6
    result['HI_Price'] = result['HI_Price']/291.9
    result['IT_Price'] = result['IT_Price']/2089.9
    result['SM_Price'] = result['SM_Price']/791.4
    result.fillna("NaN", inplace = True) 

    date = result['Date'].values.tolist()
    cmprice = result['CM_Price'].values.tolist()
    cdprice = result['CD_Price'].values.tolist()
    csprice = result['CS_Price'].values.tolist()
    ecprice = result['EC_Price'].values.tolist()
    fprice = result['F_Price'].values.tolist()
    hiprice = result['HI_Price'].values.tolist()
    itprice = result['IT_Price'].values.tolist()
    smprice = result['SM_Price'].values.tolist()

    cmvolume = result['CM_Volume'].values.tolist()
    cdvolume = result['CD_Volume'].values.tolist()
    csvolume = result['CS_Volume'].values.tolist()
    ecvolume = result['EC_Volume'].values.tolist()
    fvolume = result['F_Volume'].values.tolist()
    hivolume = result['HI_Volume'].values.tolist()
    itvolume = result['IT_Volume'].values.tolist()
    smvolume = result['SM_Volume'].values.tolist()
    data = {"date":date, "cmprice":cmprice, "cdprice":cdprice, "csprice":csprice, "ecprice":ecprice, "fprice":fprice, "hiprice":hiprice, "itprice":itprice, "smprice":smprice,
    "cmvolume":cmvolume, "cdvolume":cdvolume, "csvolume":csvolume, "ecvolume":ecvolume, "fvolume":fvolume, "hivolume":hivolume, "itvolume":itvolume, "smvolume":smvolume}

    return data
