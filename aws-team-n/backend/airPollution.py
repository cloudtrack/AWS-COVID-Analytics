from bokeh.embed import json_item
from bokeh.io import output_notebook, show, output_file
from bokeh.plotting import figure
from bokeh.models import GeoJSONDataSource, LinearColorMapper, ColorBar
from bokeh.palettes import brewer
from bokeh.io import curdoc, output_notebook
from bokeh.models import DateSlider, HoverTool, Panel, Slider, Dropdown
from bokeh.layouts import widgetbox, row, column
from bokeh.models.callbacks import CustomJS
from datetime import date
import pandas as pd
import geopandas as gpd
import boto3
import io
import json
import time
import boto3

region="ap-northeast-2"
dirName="./data"
covidStart = '2020-12-28'

tick_labels = {}
for i in range(0, 40):
    s = str(i)
    tick_labels[s] = s

def begin():
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket='cleaned-data-covid', Key='air-pollution/avgPollutionOfCities.csv')
    data = pd.read_csv(io.BytesIO(obj['Body'].read()))
    # data = obj['Body'].read().decode('utf-8')
    return data


def graph1(date):
    print("start", time.localtime())
    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket='curated-data-covid', Key=f'air-pollution/o3/{date}.geojson')
    result = obj['Body'].read()
    # result = "hello"
    # df = gpd.read_file("./data/o3.geojson")
    # result = df[df['date'] == date].to_json()
    # print("done", time.localtime())
    return result


# def graph1(data):
    # s3_client = boto3.client('s3', region_name=region)
    # # import naturalearth_lowres (country coordinates)
    # world = gpd.read_file(gpd.datasets.get_path("naturalearth_lowres"))
    # world = world[['name', 'iso_a3', 'geometry']]
    # world.columns = ['country', 'Alpha-3 code', 'geometry']
    # print(world)

    # obj = s3_client.get_object(Bucket='raw-data-covid', Key='air-pollution/cities-geo/iso-country-codes.csv')
    # iso = pd.read_csv(io.BytesIO(obj['Body'].read()))

    # # convert iso3 to iso2 codes
    # iso = iso[['Alpha-3 code', 'Alpha-2 code']]
    # world = world.merge(iso, on='Alpha-3 code', how='left')
    # world = world[['country', 'Alpha-2 code', 'geometry']]
    # world.columns = ['country', 'country_code', 'geometry']

    # # get air pollution data
    # print(data.columns)
    # data.columns = ['type', 'date', 'country_code', 'avg']

    # # create different json for entire data (using loop)
    # pollution_indices = ['o3', 'pm10', 'pm25', 'co', 'no2', 'so2']
    # for index in pollution_indices:
    #     raw = data[data['type'] == index]
    #     raw_merged = world.merge(raw, on='country_code', how='left')
    #     raw_merged['type'].fillna(index, inplace=True)
    #     raw_df = json.loads(raw_merged.to_json())
    #     raw_data = json.dumps(raw_df)
    #     f = open(f"{dirName}/{index}.txt", "w")
    #     f.write(raw_data)
    #     f.close()


    #     day_merged = raw_merged[raw_merged['date'] == covidStart]
    #     day_df = json.loads(day_merged.to_json())
    #     day_data = json.dumps(day_df)
    #     f = open(f"{dirName}/{index}-{covidStart}.txt", "w")
    #     f.write(day_data)
    #     f.close()

    # o3_covid_start_data = open(f"./data/o3-{covidStart}.txt").read()
    # o3_data = open("./data/o3.txt").read()
    # geosource = GeoJSONDataSource(geojson = o3_data)
    # displayed_source = GeoJSONDataSource(geojson = o3_covid_start_data)


    # # palette = brewer['YlGnBu']
    # # palette = palette[::-1]

    # #Instantiate LinearColorMapper that linearly maps numbers in a range, into a sequence of colors.
    # low = 0 # TODO
    # high = 40 # TODO
    # color_mapper = LinearColorMapper(palette = "Viridis256", low = low, high = high, nan_color='#d9d9d9')

    # # Initialize figure object.
    # p = figure(title = 'O3 concentration on 2021-04-29', plot_height = 600 , plot_width = 950)
    # # p.xgrid.grid_line_color = None
    # # p.ygrid.grid_line_color = None

    # # Add patch renderer for filling in country
    # p.patches('xs','ys', source = displayed_source, fill_color = {'field' :'avg', 'transform' : color_mapper},
    #         line_color = 'black', line_width = 0.25, fill_alpha = 1)

    # # Add color bar
    # # tick_labels = {'30':'30','31':'31', '32':'32', '33':'33', '34':'34', '35':'35', '36':'36', '37':'37', '38':'38', '39':'39',  '40': '>40'}
    # color_bar = ColorBar(color_mapper=color_mapper, label_standoff=8,width = 500, height = 20,
    # border_line_color='grey',location = (0,0), orientation = 'horizontal', major_label_overrides = tick_labels)
    # p.add_layout(color_bar, 'below')

    # # Figure in json
    # return json.dumps(json_item(p, "myplot"))

'''
    start = 0
    end = 200

    slider = DateSlider(title = 'date', start = date(2021, 1, 1), end = date(2021, 10, 1), step = 1, value = date(2021, 4, 29))

    slider_callback = CustomJS(args=dict(slider=slider, source=geosource, displayed_src=displayed_source), code="""
        var s_value = slider.value
        var date = (new Date(s_value)).toISOString().slice(0, 10)

        var columns = Object.keys(source.data)
        var data = {}
        columns.forEach(function(key) {
            data[key] = [];
        });
        for( var i = 0; i < source.get_length(); i++){
            if(source.data['date'][i] == date || !source.data['date'][i]){
                columns.forEach((key) => {
                    data[key].push(source.data[key][i])
                })
            }
        }
        displayed_src.data = data;
        console.log(displayed_src.data)
        displayed_src.change.emit();
    """)

    slider.js_on_change('value', slider_callback)


    # Update figure title from slider change
    title_callback = CustomJS(args=dict(slider=slider, figure=p), code="""
        var num = slider.value;
        var date = (new Date(num)).toISOString().slice(0, 10)
        figure.title.text = 'O3 concentration on ' + date;
    """)
    slider.js_on_change('value', title_callback)

    air_indices = [("O3", "o3"), ("SO2", "so2"), ("CO", "co"), ("PM10", "pm10"), ("PM25", "pm25")]
    dropdown = Dropdown(label="Air pollution index", button_type="default", menu=air_indices)
    dropdown_callback = CustomJS(args=dict(source=geosource, displayed_src=displayed_source), code="""
        var index = this.item
        console.log(index)
        var data = {}
    //    if (index == "so2")
            data = so2_data
        source = GeoJSONDataSource(geojson = data)
        displayed_src = GeoJSONDataSource(geojson=so2_2021_04_29_data)
        displayed_src.change.emit();
        source.change.emit();

    """)
    dropdown.js_on_event("menu_item_click", dropdown_callback)

    layout = column(p, widgetbox(slider, dropdown))

    curdoc().clear()
    curdoc().add_root(layout)

    show(layout)
    '''