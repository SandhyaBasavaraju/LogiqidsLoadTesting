/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 500.0, "series": [{"data": [[0.0, 463.0], [300.0, 1.0], [100.0, 21.0], [400.0, 3.0], [200.0, 6.0], [1000.0, 6.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[0.0, 487.0], [300.0, 2.0], [400.0, 7.0], [100.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[0.0, 490.0], [100.0, 10.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[0.0, 492.0], [100.0, 4.0], [200.0, 4.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[0.0, 492.0], [200.0, 4.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[0.0, 269.0], [600.0, 8.0], [700.0, 9.0], [200.0, 45.0], [800.0, 2.0], [900.0, 2.0], [1000.0, 3.0], [1100.0, 1.0], [300.0, 26.0], [1200.0, 3.0], [1400.0, 1.0], [100.0, 59.0], [400.0, 41.0], [1600.0, 1.0], [1700.0, 1.0], [500.0, 29.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[0.0, 500.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[0.0, 372.0], [300.0, 4.0], [200.0, 22.0], [100.0, 96.0], [400.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[0.0, 24.0], [600.0, 16.0], [700.0, 17.0], [800.0, 10.0], [900.0, 10.0], [1000.0, 1.0], [1100.0, 5.0], [1200.0, 5.0], [1300.0, 10.0], [1400.0, 6.0], [1500.0, 9.0], [1600.0, 8.0], [1700.0, 18.0], [1800.0, 15.0], [1900.0, 8.0], [2000.0, 13.0], [2100.0, 21.0], [2200.0, 14.0], [2300.0, 6.0], [2400.0, 5.0], [2500.0, 5.0], [2600.0, 7.0], [2700.0, 5.0], [2800.0, 4.0], [2900.0, 1.0], [3000.0, 2.0], [3100.0, 6.0], [3300.0, 6.0], [3200.0, 7.0], [3400.0, 3.0], [3500.0, 7.0], [3700.0, 7.0], [3600.0, 14.0], [3800.0, 7.0], [3900.0, 10.0], [4000.0, 4.0], [4100.0, 5.0], [4200.0, 7.0], [4500.0, 4.0], [4600.0, 1.0], [4400.0, 2.0], [4800.0, 1.0], [5000.0, 3.0], [5100.0, 6.0], [5200.0, 4.0], [5300.0, 5.0], [5600.0, 4.0], [5400.0, 3.0], [5500.0, 3.0], [5700.0, 3.0], [5800.0, 2.0], [5900.0, 1.0], [6000.0, 1.0], [6300.0, 1.0], [6500.0, 1.0], [6700.0, 1.0], [7400.0, 1.0], [7800.0, 1.0], [100.0, 16.0], [200.0, 29.0], [300.0, 40.0], [400.0, 20.0], [500.0, 19.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[0.0, 461.0], [100.0, 37.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[0.0, 437.0], [100.0, 63.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[0.0, 495.0], [100.0, 3.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[0.0, 117.0], [600.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [1100.0, 4.0], [1200.0, 5.0], [1300.0, 2.0], [1400.0, 2.0], [1500.0, 3.0], [1600.0, 5.0], [1700.0, 2.0], [1800.0, 2.0], [2000.0, 4.0], [2300.0, 1.0], [2200.0, 1.0], [2400.0, 7.0], [2500.0, 3.0], [2600.0, 5.0], [2800.0, 7.0], [2700.0, 6.0], [2900.0, 4.0], [3000.0, 7.0], [3100.0, 5.0], [3200.0, 10.0], [3300.0, 15.0], [3400.0, 16.0], [3500.0, 17.0], [3600.0, 21.0], [3700.0, 10.0], [3800.0, 12.0], [3900.0, 17.0], [4000.0, 10.0], [4100.0, 13.0], [4300.0, 6.0], [4200.0, 4.0], [4500.0, 8.0], [4600.0, 6.0], [4400.0, 8.0], [4800.0, 6.0], [4700.0, 3.0], [4900.0, 7.0], [5100.0, 3.0], [5000.0, 4.0], [5300.0, 3.0], [5500.0, 4.0], [5600.0, 8.0], [5400.0, 3.0], [5800.0, 4.0], [5700.0, 2.0], [6100.0, 3.0], [6000.0, 3.0], [5900.0, 3.0], [6300.0, 3.0], [6200.0, 1.0], [6400.0, 2.0], [6600.0, 2.0], [6700.0, 3.0], [6900.0, 3.0], [6800.0, 2.0], [7100.0, 1.0], [7000.0, 2.0], [7400.0, 1.0], [7300.0, 2.0], [7600.0, 2.0], [7500.0, 2.0], [7700.0, 2.0], [8000.0, 1.0], [8400.0, 2.0], [8300.0, 1.0], [11700.0, 1.0], [100.0, 4.0], [200.0, 21.0], [300.0, 5.0], [400.0, 8.0], [500.0, 3.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[0.0, 488.0], [100.0, 12.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[0.0, 447.0], [300.0, 5.0], [100.0, 34.0], [400.0, 1.0], [200.0, 13.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[0.0, 500.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[0.0, 459.0], [100.0, 41.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[0.0, 390.0], [400.0, 1.0], [100.0, 93.0], [200.0, 13.0], [1000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[0.0, 450.0], [100.0, 50.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[0.0, 496.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[0.0, 158.0], [2200.0, 1.0], [2300.0, 1.0], [600.0, 49.0], [700.0, 29.0], [200.0, 48.0], [800.0, 23.0], [900.0, 6.0], [1000.0, 4.0], [1100.0, 3.0], [4500.0, 1.0], [300.0, 47.0], [1200.0, 6.0], [1300.0, 5.0], [1400.0, 2.0], [100.0, 56.0], [400.0, 32.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 2.0], [500.0, 23.0], [2000.0, 1.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[0.0, 489.0], [100.0, 5.0], [200.0, 6.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[0.0, 464.0], [100.0, 25.0], [200.0, 7.0], [400.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[0.0, 473.0], [300.0, 7.0], [100.0, 9.0], [400.0, 7.0], [200.0, 2.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[0.0, 342.0], [300.0, 1.0], [400.0, 1.0], [100.0, 128.0], [200.0, 25.0], [500.0, 3.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[0.0, 379.0], [600.0, 1.0], [200.0, 18.0], [400.0, 1.0], [100.0, 99.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[0.0, 205.0], [600.0, 17.0], [700.0, 16.0], [800.0, 39.0], [900.0, 25.0], [1000.0, 5.0], [1100.0, 3.0], [1200.0, 3.0], [1300.0, 6.0], [1400.0, 3.0], [1500.0, 1.0], [100.0, 30.0], [1600.0, 4.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 3.0], [2300.0, 2.0], [2200.0, 1.0], [2600.0, 2.0], [2700.0, 1.0], [2800.0, 1.0], [200.0, 23.0], [3700.0, 1.0], [300.0, 32.0], [5400.0, 1.0], [400.0, 37.0], [500.0, 35.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[0.0, 429.0], [300.0, 3.0], [100.0, 67.0], [1000.0, 1.0]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[0.0, 499.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[0.0, 487.0], [100.0, 12.0], [400.0, 1.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[0.0, 95.0], [600.0, 43.0], [700.0, 32.0], [200.0, 75.0], [800.0, 22.0], [900.0, 12.0], [1000.0, 5.0], [1100.0, 2.0], [300.0, 67.0], [1200.0, 1.0], [1300.0, 1.0], [100.0, 32.0], [400.0, 59.0], [500.0, 54.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[0.0, 497.0], [100.0, 3.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[0.0, 470.0], [100.0, 30.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[0.0, 470.0], [100.0, 25.0], [200.0, 5.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[0.0, 415.0], [300.0, 6.0], [100.0, 77.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 481.0], [100.0, 19.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[0.0, 489.0], [200.0, 7.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[0.0, 404.0], [300.0, 16.0], [100.0, 74.0], [1000.0, 6.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[0.0, 234.0], [300.0, 5.0], [600.0, 4.0], [100.0, 187.0], [400.0, 2.0], [200.0, 59.0], [800.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[0.0, 50.0], [600.0, 24.0], [700.0, 41.0], [800.0, 21.0], [900.0, 30.0], [1000.0, 12.0], [1100.0, 14.0], [1200.0, 6.0], [1300.0, 3.0], [1400.0, 1.0], [1500.0, 6.0], [100.0, 28.0], [1600.0, 4.0], [1700.0, 10.0], [1800.0, 12.0], [1900.0, 11.0], [2000.0, 5.0], [2100.0, 1.0], [2200.0, 5.0], [2300.0, 4.0], [2400.0, 1.0], [2500.0, 3.0], [2600.0, 4.0], [2700.0, 3.0], [2900.0, 1.0], [200.0, 51.0], [300.0, 49.0], [400.0, 56.0], [500.0, 44.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[0.0, 492.0], [100.0, 8.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[0.0, 474.0], [100.0, 26.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[0.0, 414.0], [600.0, 1.0], [700.0, 3.0], [200.0, 11.0], [800.0, 4.0], [900.0, 9.0], [1000.0, 3.0], [1100.0, 3.0], [300.0, 9.0], [1400.0, 1.0], [100.0, 21.0], [400.0, 19.0], [500.0, 2.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[0.0, 494.0], [200.0, 3.0], [100.0, 3.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[0.0, 389.0], [300.0, 13.0], [100.0, 96.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[0.0, 490.0], [100.0, 4.0], [200.0, 6.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[0.0, 187.0], [2100.0, 1.0], [2200.0, 1.0], [600.0, 23.0], [700.0, 13.0], [200.0, 35.0], [800.0, 8.0], [3200.0, 1.0], [900.0, 7.0], [1000.0, 12.0], [1100.0, 9.0], [300.0, 28.0], [1200.0, 5.0], [1300.0, 7.0], [1400.0, 3.0], [1500.0, 6.0], [100.0, 68.0], [400.0, 40.0], [1600.0, 4.0], [1700.0, 5.0], [1800.0, 1.0], [1900.0, 3.0], [500.0, 31.0], [2000.0, 2.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[0.0, 315.0], [300.0, 43.0], [600.0, 3.0], [1200.0, 1.0], [700.0, 2.0], [200.0, 45.0], [100.0, 56.0], [400.0, 23.0], [500.0, 12.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[0.0, 394.0], [100.0, 90.0], [200.0, 16.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[0.0, 466.0], [300.0, 13.0], [100.0, 19.0], [200.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 488.0], [100.0, 12.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 496.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[0.0, 391.0], [300.0, 4.0], [700.0, 1.0], [100.0, 98.0], [200.0, 4.0], [1000.0, 2.0]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[0.0, 491.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[0.0, 449.0], [100.0, 37.0], [200.0, 14.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[0.0, 500.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[0.0, 446.0], [100.0, 40.0], [400.0, 1.0], [200.0, 12.0], [1000.0, 1.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[0.0, 432.0], [100.0, 62.0], [200.0, 5.0], [1700.0, 1.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[0.0, 386.0], [2200.0, 1.0], [600.0, 1.0], [2600.0, 2.0], [700.0, 5.0], [2800.0, 1.0], [200.0, 24.0], [800.0, 5.0], [900.0, 1.0], [1000.0, 1.0], [1100.0, 4.0], [300.0, 7.0], [1200.0, 4.0], [1300.0, 1.0], [1400.0, 1.0], [100.0, 32.0], [400.0, 10.0], [1600.0, 1.0], [1700.0, 3.0], [500.0, 9.0], [2000.0, 1.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[0.0, 385.0], [2100.0, 1.0], [2400.0, 1.0], [600.0, 3.0], [700.0, 9.0], [200.0, 16.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 6.0], [1100.0, 2.0], [300.0, 7.0], [1200.0, 1.0], [1300.0, 3.0], [100.0, 31.0], [400.0, 19.0], [500.0, 13.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[0.0, 437.0], [300.0, 3.0], [100.0, 57.0], [200.0, 3.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[0.0, 496.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[0.0, 475.0], [1100.0, 1.0], [300.0, 2.0], [100.0, 20.0], [200.0, 2.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 190.0], [2100.0, 1.0], [2200.0, 1.0], [600.0, 22.0], [700.0, 15.0], [3000.0, 1.0], [200.0, 55.0], [800.0, 11.0], [900.0, 5.0], [1000.0, 4.0], [1100.0, 5.0], [300.0, 25.0], [1200.0, 5.0], [1300.0, 3.0], [1400.0, 6.0], [1500.0, 2.0], [100.0, 73.0], [400.0, 50.0], [1600.0, 2.0], [1700.0, 3.0], [1800.0, 2.0], [1900.0, 2.0], [500.0, 16.0], [2000.0, 1.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[0.0, 495.0], [100.0, 5.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[0.0, 498.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[0.0, 427.0], [300.0, 6.0], [700.0, 1.0], [100.0, 64.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[0.0, 492.0], [100.0, 8.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[0.0, 409.0], [600.0, 3.0], [700.0, 1.0], [100.0, 55.0], [400.0, 8.0], [200.0, 18.0], [800.0, 1.0], [500.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[0.0, 424.0], [300.0, 7.0], [700.0, 1.0], [100.0, 59.0], [200.0, 7.0], [1000.0, 2.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[0.0, 433.0], [100.0, 61.0], [200.0, 6.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[0.0, 481.0], [100.0, 19.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[0.0, 493.0], [100.0, 7.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[0.0, 431.0], [600.0, 3.0], [100.0, 55.0], [200.0, 9.0], [500.0, 2.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[0.0, 405.0], [300.0, 4.0], [600.0, 2.0], [100.0, 77.0], [200.0, 8.0], [1000.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[0.0, 405.0], [1100.0, 2.0], [300.0, 22.0], [1300.0, 1.0], [100.0, 61.0], [200.0, 3.0], [400.0, 2.0], [1000.0, 4.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[0.0, 473.0], [100.0, 27.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 441.0], [300.0, 15.0], [100.0, 41.0], [200.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[0.0, 489.0], [100.0, 11.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 486.0], [100.0, 12.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[0.0, 441.0], [300.0, 1.0], [100.0, 58.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[0.0, 287.0], [600.0, 11.0], [700.0, 11.0], [2900.0, 1.0], [200.0, 29.0], [800.0, 17.0], [900.0, 11.0], [3600.0, 1.0], [1000.0, 8.0], [1100.0, 12.0], [4500.0, 1.0], [300.0, 18.0], [1200.0, 5.0], [4900.0, 1.0], [1300.0, 5.0], [1400.0, 3.0], [1500.0, 3.0], [1600.0, 7.0], [400.0, 30.0], [100.0, 20.0], [1700.0, 2.0], [1800.0, 1.0], [500.0, 15.0], [2000.0, 1.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[0.0, 473.0], [300.0, 5.0], [100.0, 15.0], [200.0, 7.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 494.0], [300.0, 1.0], [400.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[0.0, 484.0], [100.0, 16.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[0.0, 67.0], [600.0, 16.0], [700.0, 23.0], [800.0, 16.0], [900.0, 16.0], [1000.0, 10.0], [1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [1600.0, 2.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 8.0], [2100.0, 5.0], [2200.0, 3.0], [2300.0, 3.0], [2700.0, 1.0], [2900.0, 1.0], [3300.0, 3.0], [3400.0, 1.0], [3800.0, 1.0], [4000.0, 1.0], [4100.0, 1.0], [4300.0, 2.0], [4200.0, 1.0], [4500.0, 1.0], [4800.0, 1.0], [4700.0, 1.0], [4900.0, 1.0], [5200.0, 1.0], [5300.0, 1.0], [5600.0, 1.0], [5500.0, 1.0], [6100.0, 1.0], [6300.0, 1.0], [6400.0, 2.0], [7100.0, 2.0], [7000.0, 1.0], [7400.0, 2.0], [7300.0, 3.0], [7200.0, 3.0], [7600.0, 7.0], [7500.0, 7.0], [7800.0, 8.0], [7900.0, 8.0], [7700.0, 3.0], [8000.0, 5.0], [8100.0, 4.0], [8600.0, 12.0], [8200.0, 10.0], [8500.0, 12.0], [8400.0, 6.0], [8700.0, 4.0], [8300.0, 3.0], [9000.0, 15.0], [9100.0, 10.0], [8800.0, 12.0], [9200.0, 2.0], [8900.0, 5.0], [9300.0, 4.0], [9400.0, 6.0], [9500.0, 1.0], [100.0, 19.0], [200.0, 18.0], [300.0, 41.0], [400.0, 36.0], [500.0, 28.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[0.0, 457.0], [100.0, 38.0], [200.0, 5.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[0.0, 478.0], [100.0, 22.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 500.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[0.0, 487.0], [200.0, 7.0], [100.0, 6.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[0.0, 428.0], [300.0, 21.0], [100.0, 47.0], [200.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 11700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 972.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 43056.0, "series": [{"data": [[0.0, 43056.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1472.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 972.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 409.87723672631216, "minX": 1.69408512E12, "maxY": 500.0, "series": [{"data": [[1.69408524E12, 409.87723672631216], [1.69408518E12, 500.0], [1.69408512E12, 457.8363901268437]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408524E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 11747.0, "series": [{"data": [[479.0, 2.0], [500.0, 35.61322645290581]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[499.95799999999997, 35.546]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-Aggregated", "isController": false}, {"data": [[418.0, 4.0], [422.0, 25.375], [423.0, 16.666666666666668], [438.0, 63.0], [447.0, 3.0], [449.0, 3.5], [450.0, 23.999999999999996], [459.0, 6.2], [461.0, 27.666666666666664], [467.0, 13.0], [471.0, 2.0], [472.0, 367.5], [473.0, 269.59999999999997], [474.0, 4.5], [475.0, 3.5], [476.0, 3.0], [479.0, 3.0], [480.0, 28.103448275862068], [482.0, 3.285714285714286], [483.0, 2.0], [484.0, 2.0], [485.0, 3.7777777777777777], [486.0, 5.0], [491.0, 2.25], [495.0, 2.0], [500.0, 9.622739018087861]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[492.95599999999973, 20.134000000000004]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 14.705999999999996]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[500.0, 14.705999999999996]], "isOverall": false, "label": "jsURLs17_logiqids_Login-Aggregated", "isController": false}, {"data": [[479.0, 4.0], [478.0, 3.0], [475.0, 4.0], [474.0, 5.0], [471.0, 3.0], [468.0, 3.5], [466.0, 5.0], [465.0, 3.0], [492.0, 2.0], [495.0, 3.0], [494.0, 6.666666666666667], [493.0, 4.0], [490.0, 3.0], [488.0, 2.0], [487.0, 3.0], [486.0, 2.0], [484.0, 3.0], [482.0, 4.0], [500.0, 11.518867924528303], [499.0, 2.5], [498.0, 3.7222222222222228], [497.0, 2.9166666666666665], [496.0, 2.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[498.3079999999999, 10.336000000000004]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[228.0, 3.3333333333333335], [226.0, 3.5], [224.0, 3.0], [239.0, 2.0], [238.0, 2.0], [234.0, 2.0], [233.0, 5.0], [243.0, 3.5], [240.0, 3.0], [253.0, 3.0], [252.0, 3.25], [248.0, 3.0], [256.0, 3.0], [276.0, 2.0], [299.0, 2.6], [296.0, 4.0], [294.0, 3.0], [318.0, 3.0], [316.0, 4.0], [312.0, 4.0], [307.0, 35.0], [306.0, 5.5], [305.0, 4.0], [330.0, 2.0], [321.0, 11.0], [350.0, 2.5], [341.0, 2.0], [339.0, 3.0], [337.0, 2.0], [363.0, 3.166666666666667], [360.0, 2.25], [356.0, 2.8], [355.0, 3.0], [353.0, 7.0], [352.0, 2.5], [378.0, 3.0], [377.0, 4.0], [376.0, 3.0], [372.0, 7.0], [397.0, 2.0], [396.0, 4.0], [395.0, 3.0], [389.0, 2.0], [386.0, 3.0], [402.0, 4.0], [401.0, 3.0], [400.0, 4.0], [424.0, 3.0], [418.0, 2.0], [447.0, 15.0], [443.0, 2.3333333333333335], [435.0, 2.0], [432.0, 30.0], [460.0, 3.5], [454.0, 2.0], [453.0, 2.5], [450.0, 2.0], [467.0, 2.3333333333333335], [479.0, 2.0], [478.0, 2.5], [474.0, 2.5], [472.0, 3.3333333333333335], [469.0, 5.0], [468.0, 2.434782608695653], [466.0, 3.0909090909090913], [465.0, 2.3846153846153846], [464.0, 2.25], [494.0, 4.923076923076924], [495.0, 5.75], [493.0, 2.25], [490.0, 3.0], [488.0, 2.0], [487.0, 3.0], [486.0, 2.5], [485.0, 4.0], [484.0, 4.800000000000001], [483.0, 3.5], [482.0, 18.90476190476191], [500.0, 14.773195876288653], [499.0, 2.285714285714286], [498.0, 6.4594594594594605], [497.0, 3.043478260869565]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[462.72400000000005, 8.914000000000003]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[244.0, 8.0], [247.0, 60.22222222222222], [248.0, 114.33333333333333], [255.0, 8.0], [260.0, 10.0], [262.0, 10.0], [263.0, 8.0], [304.0, 9.0], [306.0, 241.00000000000003], [307.0, 510.8928571428572], [315.0, 6.0], [319.0, 24.0], [326.0, 29.96825396825398], [345.0, 5.0], [351.0, 34.333333333333336], [350.0, 19.444444444444443], [381.0, 4.0], [383.0, 11.25], [384.0, 5.0], [397.0, 247.00000000000003], [398.0, 80.73684210526318], [399.0, 459.6470588235294], [401.0, 1720.0], [404.0, 541.0], [405.0, 676.0], [407.0, 549.5], [408.0, 911.0], [409.0, 704.3333333333334], [410.0, 594.6666666666666], [411.0, 1293.3333333333333], [413.0, 770.0], [415.0, 908.0], [416.0, 643.0], [418.0, 183.79999999999998], [421.0, 5.0], [422.0, 512.1250000000001], [423.0, 29.0], [424.0, 12.666666666666666], [435.0, 87.0], [438.0, 65.0], [447.0, 5.0], [450.0, 67.0], [459.0, 8.25], [467.0, 231.5], [473.0, 74.0], [479.0, 3.0], [484.0, 2.0], [491.0, 2.0], [500.0, 6.6750000000000025]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[368.53600000000023, 193.83199999999997]], "isOverall": false, "label": "cssURL2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[20.0, 3.333333333333333], [21.0, 2.75], [22.0, 2.6666666666666665], [23.0, 6.0], [24.0, 3.0], [26.0, 5.0], [27.0, 2.5], [28.0, 3.0], [39.0, 2.0], [42.0, 3.0], [45.0, 3.0], [44.0, 2.3333333333333335], [46.0, 2.0], [49.0, 2.0], [53.0, 3.0], [54.0, 2.5], [57.0, 3.0], [56.0, 4.0], [59.0, 5.5], [60.0, 5.0], [64.0, 3.0], [71.0, 4.0], [70.0, 2.0], [69.0, 3.0], [68.0, 2.0], [75.0, 2.25], [73.0, 3.5], [72.0, 2.0], [79.0, 2.0], [77.0, 2.8], [76.0, 2.0], [83.0, 2.3333333333333335], [81.0, 2.375], [80.0, 3.0], [87.0, 2.5], [86.0, 2.5], [89.0, 2.0], [99.0, 2.0], [101.0, 2.6666666666666665], [111.0, 2.0], [116.0, 2.0], [120.0, 2.0], [131.0, 2.0], [143.0, 2.0], [141.0, 2.0], [140.0, 2.0], [151.0, 2.0], [148.0, 3.0], [156.0, 2.0], [164.0, 3.0], [162.0, 3.0], [175.0, 3.0], [174.0, 4.5], [173.0, 3.0], [172.0, 2.5], [169.0, 3.0], [183.0, 2.3333333333333335], [182.0, 2.0], [181.0, 2.0], [180.0, 2.6666666666666665], [179.0, 2.25], [176.0, 7.625], [191.0, 3.0], [187.0, 2.0], [186.0, 3.0], [184.0, 1.6666666666666667], [199.0, 3.0], [197.0, 2.0], [196.0, 2.0], [195.0, 3.5], [194.0, 2.0], [193.0, 2.0], [207.0, 4.0], [206.0, 4.0], [203.0, 3.0], [201.0, 5.0], [200.0, 9.0], [213.0, 3.0], [212.0, 2.5], [210.0, 2.4000000000000004], [209.0, 2.0], [222.0, 2.0], [221.0, 4.0], [218.0, 15.0], [228.0, 3.3333333333333335], [227.0, 5.333333333333333], [225.0, 2.0], [239.0, 3.0], [237.0, 1.0], [236.0, 1.0], [235.0, 2.3333333333333335], [234.0, 2.3333333333333335], [247.0, 2.0], [246.0, 2.0], [243.0, 2.3333333333333335], [242.0, 2.0], [240.0, 3.0], [252.0, 2.0], [249.0, 2.0], [248.0, 2.0], [268.0, 2.0], [267.0, 2.5], [263.0, 2.3333333333333335], [262.0, 5.0], [261.0, 68.0], [260.0, 5.0], [258.0, 4.5], [286.0, 2.0], [284.0, 5.5], [282.0, 2.0], [280.0, 4.0], [279.0, 2.6666666666666665], [278.0, 2.5], [273.0, 2.5], [272.0, 3.0], [302.0, 2.0], [301.0, 4.0], [299.0, 2.2], [297.0, 2.0], [296.0, 2.0], [295.0, 2.0], [294.0, 2.75], [289.0, 4.0], [318.0, 3.0], [316.0, 3.6666666666666665], [314.0, 2.6666666666666665], [313.0, 4.0], [306.0, 4.75], [305.0, 3.0], [335.0, 3.0], [334.0, 6.0], [332.0, 3.0], [330.0, 2.0], [329.0, 2.0], [339.0, 2.6666666666666665], [351.0, 2.5], [350.0, 2.5], [349.0, 2.0], [344.0, 2.0], [341.0, 2.5], [338.0, 2.0], [337.0, 2.25], [336.0, 3.0], [365.0, 4.0], [363.0, 3.727272727272727], [362.0, 2.8333333333333335], [356.0, 2.571428571428571], [378.0, 3.0], [377.0, 14.0], [375.0, 7.0], [373.0, 6.0], [370.0, 2.0], [369.0, 3.7142857142857144], [397.0, 2.5], [396.0, 3.0], [392.0, 2.5], [389.0, 3.0], [385.0, 2.0], [413.0, 2.0], [410.0, 3.0], [409.0, 2.0], [408.0, 2.0], [406.0, 2.0], [405.0, 5.5], [403.0, 5.5], [401.0, 2.25], [400.0, 2.6666666666666665], [428.0, 36.0], [427.0, 3.0], [426.0, 4.0], [423.0, 1.5], [418.0, 3.0], [417.0, 2.1], [416.0, 2.0], [447.0, 15.8], [445.0, 9.5], [444.0, 4.0], [443.0, 4.0], [442.0, 3.0], [435.0, 2.0], [434.0, 4.0], [432.0, 63.0], [461.0, 2.75], [460.0, 2.0], [459.0, 3.0], [458.0, 3.0], [456.0, 3.0], [454.0, 2.0], [453.0, 3.25], [450.0, 2.6666666666666665], [479.0, 2.6666666666666665], [478.0, 3.0], [477.0, 3.0], [475.0, 2.0], [472.0, 2.75], [468.0, 3.222222222222222], [466.0, 3.0], [465.0, 2.4], [464.0, 2.0], [495.0, 2.5], [493.0, 2.0], [492.0, 2.3333333333333335], [491.0, 3.5], [490.0, 2.0], [487.0, 3.0], [485.0, 3.3333333333333335], [482.0, 19.25], [500.0, 3.0], [498.0, 2.3333333333333335], [497.0, 2.5]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[286.5679999999999, 3.7999999999999945]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 69.918]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[500.0, 69.918]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 1974.758]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[500.0, 1974.758]], "isOverall": false, "label": "jsURLs5_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 25.17000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[500.0, 25.17000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 38.23000000000002]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[500.0, 38.23000000000002]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[116.0, 4.0], [121.0, 4.0], [133.0, 4.5], [130.0, 4.0], [140.0, 3.0], [136.0, 4.0], [151.0, 4.5], [150.0, 4.0], [144.0, 3.0], [158.0, 36.0], [156.0, 4.0], [165.0, 4.0], [164.0, 4.0], [162.0, 3.0], [161.0, 47.0], [160.0, 18.0], [182.0, 2.0], [196.0, 4.0], [206.0, 5.0], [204.0, 4.0], [214.0, 3.5], [210.0, 2.0], [209.0, 4.0], [222.0, 5.0], [218.0, 8.666666666666666], [217.0, 5.0], [228.0, 2.0], [227.0, 4.0], [225.0, 3.5], [239.0, 3.0], [238.0, 3.0], [237.0, 3.0], [247.0, 3.0], [246.0, 3.0], [254.0, 2.0], [253.0, 4.0], [252.0, 3.75], [270.0, 3.0], [268.0, 6.5], [263.0, 5.0], [262.0, 3.0], [261.0, 5.0], [258.0, 8.333333333333334], [287.0, 3.0], [286.0, 4.0], [282.0, 8.0], [280.0, 4.0], [299.0, 2.6666666666666665], [296.0, 6.0], [295.0, 3.0], [292.0, 3.0], [318.0, 8.5], [316.0, 3.0], [314.0, 4.0], [306.0, 4.0], [304.0, 3.0], [351.0, 3.0], [363.0, 3.5], [362.0, 3.0], [356.0, 3.3333333333333335], [353.0, 3.0], [378.0, 2.5], [377.0, 3.0], [376.0, 2.5], [374.0, 13.0], [373.0, 3.0], [369.0, 3.0], [396.0, 4.0], [395.0, 4.0], [389.0, 3.0], [387.0, 5.0], [403.0, 7.5], [414.0, 2.0], [415.0, 3.0], [413.0, 5.2], [410.0, 4.5], [408.0, 3.25], [405.0, 4.8181818181818175], [404.0, 12.0], [402.0, 5.666666666666667], [401.0, 3.0714285714285716], [400.0, 3.0], [430.0, 2.0], [427.0, 3.0], [426.0, 6.0], [422.0, 4.0], [421.0, 3.0], [419.0, 3.0], [418.0, 4.5], [417.0, 3.25], [445.0, 63.0], [447.0, 12.555555555555555], [444.0, 8.666666666666666], [443.0, 3.4], [442.0, 4.0], [437.0, 3.0], [435.0, 2.5], [433.0, 33.0], [432.0, 42.666666666666664], [458.0, 3.0], [457.0, 4.0], [456.0, 4.0], [454.0, 3.3333333333333335], [453.0, 2.5], [450.0, 4.0], [448.0, 6.0], [466.0, 3.75], [479.0, 3.5], [478.0, 2.0], [472.0, 5.0], [471.0, 3.0], [469.0, 2.0], [468.0, 3.2941176470588234], [465.0, 2.818181818181818], [464.0, 3.25], [492.0, 3.5], [495.0, 6.947368421052632], [494.0, 3.2000000000000006], [493.0, 3.0], [486.0, 3.6666666666666665], [485.0, 6.0], [484.0, 4.749999999999999], [483.0, 4.5], [482.0, 27.541666666666664], [481.0, 4.0], [500.0, 15.860000000000003], [499.0, 4.0], [498.0, 7.696969696969696], [497.0, 3.294117647058824], [496.0, 4.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[429.08400000000006, 8.536000000000001]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[394.0, 821.0], [398.0, 2011.0], [399.0, 2633.5], [401.0, 3294.8571428571427], [400.0, 2827.0], [402.0, 3219.96], [403.0, 3952.0], [404.0, 3647.125], [405.0, 3532.0833333333335], [407.0, 4289.555555555556], [409.0, 3845.071428571429], [414.0, 4644.5], [415.0, 5175.5], [410.0, 4253.714285714286], [411.0, 4580.527777777777], [412.0, 4333.571428571428], [413.0, 4628.166666666667], [417.0, 5085.0], [416.0, 5184.8], [418.0, 4909.7], [419.0, 5115.0], [420.0, 3878.5714285714284], [421.0, 5128.714285714285], [422.0, 5397.078947368421], [423.0, 4114.757575757576], [424.0, 1379.466666666667], [428.0, 1181.0], [425.0, 1428.0], [426.0, 1417.0], [427.0, 1429.1666666666665], [432.0, 2587.75], [433.0, 380.4], [434.0, 20.0], [435.0, 11.0], [439.0, 94.0], [441.0, 220.0], [447.0, 1874.0], [449.0, 21.0], [450.0, 83.5], [451.0, 82.5], [452.0, 58.0], [459.0, 14.0], [467.0, 502.0], [469.0, 138.0], [472.0, 11747.0], [476.0, 261.6666666666667], [480.0, 353.6666666666667], [481.0, 362.66666666666663], [485.0, 50.0], [486.0, 23.5], [490.0, 484.0], [491.0, 236.5], [495.0, 50.0], [500.0, 72.45378151260503]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[438.2279999999999, 2798.654]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 23.96800000000001]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[500.0, 23.96800000000001]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 33.51]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[500.0, 33.51]], "isOverall": false, "label": "logiqids_Login-Aggregated", "isController": false}, {"data": [[3.0, 2.5], [4.0, 3.0], [6.0, 3.0], [7.0, 3.0], [8.0, 2.0], [10.0, 2.0], [11.0, 3.0], [12.0, 5.0], [13.0, 3.0], [14.0, 2.0], [15.0, 3.0], [16.0, 3.0], [17.0, 3.0], [18.0, 2.0], [19.0, 3.0], [20.0, 3.0], [21.0, 2.0], [22.0, 2.0], [23.0, 4.0], [24.0, 1.0], [25.0, 2.0], [26.0, 2.0], [27.0, 5.0], [28.0, 1.0], [29.0, 2.0], [30.0, 2.0], [31.0, 3.0], [33.0, 2.0], [32.0, 3.0], [35.0, 3.0], [34.0, 3.0], [37.0, 2.0], [36.0, 3.0], [39.0, 4.0], [38.0, 2.0], [41.0, 2.0], [40.0, 2.0], [43.0, 2.0], [42.0, 2.0], [45.0, 3.0], [44.0, 2.0], [47.0, 3.0], [46.0, 2.0], [49.0, 2.0], [48.0, 2.0], [51.0, 3.0], [50.0, 2.0], [53.0, 2.0], [52.0, 3.0], [54.0, 2.0], [57.0, 3.0], [56.0, 3.0], [59.0, 2.0], [58.0, 2.0], [60.0, 4.0], [62.0, 4.0], [67.0, 3.0], [66.0, 2.0], [65.0, 2.0], [64.0, 3.5], [71.0, 3.0], [70.0, 3.0], [69.0, 3.0], [68.0, 2.0], [75.0, 2.0], [73.0, 3.0], [72.0, 3.0], [79.0, 3.0], [78.0, 2.0], [77.0, 2.0], [76.0, 2.0], [83.0, 2.0], [82.0, 2.0], [81.0, 2.0], [80.0, 2.0], [87.0, 2.0], [86.0, 2.0], [85.0, 2.0], [91.0, 2.0], [90.0, 2.0], [89.0, 8.0], [88.0, 2.0], [95.0, 1.0], [94.0, 3.0], [93.0, 2.0], [92.0, 3.0], [99.0, 2.0], [98.0, 2.0], [97.0, 3.0], [96.0, 3.0], [103.0, 1.0], [102.0, 3.0], [101.0, 2.0], [100.0, 2.0], [107.0, 3.0], [106.0, 2.0], [105.0, 2.0], [104.0, 3.0], [111.0, 2.0], [109.0, 3.0], [108.0, 2.0], [115.0, 1.0], [114.0, 2.0], [113.0, 2.0], [112.0, 2.0], [119.0, 2.0], [118.0, 2.0], [117.0, 2.0], [116.0, 2.0], [123.0, 2.0], [122.0, 1.0], [121.0, 2.0], [120.0, 2.0], [126.0, 2.0], [125.0, 2.0], [135.0, 2.0], [134.0, 2.0], [133.0, 2.0], [131.0, 1.0], [130.0, 2.0], [128.0, 2.0], [143.0, 2.0], [142.0, 3.0], [141.0, 2.0], [140.0, 3.0], [139.0, 2.0], [138.0, 2.0], [137.0, 6.0], [136.0, 5.0], [151.0, 3.0], [150.0, 2.5], [148.0, 2.0], [146.0, 3.0], [144.0, 2.0], [159.0, 2.0], [158.0, 14.0], [157.0, 2.0], [156.0, 3.0], [155.0, 2.0], [154.0, 2.0], [153.0, 3.0], [152.0, 2.0], [166.0, 2.0], [165.0, 2.0], [164.0, 4.0], [163.0, 2.0], [162.0, 45.0], [161.0, 2.0], [160.0, 15.0], [175.0, 2.0], [174.0, 4.0], [173.0, 2.0], [172.0, 3.0], [171.0, 2.0], [170.0, 2.0], [169.0, 3.0], [168.0, 3.0], [183.0, 2.0], [182.0, 2.0], [181.0, 2.0], [180.0, 2.0], [179.0, 2.5], [177.0, 2.0], [176.0, 2.0], [191.0, 6.5], [189.0, 1.0], [187.0, 10.0], [186.0, 2.0], [185.0, 2.0], [184.0, 2.0], [199.0, 4.0], [198.0, 2.0], [197.0, 2.0], [196.0, 1.0], [195.0, 2.0], [194.0, 1.0], [193.0, 2.0], [207.0, 18.0], [206.0, 3.0], [205.0, 1.0], [204.0, 3.0], [203.0, 2.0], [202.0, 10.0], [201.0, 7.0], [200.0, 3.0], [215.0, 1.0], [214.0, 1.0], [213.0, 3.0], [212.0, 3.0], [211.0, 9.0], [210.0, 2.0], [209.0, 2.0], [208.0, 2.0], [223.0, 2.0], [222.0, 2.0], [221.0, 2.0], [220.0, 2.0], [219.0, 3.0], [218.0, 4.0], [217.0, 3.0], [231.0, 2.0], [230.0, 2.0], [229.0, 2.0], [228.0, 2.0], [227.0, 2.0], [226.0, 2.0], [225.0, 3.0], [224.0, 24.0], [239.0, 2.0], [238.0, 3.0], [237.0, 2.0], [236.0, 3.0], [235.0, 2.0], [234.0, 3.0], [233.0, 2.0], [232.0, 11.0], [247.0, 2.0], [246.0, 1.0], [245.0, 3.0], [244.0, 2.0], [243.0, 2.0], [242.0, 1.0], [241.0, 1.0], [240.0, 3.0], [255.0, 2.0], [254.0, 1.0], [253.0, 3.0], [252.0, 3.0], [251.0, 2.0], [250.0, 2.0], [249.0, 3.0], [248.0, 2.0], [270.0, 4.0], [268.0, 2.0], [259.0, 4.0], [258.0, 2.0], [257.0, 2.0], [256.0, 2.0], [267.0, 2.0], [266.0, 2.0], [265.0, 1.0], [264.0, 1.0], [263.0, 4.0], [262.0, 2.0], [261.0, 4.0], [260.0, 7.0], [286.0, 4.0], [287.0, 2.0], [285.0, 4.0], [284.0, 4.0], [282.0, 2.0], [281.0, 2.0], [280.0, 3.0], [279.0, 2.0], [273.0, 2.0], [272.0, 6.5], [275.0, 2.0], [274.0, 4.0], [278.0, 2.0], [277.0, 2.0], [276.0, 2.0], [302.0, 2.0], [303.0, 2.0], [301.0, 3.0], [300.0, 2.0], [299.0, 6.0], [298.0, 2.0], [297.0, 1.0], [296.0, 2.0], [295.0, 3.0], [289.0, 2.0], [288.0, 2.0], [291.0, 2.0], [290.0, 2.0], [294.0, 3.0], [293.0, 2.0], [292.0, 2.0], [317.0, 3.0], [318.0, 3.0], [316.0, 2.0], [307.0, 40.0], [306.0, 3.0], [305.0, 2.0], [304.0, 3.0], [315.0, 3.0], [314.0, 3.0], [313.0, 3.0], [312.0, 2.0], [311.0, 33.0], [309.0, 31.0], [308.0, 42.0], [334.0, 3.5], [335.0, 2.0], [332.0, 2.0], [323.0, 4.0], [322.0, 3.0], [321.0, 5.0], [320.0, 3.5], [330.0, 2.0], [329.0, 3.0], [328.0, 4.0], [327.0, 3.0], [326.0, 6.0], [325.0, 3.0], [324.0, 8.0], [350.0, 2.0], [351.0, 2.0], [349.0, 3.0], [348.0, 2.0], [346.0, 2.0], [345.0, 1.0], [344.0, 2.0], [343.0, 2.5], [339.0, 2.0], [338.0, 3.0], [337.0, 3.0], [336.0, 4.0], [341.0, 3.0], [365.0, 2.0], [366.0, 3.0], [364.0, 3.0], [355.0, 14.0], [353.0, 2.0], [352.0, 2.0], [363.0, 5.0], [362.0, 2.0], [361.0, 2.0], [360.0, 2.0], [359.0, 2.0], [358.0, 2.0], [357.0, 2.0], [356.0, 2.0], [383.0, 2.0], [381.0, 2.0], [371.0, 4.0], [370.0, 2.0], [369.0, 6.0], [368.0, 6.0], [379.0, 2.0], [378.0, 2.0], [377.0, 3.0], [376.0, 3.0], [375.0, 7.0], [374.0, 10.0], [373.0, 16.0], [372.0, 2.0], [398.0, 3.0], [399.0, 3.0], [397.0, 2.0], [396.0, 4.0], [395.0, 6.0], [394.0, 1.0], [393.0, 1.0], [392.0, 1.0], [391.0, 2.0], [387.0, 2.0], [386.0, 3.0], [385.0, 2.3333333333333335], [389.0, 2.0], [414.0, 8.0], [415.0, 3.0], [413.0, 2.0], [412.0, 3.0], [411.0, 5.0], [410.0, 2.0], [409.0, 2.0], [408.0, 3.0], [407.0, 3.0], [401.0, 2.0], [400.0, 3.0], [403.0, 4.0], [402.0, 3.0], [406.0, 2.0], [405.0, 5.0], [404.0, 8.0], [430.0, 2.0], [431.0, 2.0], [429.0, 64.0], [428.0, 38.0], [427.0, 6.0], [426.0, 2.5], [424.0, 2.0], [423.0, 2.0], [417.0, 2.0], [416.0, 2.0], [419.0, 2.0], [418.0, 1.0], [422.0, 3.0], [421.0, 2.0], [420.0, 2.0], [446.0, 57.0], [447.0, 64.0], [445.0, 9.0], [444.0, 4.0], [443.0, 3.0], [442.0, 2.0], [441.0, 2.0], [440.0, 2.0], [439.0, 3.0], [433.0, 2.0], [432.0, 3.0], [435.0, 3.0], [434.0, 4.0], [438.0, 2.0], [437.0, 2.0], [461.0, 5.0], [463.0, 2.0], [460.0, 2.0], [451.0, 5.0], [450.0, 3.0], [449.0, 3.0], [448.0, 2.0], [459.0, 2.0], [458.0, 2.0], [457.0, 2.0], [456.0, 2.0], [455.0, 1.0], [454.0, 3.0], [453.0, 3.0], [452.0, 4.0], [478.0, 2.0], [479.0, 3.0], [477.0, 3.5], [467.0, 6.0], [466.0, 2.0], [465.0, 2.0], [464.0, 3.0], [475.0, 3.0], [474.0, 3.0], [472.0, 3.0], [471.0, 2.0], [470.0, 2.0], [469.0, 3.0], [468.0, 6.0], [494.0, 14.0], [495.0, 13.0], [493.0, 2.0], [492.0, 1.0], [491.0, 2.0], [490.0, 3.0], [489.0, 1.0], [488.0, 2.0], [487.0, 3.0], [481.0, 1.0], [480.0, 2.0], [483.0, 3.0], [482.0, 3.0], [486.0, 3.0], [485.0, 7.0], [484.0, 4.0], [500.0, 2.0], [499.0, 3.0], [498.0, 2.0], [497.0, 2.0], [496.0, 3.0], [1.0, 3.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[250.5920000000001, 3.791999999999998]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 34.310000000000045]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[500.0, 34.310000000000045]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 56.501999999999995]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[500.0, 56.501999999999995]], "isOverall": false, "label": "jsURLs8_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 35.226000000000035]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[500.0, 35.226000000000035]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 11.135999999999989]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[500.0, 11.135999999999989]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[241.0, 11.0], [242.0, 92.0], [244.0, 514.0303030303031], [245.0, 662.6279069767442], [247.0, 27.0], [306.0, 8.0], [307.0, 183.31914893617025], [308.0, 244.05882352941177], [311.0, 52.0], [343.0, 7.0], [344.0, 5.666666666666667], [345.0, 5.0], [346.0, 6.666666666666667], [347.0, 8.142857142857142], [349.0, 67.19354838709677], [350.0, 252.36363636363635], [351.0, 60.5], [384.0, 48.5], [397.0, 322.3513513513514], [401.0, 644.2], [400.0, 608.6666666666667], [402.0, 1214.7142857142858], [404.0, 983.2222222222222], [405.0, 2308.0], [409.0, 2072.0], [410.0, 1073.3333333333333], [411.0, 1339.0], [413.0, 4571.0], [415.0, 878.0], [416.0, 984.0], [418.0, 776.4285714285713], [422.0, 552.2857142857143], [423.0, 88.5], [433.0, 39.0], [450.0, 58.0], [461.0, 4.0], [467.0, 86.0], [473.0, 336.5], [480.0, 24.0], [493.0, 2.0], [495.0, 5.0], [500.0, 8.7027027027027]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[342.4179999999998, 379.08600000000007]], "isOverall": false, "label": "cssURL1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[183.0, 2.6666666666666665], [182.0, 3.0], [177.0, 2.5], [176.0, 4.0], [187.0, 2.0], [199.0, 3.5], [197.0, 3.0], [194.0, 2.5], [205.0, 3.0], [210.0, 2.8], [209.0, 3.0], [228.0, 1.0], [240.0, 4.0], [254.0, 2.0], [252.0, 2.3333333333333335], [249.0, 2.0], [248.0, 2.0], [270.0, 2.0], [268.0, 5.0], [263.0, 3.0], [262.0, 5.5], [261.0, 3.0], [260.0, 40.0], [286.0, 3.0], [275.0, 1.0], [273.0, 5.0], [303.0, 2.0], [301.0, 3.0], [299.0, 2.2], [295.0, 4.0], [291.0, 2.0], [288.0, 3.0], [318.0, 2.3333333333333335], [316.0, 4.0], [309.0, 22.5], [306.0, 2.166666666666667], [335.0, 8.0], [350.0, 3.0], [344.0, 1.0], [339.0, 2.0], [337.0, 2.0], [363.0, 3.25], [359.0, 3.0], [356.0, 2.0], [355.0, 9.0], [398.0, 2.0], [394.0, 2.0], [389.0, 2.0], [415.0, 2.0], [414.0, 3.0], [412.0, 2.0], [409.0, 3.0], [408.0, 2.0], [405.0, 3.0], [401.0, 2.3333333333333335], [400.0, 2.0], [428.0, 26.0], [426.0, 3.0], [417.0, 2.0], [446.0, 63.0], [447.0, 31.5], [445.0, 15.8], [444.0, 3.3333333333333335], [443.0, 2.4999999999999996], [442.0, 2.0], [438.0, 2.0], [437.0, 3.0], [435.0, 2.0], [461.0, 2.0], [460.0, 2.25], [458.0, 2.0], [457.0, 2.0], [455.0, 3.0], [454.0, 2.75], [453.0, 2.4], [452.0, 4.0], [450.0, 2.8], [449.0, 4.0], [466.0, 3.4], [474.0, 3.0], [472.0, 3.0], [471.0, 2.3333333333333335], [469.0, 4.5], [468.0, 3.0], [467.0, 7.0], [465.0, 2.75], [464.0, 2.5], [492.0, 2.6666666666666665], [495.0, 4.157894736842105], [494.0, 3.181818181818181], [493.0, 2.6], [487.0, 2.0], [486.0, 1.0], [485.0, 2.0], [484.0, 3.0], [483.0, 3.0], [482.0, 12.60869565217391], [500.0, 19.979166666666675], [499.0, 4.6], [498.0, 6.666666666666669], [497.0, 2.6], [496.0, 3.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[448.22000000000014, 9.729999999999995]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 28.90799999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[500.0, 28.90799999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-Aggregated", "isController": false}, {"data": [[416.0, 58.0], [418.0, 92.5], [420.0, 160.5], [421.0, 8.666666666666666], [422.0, 111.73333333333333], [423.0, 8.999999999999998], [424.0, 80.0], [432.0, 10.75], [433.0, 13.5], [434.0, 2.0], [435.0, 5.0], [438.0, 59.0], [444.0, 4.5], [447.0, 3.0], [449.0, 3.5], [450.0, 40.107142857142854], [452.0, 2.0], [453.0, 4.0], [456.0, 3.0], [458.0, 3.0], [459.0, 9.0], [460.0, 2.0], [461.0, 6.1], [466.0, 11.0], [467.0, 48.5], [468.0, 90.66666666666667], [470.0, 2.0], [472.0, 343.0], [473.0, 339.23076923076917], [475.0, 3.0], [476.0, 39.0], [479.0, 3.0], [480.0, 18.3], [482.0, 2.8333333333333335], [485.0, 3.3333333333333335], [486.0, 4.25], [490.0, 3.0], [491.0, 2.0], [495.0, 2.0], [500.0, 11.830670926517573]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[483.62800000000004, 30.555999999999983]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 71.53999999999995]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[500.0, 71.53999999999995]], "isOverall": false, "label": "jsURLs7_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 54.52599999999996]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[500.0, 54.52599999999996]], "isOverall": false, "label": "jsURLs10_logiqids_Login-Aggregated", "isController": false}, {"data": [[349.0, 42.8], [350.0, 282.4736842105263], [351.0, 36.00000000000001], [380.0, 8.5], [384.0, 23.571428571428573], [385.0, 50.666666666666664], [397.0, 540.4149659863946], [398.0, 180.2058823529412], [399.0, 563.0], [403.0, 2138.5], [400.0, 705.125], [401.0, 923.1818181818181], [402.0, 1375.25], [404.0, 1339.6153846153848], [405.0, 1283.75], [408.0, 2664.0], [415.0, 270.0], [409.0, 1647.6], [410.0, 1110.0], [411.0, 793.0], [416.0, 659.25], [417.0, 379.5], [418.0, 543.0769230769231], [422.0, 574.0], [423.0, 22.25], [433.0, 3.0], [434.0, 3.0], [437.0, 94.0], [438.0, 68.0], [444.0, 5.0], [447.0, 5.5], [450.0, 60.0], [459.0, 9.0], [462.0, 8.0], [467.0, 15.5], [471.0, 319.0], [473.0, 408.85714285714283], [476.0, 3.0], [480.0, 18.333333333333332], [482.0, 5.0], [495.0, 3.0], [500.0, 21.415094339622634]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[422.05400000000003, 430.23799999999994]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 42.431999999999995]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[500.0, 42.431999999999995]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[87.0, 4.0], [91.0, 2.0], [90.0, 3.0], [89.0, 3.3333333333333335], [95.0, 2.5], [99.0, 2.5], [98.0, 3.0], [97.0, 3.0], [96.0, 3.0], [101.0, 2.5], [133.0, 3.0], [148.0, 3.0], [158.0, 30.0], [157.0, 2.0], [156.0, 3.0], [164.0, 3.0], [161.0, 2.0], [160.0, 3.0], [175.0, 3.0], [174.0, 2.5], [172.0, 2.75], [182.0, 2.0], [179.0, 3.0], [176.0, 5.5], [194.0, 2.0], [207.0, 4.0], [204.0, 2.0], [202.0, 2.0], [215.0, 2.0], [212.0, 2.6666666666666665], [210.0, 2.2], [221.0, 2.0], [219.0, 3.0], [218.0, 2.0], [225.0, 2.2], [239.0, 2.0], [238.0, 2.0], [237.0, 5.0], [235.0, 1.5], [234.0, 3.0], [246.0, 3.0], [252.0, 2.0], [248.0, 2.0], [270.0, 3.0], [267.0, 2.0], [262.0, 3.0], [258.0, 3.0], [273.0, 3.0], [302.0, 3.3333333333333335], [299.0, 3.5], [317.0, 3.0], [316.0, 2.0], [307.0, 38.0], [332.0, 2.0], [351.0, 2.0], [350.0, 3.0], [348.0, 2.0], [345.0, 3.0], [337.0, 2.0], [336.0, 2.0], [365.0, 4.5], [366.0, 4.0], [364.0, 2.0], [355.0, 3.0], [353.0, 11.0], [363.0, 3.6363636363636362], [362.0, 2.0], [361.0, 2.0], [360.0, 2.3333333333333335], [359.0, 2.0], [356.0, 2.75], [381.0, 2.0], [378.0, 3.2500000000000004], [377.0, 7.5], [376.0, 3.0], [374.0, 2.0], [369.0, 3.4285714285714284], [373.0, 8.5], [372.0, 28.0], [371.0, 2.0], [370.0, 4.0], [398.0, 2.25], [397.0, 2.0], [396.0, 2.0], [395.0, 5.5], [392.0, 2.25], [391.0, 3.0], [386.0, 2.5], [385.0, 2.0], [413.0, 5.0], [415.0, 2.3333333333333335], [412.0, 2.0], [403.0, 5.5], [402.0, 2.5], [401.0, 2.25], [400.0, 2.0], [411.0, 5.0], [410.0, 2.0], [409.0, 3.0], [408.0, 2.75], [406.0, 2.5], [405.0, 4.0], [404.0, 4.0], [420.0, 2.0], [419.0, 2.6666666666666665], [418.0, 2.0], [417.0, 2.5], [447.0, 32.57142857142857], [444.0, 4.0], [443.0, 3.0], [442.0, 2.0], [439.0, 2.5], [438.0, 6.0], [437.0, 1.0], [435.0, 2.3333333333333335], [461.0, 2.5], [460.0, 3.0], [455.0, 2.0], [454.0, 2.125], [453.0, 3.0], [450.0, 2.6666666666666665], [449.0, 2.0], [478.0, 3.5], [471.0, 2.75], [468.0, 2.555555555555556], [467.0, 6.0], [466.0, 2.5], [465.0, 2.5], [464.0, 2.0], [495.0, 4.857142857142857], [494.0, 11.857142857142858], [492.0, 2.3333333333333335], [490.0, 3.0], [487.0, 3.0], [486.0, 3.0], [485.0, 2.0], [484.0, 3.6666666666666665], [483.0, 3.0], [482.0, 18.939393939393938], [500.0, 7.476190476190479], [499.0, 2.473684210526316], [498.0, 5.9444444444444455], [497.0, 3.043478260869565]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[406.7640000000002, 5.387999999999996]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[450.0, 28.0], [473.0, 144.0], [476.0, 31.0], [480.0, 27.666666666666668], [482.0, 3.0], [485.0, 9.0], [500.0, 17.29531568228106]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[499.57599999999996, 17.586000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 400.9179999999994]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[500.0, 400.9179999999994]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[495.0, 4.0], [493.0, 3.0], [492.0, 3.0], [491.0, 2.5], [490.0, 4.0], [486.0, 4.0], [484.0, 2.6], [482.0, 26.75], [500.0, 8.271714922048984], [499.0, 4.0], [498.0, 3.230769230769231], [497.0, 2.5]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[499.28599999999983, 8.12399999999999]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 29.192000000000018]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[500.0, 29.192000000000018]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 30.267999999999994]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[500.0, 30.267999999999994]], "isOverall": false, "label": "logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 42.30999999999995]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[500.0, 42.30999999999995]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 17.887999999999995]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[500.0, 17.887999999999995]], "isOverall": false, "label": "jsURLs19_logiqids_Login-Aggregated", "isController": false}, {"data": [[318.0, 7.0], [316.0, 3.0], [335.0, 5.0], [332.0, 4.0], [330.0, 3.0], [351.0, 2.0], [349.0, 3.0], [348.0, 4.0], [345.0, 3.0], [339.0, 3.0], [336.0, 2.0], [356.0, 4.0], [355.0, 2.0], [353.0, 5.333333333333333], [352.0, 3.0], [378.0, 2.0], [369.0, 2.0], [397.0, 2.0], [392.0, 2.3333333333333335], [391.0, 1.0], [389.0, 2.0], [413.0, 2.0], [412.0, 2.0], [405.0, 4.0], [401.0, 2.6666666666666665], [400.0, 2.6666666666666665], [431.0, 2.0], [427.0, 13.0], [426.0, 4.0], [422.0, 2.0], [418.0, 3.0], [417.0, 2.5], [447.0, 2.6666666666666665], [443.0, 2.4444444444444446], [442.0, 2.0], [438.0, 2.0], [437.0, 2.0], [435.0, 2.0], [461.0, 2.0], [460.0, 4.0], [454.0, 2.5], [450.0, 2.3333333333333335], [479.0, 2.0], [477.0, 2.0], [471.0, 2.0], [466.0, 3.0], [465.0, 2.3333333333333335], [464.0, 3.0], [495.0, 4.736842105263158], [494.0, 2.9], [493.0, 2.75], [492.0, 2.0], [486.0, 3.0], [485.0, 2.0], [484.0, 2.4], [483.0, 2.0], [482.0, 11.857142857142858], [500.0, 13.965034965034965], [499.0, 3.0], [498.0, 5.666666666666667], [497.0, 2.4137931034482762]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[483.302, 9.578000000000007]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 59.412000000000006]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[500.0, 59.412000000000006]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 121.01799999999972]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[500.0, 121.01799999999972]], "isOverall": false, "label": "jsURLs6_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 726.3880000000004]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[500.0, 726.3880000000004]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 14.381999999999987]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[500.0, 14.381999999999987]], "isOverall": false, "label": "jsURLs18_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 22.67600000000004]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[500.0, 22.67600000000004]], "isOverall": false, "label": "logiqids_sign_up-Aggregated", "isController": false}, {"data": [[410.0, 180.0], [415.0, 274.0], [416.0, 606.0], [417.0, 217.0], [418.0, 239.8], [421.0, 340.42857142857144], [422.0, 370.68750000000006], [423.0, 46.22222222222222], [424.0, 90.14285714285714], [432.0, 3.0], [433.0, 36.0], [434.0, 3.0], [447.0, 5.0], [450.0, 48.48148148148149], [451.0, 18.0], [453.0, 4.333333333333333], [459.0, 9.333333333333332], [461.0, 8.0], [462.0, 7.5], [466.0, 9.0], [467.0, 118.33333333333333], [468.0, 94.66666666666667], [471.0, 3.0], [472.0, 323.0], [473.0, 283.06896551724134], [474.0, 4.0], [475.0, 6.75], [476.0, 21.333333333333336], [479.0, 2.5], [480.0, 19.142857142857142], [482.0, 4.0], [485.0, 5.0], [495.0, 5.0], [500.0, 10.957198443579774]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[471.83399999999995, 96.52799999999996]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-Aggregated", "isController": false}, {"data": [[267.0, 5.0], [282.0, 2.0], [279.0, 4.0], [276.0, 4.0], [275.0, 4.0], [273.0, 5.0], [302.0, 10.0], [299.0, 3.4], [296.0, 7.0], [294.0, 4.333333333333333], [289.0, 3.5], [332.0, 2.0], [351.0, 2.0], [350.0, 3.0], [345.0, 3.0], [365.0, 9.0], [363.0, 2.0], [362.0, 3.0], [360.0, 4.0], [359.0, 3.0], [358.0, 3.0], [357.0, 2.0], [356.0, 3.5], [353.0, 2.0], [352.0, 3.0], [377.0, 3.0], [369.0, 4.0], [397.0, 2.0], [396.0, 2.0], [395.0, 5.5], [392.0, 3.5], [386.0, 3.5], [413.0, 2.5], [412.0, 3.0], [410.0, 3.5], [406.0, 2.0], [401.0, 2.6999999999999997], [400.0, 2.75], [429.0, 44.0], [427.0, 13.0], [426.0, 3.0], [417.0, 2.5], [443.0, 3.25], [442.0, 2.0], [435.0, 3.0], [461.0, 4.0], [460.0, 2.0], [454.0, 2.0], [478.0, 2.0], [471.0, 3.0], [468.0, 2.8749999999999996], [466.0, 3.0], [465.0, 1.5], [464.0, 2.5], [492.0, 2.6], [495.0, 4.25], [494.0, 2.8333333333333335], [493.0, 2.166666666666667], [490.0, 2.5], [488.0, 3.0], [487.0, 2.5], [485.0, 2.0], [484.0, 3.2727272727272725], [483.0, 4.0], [482.0, 15.974358974358976], [500.0, 11.987500000000002], [499.0, 3.0], [498.0, 4.8125], [497.0, 2.666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[474.22400000000005, 8.590000000000002]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 50.54800000000003]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[500.0, 50.54800000000003]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[363.0, 4.666666666666667], [378.0, 4.333333333333333], [377.0, 2.0], [373.0, 3.0], [372.0, 12.0], [369.0, 5.0], [398.0, 5.0], [397.0, 4.0], [395.0, 5.0], [392.0, 3.6666666666666665], [389.0, 4.0], [415.0, 4.0], [405.0, 3.0], [430.0, 79.0], [422.0, 3.0], [420.0, 3.0], [419.0, 3.0], [418.0, 2.0], [417.0, 4.0], [445.0, 40.0], [443.0, 3.2], [442.0, 4.0], [440.0, 8.0], [438.0, 6.0], [437.0, 4.0], [461.0, 3.0], [460.0, 4.333333333333333], [458.0, 3.0], [455.0, 4.0], [454.0, 4.0], [450.0, 2.6666666666666665], [479.0, 3.0], [478.0, 2.5], [471.0, 7.0], [469.0, 2.0], [468.0, 3.1666666666666665], [466.0, 2.3333333333333335], [465.0, 2.7499999999999996], [464.0, 2.6666666666666665], [495.0, 2.666666666666667], [494.0, 3.3333333333333335], [493.0, 2.5], [492.0, 3.0], [486.0, 4.0], [482.0, 13.0], [500.0, 12.652439024390246], [499.0, 3.1333333333333333], [498.0, 6.549019607843137], [497.0, 2.8181818181818175]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[489.29400000000015, 10.204]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[312.0, 169.0], [314.0, 31.0], [315.0, 120.8], [316.0, 77.0], [318.0, 36.0], [325.0, 18.0], [326.0, 85.16666666666667], [327.0, 89.0], [328.0, 110.75], [347.0, 22.0], [349.0, 202.90625000000006], [350.0, 523.816091954023], [351.0, 533.0], [382.0, 14.5], [383.0, 37.5], [384.0, 101.58974358974359], [385.0, 178.33333333333334], [386.0, 186.75], [397.0, 761.7272727272727], [398.0, 305.4166666666667], [399.0, 570.6666666666666], [403.0, 1363.0], [401.0, 1143.5454545454545], [400.0, 1138.0], [402.0, 2143.0], [405.0, 1007.5], [407.0, 1058.0], [408.0, 843.0], [414.0, 1187.0], [412.0, 1677.0], [413.0, 2005.0], [409.0, 984.5], [410.0, 1197.857142857143], [411.0, 1347.2307692307693], [416.0, 1121.0], [418.0, 357.9166666666667], [421.0, 71.0], [422.0, 1169.7999999999997], [424.0, 110.2], [423.0, 158.0], [449.0, 6.0], [450.0, 57.333333333333336], [459.0, 31.0], [470.0, 4.0], [473.0, 482.0], [476.0, 8.666666666666668], [480.0, 46.0], [482.0, 3.0], [483.0, 4.0], [486.0, 21.0], [491.0, 7.0], [500.0, 11.958333333333334]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[402.75400000000013, 388.0119999999999]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 133.53]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[500.0, 133.53]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 50.80400000000002]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[500.0, 50.80400000000002]], "isOverall": false, "label": "jsURLs9_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 34.85199999999999]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[500.0, 34.85199999999999]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 24.384]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[500.0, 24.384]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 17.299999999999983]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[500.0, 17.299999999999983]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 57.44600000000002]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[500.0, 57.44600000000002]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[495.0, 5.333333333333333], [494.0, 3.0], [500.0, 12.263269639065818], [499.0, 3.2], [498.0, 6.25], [497.0, 3.9999999999999996]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[499.8119999999999, 11.816000000000006]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 28.03199999999999]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[500.0, 28.03199999999999]], "isOverall": false, "label": "jsURLs1_logiqids_Login-Aggregated", "isController": false}, {"data": [[59.0, 6.333333333333333], [65.0, 2.0], [64.0, 20.25], [71.0, 3.0], [70.0, 3.3333333333333335], [69.0, 3.0], [75.0, 3.5], [73.0, 3.0], [72.0, 3.3333333333333335], [83.0, 3.0], [82.0, 3.5], [81.0, 3.0], [87.0, 3.0], [86.0, 3.166666666666667], [89.0, 2.0], [88.0, 9.0], [95.0, 2.6666666666666665], [99.0, 2.3333333333333335], [97.0, 2.5], [102.0, 2.6666666666666665], [101.0, 3.0], [100.0, 3.0], [107.0, 3.0], [105.0, 3.0], [108.0, 2.0], [112.0, 2.0], [121.0, 2.0], [120.0, 3.0], [143.0, 2.0], [141.0, 2.0], [137.0, 2.0], [144.0, 1.5], [156.0, 2.0], [155.0, 2.0], [163.0, 2.5], [162.0, 29.0], [172.0, 2.0], [171.0, 3.0], [177.0, 3.0], [176.0, 3.0], [206.0, 3.0], [211.0, 3.0], [210.0, 3.3333333333333335], [220.0, 4.0], [228.0, 3.0], [225.0, 2.0], [224.0, 2.0], [237.0, 3.0], [235.0, 2.5], [234.0, 2.5], [247.0, 1.0], [243.0, 2.0], [240.0, 3.0], [253.0, 4.0], [252.0, 2.0], [249.0, 2.0], [270.0, 4.0], [268.0, 4.0], [267.0, 2.0], [265.0, 2.0], [263.0, 4.285714285714286], [262.0, 3.0], [260.0, 5.5], [258.0, 7.0], [280.0, 4.0], [286.0, 3.0], [283.0, 5.0], [282.0, 2.5], [281.0, 3.0], [279.0, 3.0], [278.0, 3.0], [276.0, 2.5], [275.0, 3.0], [274.0, 4.0], [273.0, 4.625], [303.0, 3.0], [302.0, 4.25], [300.0, 10.0], [299.0, 2.2500000000000004], [295.0, 2.0], [294.0, 2.875], [318.0, 6.0], [311.0, 2.0], [309.0, 2.0], [306.0, 13.5], [305.0, 4.0], [304.0, 3.0], [335.0, 3.0], [332.0, 3.0], [330.0, 1.0], [326.0, 3.0], [324.0, 5.0], [350.0, 2.25], [351.0, 3.0], [349.0, 2.5], [348.0, 3.0], [346.0, 3.0], [345.0, 3.0], [343.0, 6.0], [337.0, 2.0], [336.0, 2.6], [363.0, 2.5], [362.0, 3.0], [361.0, 2.5], [360.0, 2.0], [359.0, 3.0], [357.0, 3.3333333333333335], [356.0, 3.0], [352.0, 2.25], [378.0, 2.25], [377.0, 3.6666666666666665], [376.0, 6.0], [375.0, 2.0], [372.0, 10.5], [370.0, 3.0], [369.0, 4.333333333333333], [396.0, 5.0], [399.0, 2.0], [398.0, 2.6666666666666665], [397.0, 2.0], [392.0, 2.0], [391.0, 2.0], [389.0, 2.0], [387.0, 3.0], [386.0, 3.0], [385.0, 2.5], [402.0, 3.5], [413.0, 2.5], [412.0, 4.0], [410.0, 4.333333333333333], [408.0, 2.5], [406.0, 3.0], [405.0, 4.833333333333333], [401.0, 3.4444444444444446], [400.0, 2.5], [431.0, 2.0], [430.0, 2.0], [418.0, 2.0], [417.0, 2.3333333333333335], [447.0, 42.857142857142854], [445.0, 31.666666666666668], [444.0, 3.6666666666666665], [443.0, 2.8666666666666667], [437.0, 3.0], [435.0, 2.6666666666666665], [432.0, 74.0], [463.0, 3.0], [461.0, 2.0], [460.0, 4.0], [458.0, 2.0], [455.0, 4.0], [454.0, 3.0], [453.0, 3.0], [450.0, 2.8749999999999996], [467.0, 3.3333333333333335], [478.0, 3.0], [479.0, 3.0], [477.0, 3.0], [475.0, 4.0], [472.0, 2.0], [471.0, 2.6], [468.0, 3.8823529411764706], [466.0, 3.6666666666666665], [465.0, 2.857142857142857], [492.0, 3.2727272727272725], [495.0, 3.8333333333333335], [494.0, 8.0], [493.0, 2.3333333333333335], [491.0, 3.0], [490.0, 4.333333333333333], [487.0, 4.0], [486.0, 1.0], [484.0, 5.2], [482.0, 33.125], [480.0, 3.0], [500.0, 3.444444444444444], [499.0, 2.5], [498.0, 3.7142857142857144], [497.0, 3.4]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[351.7120000000003, 5.021999999999995]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 34.995999999999974]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[500.0, 34.995999999999974]], "isOverall": false, "label": "cssURL3_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 41.64399999999999]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[500.0, 41.64399999999999]], "isOverall": false, "label": "jsURLs11_logiqids_Login-Aggregated", "isController": false}, {"data": [[306.0, 42.1], [307.0, 133.28571428571428], [308.0, 80.83333333333334], [311.0, 55.0], [312.0, 9.153846153846159], [314.0, 39.50000000000001], [315.0, 8.444444444444445], [316.0, 26.0], [318.0, 26.242424242424246], [319.0, 39.75], [322.0, 12.333333333333334], [325.0, 7.2857142857142865], [326.0, 16.39130434782609], [350.0, 30.818181818181817], [349.0, 17.952380952380953], [351.0, 49.0], [397.0, 168.73076923076923], [398.0, 48.72727272727273], [399.0, 405.5], [403.0, 1426.5], [401.0, 385.21428571428567], [400.0, 508.2857142857143], [402.0, 1113.111111111111], [404.0, 2116.1666666666665], [405.0, 715.0], [411.0, 2674.0], [414.0, 424.0], [415.0, 492.0], [412.0, 360.66666666666663], [413.0, 73.33333333333333], [416.0, 313.42857142857144], [418.0, 465.0], [421.0, 3.5], [422.0, 722.5555555555555], [423.0, 8.333333333333334], [432.0, 3.0], [449.0, 3.0], [450.0, 39.5], [459.0, 10.0], [460.0, 3.0], [466.0, 9.0], [468.0, 91.0], [473.0, 133.0], [476.0, 27.0], [480.0, 80.0], [482.0, 3.5], [491.0, 4.5], [500.0, 7.047619047619051]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[384.32, 145.3160000000002]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[404.0, 2458.0], [405.0, 237.0], [407.0, 98.0], [409.0, 241.75], [410.0, 206.0], [411.0, 681.0], [412.0, 54.0], [413.0, 145.85714285714286], [414.0, 372.5], [415.0, 221.0], [416.0, 368.16666666666674], [417.0, 469.0], [418.0, 305.77142857142854], [420.0, 552.5], [421.0, 80.9], [422.0, 328.80232558139534], [423.0, 28.58620689655173], [424.0, 97.8], [432.0, 3.4545454545454546], [433.0, 8.0], [435.0, 54.0], [438.0, 59.0], [444.0, 4.0], [447.0, 5.8], [448.0, 3.0], [449.0, 3.0], [450.0, 46.0], [459.0, 10.0], [461.0, 7.0], [462.0, 7.0], [471.0, 2.0], [472.0, 303.0], [473.0, 232.77777777777777], [475.0, 3.0], [476.0, 16.0], [479.0, 2.0], [482.0, 3.4666666666666663], [480.0, 13.357142857142858], [483.0, 2.0], [485.0, 3.5], [486.0, 3.0], [490.0, 3.0], [491.0, 2.4], [493.0, 2.4], [495.0, 3.0], [500.0, 10.257894736842111]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[460.53600000000006, 122.46800000000005]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 35.713999999999984]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[500.0, 35.713999999999984]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 10.978000000000002]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[500.0, 10.978000000000002]], "isOverall": false, "label": "jsURLs16_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 28.368000000000006]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[500.0, 28.368000000000006]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 339.8219999999999]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[500.0, 339.8219999999999]], "isOverall": false, "label": "jsURLs4_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 12.745833333333346], [499.0, 3.0], [498.0, 7.7142857142857135]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[499.9319999999999, 12.48800000000001]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[79.0, 3.0], [83.0, 4.333333333333333], [82.0, 3.3333333333333335], [81.0, 2.727272727272727], [80.0, 4.0], [90.0, 2.0], [99.0, 2.25], [98.0, 4.0], [96.0, 3.0], [103.0, 3.0], [101.0, 2.0], [106.0, 3.0], [105.0, 3.0], [104.0, 3.0], [108.0, 2.5], [113.0, 3.0], [119.0, 2.0], [121.0, 2.0], [125.0, 2.0], [130.0, 2.0], [143.0, 2.0], [144.0, 3.0], [158.0, 2.0], [156.0, 2.0], [155.0, 3.0], [165.0, 2.0], [164.0, 3.0], [162.0, 16.5], [160.0, 15.0], [175.0, 3.0], [174.0, 3.3333333333333335], [172.0, 2.0], [171.0, 3.0], [170.0, 1.0], [176.0, 2.6], [191.0, 1.5], [184.0, 2.0], [195.0, 2.0], [194.0, 2.0], [193.0, 2.0], [205.0, 2.0], [202.0, 3.0], [212.0, 2.0], [210.0, 2.0], [223.0, 2.0], [222.0, 2.0], [217.0, 5.0], [226.0, 2.0], [225.0, 2.0], [252.0, 5.0], [249.0, 2.0], [270.0, 2.0], [267.0, 3.0], [263.0, 2.0], [258.0, 2.0], [257.0, 3.0], [286.0, 2.0], [282.0, 3.5], [276.0, 2.0], [303.0, 2.0], [299.0, 2.0], [297.0, 2.0], [296.0, 2.0], [294.0, 2.5], [318.0, 8.0], [316.0, 3.0], [315.0, 2.0], [314.0, 2.0], [312.0, 2.0], [309.0, 15.333333333333332], [307.0, 32.0], [306.0, 6.833333333333333], [305.0, 2.0], [323.0, 4.0], [334.0, 3.0], [335.0, 4.75], [332.0, 3.0], [330.0, 2.0], [329.0, 2.0], [327.0, 2.5], [324.0, 6.0], [322.0, 6.0], [321.0, 5.0], [320.0, 3.0], [351.0, 2.0], [350.0, 3.0], [349.0, 2.6666666666666665], [345.0, 2.5], [344.0, 3.0], [338.0, 1.0], [337.0, 1.0], [336.0, 1.5], [365.0, 3.3333333333333335], [363.0, 4.0], [362.0, 2.0], [360.0, 2.0], [359.0, 2.0], [356.0, 2.25], [355.0, 4.0], [353.0, 9.0], [352.0, 2.5], [381.0, 2.0], [378.0, 2.4], [377.0, 5.0], [376.0, 4.0], [374.0, 5.0], [373.0, 10.5], [370.0, 6.0], [369.0, 3.0], [399.0, 2.0], [392.0, 2.5], [389.0, 2.0], [387.0, 2.0], [386.0, 2.5], [385.0, 7.0], [403.0, 5.0], [415.0, 2.5], [413.0, 2.0], [410.0, 4.0], [408.0, 2.5], [406.0, 2.0], [405.0, 3.25], [402.0, 4.5], [401.0, 2.285714285714286], [400.0, 2.1428571428571432], [430.0, 73.0], [427.0, 25.0], [418.0, 3.3333333333333335], [417.0, 2.333333333333333], [447.0, 36.42857142857142], [445.0, 3.0], [443.0, 3.181818181818182], [441.0, 2.0], [438.0, 3.0], [437.0, 2.0], [435.0, 2.0], [432.0, 45.66666666666667], [461.0, 2.0], [460.0, 2.0], [454.0, 2.5], [453.0, 3.0], [450.0, 2.454545454545455], [449.0, 2.0], [467.0, 2.0], [479.0, 3.5], [478.0, 1.0], [475.0, 3.0], [472.0, 4.0], [471.0, 2.0], [468.0, 2.842105263157895], [466.0, 3.0], [465.0, 2.4000000000000004], [464.0, 2.2], [492.0, 2.4], [495.0, 2.7], [494.0, 13.0], [493.0, 2.0], [491.0, 3.0], [487.0, 2.0], [486.0, 2.5], [485.0, 2.142857142857143], [484.0, 3.8], [483.0, 3.5], [482.0, 17.999999999999996], [500.0, 17.611111111111107], [499.0, 2.9], [498.0, 6.230769230769231], [497.0, 2.571428571428571]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[381.14399999999955, 5.726000000000003]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 43.930000000000035]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[500.0, 43.930000000000035]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 18.858000000000025]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[500.0, 18.858000000000025]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 63.139999999999986]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[500.0, 63.139999999999986]], "isOverall": false, "label": "jsURLs2_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 46.664000000000044]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[500.0, 46.664000000000044]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 31.404]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[500.0, 31.404]], "isOverall": false, "label": "cssURL2_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 16.557999999999993]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[500.0, 16.557999999999993]], "isOverall": false, "label": "jsURLs15_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 17.232]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[500.0, 17.232]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 38.3]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[500.0, 38.3]], "isOverall": false, "label": "cssURL1_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 58.60800000000005]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[500.0, 58.60800000000005]], "isOverall": false, "label": "jsURLs3_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 69.776]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[500.0, 69.776]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 30.61000000000004]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[500.0, 30.61000000000004]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 44.954000000000036]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[500.0, 44.954000000000036]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[500.0, 24.599999999999998]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[500.0, 24.599999999999998]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[447.0, 34.75], [446.0, 59.0], [443.0, 4.333333333333333], [461.0, 4.0], [460.0, 3.0], [459.0, 2.0], [458.0, 3.0], [454.0, 3.0], [453.0, 3.3333333333333335], [450.0, 2.0], [479.0, 2.0], [475.0, 2.0], [474.0, 5.0], [472.0, 2.0], [471.0, 2.5], [468.0, 2.0], [464.0, 2.0], [495.0, 3.0], [494.0, 4.7272727272727275], [493.0, 2.3333333333333335], [492.0, 2.75], [490.0, 3.0], [487.0, 4.0], [485.0, 2.5], [484.0, 5.0], [482.0, 12.0], [500.0, 13.036231884057973], [499.0, 2.75], [498.0, 2.1666666666666665], [497.0, 2.4285714285714284]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[496.67, 11.892000000000003]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 37.534000000000034]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[500.0, 37.534000000000034]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[397.0, 25.0], [413.0, 576.625], [402.0, 519.5], [403.0, 1192.0], [404.0, 835.0000000000001], [405.0, 757.25], [407.0, 758.0], [408.0, 699.0], [409.0, 448.00000000000006], [410.0, 487.5833333333333], [411.0, 1331.142857142857], [414.0, 614.7777777777778], [415.0, 940.5], [417.0, 994.0], [416.0, 527.5454545454546], [418.0, 589.4558823529411], [420.0, 903.0], [421.0, 902.9], [422.0, 559.0714285714289], [423.0, 30.75], [424.0, 175.0], [427.0, 3.0], [432.0, 6.0], [433.0, 23.0], [434.0, 2.0], [447.0, 5.0], [448.0, 4.0], [449.0, 3.0], [450.0, 39.933333333333316], [459.0, 9.0], [460.0, 3.0], [461.0, 10.0], [462.0, 8.0], [467.0, 83.75], [468.0, 90.2], [469.0, 39.4], [470.0, 2.0], [472.0, 329.0], [473.0, 237.74358974358978], [475.0, 3.0], [480.0, 16.2], [482.0, 2.0], [491.0, 2.0], [493.0, 2.0], [500.0, 6.194244604316544]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[450.6279999999999, 324.7720000000004]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 27.517999999999986]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[500.0, 27.517999999999986]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[422.0, 6.0], [432.0, 2.0], [447.0, 4.0], [450.0, 45.666666666666664], [459.0, 9.0], [461.0, 9.0], [472.0, 361.0], [473.0, 325.66666666666663], [475.0, 2.0], [476.0, 24.0], [479.0, 5.5], [480.0, 33.6], [482.0, 3.2], [485.0, 4.333333333333333], [486.0, 2.0], [495.0, 3.0], [500.0, 11.819354838709675]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[498.0660000000002, 14.555999999999997]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 16.668]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[500.0, 16.668]], "isOverall": false, "label": "jsURLs14_logiqids_Login-Aggregated", "isController": false}, {"data": [[179.0, 7792.215517241377], [180.0, 8101.293103448275], [182.0, 522.0], [184.0, 149.0], [216.0, 45.0], [242.0, 58.0], [247.0, 679.4545454545455], [248.0, 780.7857142857143], [249.0, 371.0], [306.0, 61.0], [308.0, 534.6666666666666], [309.0, 401.0], [311.0, 395.7142857142857], [312.0, 363.8387096774193], [314.0, 385.1666666666667], [315.0, 394.42857142857144], [322.0, 39.0], [329.0, 132.0], [342.0, 44.0], [345.0, 33.5], [350.0, 632.25], [349.0, 482.0], [351.0, 591.7407407407406], [352.0, 262.5], [353.0, 202.5], [383.0, 65.0], [398.0, 979.8], [397.0, 532.8749999999999], [399.0, 2088.0], [400.0, 2097.8571428571427], [402.0, 3347.0], [404.0, 3652.6666666666665], [405.0, 3062.0], [407.0, 4726.0], [409.0, 4980.0], [410.0, 1085.0], [411.0, 1676.5], [412.0, 961.0], [413.0, 522.3333333333334], [416.0, 6460.5], [418.0, 5562.0], [420.0, 272.0], [421.0, 598.25], [422.0, 1476.8333333333335], [423.0, 662.0], [424.0, 652.0], [452.0, 79.0], [469.0, 113.0], [470.0, 24.0], [471.0, 19.0], [473.0, 256.8333333333333], [475.0, 98.5], [476.0, 95.44444444444443], [481.0, 75.25], [480.0, 149.0], [482.0, 84.2], [485.0, 54.5], [486.0, 74.0], [487.0, 52.5], [488.0, 65.66666666666667], [493.0, 27.0], [494.0, 19.0], [496.0, 70.5], [497.0, 24.0], [500.0, 48.14285714285714]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[300.5860000000002, 3205.599999999998]], "isOverall": false, "label": "logiqids_HOME-Aggregated", "isController": false}, {"data": [[500.0, 24.38599999999998]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[500.0, 24.38599999999998]], "isOverall": false, "label": "jsURLs13_logiqids_Login-Aggregated", "isController": false}, {"data": [[500.0, 28.004000000000005]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[500.0, 28.004000000000005]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[35.0, 4.5], [36.0, 6.0], [39.0, 4.0], [38.0, 4.0], [41.0, 3.0], [42.0, 4.666666666666667], [44.0, 4.5], [47.0, 3.0], [46.0, 4.0], [49.0, 4.0], [64.0, 2.0], [71.0, 4.0], [70.0, 2.0], [75.0, 2.0], [72.0, 2.75], [79.0, 3.0], [77.0, 4.0], [76.0, 3.0], [83.0, 3.0], [82.0, 4.0], [81.0, 2.857142857142857], [87.0, 2.5], [86.0, 3.142857142857143], [90.0, 2.0], [89.0, 2.8], [95.0, 3.0], [94.0, 2.6666666666666665], [99.0, 2.0], [98.0, 3.0], [97.0, 3.0], [102.0, 2.0], [100.0, 2.5], [106.0, 2.0], [115.0, 2.0], [116.0, 2.0], [121.0, 2.0], [156.0, 2.0], [166.0, 4.0], [162.0, 32.0], [174.0, 3.0], [169.0, 3.0], [182.0, 2.0], [176.0, 7.5], [191.0, 3.0], [189.0, 5.5], [186.0, 3.0], [198.0, 4.0], [196.0, 4.0], [194.0, 3.0], [205.0, 2.0], [204.0, 2.0], [214.0, 3.0], [213.0, 3.0], [212.0, 3.0], [210.0, 5.5], [223.0, 2.0], [222.0, 2.5], [221.0, 3.3333333333333335], [219.0, 7.5], [218.0, 18.5], [217.0, 9.0], [230.0, 2.0], [228.0, 2.7499999999999996], [227.0, 3.0], [226.0, 3.0], [225.0, 2.6666666666666665], [224.0, 3.0], [239.0, 3.4], [238.0, 2.0], [237.0, 4.0], [235.0, 3.0], [234.0, 2.6], [233.0, 4.0], [246.0, 3.0], [244.0, 5.0], [243.0, 2.6666666666666665], [240.0, 2.5], [254.0, 2.0], [253.0, 3.0], [252.0, 2.4], [251.0, 2.0], [249.0, 3.0], [270.0, 7.0], [263.0, 4.333333333333333], [262.0, 3.0], [258.0, 6.0], [257.0, 2.75], [286.0, 2.0], [283.0, 6.5], [282.0, 4.4], [281.0, 2.0], [279.0, 3.0], [276.0, 3.0], [274.0, 3.0], [273.0, 4.0], [302.0, 2.5], [299.0, 3.4], [296.0, 2.0], [295.0, 3.2], [294.0, 3.75], [292.0, 3.0], [318.0, 8.0], [316.0, 2.5], [315.0, 3.0], [309.0, 2.0], [306.0, 11.000000000000002], [305.0, 3.0], [335.0, 5.0], [334.0, 5.0], [332.0, 4.5], [323.0, 3.0], [351.0, 2.5], [350.0, 2.4], [349.0, 2.0], [348.0, 4.0], [346.0, 3.5], [345.0, 3.0], [339.0, 3.0], [337.0, 2.0], [363.0, 3.0], [362.0, 2.5], [360.0, 3.0], [358.0, 2.0], [356.0, 2.714285714285714], [355.0, 3.5], [352.0, 2.0], [376.0, 5.0], [379.0, 4.0], [378.0, 3.5], [377.0, 2.75], [373.0, 2.0], [372.0, 15.0], [370.0, 6.0], [369.0, 3.0], [368.0, 4.0], [398.0, 3.0], [397.0, 2.5], [389.0, 2.0], [387.0, 4.0], [403.0, 5.0], [415.0, 3.0], [413.0, 3.375], [408.0, 3.0], [406.0, 3.0], [405.0, 4.777777777777778], [404.0, 10.0], [402.0, 5.75], [401.0, 2.916666666666667], [400.0, 2.75], [429.0, 77.0], [428.0, 20.5], [422.0, 4.0], [418.0, 5.0], [417.0, 2.0], [447.0, 14.571428571428573], [445.0, 46.0], [444.0, 3.5], [443.0, 2.6666666666666665], [442.0, 4.0], [440.0, 7.0], [438.0, 6.0], [461.0, 3.0], [460.0, 2.6666666666666665], [459.0, 2.0], [455.0, 2.0], [454.0, 2.857142857142857], [453.0, 2.6666666666666665], [450.0, 2.0], [449.0, 4.0], [478.0, 2.6666666666666665], [479.0, 2.5], [477.0, 3.0], [475.0, 3.0], [474.0, 2.5], [472.0, 3.0], [471.0, 2.0], [468.0, 4.333333333333333], [466.0, 3.25], [465.0, 2.0], [464.0, 2.3333333333333335], [494.0, 4.0], [495.0, 4.0], [493.0, 2.0], [492.0, 3.0], [491.0, 3.0], [490.0, 2.0], [489.0, 2.0], [487.0, 2.3333333333333335], [485.0, 3.0], [484.0, 4.5], [482.0, 10.666666666666668], [480.0, 3.5], [500.0, 3.0], [499.0, 3.0], [498.0, 4.4], [497.0, 3.5000000000000004]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[319.9300000000002, 4.513999999999995]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[415.0, 3.3333333333333335], [413.0, 2.0], [408.0, 2.5], [405.0, 5.0], [402.0, 5.5], [401.0, 3.0], [429.0, 77.0], [427.0, 3.0], [423.0, 2.0], [422.0, 3.0], [420.0, 3.0], [418.0, 3.0], [447.0, 64.0], [432.0, 68.0], [459.0, 2.0], [458.0, 2.0], [457.0, 2.0], [454.0, 2.5], [453.0, 3.0], [467.0, 5.0], [479.0, 2.0], [478.0, 2.6666666666666665], [474.0, 5.0], [472.0, 3.0], [471.0, 3.0], [469.0, 2.0], [468.0, 2.3333333333333335], [466.0, 2.0], [465.0, 2.857142857142857], [464.0, 2.5], [494.0, 6.4], [493.0, 2.0], [492.0, 2.3333333333333335], [486.0, 2.0], [485.0, 1.0], [484.0, 3.8], [482.0, 9.2], [500.0, 12.47979797979798], [499.0, 2.8], [498.0, 4.9230769230769225], [497.0, 2.2]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[493.51799999999986, 11.161999999999994]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[500.0, 53.34199999999996]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}, {"data": [[500.0, 53.34199999999996]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 500.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 33718.8, "minX": 1.69408512E12, "maxY": 1.1167665605E8, "series": [{"data": [[1.69408524E12, 3486219.35], [1.69408518E12, 1.1167665605E8], [1.69408512E12, 3.0655936633333333E7]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69408524E12, 33718.8], [1.69408518E12, 130490.11666666667], [1.69408512E12, 47066.083333333336]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408524E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.69408512E12, "maxY": 3205.599999999998, "series": [{"data": [[1.69408512E12, 35.546]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 20.134000000000004]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 14.705999999999996]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 7.98543689320388], [1.69408518E12, 11.982993197278915]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 8.97802197802197], [1.69408518E12, 8.266666666666666]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 193.83199999999997]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 3.7999999999999945]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 69.918]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 2135.6708074534167], [1.69408512E12, 1683.6685393258433]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 25.17000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 38.23000000000002]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 8.61190965092402], [1.69408518E12, 5.6923076923076925]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 2798.654]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 23.96800000000001]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 143.70000000000002], [1.69408512E12, 23.92826086956521]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 3.791999999999998]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 34.310000000000045]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 50.0849673202615], [1.69408512E12, 128.3414634146341]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 35.226000000000035]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 6.1944444444444455], [1.69408518E12, 11.967289719626164]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 379.08600000000007]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 9.904661016949161], [1.69408518E12, 6.785714285714284]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 147.5625], [1.69408512E12, 24.98553719008264]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 30.555999999999983]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 66.9790697674419], [1.69408512E12, 99.55714285714284]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 51.44040404040407], [1.69408512E12, 360.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 430.23799999999994]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 42.431999999999995]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 5.362173038229372], [1.69408518E12, 9.666666666666666]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 17.586000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 400.9179999999994]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 4.019108280254778], [1.69408518E12, 10.002915451895035]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 29.192000000000018]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 30.267999999999994]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 42.30999999999995]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 17.887999999999995]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 9.415816326530619], [1.69408518E12, 10.166666666666664]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 59.412000000000006]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 114.62005277044868], [1.69408512E12, 141.05785123966942]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 726.3880000000004]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 14.381999999999987]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 22.67600000000004]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 96.52799999999996]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 8.349282296650712], [1.69408518E12, 9.817073170731707]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 50.54800000000003]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 10.253561253561259], [1.69408518E12, 10.08724832214765]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 388.0119999999999]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 133.53]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 49.24579831932773], [1.69408512E12, 81.70833333333334]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 34.85199999999999]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 24.384]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 3.3749999999999996], [1.69408518E12, 18.00210084033612]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 57.44600000000002]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 9.070707070707071], [1.69408518E12, 12.493765586034913]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 77.23232323232322], [1.69408512E12, 15.885286783042394]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 5.021999999999995]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 92.09195402298852], [1.69408512E12, 22.9685230024213]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 41.69739478957912], [1.69408512E12, 15.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 145.3160000000002]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 122.46800000000005]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 35.713999999999984]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 10.978000000000002]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 28.368000000000006]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 369.31333333333333], [1.69408512E12, 327.182857142857]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 7.01219512195122], [1.69408518E12, 13.562200956937808]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 5.731462925851703], [1.69408518E12, 3.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 43.930000000000035]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 4.571428571428573], [1.69408518E12, 19.269547325102902]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 83.08333333333334], [1.69408512E12, 57.6454081632653]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 46.664000000000044]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 118.76543209876542], [1.69408512E12, 14.51551312649165]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 16.557999999999993]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 25.340909090909086], [1.69408518E12, 16.449561403508763]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 165.61194029850748], [1.69408512E12, 18.600461893764432]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 80.7096774193548], [1.69408512E12, 51.31914893617025]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 69.776]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 30.61000000000004]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 44.954000000000036]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 24.599999999999998]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 13.24], [1.69408518E12, 10.543999999999999]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 37.534000000000034]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 324.7720000000004]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 27.517999999999986]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 14.555999999999997]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 16.668]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 3205.599999999998]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 24.38599999999998]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 28.004000000000005]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 4.513999999999995]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 13.214046822742478], [1.69408518E12, 8.109452736318408]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 53.34199999999996]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408524E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 2.5, "minX": 1.69408512E12, "maxY": 3123.0280000000016, "series": [{"data": [[1.69408512E12, 35.448]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 19.477999999999998]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 14.699999999999998]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 7.932038834951455], [1.69408518E12, 11.70068027210885]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 8.738461538461534], [1.69408518E12, 8.06666666666667]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 125.97199999999998]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 3.7640000000000007]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 22.19199999999998]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 114.08695652173905], [1.69408512E12, 46.168539325842715]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 25.166000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 38.216000000000015]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 7.215605749486653], [1.69408518E12, 4.384615384615384]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 417.412]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 20.695999999999987]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 143.70000000000002], [1.69408512E12, 23.880434782608685]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 3.791999999999998]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 34.22200000000004]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 50.08278867102398], [1.69408512E12, 127.56097560975606]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 35.220000000000056]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 6.1944444444444455], [1.69408518E12, 11.962616822429908]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 156.45199999999997]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 9.896186440677965], [1.69408518E12, 6.7142857142857135]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 147.5625], [1.69408512E12, 24.975206611570254]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 30.40200000000002]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 66.68604651162785], [1.69408512E12, 98.87142857142857]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 48.95151515151516], [1.69408512E12, 347.4]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 217.3960000000001]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 41.73400000000005]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 5.321931589537218], [1.69408518E12, 9.333333333333334]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 16.69599999999999]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 22.27399999999998]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 4.006369426751594], [1.69408518E12, 9.997084548104965]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 29.192000000000018]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 30.25999999999999]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 31.340000000000018]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 17.880000000000006]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 9.410714285714285], [1.69408518E12, 10.166666666666664]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 59.40600000000008]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 90.21108179419531], [1.69408512E12, 97.0909090909091]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 40.197999999999986]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 14.330000000000009]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 22.672000000000008]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 74.97399999999998]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 8.100478468899516], [1.69408518E12, 9.573170731707318]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 50.53400000000001]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 9.717948717948717], [1.69408518E12, 9.583892617449669]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 121.64199999999983]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 32.159999999999954]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 48.983193277310924], [1.69408512E12, 81.66666666666664]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 34.74600000000001]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 24.378000000000004]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 2.5], [1.69408518E12, 17.069327731092432]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 57.44200000000001]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 8.838383838383837], [1.69408518E12, 12.261845386533667]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 77.2222222222222], [1.69408512E12, 15.870324189526182]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 4.545999999999997]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 92.09195402298852], [1.69408512E12, 22.9588377723971]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 41.691382765531095], [1.69408512E12, 15.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 143.1940000000001]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 117.44199999999992]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 29.49599999999999]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 10.947999999999999]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 23.974]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 83.38], [1.69408512E12, 68.51142857142854]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 7.01219512195122], [1.69408518E12, 13.557416267942576]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 5.717434869739485], [1.69408518E12, 3.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 43.92400000000002]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 2.7857142857142856], [1.69408518E12, 15.557613168724279]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 60.58333333333334], [1.69408512E12, 42.40816326530613]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 46.65399999999996]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 118.46913580246914], [1.69408512E12, 14.434367541766111]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 16.54599999999999]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 25.340909090909086], [1.69408518E12, 16.432017543859647]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 144.26865671641792], [1.69408512E12, 17.260969976905315]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 65.52419354838707], [1.69408512E12, 44.178191489361716]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 56.734000000000044]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 23.148000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 43.381999999999984]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 24.155999999999988]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 13.236000000000002], [1.69408518E12, 10.515999999999991]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 37.422]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 236.42799999999986]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 27.51400000000002]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 14.430000000000014]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 16.605999999999995]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 3123.0280000000016]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 23.941999999999982]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 26.920000000000016]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 3.9239999999999986]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 13.204013377926435], [1.69408518E12, 8.099502487562184]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 53.33599999999997]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408524E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69408512E12, "maxY": 2979.406000000003, "series": [{"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 1.2120000000000009]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 0.132]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 0.11599999999999994]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 0.3399999999999999]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.7220000000000008]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 1.4360000000000013]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 1.4819999999999989]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 3.872]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 1.5020000000000018]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.9060000000000004]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.2940000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 1.3400000000000007]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.8079999999999995]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 1.9600000000000006]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 0.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 1.8480000000000003]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.4339999999999995]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.9000000000000005]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.6739999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 4.451999999999998]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.47400000000000025]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.0], [1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 8.074000000000003]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.20800000000000005]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.009999999999999998]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 0.12400000000000017]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69408512E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 0.6440000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69408512E12, 2979.406000000003]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69408518E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 0.07199999999999998]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69408524E12, 0.0], [1.69408518E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69408518E12, 0.5620000000000004]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408524E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.69408512E12, "maxY": 11747.0, "series": [{"data": [[1.69408524E12, 272.0], [1.69408518E12, 7871.0], [1.69408512E12, 11747.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69408524E12, 8.0], [1.69408518E12, 122.0], [1.69408512E12, 801.2000000000007]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69408524E12, 157.0], [1.69408518E12, 863.9600000000064], [1.69408512E12, 7991.809999999974]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69408524E12, 17.0], [1.69408518E12, 272.0], [1.69408512E12, 2084.4999999999927]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69408524E12, 1.0], [1.69408518E12, 1.0], [1.69408512E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69408524E12, 3.0], [1.69408518E12, 11.0], [1.69408512E12, 16.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408524E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 2.0, "minX": 17.0, "maxY": 8574.5, "series": [{"data": [[17.0, 3.0], [27.0, 3.0], [46.0, 3.0], [53.0, 2131.0], [54.0, 539.5], [60.0, 8574.5], [67.0, 628.0], [72.0, 3.0], [78.0, 943.0], [79.0, 1458.0], [83.0, 3.0], [94.0, 33.5], [97.0, 3.0], [112.0, 88.0], [120.0, 8228.5], [123.0, 687.0], [122.0, 1979.5], [143.0, 526.0], [160.0, 1332.0], [161.0, 2.0], [179.0, 304.0], [181.0, 749.0], [214.0, 45.5], [209.0, 3.0], [220.0, 375.0], [228.0, 263.5], [242.0, 273.0], [254.0, 213.5], [251.0, 3.0], [256.0, 39.0], [278.0, 101.5], [299.0, 5.0], [292.0, 63.0], [303.0, 75.0], [314.0, 428.5], [319.0, 176.0], [325.0, 18.0], [346.0, 120.0], [336.0, 11.0], [353.0, 3.0], [368.0, 81.0], [383.0, 240.0], [369.0, 47.0], [382.0, 7.0], [392.0, 3.0], [423.0, 18.0], [417.0, 3.0], [438.0, 48.0], [433.0, 47.0], [458.0, 4.0], [454.0, 20.0], [462.0, 9.0], [456.0, 81.0], [455.0, 11.0], [457.0, 3.0], [468.0, 19.0], [466.0, 6.0], [478.0, 12.0], [476.0, 9.0], [477.0, 9.0], [465.0, 11.0], [475.0, 21.0], [474.0, 3.0], [495.0, 3.0], [490.0, 11.0], [494.0, 3.0], [492.0, 13.0], [491.0, 36.0], [484.0, 52.0], [482.0, 178.0], [487.0, 4.0], [489.0, 4.0], [488.0, 5.0], [496.0, 4.0], [500.0, 3.0], [498.0, 4.0], [499.0, 3.0], [497.0, 5.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 500.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 2.0, "minX": 17.0, "maxY": 8215.5, "series": [{"data": [[17.0, 3.0], [27.0, 3.0], [46.0, 3.0], [53.0, 148.0], [54.0, 12.5], [60.0, 8215.5], [67.0, 134.0], [72.0, 3.0], [78.0, 652.5], [79.0, 294.0], [83.0, 3.0], [94.0, 26.0], [97.0, 3.0], [112.0, 88.0], [120.0, 8044.0], [123.0, 424.0], [122.0, 555.5], [143.0, 69.0], [160.0, 464.0], [161.0, 2.0], [179.0, 40.0], [181.0, 500.0], [214.0, 11.5], [209.0, 2.0], [220.0, 179.0], [228.0, 96.5], [242.0, 30.0], [254.0, 127.5], [251.0, 2.0], [256.0, 27.0], [278.0, 82.0], [299.0, 4.0], [292.0, 16.0], [303.0, 40.0], [314.0, 188.5], [319.0, 137.0], [325.0, 14.0], [346.0, 84.5], [336.0, 11.0], [353.0, 3.0], [368.0, 44.0], [383.0, 160.0], [369.0, 19.0], [382.0, 5.0], [392.0, 3.0], [423.0, 11.0], [417.0, 2.0], [438.0, 27.5], [433.0, 33.0], [458.0, 3.0], [454.0, 11.0], [462.0, 5.5], [456.0, 66.5], [455.0, 10.0], [457.0, 3.0], [468.0, 12.0], [466.0, 5.0], [478.0, 11.0], [476.0, 7.0], [477.0, 8.0], [465.0, 8.0], [475.0, 18.0], [474.0, 2.0], [495.0, 3.0], [490.0, 9.0], [494.0, 3.0], [492.0, 10.0], [491.0, 28.0], [484.0, 33.0], [482.0, 121.0], [487.0, 3.0], [489.0, 3.0], [488.0, 4.0], [496.0, 3.0], [500.0, 3.0], [498.0, 3.0], [499.0, 3.0], [497.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 500.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 113.63333333333334, "minX": 1.69408512E12, "maxY": 444.31666666666666, "series": [{"data": [[1.69408524E12, 113.63333333333334], [1.69408518E12, 444.31666666666666], [1.69408512E12, 200.38333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408524E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 113.63333333333334, "minX": 1.69408512E12, "maxY": 450.23333333333335, "series": [{"data": [[1.69408524E12, 113.63333333333334], [1.69408518E12, 450.23333333333335], [1.69408512E12, 194.46666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408524E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69408512E12, "maxY": 8.333333333333334, "series": [{"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs12_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408524E12, 0.23333333333333334], [1.69408518E12, 8.1]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "cssURL1_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 1.1166666666666667], [1.69408512E12, 7.216666666666667]], "isOverall": false, "label": "cssURL1_logiqids_Login-success", "isController": false}, {"data": [[1.69408524E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408524E12, 3.433333333333333], [1.69408518E12, 4.9]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408524E12, 0.4], [1.69408518E12, 7.933333333333334]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs15_logiqids_Login-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408524E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408524E12, 4.166666666666667], [1.69408518E12, 4.166666666666667]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 2.5], [1.69408512E12, 5.833333333333333]], "isOverall": false, "label": "jsURLs4_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs19_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 7.65], [1.69408512E12, 0.6833333333333333]], "isOverall": false, "label": "jsURLs8_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs13_logiqids_Login-success", "isController": false}, {"data": [[1.69408524E12, 4.983333333333333], [1.69408518E12, 3.35]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 0.6666666666666666], [1.69408512E12, 7.666666666666667]], "isOverall": false, "label": "logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-success", "isController": false}, {"data": [[1.69408524E12, 8.283333333333333], [1.69408518E12, 0.05]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs18_logiqids_Login-success", "isController": false}, {"data": [[1.69408524E12, 5.85], [1.69408518E12, 2.4833333333333334]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "cssURL2_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs14_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 2.066666666666667], [1.69408512E12, 6.266666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_Login-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 7.166666666666667], [1.69408512E12, 1.1666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_Login-success", "isController": false}, {"data": [[1.69408524E12, 8.316666666666666], [1.69408518E12, 0.016666666666666666]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 8.25], [1.69408512E12, 0.08333333333333333]], "isOverall": false, "label": "jsURLs10_logiqids_Login-success", "isController": false}, {"data": [[1.69408524E12, 7.866666666666666], [1.69408518E12, 0.4666666666666667]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408524E12, 6.533333333333333], [1.69408518E12, 1.8]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 1.45], [1.69408512E12, 6.883333333333334]], "isOverall": false, "label": "cssURL3_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 1.8], [1.69408512E12, 6.533333333333333]], "isOverall": false, "label": "jsURLs2_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408524E12, 1.3666666666666667], [1.69408518E12, 6.966666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408524E12, 6.966666666666667], [1.69408518E12, 1.3666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408524E12, 8.116666666666667], [1.69408518E12, 0.21666666666666667]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs17_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 6.316666666666666], [1.69408512E12, 2.0166666666666666]], "isOverall": false, "label": "jsURLs6_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408524E12, 1.65], [1.69408518E12, 6.683333333333334]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408524E12, 7.583333333333333], [1.69408518E12, 0.75]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.316666666666666], [1.69408512E12, 0.016666666666666666]], "isOverall": false, "label": "jsURLs11_logiqids_Login-success", "isController": false}, {"data": [[1.69408524E12, 0.7333333333333333], [1.69408518E12, 7.6]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408524E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 0.26666666666666666], [1.69408512E12, 8.066666666666666]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-success", "isController": false}, {"data": [[1.69408518E12, 1.35], [1.69408512E12, 6.983333333333333]], "isOverall": false, "label": "cssURL2_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408518E12, 1.65], [1.69408512E12, 6.683333333333334]], "isOverall": false, "label": "jsURLs1_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408524E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 5.366666666666666], [1.69408512E12, 2.966666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs16_logiqids_Login-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408512E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-success", "isController": false}, {"data": [[1.69408524E12, 1.2], [1.69408518E12, 7.133333333333334]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 8.333333333333334]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408524E12, 2.6166666666666667], [1.69408518E12, 5.716666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408518E12, 7.933333333333334], [1.69408512E12, 0.4]], "isOverall": false, "label": "jsURLs9_logiqids_Login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408524E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 113.63333333333334, "minX": 1.69408512E12, "maxY": 450.23333333333335, "series": [{"data": [[1.69408524E12, 113.63333333333334], [1.69408518E12, 450.23333333333335], [1.69408512E12, 194.46666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408524E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
