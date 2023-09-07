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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 200.0, "series": [{"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[0.0, 199.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[0.0, 183.0], [700.0, 1.0], [100.0, 13.0], [200.0, 3.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[0.0, 87.0], [300.0, 6.0], [100.0, 67.0], [200.0, 38.0], [400.0, 2.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[0.0, 149.0], [200.0, 10.0], [400.0, 1.0], [100.0, 40.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[0.0, 56.0], [1100.0, 1.0], [300.0, 15.0], [600.0, 12.0], [700.0, 12.0], [100.0, 52.0], [200.0, 6.0], [400.0, 10.0], [800.0, 7.0], [900.0, 3.0], [500.0, 23.0], [1000.0, 3.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[0.0, 198.0], [100.0, 2.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[600.0, 1.0], [2300.0, 2.0], [2200.0, 1.0], [2400.0, 3.0], [2600.0, 5.0], [2700.0, 8.0], [2800.0, 4.0], [2900.0, 8.0], [3000.0, 8.0], [3100.0, 6.0], [3200.0, 8.0], [3300.0, 9.0], [3400.0, 8.0], [3500.0, 3.0], [3600.0, 5.0], [3700.0, 6.0], [3800.0, 5.0], [3900.0, 4.0], [4000.0, 4.0], [4200.0, 9.0], [4300.0, 8.0], [4100.0, 3.0], [4600.0, 8.0], [4500.0, 8.0], [4400.0, 13.0], [4700.0, 11.0], [4800.0, 16.0], [5100.0, 2.0], [4900.0, 8.0], [5000.0, 7.0], [5200.0, 6.0], [5300.0, 1.0], [5600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[0.0, 189.0], [100.0, 7.0], [200.0, 4.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[0.0, 197.0], [100.0, 3.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[0.0, 199.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[0.0, 182.0], [100.0, 17.0], [200.0, 1.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[0.0, 76.0], [300.0, 51.0], [200.0, 28.0], [100.0, 33.0], [400.0, 1.0], [500.0, 11.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[0.0, 197.0], [100.0, 3.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[0.0, 33.0], [1100.0, 1.0], [300.0, 36.0], [600.0, 21.0], [700.0, 6.0], [200.0, 31.0], [400.0, 19.0], [100.0, 29.0], [800.0, 4.0], [900.0, 3.0], [500.0, 16.0], [1000.0, 1.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[0.0, 196.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[0.0, 81.0], [300.0, 15.0], [200.0, 30.0], [100.0, 57.0], [400.0, 14.0], [500.0, 3.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[0.0, 175.0], [100.0, 23.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[0.0, 186.0], [100.0, 10.0], [200.0, 4.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[0.0, 188.0], [200.0, 9.0], [100.0, 3.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[0.0, 199.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[0.0, 192.0], [300.0, 3.0], [100.0, 2.0], [400.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[0.0, 88.0], [300.0, 13.0], [100.0, 59.0], [200.0, 40.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[0.0, 178.0], [300.0, 2.0], [100.0, 13.0], [200.0, 7.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[0.0, 192.0], [300.0, 1.0], [400.0, 1.0], [100.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[0.0, 199.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[0.0, 5.0], [600.0, 58.0], [700.0, 27.0], [200.0, 10.0], [800.0, 12.0], [900.0, 10.0], [1000.0, 15.0], [1100.0, 5.0], [1200.0, 2.0], [300.0, 4.0], [1300.0, 2.0], [1500.0, 3.0], [100.0, 4.0], [400.0, 15.0], [1600.0, 1.0], [500.0, 27.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[0.0, 185.0], [100.0, 15.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[0.0, 199.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 194.0], [100.0, 4.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[0.0, 186.0], [300.0, 2.0], [200.0, 2.0], [100.0, 10.0]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[0.0, 192.0], [100.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[0.0, 196.0], [100.0, 4.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[0.0, 163.0], [600.0, 8.0], [700.0, 3.0], [100.0, 11.0], [200.0, 7.0], [400.0, 2.0], [900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[0.0, 181.0], [100.0, 13.0], [200.0, 6.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[0.0, 199.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 191.0], [100.0, 7.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[0.0, 188.0], [100.0, 8.0], [200.0, 4.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[0.0, 193.0], [100.0, 7.0]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[0.0, 190.0], [100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[0.0, 191.0], [100.0, 9.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[0.0, 165.0], [300.0, 8.0], [100.0, 7.0], [400.0, 14.0], [500.0, 6.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[0.0, 198.0], [100.0, 2.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[0.0, 193.0], [100.0, 7.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[0.0, 196.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[0.0, 184.0], [100.0, 13.0], [200.0, 3.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 196.0], [400.0, 1.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[0.0, 184.0], [100.0, 6.0], [200.0, 10.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 198.0], [100.0, 2.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[0.0, 198.0], [100.0, 2.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[0.0, 169.0], [300.0, 4.0], [400.0, 4.0], [100.0, 14.0], [200.0, 8.0], [800.0, 1.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[0.0, 35.0], [600.0, 7.0], [700.0, 8.0], [800.0, 1.0], [900.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [1600.0, 3.0], [100.0, 18.0], [1700.0, 1.0], [1800.0, 2.0], [1900.0, 3.0], [2000.0, 2.0], [2100.0, 1.0], [2200.0, 2.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 2.0], [2800.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [200.0, 15.0], [3500.0, 3.0], [3600.0, 32.0], [3700.0, 20.0], [3800.0, 1.0], [300.0, 12.0], [400.0, 12.0], [500.0, 11.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[0.0, 189.0], [100.0, 11.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 200.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[0.0, 198.0], [100.0, 2.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[0.0, 192.0], [300.0, 1.0], [100.0, 5.0], [400.0, 2.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 280.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 17576.0, "series": [{"data": [[0.0, 17576.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 344.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 280.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 123.28772635814887, "minX": 1.6940814E12, "maxY": 199.51735913488866, "series": [{"data": [[1.69408152E12, 191.9502862728666], [1.6940814E12, 123.28772635814887], [1.69408146E12, 199.51735913488866]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408152E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 3947.025, "series": [{"data": [[200.0, 5.265000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[200.0, 5.265000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 6.985000000000002]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[200.0, 6.985000000000002]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 3.999999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[200.0, 3.999999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 27.170000000000016]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[200.0, 27.170000000000016]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[199.0, 11.9], [198.0, 25.0], [197.0, 5.125], [196.0, 2.4999999999999996], [200.0, 7.283018867924529]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[199.41999999999996, 7.095]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[144.0, 9.0], [147.0, 109.26666666666668], [148.0, 70.66666666666666], [149.0, 29.0], [161.0, 55.23076923076923], [162.0, 13.0], [163.0, 8.0], [197.0, 97.0], [198.0, 211.7692307692308], [199.0, 41.5], [200.0, 130.41666666666666], [111.0, 17.0], [112.0, 9.0], [119.0, 15.0], [121.0, 25.0], [122.0, 29.53846153846154], [123.0, 163.94999999999993], [124.0, 159.2]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[158.1, 124.07999999999994]], "isOverall": false, "label": "cssURL2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[39.0, 3.0], [41.0, 2.0], [40.0, 4.0], [43.0, 3.0], [42.0, 2.0], [46.0, 2.0], [51.0, 3.0], [50.0, 3.0], [57.0, 2.0], [59.0, 3.0], [61.0, 2.5], [63.0, 2.142857142857143], [67.0, 2.0], [65.0, 4.0], [64.0, 2.5], [70.0, 2.0], [69.0, 2.0], [68.0, 4.0], [75.0, 2.0], [74.0, 2.5], [73.0, 2.3333333333333335], [72.0, 7.823529411764705], [78.0, 3.0], [77.0, 2.0], [83.0, 2.0], [82.0, 2.3333333333333335], [81.0, 2.0], [87.0, 2.3333333333333335], [84.0, 2.0], [88.0, 2.0], [95.0, 7.0], [103.0, 2.0], [100.0, 2.0], [106.0, 2.0], [109.0, 4.0], [127.0, 2.0], [125.0, 1.0], [134.0, 3.0], [133.0, 3.0], [132.0, 2.0], [143.0, 2.0], [150.0, 2.0], [144.0, 2.0], [159.0, 2.4000000000000004], [158.0, 2.0], [157.0, 4.0], [156.0, 2.0], [155.0, 2.5], [154.0, 2.5], [153.0, 6.75], [152.0, 3.0], [167.0, 2.0], [166.0, 2.0], [164.0, 2.5], [161.0, 2.0], [160.0, 2.0], [174.0, 2.5], [173.0, 2.0], [170.0, 3.0], [182.0, 2.5], [181.0, 2.2222222222222223], [180.0, 3.0], [179.0, 2.0], [178.0, 29.333333333333336], [177.0, 2.5], [176.0, 2.6666666666666665], [189.0, 3.0], [188.0, 22.0], [199.0, 2.0], [197.0, 17.0], [196.0, 2.6666666666666665], [194.0, 3.0], [192.0, 3.166666666666667], [200.0, 17.25]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[129.56500000000003, 4.365]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 59.45999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[200.0, 59.45999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 326.57499999999993]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[200.0, 326.57499999999993]], "isOverall": false, "label": "jsURLs5_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 3.495]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[200.0, 3.495]], "isOverall": false, "label": "jsURLs12_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 10.514999999999997]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[200.0, 10.514999999999997]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[182.0, 6.999999999999999], [191.0, 3.142857142857143], [189.0, 15.333333333333332], [188.0, 13.117647058823527], [187.0, 3.0], [185.0, 2.0], [199.0, 9.857142857142856], [197.0, 5.375], [195.0, 3.5], [194.0, 3.8], [193.0, 2.5], [192.0, 2.8], [200.0, 4.504424778761063]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[195.84500000000003, 5.529999999999999]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 3947.025]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[200.0, 3947.025]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 22.240000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[200.0, 22.240000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 7.865000000000001]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[200.0, 7.865000000000001]], "isOverall": false, "label": "logiqids_Login-Aggregated", "isController": false}, {"data": [[2.0, 2.0], [4.0, 1.5], [5.0, 3.0], [6.0, 1.0], [7.0, 3.0], [8.0, 2.0], [9.0, 3.0], [11.0, 2.0], [12.0, 3.0], [13.0, 3.0], [14.0, 2.0], [15.0, 2.0], [16.0, 3.0], [17.0, 2.0], [18.0, 3.0], [19.0, 2.0], [20.0, 2.0], [21.0, 2.0], [22.0, 1.0], [23.0, 3.0], [24.0, 2.0], [25.0, 2.0], [26.0, 3.0], [27.0, 2.0], [28.0, 8.0], [29.0, 14.0], [30.0, 6.0], [31.0, 27.0], [33.0, 27.0], [32.0, 2.0], [35.0, 2.0], [34.0, 2.0], [37.0, 2.0], [36.0, 3.0], [39.0, 3.0], [38.0, 3.0], [41.0, 2.0], [40.0, 2.0], [43.0, 2.0], [42.0, 3.0], [45.0, 2.0], [44.0, 3.0], [47.0, 1.0], [46.0, 2.0], [49.0, 2.0], [48.0, 3.0], [51.0, 1.0], [50.0, 3.0], [53.0, 3.0], [52.0, 3.0], [55.0, 3.0], [54.0, 2.0], [57.0, 2.0], [56.0, 2.0], [59.0, 3.0], [58.0, 2.0], [61.0, 2.0], [60.0, 2.0], [63.0, 2.0], [62.0, 3.0], [67.0, 2.0], [66.0, 3.0], [65.0, 3.0], [64.0, 2.0], [71.0, 2.0], [70.0, 2.0], [69.0, 1.0], [68.0, 15.0], [75.0, 2.0], [74.0, 2.0], [73.0, 2.0], [72.0, 2.0], [79.0, 2.0], [78.0, 2.0], [77.0, 2.0], [76.0, 2.0], [83.0, 1.0], [82.0, 3.0], [81.0, 3.0], [80.0, 2.0], [87.0, 3.0], [86.0, 3.0], [85.0, 3.0], [84.0, 2.0], [90.0, 3.0], [89.0, 5.0], [88.0, 3.0], [95.0, 2.0], [94.0, 3.0], [93.0, 3.0], [92.0, 2.0], [99.0, 2.0], [98.0, 5.0], [97.0, 6.0], [96.0, 6.0], [103.0, 2.0], [102.0, 2.0], [101.0, 3.0], [100.0, 2.0], [107.0, 2.0], [106.0, 1.0], [105.0, 2.0], [104.0, 3.0], [111.0, 2.0], [110.0, 2.0], [109.0, 3.0], [108.0, 2.0], [114.0, 3.0], [113.0, 2.0], [112.0, 3.0], [119.0, 2.0], [118.0, 1.0], [117.0, 2.0], [116.0, 2.0], [123.0, 3.0], [122.0, 3.0], [121.0, 2.0], [120.0, 2.0], [127.0, 2.0], [126.0, 2.0], [125.0, 2.0], [124.0, 1.0], [135.0, 2.0], [134.0, 2.0], [133.0, 2.0], [132.0, 2.0], [131.0, 2.0], [130.0, 2.0], [129.0, 3.0], [128.0, 3.0], [143.0, 2.0], [142.0, 2.0], [141.0, 3.0], [140.0, 2.0], [139.0, 2.0], [138.0, 2.0], [137.0, 2.0], [136.0, 3.0], [151.0, 2.0], [150.0, 3.0], [149.0, 4.0], [148.0, 2.0], [147.0, 3.0], [146.0, 4.0], [144.0, 2.0], [159.0, 2.0], [158.0, 2.0], [157.0, 4.0], [156.0, 2.0], [155.0, 3.0], [154.0, 3.0], [153.0, 6.0], [152.0, 2.0], [167.0, 1.0], [166.0, 2.0], [165.0, 2.0], [164.0, 2.0], [163.0, 2.5], [161.0, 1.0], [160.0, 3.0], [175.0, 2.0], [174.0, 1.0], [173.0, 3.0], [172.0, 2.0], [171.0, 2.0], [170.0, 2.0], [169.0, 2.0], [168.0, 2.0], [183.0, 3.0], [182.0, 2.0], [181.0, 2.0], [180.0, 30.0], [179.0, 65.0], [178.0, 2.0], [177.0, 2.0], [176.0, 2.0], [191.0, 2.0], [190.0, 2.0], [189.0, 3.0], [188.0, 2.0], [187.0, 2.0], [186.0, 2.0], [185.0, 2.0], [184.0, 3.0], [199.0, 2.0], [198.0, 37.0], [197.0, 4.0], [196.0, 2.0], [195.0, 2.0], [194.0, 3.0], [193.0, 2.0], [192.0, 2.0], [200.0, 60.0], [1.0, 4.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[100.53500000000012, 3.695]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 11.305000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[200.0, 11.305000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 8.490000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[200.0, 8.490000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 10.11]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[200.0, 10.11]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 23.505]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[200.0, 23.505]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[128.0, 15.0], [147.0, 50.0], [148.0, 71.0], [150.0, 10.0], [151.0, 13.0], [153.0, 9.0], [154.0, 9.0], [155.0, 10.0], [160.0, 20.0], [161.0, 44.21428571428572], [162.0, 44.0], [197.0, 25.0], [198.0, 277.94736842105266], [200.0, 243.4871794871795], [101.0, 11.0], [104.0, 21.0], [107.0, 219.34375], [108.0, 288.14285714285717], [111.0, 20.0], [123.0, 58.7], [124.0, 61.57142857142858], [125.0, 11.0], [126.0, 13.0], [127.0, 10.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[145.41499999999996, 191.805]], "isOverall": false, "label": "cssURL1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[191.0, 3.0], [199.0, 3.0], [197.0, 8.461538461538463], [196.0, 2.0666666666666664], [195.0, 2.5], [194.0, 2.25], [193.0, 2.4444444444444446], [192.0, 2.1428571428571432], [200.0, 5.070312500000001]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[198.07000000000005, 4.529999999999999]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 4.119999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[200.0, 4.119999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 9.334999999999997]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[200.0, 9.334999999999997]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 9.445]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[200.0, 9.445]], "isOverall": false, "label": "jsURLs7_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 5.254999999999998]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[200.0, 5.254999999999998]], "isOverall": false, "label": "jsURLs10_logiqids_Login-Aggregated", "isController": false}, {"data": [[161.0, 292.2], [162.0, 111.0], [197.0, 233.5185185185185], [198.0, 466.00000000000006], [199.0, 580.5833333333334], [200.0, 310.0521739130434]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[197.96999999999997, 345.70000000000016]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 21.315]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[200.0, 21.315]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[175.0, 3.0], [174.0, 2.8], [173.0, 2.5], [182.0, 3.875], [181.0, 2.3333333333333335], [180.0, 2.0], [179.0, 2.0], [178.0, 42.142857142857146], [176.0, 2.111111111111111], [189.0, 10.75], [188.0, 22.285714285714285], [187.0, 2.6666666666666665], [186.0, 2.0], [184.0, 2.5], [199.0, 3.8], [198.0, 37.0], [197.0, 9.904761904761903], [196.0, 2.0], [195.0, 4.5], [194.0, 1.5], [193.0, 2.75], [192.0, 2.25], [200.0, 8.378787878787879]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[192.145, 7.89]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 9.135000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[200.0, 9.135000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 164.6049999999999]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[200.0, 164.6049999999999]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 30.955000000000023]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[200.0, 30.955000000000023]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 19.659999999999997]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[200.0, 19.659999999999997]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 17.8]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[200.0, 17.8]], "isOverall": false, "label": "logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 14.940000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[200.0, 14.940000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 6.119999999999999]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[200.0, 6.119999999999999]], "isOverall": false, "label": "jsURLs19_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 4.444999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[200.0, 4.444999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 36.64000000000005]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[200.0, 36.64000000000005]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 10.83]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[200.0, 10.83]], "isOverall": false, "label": "jsURLs6_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 133.33999999999995]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[200.0, 133.33999999999995]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 3.7099999999999977]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[200.0, 3.7099999999999977]], "isOverall": false, "label": "jsURLs18_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 5.825000000000002]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[200.0, 5.825000000000002]], "isOverall": false, "label": "logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 35.89500000000002]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[200.0, 35.89500000000002]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-Aggregated", "isController": false}, {"data": [[199.0, 10.833333333333334], [200.0, 6.52577319587629]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[199.97, 6.655000000000002]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 22.124999999999996]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[200.0, 22.124999999999996]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 6.3599999999999985]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[200.0, 6.3599999999999985]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[149.0, 193.0], [153.0, 40.0], [154.0, 66.0], [158.0, 48.0], [160.0, 115.0], [161.0, 694.0410958904108], [162.0, 733.5], [166.0, 28.0], [199.0, 626.7727272727273], [200.0, 739.7956989247313]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[183.10999999999999, 684.6899999999999]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 28.434999999999988]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[200.0, 28.434999999999988]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 10.154999999999998]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[200.0, 10.154999999999998]], "isOverall": false, "label": "jsURLs9_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 8.995000000000001]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[200.0, 8.995000000000001]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 16.195000000000007]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[200.0, 16.195000000000007]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 16.25000000000001]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[200.0, 16.25000000000001]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 32.160000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[200.0, 32.160000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 15.360000000000007]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[200.0, 15.360000000000007]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 9.235]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[200.0, 9.235]], "isOverall": false, "label": "jsURLs1_logiqids_Login-Aggregated", "isController": false}, {"data": [[87.0, 3.0], [86.0, 2.0], [85.0, 2.5], [90.0, 3.0], [88.0, 2.6666666666666665], [99.0, 1.6666666666666667], [98.0, 6.0], [97.0, 4.0], [100.0, 3.0], [107.0, 2.0], [109.0, 2.5], [114.0, 3.0], [118.0, 2.0], [117.0, 2.0], [127.0, 3.0], [125.0, 2.5], [135.0, 2.3333333333333335], [134.0, 4.0], [133.0, 2.3333333333333335], [132.0, 2.0], [143.0, 4.0], [142.0, 2.0], [140.0, 2.0], [139.0, 2.0], [137.0, 2.6666666666666665], [136.0, 3.6666666666666665], [159.0, 2.5], [154.0, 2.0], [153.0, 10.0], [165.0, 2.0], [164.0, 3.0], [160.0, 4.0], [182.0, 3.3333333333333335], [181.0, 2.0], [180.0, 4.0], [179.0, 2.0], [178.0, 25.0], [176.0, 2.25], [191.0, 4.0], [190.0, 3.0], [189.0, 6.076923076923077], [188.0, 20.16666666666666], [187.0, 2.0], [199.0, 8.0], [198.0, 29.0], [197.0, 12.333333333333332], [196.0, 2.2222222222222223], [195.0, 2.142857142857143], [194.0, 3.0], [193.0, 2.8], [192.0, 2.8823529411764706], [200.0, 13.833333333333332]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[165.25499999999997, 7.165]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 9.925]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[200.0, 9.925]], "isOverall": false, "label": "cssURL3_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 4.415000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[200.0, 4.415000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_Login-Aggregated", "isController": false}, {"data": [[133.0, 4.666666666666667], [138.0, 74.0], [140.0, 20.272727272727273], [141.0, 48.25], [143.0, 6.166666666666666], [144.0, 6.714285714285714], [147.0, 36.53061224489796], [160.0, 4.0], [161.0, 8.636363636363637], [197.0, 30.25], [198.0, 259.375], [200.0, 181.025974025974], [124.0, 5.0], [125.0, 6.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[171.79500000000004, 94.56500000000001]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 25.99499999999998]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[200.0, 25.99499999999998]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 10.724999999999994]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[200.0, 10.724999999999994]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 5.01]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[200.0, 5.01]], "isOverall": false, "label": "jsURLs16_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 5.7449999999999966]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[200.0, 5.7449999999999966]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 43.78499999999998]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[200.0, 43.78499999999998]], "isOverall": false, "label": "jsURLs4_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 25.524999999999988]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[200.0, 25.524999999999988]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[135.0, 2.4], [134.0, 2.0], [133.0, 3.166666666666667], [140.0, 2.0], [138.0, 2.0], [136.0, 4.0], [150.0, 2.0], [144.0, 2.0], [159.0, 2.2], [158.0, 2.0], [157.0, 2.0], [154.0, 4.5], [153.0, 3.25], [152.0, 4.0], [162.0, 3.0], [160.0, 2.0], [175.0, 2.285714285714286], [174.0, 2.0], [173.0, 2.5], [181.0, 2.5714285714285716], [180.0, 2.0], [178.0, 59.666666666666664], [176.0, 2.0833333333333335], [191.0, 3.3333333333333335], [189.0, 27.5], [188.0, 19.333333333333336], [187.0, 2.0], [184.0, 2.5], [199.0, 6.466666666666667], [197.0, 4.782608695652175], [196.0, 2.0], [195.0, 3.9999999999999996], [194.0, 2.928571428571428], [193.0, 2.555555555555556], [192.0, 2.25], [200.0, 4.1923076923076925]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[183.1299999999999, 5.005]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 19.92999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[200.0, 19.92999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 23.48999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[200.0, 23.48999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 18.60500000000001]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[200.0, 18.60500000000001]], "isOverall": false, "label": "jsURLs2_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 75.64000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[200.0, 75.64000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 7.58]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[200.0, 7.58]], "isOverall": false, "label": "cssURL2_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 7.18]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[200.0, 7.18]], "isOverall": false, "label": "jsURLs15_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 11.73]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[200.0, 11.73]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 8.934999999999999]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[200.0, 8.934999999999999]], "isOverall": false, "label": "cssURL1_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 15.230000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[200.0, 15.230000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 18.025000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[200.0, 18.025000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 26.43999999999999]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[200.0, 26.43999999999999]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 21.659999999999993]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[200.0, 21.659999999999993]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 24.455]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[200.0, 24.455]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 6.834999999999997]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[200.0, 6.834999999999997]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 10.915000000000003]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[200.0, 10.915000000000003]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 57.87500000000001]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[200.0, 57.87500000000001]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 10.139999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[200.0, 10.139999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[200.0, 7.250000000000005]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[200.0, 7.250000000000005]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 4.119999999999999]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[200.0, 4.119999999999999]], "isOverall": false, "label": "jsURLs14_logiqids_Login-Aggregated", "isController": false}, {"data": [[84.0, 3131.5121951219517], [93.0, 61.0], [101.0, 80.0], [108.0, 337.44444444444446], [109.0, 177.75], [110.0, 83.33333333333333], [112.0, 60.5], [113.0, 67.0], [114.0, 62.75], [124.0, 328.0], [125.0, 133.66666666666666], [126.0, 52.5], [128.0, 46.0], [129.0, 59.0], [131.0, 46.0], [132.0, 46.0], [133.0, 80.0], [134.0, 66.0], [136.0, 84.0], [140.0, 207.0], [141.0, 212.0], [142.0, 69.0], [148.0, 56.0], [149.0, 183.66666666666666], [150.0, 75.5], [151.0, 63.0], [152.0, 63.5], [153.0, 64.0], [154.0, 45.0], [156.0, 55.5], [157.0, 132.5], [161.0, 504.53333333333325], [162.0, 363.5], [163.0, 132.75], [164.0, 36.0], [187.0, 45.0], [199.0, 521.7199999999999], [200.0, 512.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[127.55000000000001, 1468.3100000000006]], "isOverall": false, "label": "logiqids_HOME-Aggregated", "isController": false}, {"data": [[200.0, 4.144999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[200.0, 4.144999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_Login-Aggregated", "isController": false}, {"data": [[200.0, 15.02]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[200.0, 15.02]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[75.0, 2.0], [74.0, 2.0], [72.0, 6.785714285714285], [78.0, 3.0], [77.0, 2.833333333333333], [76.0, 4.333333333333333], [83.0, 2.0], [82.0, 3.0], [80.0, 2.75], [87.0, 2.6842105263157894], [85.0, 2.3333333333333335], [84.0, 2.5], [88.0, 4.0], [97.0, 5.5], [101.0, 3.0], [109.0, 2.0], [114.0, 3.0], [118.0, 2.0], [125.0, 2.0], [129.0, 2.5], [142.0, 5.0], [137.0, 2.0], [136.0, 4.0], [144.0, 3.0], [159.0, 2.5], [157.0, 2.0], [156.0, 2.0], [154.0, 11.0], [152.0, 5.0], [161.0, 2.0], [160.0, 5.0], [174.0, 2.5], [173.0, 3.0], [182.0, 3.6], [181.0, 2.473684210526316], [180.0, 3.0], [179.0, 14.5], [178.0, 63.57142857142857], [177.0, 3.6], [176.0, 1.6666666666666667], [191.0, 2.8], [190.0, 2.0], [189.0, 13.9], [188.0, 6.333333333333334], [187.0, 2.6], [186.0, 2.0], [185.0, 2.0], [184.0, 3.0], [199.0, 20.333333333333336], [197.0, 2.1666666666666665], [196.0, 2.0], [194.0, 2.6666666666666665], [192.0, 2.0], [200.0, 6.555555555555555]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[147.84500000000014, 6.814999999999998]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 7.8199999999999985]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[200.0, 7.8199999999999985]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[200.0, 25.859999999999996]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}, {"data": [[200.0, 25.859999999999996]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1685.4666666666667, "minX": 1.6940814E12, "maxY": 3.9098125516666666E7, "series": [{"data": [[1.69408152E12, 1.898140405E7], [1.6940814E12, 247995.76666666666], [1.69408146E12, 3.9098125516666666E7]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69408152E12, 36046.7], [1.6940814E12, 1685.4666666666667], [1.69408146E12, 46777.833333333336]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408152E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 2.3333333333333335, "minX": 1.6940814E12, "maxY": 3947.025, "series": [{"data": [[1.69408146E12, 5.265000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 6.985000000000002]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 3.999999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 27.170000000000016]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 7.095]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 117.23275862068965], [1.69408146E12, 133.5357142857143]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 4.365]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 59.45999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 326.57499999999993]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 3.495]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 10.418994413407823], [1.69408146E12, 11.333333333333334]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 5.529999999999999]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 3947.025]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 22.240000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 7.865000000000001]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 3.695]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 11.585492227979277], [1.69408146E12, 3.5714285714285716]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 8.490000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 9.797872340425535], [1.69408146E12, 15.000000000000004]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 23.505]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 181.4285714285714], [1.69408146E12, 209.47297297297294]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 4.529999999999999]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 4.119999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 9.334999999999997]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 9.445]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 5.254999999999998]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 345.70000000000016]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 23.46666666666666], [1.69408146E12, 19.554545454545448]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 7.89]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 9.135000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 164.6049999999999]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 30.955000000000023]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 19.923857868020296], [1.69408146E12, 2.3333333333333335]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 17.8]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 14.940000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 6.119999999999999]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 4.444999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 36.64000000000005]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 10.83]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 133.33999999999995]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 3.7099999999999977]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 5.825000000000002]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 35.89500000000002]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 6.655000000000002]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 5.319999999999999], [1.69408146E12, 24.525714285714283]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 6.3599999999999985]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 155.0], [1.69408146E12, 706.7604166666666]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 28.434999999999988]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 10.154999999999998]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 8.995000000000001]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 16.195000000000007]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 16.25000000000001]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 15.666666666666675], [1.69408146E12, 39.22857142857143]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 15.360000000000007]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 9.235]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 7.165]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 9.925]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 4.415000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.6940814E12, 24.83177570093458], [1.69408146E12, 174.79569892473114]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 25.99499999999998]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 10.724999999999994]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 5.01]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 5.7449999999999966]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 43.78499999999998]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 25.524999999999988]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 5.005]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 28.220779220779225], [1.69408146E12, 14.739837398373979]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 23.48999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 18.60500000000001]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 75.64000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 7.58]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 7.18]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 11.73]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 8.934999999999999]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 15.230000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 18.025000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 26.43999999999999]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 21.659999999999993]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 24.455]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 6.834999999999997]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 9.006578947368418], [1.69408146E12, 16.95833333333333]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 57.87500000000001]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 10.139999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 7.250000000000005]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 4.119999999999999]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.6940814E12, 1894.8357142857142], [1.69408146E12, 473.08333333333337]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 4.144999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 15.02]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 6.814999999999998]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 7.8199999999999985]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 25.859999999999996]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408152E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 2.3333333333333335, "minX": 1.6940814E12, "maxY": 1872.3714285714295, "series": [{"data": [[1.69408146E12, 4.800000000000002]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 6.589999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 3.990000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 27.109999999999996]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 6.995000000000003]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 33.939655172413794], [1.69408146E12, 78.99999999999999]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 4.329999999999999]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 20.775000000000002]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 16.824999999999996]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 3.4749999999999996]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 10.396648044692736], [1.69408146E12, 11.333333333333334]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 4.499999999999998]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 75.37499999999993]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 16.930000000000007]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 7.855000000000001]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 3.695]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 11.53367875647669], [1.69408146E12, 3.5714285714285716]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 8.485000000000003]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 9.276595744680854], [1.69408146E12, 15.000000000000004]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 23.495]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 72.06349206349208], [1.69408146E12, 127.29729729729732]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 4.500000000000002]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 4.1049999999999995]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 9.29000000000001]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 9.420000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 4.7]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 58.31499999999999]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 23.033333333333342], [1.69408146E12, 19.009090909090908]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 7.859999999999999]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 5.190000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 22.060000000000016]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 30.950000000000003]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 19.923857868020296], [1.69408146E12, 2.3333333333333335]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 17.790000000000006]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 10.930000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 6.1049999999999995]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 4.444999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 36.61999999999999]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 7.655000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 15.245000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 3.6500000000000004]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 5.8050000000000015]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 9.835000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 6.609999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 5.319999999999999], [1.69408146E12, 24.525714285714283]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 6.145000000000002]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 6.5], [1.69408146E12, 71.59374999999999]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 9.819999999999995]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 10.14000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 8.954999999999997]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 15.550000000000002]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 16.079999999999988]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 15.666666666666675], [1.69408146E12, 39.22857142857143]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 15.274999999999999]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 9.219999999999997]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 6.995000000000004]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 9.89]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 4.4]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.6940814E12, 24.607476635514022], [1.69408146E12, 174.70967741935488]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 18.430000000000014]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 9.155000000000008]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 4.955]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 5.025]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 9.770000000000001]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 25.51499999999999]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 5.000000000000002]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 28.220779220779225], [1.69408146E12, 14.739837398373979]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 20.05499999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 13.505000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 75.64000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 7.315000000000001]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 7.16]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 11.724999999999996]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 5.169999999999998]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 12.280000000000008]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 15.680000000000001]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 19.18]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 21.469999999999995]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 24.320000000000004]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 6.830000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 8.861842105263156], [1.69408146E12, 16.916666666666668]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 21.91000000000002]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 9.725000000000001]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 6.704999999999996]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 4.0100000000000025]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.6940814E12, 1872.3714285714295], [1.69408146E12, 473.05000000000007]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 3.635]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 14.335000000000006]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 6.654999999999996]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 7.445]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 25.849999999999987]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408152E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6940814E12, "maxY": 1763.9428571428577, "series": [{"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 0.0], [1.69408146E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0], [1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0], [1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0], [1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 0.0], [1.69408146E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 6.811111111111111], [1.69408146E12, 0.290909090909091]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0], [1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 12.774999999999997]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0], [1.69408146E12, 9.668571428571427]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.6940814E12, 0.0], [1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 4.950000000000003], [1.69408146E12, 18.885714285714286]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.6940814E12, 0.0], [1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 11.25974025974026], [1.69408146E12, 1.056910569105691]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 58.820000000000014]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69408146E12, 2.1599999999999997]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 4.565000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.256578947368421], [1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.6940814E12, 1763.9428571428577], [1.69408146E12, 369.16666666666663]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69408146E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69408152E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69408146E12, 8.834999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408152E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.6940814E12, "maxY": 5629.0, "series": [{"data": [[1.69408152E12, 705.0], [1.6940814E12, 3864.0], [1.69408146E12, 5629.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69408152E12, 54.0], [1.6940814E12, 3640.0], [1.69408146E12, 127.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69408152E12, 239.3800000000001], [1.6940814E12, 3732.08], [1.69408146E12, 3994.8399999999965]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69408152E12, 101.0], [1.6940814E12, 3691.2], [1.69408146E12, 511.85000000000036]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69408152E12, 1.0], [1.6940814E12, 4.0], [1.69408146E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69408152E12, 3.0], [1.6940814E12, 130.0], [1.69408146E12, 5.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408152E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 2.0, "minX": 2.0, "maxY": 3657.0, "series": [{"data": [[2.0, 3.0], [40.0, 2.0], [49.0, 392.0], [59.0, 13.0], [71.0, 2.0], [75.0, 232.0], [76.0, 527.0], [78.0, 352.5], [82.0, 3657.0], [5.0, 21.0], [80.0, 140.0], [85.0, 2.0], [95.0, 1066.0], [106.0, 253.5], [117.0, 111.0], [116.0, 13.5], [122.0, 629.0], [125.0, 13.0], [126.0, 26.0], [128.0, 35.5], [134.0, 448.0], [132.0, 5.5], [146.0, 27.0], [155.0, 5.0], [173.0, 2.0], [182.0, 5.0], [180.0, 30.0], [190.0, 44.5], [186.0, 15.0], [191.0, 5.0], [188.0, 4.0], [199.0, 4.0], [198.0, 4.0], [195.0, 4.0], [194.0, 8.0], [196.0, 5.0], [197.0, 5.0], [192.0, 19.0], [193.0, 6.5], [200.0, 3.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 200.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 2.0, "minX": 2.0, "maxY": 3622.0, "series": [{"data": [[2.0, 3.0], [40.0, 2.0], [49.0, 19.0], [59.0, 6.0], [71.0, 2.0], [75.0, 23.0], [76.0, 61.5], [78.0, 158.5], [82.0, 3622.0], [5.0, 10.0], [80.0, 57.0], [85.0, 2.0], [95.0, 14.0], [106.0, 90.0], [117.0, 12.0], [116.0, 6.0], [122.0, 12.0], [125.0, 5.0], [126.0, 4.0], [128.0, 12.0], [134.0, 147.5], [132.0, 4.0], [146.0, 10.5], [155.0, 3.0], [173.0, 2.0], [182.0, 4.0], [180.0, 17.0], [190.0, 23.0], [186.0, 4.0], [191.0, 5.0], [188.0, 4.0], [199.0, 3.0], [198.0, 3.0], [195.0, 3.0], [194.0, 5.0], [196.0, 4.0], [197.0, 4.0], [192.0, 5.0], [193.0, 4.0], [200.0, 3.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 200.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 9.8, "minX": 1.6940814E12, "maxY": 174.18333333333334, "series": [{"data": [[1.69408152E12, 119.35], [1.6940814E12, 9.8], [1.69408146E12, 174.18333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408152E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 8.283333333333333, "minX": 1.6940814E12, "maxY": 175.7, "series": [{"data": [[1.69408152E12, 119.35], [1.6940814E12, 8.283333333333333], [1.69408146E12, 175.7]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69408152E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.6940814E12, "maxY": 3.3333333333333335, "series": [{"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs12_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 0.4166666666666667], [1.69408146E12, 2.9166666666666665]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-success", "isController": false}, {"data": [[1.6940814E12, 2.1], [1.69408146E12, 1.2333333333333334]], "isOverall": false, "label": "cssURL1_logiqids_HOME-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "cssURL1_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940814E12, 2.3333333333333335], [1.69408146E12, 1.0]], "isOverall": false, "label": "logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "logiqids_sign_up-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 1.2833333333333334], [1.69408146E12, 2.05]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs15_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs4_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs19_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs8_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs13_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.1333333333333333], [1.69408146E12, 0.2]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.216666666666667], [1.69408146E12, 0.11666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 1.5], [1.69408146E12, 1.8333333333333333]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs18_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 2.533333333333333], [1.69408146E12, 0.8]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940814E12, 1.9333333333333333], [1.69408146E12, 1.4]], "isOverall": false, "label": "cssURL2_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs14_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 2.9833333333333334], [1.69408146E12, 0.35]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs3_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs7_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs10_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "cssURL3_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940814E12, 1.7833333333333334], [1.69408146E12, 1.55]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs2_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.283333333333333], [1.69408146E12, 0.05]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs17_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 1.0], [1.69408146E12, 2.3333333333333335]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs6_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs11_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "cssURL2_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs1_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs5_logiqids_Login-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs16_logiqids_Login-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940814E12, 0.13333333333333333], [1.69408146E12, 3.2]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408152E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-success", "isController": false}, {"data": [[1.69408146E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs9_logiqids_Login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408152E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 8.283333333333333, "minX": 1.6940814E12, "maxY": 175.7, "series": [{"data": [[1.69408152E12, 119.35], [1.6940814E12, 8.283333333333333], [1.69408146E12, 175.7]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69408152E12, "title": "Total Transactions Per Second"}},
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
