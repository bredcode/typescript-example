var stats = {
    type: "GROUP",
name: "All Requests",
path: "",
pathFormatted: "group_missing-name--1146707516",
stats: {
    "name": "All Requests",
    "numberOfRequests": {
        "total": "    1,000",
        "ok": "        0",
        "ko": "    1,000"
    },
    "minResponseTime": {
        "total": "        2",
        "ok": "        -",
        "ko": "        2"
    },
    "maxResponseTime": {
        "total": "      910",
        "ok": "        -",
        "ko": "      910"
    },
    "meanResponseTime": {
        "total": "       47",
        "ok": "        -",
        "ko": "       47"
    },
    "standardDeviation": {
        "total": "      158",
        "ok": "        -",
        "ko": "      158"
    },
    "percentiles1": {
        "total": "        3",
        "ok": "        -",
        "ko": "        3"
    },
    "percentiles2": {
        "total": "        4",
        "ok": "        -",
        "ko": "        4"
    },
    "percentiles3": {
        "total": "      446",
        "ok": "        -",
        "ko": "      446"
    },
    "percentiles4": {
        "total": "      821",
        "ok": "        -",
        "ko": "      821"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 0,
    "percentage": 0.0
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0.0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0.0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 1000,
    "percentage": 100.0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "    83.33",
        "ok": "        -",
        "ko": "    83.33"
    }
},
contents: {
"req_lotto-api-reque-1053992341": {
        type: "REQUEST",
        name: "Lotto API Request",
path: "Lotto API Request",
pathFormatted: "req_lotto-api-reque-1053992341",
stats: {
    "name": "Lotto API Request",
    "numberOfRequests": {
        "total": "    1,000",
        "ok": "        0",
        "ko": "    1,000"
    },
    "minResponseTime": {
        "total": "        2",
        "ok": "        -",
        "ko": "        2"
    },
    "maxResponseTime": {
        "total": "      910",
        "ok": "        -",
        "ko": "      910"
    },
    "meanResponseTime": {
        "total": "       47",
        "ok": "        -",
        "ko": "       47"
    },
    "standardDeviation": {
        "total": "      158",
        "ok": "        -",
        "ko": "      158"
    },
    "percentiles1": {
        "total": "        3",
        "ok": "        -",
        "ko": "        3"
    },
    "percentiles2": {
        "total": "        4",
        "ok": "        -",
        "ko": "        4"
    },
    "percentiles3": {
        "total": "      446",
        "ok": "        -",
        "ko": "      446"
    },
    "percentiles4": {
        "total": "      821",
        "ok": "        -",
        "ko": "      821"
    },
    "group1": {
    "name": "t < 800 ms",
    "htmlName": "t < 800 ms",
    "count": 0,
    "percentage": 0.0
},
    "group2": {
    "name": "800 ms <= t < 1200 ms",
    "htmlName": "t >= 800 ms <br> t < 1200 ms",
    "count": 0,
    "percentage": 0.0
},
    "group3": {
    "name": "t >= 1200 ms",
    "htmlName": "t >= 1200 ms",
    "count": 0,
    "percentage": 0.0
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 1000,
    "percentage": 100.0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "    83.33",
        "ok": "        -",
        "ko": "    83.33"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
