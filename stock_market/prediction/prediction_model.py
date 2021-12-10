import pandas_datareader as pdr
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from numpy import array
import datetime as dt

from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import LSTM
import math 
from sklearn.metrics import mean_squared_error


# 1. Load Data
company = '^KS11'

start = dt.datetime(2010,1,1)
end = dt.datetime(2019,12,31)

### data will look like 'Date High Low Open Close Volume AdjClose'
data = pdr.DataReader(company, 'yahoo', start, end)

# 2. Prepare Data
### LSTM is sensitive to scale. Transform value into scale.
scaler = MinMaxScaler(feature_range=(0,1))
### provide particular input to fit underscore transform
df1 = scaler.fit_transform(data['Adj Close'].values.reshape(-1,1))
### data will now look like [[0.29591072][0.24782661]...[0.84964011]]
"""
### get week avg.
week = []
i=0
sum=0
days = 5
for day in df1:
    if i%days!=0 or i==0:
        sum = sum + day[0]
        i+=1
    else:
        week.append([sum/days])
        sum=day[0]
        i+=1
df1 = np.array(week)
"""

## 2-2. splitting dataset into train and test split
training_percentage=0.65
### 65% of data will be training data
training_size=int(len(df1)*training_percentage)
### 35% of data will be test data
test_size=len(df1)-training_size
train_data,test_data=df1[0:training_size,:],df1[training_size:len(df1),:1]

## 2-3. convert an array of values into a dataset matrix
### divide the dataset into dataX, dataY
def create_dataset(dataset, time_step=1):
	dataX, dataY = [], []
	for i in range(len(dataset)-time_step-1):
		a = dataset[i:(i+time_step), 0]   ###i=0, 0,1,2,3-----99   100 
		dataX.append(a)
		dataY.append(dataset[i + time_step, 0])
	return np.array(dataX), np.array(dataY)

### reshape into X=t,t+1,t+2,t+3 and Y=t+4
### time_step = how many previous days will the result be dependent on
time_step = 365
X_train, y_train = create_dataset(train_data, time_step)
X_test, ytest = create_dataset(test_data, time_step)

# 2-4. reshape input to be [samples, time steps, features] which is required for LSTM
X_train =X_train.reshape(X_train.shape[0],X_train.shape[1] , 1)
X_test = X_test.reshape(X_test.shape[0],X_test.shape[1] , 1)

# 3. Create the Stacked LSTM model
model=Sequential()
model.add(LSTM(50,return_sequences=True,input_shape=(time_step,1)))
model.add(LSTM(50,return_sequences=True))
model.add(LSTM(50))
model.add(Dense(1))
model.compile(loss='mean_squared_error',optimizer='adam')
model.fit(X_train,y_train,validation_data=(X_test,ytest),epochs=100,batch_size=64,verbose=1)

## 3-1. Lets Do the prediction and check performance metrics
train_predict=model.predict(X_train)
test_predict=model.predict(X_test)

### Transformback to original form
train_predict=scaler.inverse_transform(train_predict)
test_predict=scaler.inverse_transform(test_predict)

### Calculate RMSE performance metrics
a = math.sqrt(mean_squared_error(y_train,train_predict))
### Calculate Test Data RMSE
b = math.sqrt(mean_squared_error(ytest,test_predict))
print("Train Performance : "+str(a)+" / Test Performance : "+str(b)+"\n")

## 3-2. Plotting 
### shift train predictions for plotting
trainPredictPlot = np.empty_like(df1)
trainPredictPlot[:, :] = np.nan
trainPredictPlot[time_step:len(train_predict)+time_step, :] = train_predict
### shift test predictions for plotting
testPredictPlot = np.empty_like(df1)
testPredictPlot[:, :] = np.nan
testPredictPlot[len(train_predict)+(time_step*2)+1:len(df1)-1, :] = test_predict
"""
### plot baseline and predictions
plt.plot(scaler.inverse_transform(df1))
plt.plot(trainPredictPlot)
plt.plot(testPredictPlot)
plt.show()
### This is what our graph implies
### orange : train data prediction
### blue : complete data set
### green : test prediction
"""

# 4. Predict Future
x_input=test_data[(len(test_data)-time_step):].reshape(1,-1)
x_input.shape

temp_input=list(x_input)
temp_input=temp_input[0].tolist()

# demonstrate prediction for next 10 days
###our output arr
lst_output=[]
i=0
predict_days=100

###open write file
wfilename = 'predict.csv'
wfile = open(wfilename, 'w')

while(i<predict_days):
    #shift : take out the oldest value and put in the newest value
    if(len(temp_input)>time_step):
        #print(temp_input)
        x_input=np.array(temp_input[1:])
        #print("{} day input {}".format(i,x_input))
        x_input=x_input.reshape(1,-1)
        x_input = x_input.reshape((1, time_step, 1))
        #print(x_input)
        yhat = model.predict(x_input, verbose=0)
        wfile.write(str(i)+','+str(yhat[0][0])+'\n')
        print(str(i)+" "+str(yhat[0][0]))
        #print("{} day output {}".format(i,yhat))
        temp_input.extend(yhat[0].tolist())
        temp_input=temp_input[1:]
        #print(temp_input)
        lst_output.extend(yhat.tolist())
        i=i+1
    else:
        x_input = x_input.reshape((1, time_step,1))
        yhat = model.predict(x_input, verbose=0)
        print(yhat[0])
        temp_input.extend(yhat[0].tolist())
        print(len(temp_input))
        lst_output.extend(yhat.tolist())
        i=i+1
    

"""
### original days
day_new=np.arange(1, 1+time_step)
### predicted days
day_pred=np.arange(1+time_step, 1+time_step+predict_days)
### original data
plt.plot(day_new,scaler.inverse_transform(df1[(len(df1)-time_step):]))
### predicted data
plt.plot(day_pred,scaler.inverse_transform(lst_output))
plt.show()

"""
df3=df1.tolist()
df3.extend(lst_output)
#plt.plot(scaler.inverse_transform(df3[len(df1)-300:]))
plt.plot(scaler.inverse_transform(df3))
plt.show()


