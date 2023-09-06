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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 100.0, "series": [{"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[0.0, 91.0], [100.0, 9.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[0.0, 50.0], [300.0, 10.0], [600.0, 1.0], [100.0, 6.0], [200.0, 10.0], [400.0, 10.0], [500.0, 13.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[0.0, 91.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[0.0, 59.0], [100.0, 29.0], [200.0, 12.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[0.0, 82.0], [300.0, 1.0], [200.0, 4.0], [100.0, 13.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[0.0, 74.0], [300.0, 1.0], [100.0, 15.0], [200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[0.0, 62.0], [100.0, 26.0], [200.0, 12.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[0.0, 84.0], [100.0, 16.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 90.0], [100.0, 10.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[0.0, 93.0], [100.0, 7.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[2100.0, 2.0], [0.0, 50.0], [2200.0, 4.0], [2300.0, 11.0], [2400.0, 4.0], [800.0, 1.0], [900.0, 3.0], [1000.0, 1.0], [1100.0, 3.0], [1200.0, 2.0], [1300.0, 3.0], [1400.0, 2.0], [1500.0, 4.0], [1600.0, 1.0], [1700.0, 3.0], [1800.0, 3.0], [1900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 29.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 9036.0, "series": [{"data": [[0.0, 9036.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 29.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 35.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 48.401832460732976, "minX": 1.69399434E12, "maxY": 50.0, "series": [{"data": [[1.69399446E12, 50.0], [1.69399458E12, 50.0], [1.6939944E12, 50.0], [1.6939947E12, 48.401832460732976], [1.69399452E12, 50.0], [1.69399434E12, 50.0], [1.69399464E12, 50.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6939947E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 908.3100000000004, "series": [{"data": [[50.0, 3.9799999999999995]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[50.0, 3.9799999999999995]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 3.1600000000000006]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[50.0, 3.1600000000000006]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 4.2799999999999985]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[50.0, 4.2799999999999985]], "isOverall": false, "label": "jsURLs17_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.06]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.06]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.11]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.11]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 8.860000000000001]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[50.0, 8.860000000000001]], "isOverall": false, "label": "cssURL2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 7.409999999999996]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[50.0, 7.409999999999996]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 28.3]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[50.0, 28.3]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 211.79999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[50.0, 211.79999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 3.8699999999999988]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[50.0, 3.8699999999999988]], "isOverall": false, "label": "jsURLs12_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.33]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[50.0, 4.33]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 5.13]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[50.0, 5.13]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 39.65]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[50.0, 39.65]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 5.1000000000000005]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[50.0, 5.1000000000000005]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.069999999999999]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[50.0, 4.069999999999999]], "isOverall": false, "label": "logiqids_Login-Aggregated", "isController": false}, {"data": [[33.0, 3.0], [32.0, 3.0], [2.0, 2.0], [35.0, 3.0], [34.0, 3.0], [37.0, 2.0], [36.0, 5.0], [39.0, 2.5], [41.0, 3.0], [40.0, 3.0], [43.0, 2.0], [42.0, 3.0], [45.0, 3.0], [44.0, 2.0], [47.0, 3.0], [46.0, 3.0], [49.0, 2.0], [48.0, 2.0], [50.0, 2.8823529411764715], [4.0, 2.0], [5.0, 3.0], [6.0, 2.0], [7.0, 2.0], [9.0, 2.0], [11.0, 2.5], [12.0, 3.0], [13.0, 3.0], [14.0, 2.0], [15.0, 2.0], [16.0, 3.0], [1.0, 2.0], [17.0, 2.0], [18.0, 2.0], [19.0, 1.0], [20.0, 3.0], [21.0, 4.0], [22.0, 3.0], [23.0, 2.0], [24.0, 3.0], [25.0, 4.0], [26.0, 2.0], [27.0, 3.0], [28.0, 4.0], [29.0, 2.0], [30.0, 3.0], [31.0, 2.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[37.78999999999999, 2.7400000000000015]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 10.530000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[50.0, 10.530000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 2.6099999999999994]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[50.0, 2.6099999999999994]], "isOverall": false, "label": "jsURLs8_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 8.110000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[50.0, 8.110000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 4.160000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.160000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 79.76999999999998]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[50.0, 79.76999999999998]], "isOverall": false, "label": "cssURL1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 4.039999999999998]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.039999999999998]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 2.8300000000000005]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[50.0, 2.8300000000000005]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 2.8299999999999996]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[50.0, 2.8299999999999996]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 2.9800000000000004]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[50.0, 2.9800000000000004]], "isOverall": false, "label": "jsURLs7_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 47.15000000000002]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[50.0, 47.15000000000002]], "isOverall": false, "label": "jsURLs10_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 5.829999999999999]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[50.0, 5.829999999999999]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 4.199999999999998]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[50.0, 4.199999999999998]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 4.429999999999999]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.429999999999999]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.1199999999999997]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[50.0, 3.1199999999999997]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 80.07000000000005]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[50.0, 80.07000000000005]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.7699999999999982]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[50.0, 3.7699999999999982]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.710000000000003]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[50.0, 4.710000000000003]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 5.069999999999999]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[50.0, 5.069999999999999]], "isOverall": false, "label": "logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 5.600000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[50.0, 5.600000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 3.8400000000000003]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[50.0, 3.8400000000000003]], "isOverall": false, "label": "jsURLs19_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 3.7900000000000005]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[50.0, 3.7900000000000005]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.880000000000001]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[50.0, 3.880000000000001]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 7.999999999999998]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[50.0, 7.999999999999998]], "isOverall": false, "label": "jsURLs6_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 93.20999999999994]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[50.0, 93.20999999999994]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 4.159999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[50.0, 4.159999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.440000000000001]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[50.0, 4.440000000000001]], "isOverall": false, "label": "logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 3.2100000000000013]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[50.0, 3.2100000000000013]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 4.08]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.08]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.129999999999999]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[50.0, 4.129999999999999]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 4.69]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.69]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 8.780000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[50.0, 8.780000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 17.979999999999997]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[50.0, 17.979999999999997]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 7.840000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[50.0, 7.840000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 3.879999999999999]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[50.0, 3.879999999999999]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 3.9399999999999995]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[50.0, 3.9399999999999995]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.930000000000001]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[50.0, 3.930000000000001]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.8800000000000003]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[50.0, 3.8800000000000003]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 5.439999999999999]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[50.0, 5.439999999999999]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.2399999999999998]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[50.0, 3.2399999999999998]], "isOverall": false, "label": "jsURLs1_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 5.74]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[50.0, 5.74]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 2.7600000000000007]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[50.0, 2.7600000000000007]], "isOverall": false, "label": "cssURL3_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.400000000000003]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[50.0, 4.400000000000003]], "isOverall": false, "label": "jsURLs11_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 31.830000000000005]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[50.0, 31.830000000000005]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 4.0900000000000025]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[50.0, 4.0900000000000025]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 10.029999999999998]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[50.0, 10.029999999999998]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 6.710000000000001]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[50.0, 6.710000000000001]], "isOverall": false, "label": "jsURLs16_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 9.200000000000003]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[50.0, 9.200000000000003]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 27.68000000000001]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[50.0, 27.68000000000001]], "isOverall": false, "label": "jsURLs4_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.339999999999997]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.339999999999997]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.8200000000000007]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[50.0, 3.8200000000000007]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.9]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[50.0, 3.9]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 5.230000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[50.0, 5.230000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.250000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[50.0, 4.250000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 3.9399999999999995]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[50.0, 3.9399999999999995]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 15.979999999999993]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[50.0, 15.979999999999993]], "isOverall": false, "label": "cssURL2_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.02]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[50.0, 4.02]], "isOverall": false, "label": "jsURLs15_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.03]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.03]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.38]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[50.0, 3.38]], "isOverall": false, "label": "cssURL1_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.740000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[50.0, 4.740000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 5.1]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[50.0, 5.1]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 7.5200000000000005]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[50.0, 7.5200000000000005]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.34]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[50.0, 4.34]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 5.410000000000002]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[50.0, 5.410000000000002]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.480000000000002]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.480000000000002]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 3.8500000000000005]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[50.0, 3.8500000000000005]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 5.570000000000003]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[50.0, 5.570000000000003]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 4.29]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[50.0, 4.29]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[50.0, 3.0700000000000007]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[50.0, 3.0700000000000007]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 4.300000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[50.0, 4.300000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 908.3100000000004]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[50.0, 908.3100000000004]], "isOverall": false, "label": "logiqids_HOME-Aggregated", "isController": false}, {"data": [[50.0, 4.480000000000002]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[50.0, 4.480000000000002]], "isOverall": false, "label": "jsURLs13_logiqids_Login-Aggregated", "isController": false}, {"data": [[50.0, 4.84]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.84]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 6.609999999999999]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[50.0, 6.609999999999999]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.740000000000001]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[50.0, 4.740000000000001]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[50.0, 4.0200000000000005]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}, {"data": [[50.0, 4.0200000000000005]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 50.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 3465.0, "minX": 1.69399434E12, "maxY": 8380146.85, "series": [{"data": [[1.69399446E12, 4573833.766666667], [1.69399458E12, 5331095.083333333], [1.6939944E12, 8380146.85], [1.6939947E12, 379794.4166666667], [1.69399452E12, 1576990.95], [1.69399434E12, 1271343.3], [1.69399464E12, 7650558.233333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69399446E12, 7723.9], [1.69399458E12, 7819.166666666667], [1.6939944E12, 6511.933333333333], [1.6939947E12, 4135.6], [1.69399452E12, 7617.5], [1.69399434E12, 3465.0], [1.69399464E12, 7919.4]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6939947E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 2.46, "minX": 1.69399434E12, "maxY": 1813.8600000000001, "series": [{"data": [[1.69399452E12, 4.419999999999999], [1.69399434E12, 3.54]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 3.0], [1.69399434E12, 3.3200000000000003]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 3.92], [1.6939944E12, 4.6400000000000015]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.020000000000001], [1.6939947E12, 4.1]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 4.080000000000002], [1.69399452E12, 4.140000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 4.019999999999999], [1.69399434E12, 13.700000000000003]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 3.2800000000000007], [1.69399452E12, 11.539999999999997]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 39.620000000000005], [1.69399464E12, 16.979999999999997]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 70.86], [1.6939944E12, 352.73999999999995]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 4.14], [1.6939944E12, 3.5999999999999996]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.5600000000000005], [1.69399464E12, 4.1000000000000005]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 5.739999999999999], [1.69399452E12, 4.5200000000000005]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 17.5], [1.69399434E12, 61.80000000000001]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 4.959999999999999], [1.69399464E12, 5.240000000000001]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 3.839999999999999], [1.69399434E12, 4.3]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 2.599999999999999], [1.69399452E12, 2.880000000000001]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 16.74], [1.69399464E12, 4.319999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 2.5999999999999996], [1.6939944E12, 2.619999999999999]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.220000000000001], [1.69399464E12, 12.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 4.460000000000002], [1.69399464E12, 3.8600000000000008]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 3.0199999999999996], [1.69399434E12, 156.51999999999995]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 4.14], [1.69399452E12, 3.94]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 2.460000000000001], [1.69399434E12, 3.2000000000000006]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 2.5800000000000005], [1.69399434E12, 3.0799999999999996]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 2.6600000000000006], [1.6939944E12, 3.3000000000000007]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 5.04], [1.6939944E12, 89.26000000000002]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 3.7600000000000002], [1.69399434E12, 7.9]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 4.34], [1.69399464E12, 4.060000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 3.96], [1.69399452E12, 4.9]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 2.9200000000000004], [1.69399434E12, 3.3200000000000007]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 105.00000000000001], [1.69399464E12, 55.140000000000015]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 3.8199999999999994], [1.6939947E12, 3.7857142857142856], [1.69399464E12, 3.6944444444444446]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 5.520000000000002], [1.69399464E12, 3.9]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 4.340000000000001], [1.69399464E12, 5.8]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 5.120000000000001], [1.6939944E12, 6.08]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 3.6600000000000006], [1.6939944E12, 4.0200000000000005]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 3.66], [1.69399452E12, 3.92]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.0200000000000005], [1.69399464E12, 3.7399999999999998]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 3.1799999999999993], [1.6939944E12, 12.82]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6939944E12, 131.97999999999996], [1.69399464E12, 54.44000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 4.199999999999999], [1.6939944E12, 4.12]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 3.98], [1.6939944E12, 4.9]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 2.8000000000000003], [1.69399434E12, 3.6200000000000014]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 3.92], [1.69399452E12, 4.24]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.28], [1.69399464E12, 3.98]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 3.86], [1.69399452E12, 5.52]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 3.84], [1.69399434E12, 13.720000000000002]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 15.119999999999997], [1.6939944E12, 20.840000000000007]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 13.220000000000002], [1.6939944E12, 2.46]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 3.9], [1.6939944E12, 3.86]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 3.9200000000000004], [1.69399464E12, 3.96]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.040000000000002], [1.69399464E12, 3.8200000000000007]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 3.9800000000000013], [1.69399464E12, 3.7799999999999994]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 4.399999999999999], [1.69399464E12, 6.4799999999999995]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 3.0799999999999996], [1.6939944E12, 3.4000000000000004]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 4.779999999999999], [1.69399452E12, 6.700000000000001]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 2.7200000000000006], [1.6939944E12, 2.7999999999999994]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 4.02], [1.6939944E12, 4.780000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 2.6199999999999997], [1.69399434E12, 61.040000000000006]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 2.7599999999999993], [1.69399434E12, 5.420000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 6.620000000000002], [1.6939944E12, 13.44]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 8.040000000000001], [1.6939944E12, 5.38]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 4.0200000000000005], [1.6939944E12, 14.380000000000003]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 13.699999999999998], [1.6939944E12, 41.66]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.7799999999999985], [1.69399464E12, 3.8999999999999995]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 3.7600000000000002], [1.69399452E12, 3.879999999999999]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.1000000000000005], [1.69399464E12, 3.6999999999999984]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 5.6], [1.69399464E12, 4.859999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 3.699999999999999], [1.6939944E12, 4.800000000000002]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.359999999999999], [1.69399464E12, 3.5200000000000014]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 2.86], [1.6939944E12, 29.09999999999999]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 4.16], [1.6939944E12, 3.8800000000000003]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.0600000000000005], [1.69399464E12, 4.000000000000001]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 3.0999999999999996], [1.69399434E12, 3.6599999999999993]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 5.4799999999999995], [1.6939944E12, 4.000000000000001]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.717391304347825], [1.6939944E12, 5.75], [1.69399464E12, 5.4]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 9.819999999999999], [1.69399464E12, 5.22]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.259999999999999], [1.69399464E12, 4.420000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 4.9], [1.69399464E12, 5.920000000000001]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 3.660000000000001], [1.69399452E12, 5.3]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 3.7199999999999998], [1.69399464E12, 3.9799999999999995]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 3.1199999999999997], [1.69399434E12, 8.020000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 4.640000000000001], [1.6939944E12, 3.940000000000001]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 2.5799999999999996], [1.69399434E12, 3.56]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 4.180000000000001], [1.6939944E12, 4.420000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 2.7600000000000002], [1.69399434E12, 1813.8600000000001]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 4.26], [1.6939944E12, 4.7]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.74], [1.69399464E12, 4.9399999999999995]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 9.280000000000001], [1.69399452E12, 3.9400000000000004]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 5.620000000000001], [1.69399452E12, 3.8600000000000008]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.260000000000001], [1.69399464E12, 3.779999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6939947E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 2.3799999999999994, "minX": 1.69399434E12, "maxY": 1809.5, "series": [{"data": [[1.69399452E12, 4.360000000000001], [1.69399434E12, 3.46]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 3.0], [1.69399434E12, 3.2200000000000006]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 3.92], [1.6939944E12, 4.6400000000000015]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.0], [1.6939947E12, 4.080000000000001]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 3.9999999999999996], [1.69399452E12, 4.1000000000000005]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 3.8800000000000003], [1.69399434E12, 11.759999999999996]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 3.2600000000000007], [1.69399452E12, 11.499999999999998]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 14.62], [1.69399464E12, 8.34]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 10.600000000000003], [1.6939944E12, 39.47999999999999]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 4.12], [1.6939944E12, 3.58]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.5600000000000005], [1.69399464E12, 4.079999999999999]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 5.260000000000002], [1.69399452E12, 4.1000000000000005]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 8.500000000000002], [1.69399434E12, 18.900000000000006]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 4.0600000000000005], [1.69399464E12, 4.6000000000000005]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 3.839999999999999], [1.69399434E12, 4.28]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 2.599999999999999], [1.69399452E12, 2.880000000000001]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 16.22], [1.69399464E12, 4.239999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 2.5999999999999996], [1.6939944E12, 2.619999999999999]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.220000000000001], [1.69399464E12, 12.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 4.4399999999999995], [1.69399464E12, 3.8600000000000008]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 2.8], [1.69399434E12, 97.54]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 4.12], [1.69399452E12, 3.94]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 2.44], [1.69399434E12, 3.1399999999999997]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 2.5800000000000005], [1.69399434E12, 3.06]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 2.6600000000000006], [1.6939944E12, 3.2800000000000007]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 4.340000000000001], [1.6939944E12, 84.63999999999999]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 3.36], [1.69399434E12, 6.44]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 4.26], [1.69399464E12, 4.060000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 3.9400000000000004], [1.69399452E12, 4.879999999999999]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 2.8799999999999994], [1.69399434E12, 3.280000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 18.16], [1.69399464E12, 12.58]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 3.8199999999999994], [1.6939947E12, 3.7857142857142856], [1.69399464E12, 3.6944444444444446]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 5.4799999999999995], [1.69399464E12, 3.9]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 4.340000000000001], [1.69399464E12, 5.8]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 4.04], [1.6939944E12, 4.54]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 3.6400000000000006], [1.6939944E12, 4.000000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 3.66], [1.69399452E12, 3.9]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.0200000000000005], [1.69399464E12, 3.72]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 2.8600000000000008], [1.6939944E12, 11.639999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6939944E12, 31.479999999999997], [1.69399464E12, 10.239999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 4.199999999999999], [1.6939944E12, 4.12]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 3.98], [1.6939944E12, 4.880000000000001]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 2.7399999999999998], [1.69399434E12, 3.1799999999999997]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 3.86], [1.69399452E12, 4.140000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.26], [1.69399464E12, 3.98]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 3.7000000000000006], [1.69399452E12, 5.440000000000003]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 2.96], [1.69399434E12, 5.68]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 5.72], [1.6939944E12, 9.480000000000002]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 13.179999999999996], [1.6939944E12, 2.3799999999999994]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 3.8400000000000003], [1.6939944E12, 3.86]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 3.9200000000000004], [1.69399464E12, 3.96]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 3.9600000000000004], [1.69399464E12, 3.7600000000000002]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 3.9599999999999995], [1.69399464E12, 3.739999999999999]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 4.3199999999999985], [1.69399464E12, 6.38]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 3.0799999999999996], [1.6939944E12, 3.4000000000000004]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 4.719999999999999], [1.69399452E12, 6.580000000000002]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 2.7], [1.6939944E12, 2.7999999999999994]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 3.9999999999999996], [1.6939944E12, 4.780000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 2.6199999999999997], [1.69399434E12, 60.94]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 2.74], [1.69399434E12, 5.400000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 6.0200000000000005], [1.6939944E12, 11.6]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 8.000000000000002], [1.6939944E12, 5.280000000000001]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 3.9], [1.6939944E12, 13.98]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 7.68], [1.6939944E12, 14.299999999999997]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.7799999999999985], [1.69399464E12, 3.8999999999999995]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 3.74], [1.69399452E12, 3.879999999999999]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.079999999999999], [1.69399464E12, 3.6999999999999984]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 5.12], [1.69399464E12, 4.16]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 3.0800000000000005], [1.6939944E12, 3.560000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.359999999999999], [1.69399464E12, 3.5200000000000014]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 2.820000000000001], [1.6939944E12, 28.340000000000003]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 4.16], [1.6939944E12, 3.82]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 4.0600000000000005], [1.69399464E12, 4.000000000000001]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 2.9599999999999995], [1.69399434E12, 3.5200000000000005]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 4.320000000000001], [1.6939944E12, 3.4000000000000004]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 3.9782608695652186], [1.6939944E12, 4.75], [1.69399464E12, 4.860000000000001]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 7.78], [1.69399464E12, 4.140000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.239999999999999], [1.69399464E12, 4.340000000000002]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 4.66], [1.69399464E12, 5.879999999999999]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 3.660000000000001], [1.69399452E12, 5.280000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 3.6999999999999997], [1.69399464E12, 3.959999999999999]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 3.0200000000000005], [1.69399434E12, 7.92]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 4.619999999999999], [1.6939944E12, 3.940000000000001]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 2.5599999999999996], [1.69399434E12, 3.56]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 4.139999999999999], [1.6939944E12, 4.380000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 2.74], [1.69399434E12, 1809.5]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 4.200000000000001], [1.6939944E12, 4.5200000000000005]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 3.8200000000000003], [1.69399464E12, 4.14]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 8.940000000000001], [1.69399452E12, 3.8000000000000003]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 5.620000000000001], [1.69399452E12, 3.8600000000000008]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 4.260000000000001], [1.69399464E12, 3.779999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6939947E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69399434E12, "maxY": 1678.9399999999996, "series": [{"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.6939947E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 0.40000000000000013], [1.69399452E12, 7.760000000000001]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.42]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 9.899999999999999], [1.69399464E12, 0.42]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 7.000000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 0.4800000000000002], [1.6939944E12, 56.4]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.6939947E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.5600000000000003], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6939944E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 8.360000000000001], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.78]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.6939944E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69399452E12, 0.0], [1.69399434E12, 1678.9399999999996]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69399458E12, 0.0], [1.6939944E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 5.9], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.6939947E12, 0.0], [1.69399452E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69399446E12, 0.0], [1.69399464E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6939947E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69399434E12, "maxY": 2429.0, "series": [{"data": [[1.69399446E12, 421.0], [1.69399458E12, 298.0], [1.6939944E12, 602.0], [1.6939947E12, 38.0], [1.69399452E12, 71.0], [1.69399434E12, 2429.0], [1.69399464E12, 214.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69399446E12, 11.0], [1.69399458E12, 11.0], [1.6939944E12, 56.0], [1.6939947E12, 6.0], [1.69399452E12, 6.0], [1.69399434E12, 170.89999999999998], [1.69399464E12, 12.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69399446E12, 164.02999999999997], [1.69399458E12, 88.85000000000014], [1.6939944E12, 484.9500000000014], [1.6939947E12, 17.45000000000016], [1.69399452E12, 41.99000000000001], [1.69399434E12, 2339.9700000000003], [1.69399464E12, 97.25999999999976]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69399446E12, 22.0], [1.69399458E12, 19.0], [1.6939944E12, 169.25], [1.6939947E12, 8.0], [1.69399452E12, 9.0], [1.69399434E12, 1134.4999999999925], [1.69399464E12, 30.649999999999864]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69399446E12, 2.0], [1.69399458E12, 1.0], [1.6939944E12, 1.0], [1.6939947E12, 1.0], [1.69399452E12, 1.0], [1.69399434E12, 2.0], [1.69399464E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69399446E12, 4.0], [1.69399458E12, 4.0], [1.6939944E12, 4.0], [1.6939947E12, 4.0], [1.69399452E12, 3.0], [1.69399434E12, 4.0], [1.69399464E12, 4.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6939947E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 3.0, "minX": 4.0, "maxY": 17.0, "series": [{"data": [[32.0, 4.0], [33.0, 4.0], [34.0, 5.0], [35.0, 4.0], [37.0, 4.0], [36.0, 12.5], [39.0, 3.0], [38.0, 15.5], [41.0, 4.0], [40.0, 4.0], [42.0, 4.0], [45.0, 4.0], [44.0, 4.0], [46.0, 14.0], [50.0, 4.0], [4.0, 5.5], [5.0, 4.0], [6.0, 4.0], [8.0, 4.0], [9.0, 7.5], [10.0, 4.0], [11.0, 3.0], [12.0, 17.0], [13.0, 4.0], [14.0, 4.0], [15.0, 4.0], [16.0, 5.0], [17.0, 4.0], [18.0, 4.0], [19.0, 5.0], [20.0, 4.0], [21.0, 4.0], [22.0, 3.0], [23.0, 3.0], [24.0, 4.0], [26.0, 4.0], [27.0, 3.0], [28.0, 3.0], [29.0, 4.0], [30.0, 4.0], [31.0, 5.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 50.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 3.0, "minX": 4.0, "maxY": 4.5, "series": [{"data": [[32.0, 4.0], [33.0, 4.0], [34.0, 4.0], [35.0, 4.0], [37.0, 4.0], [36.0, 4.0], [39.0, 3.0], [38.0, 3.5], [41.0, 4.0], [40.0, 4.0], [42.0, 4.0], [45.0, 4.0], [44.0, 4.0], [46.0, 4.5], [50.0, 4.0], [4.0, 4.0], [5.0, 4.0], [6.0, 4.0], [8.0, 4.0], [9.0, 4.0], [10.0, 4.0], [11.0, 3.0], [12.0, 4.0], [13.0, 4.0], [14.0, 4.0], [15.0, 4.0], [16.0, 4.0], [17.0, 4.0], [18.0, 4.0], [19.0, 4.0], [20.0, 3.0], [21.0, 4.0], [22.0, 3.0], [23.0, 3.0], [24.0, 4.0], [26.0, 4.0], [27.0, 3.0], [28.0, 3.0], [29.0, 4.0], [30.0, 4.0], [31.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 50.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 12.716666666666667, "minX": 1.69399434E12, "maxY": 25.0, "series": [{"data": [[1.69399446E12, 24.933333333333334], [1.69399458E12, 25.0], [1.6939944E12, 24.233333333333334], [1.6939947E12, 12.716666666666667], [1.69399452E12, 25.0], [1.69399434E12, 15.0], [1.69399464E12, 24.783333333333335]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6939947E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 12.733333333333333, "minX": 1.69399434E12, "maxY": 25.0, "series": [{"data": [[1.69399446E12, 24.933333333333334], [1.69399458E12, 25.0], [1.6939944E12, 24.233333333333334], [1.6939947E12, 12.733333333333333], [1.69399452E12, 25.0], [1.69399434E12, 15.0], [1.69399464E12, 24.766666666666666]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6939947E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.69399434E12, "maxY": 0.8333333333333334, "series": [{"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs12_logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL1_logiqids_HOME-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL1_logiqids_Login-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.6939947E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "logiqids_sign_up-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs15_logiqids_Login-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs4_logiqids_Login-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs19_logiqids_Login-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs8_logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs13_logiqids_Login-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs18_logiqids_Login-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL2_logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs14_logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs3_logiqids_Login-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs7_logiqids_Login-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs10_logiqids_Login-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL3_logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs2_logiqids_Login-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs17_logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs6_logiqids_Login-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs11_logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "cssURL2_logiqids_Login-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.7666666666666667], [1.6939944E12, 0.06666666666666667], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs1_logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-success", "isController": false}, {"data": [[1.6939947E12, 0.8333333333333334], [1.69399452E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs5_logiqids_Login-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs16_logiqids_Login-success", "isController": false}, {"data": [[1.6939944E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399452E12, 0.8333333333333334], [1.69399434E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.69399464E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399446E12, 0.8333333333333334], [1.6939947E12, 0.23333333333333334], [1.69399464E12, 0.6]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399458E12, 0.8333333333333334], [1.6939944E12, 0.8333333333333334]], "isOverall": false, "label": "jsURLs9_logiqids_Login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6939947E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 12.733333333333333, "minX": 1.69399434E12, "maxY": 25.0, "series": [{"data": [[1.69399446E12, 24.933333333333334], [1.69399458E12, 25.0], [1.6939944E12, 24.233333333333334], [1.6939947E12, 12.733333333333333], [1.69399452E12, 25.0], [1.69399434E12, 15.0], [1.69399464E12, 24.766666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6939947E12, "title": "Total Transactions Per Second"}},
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
