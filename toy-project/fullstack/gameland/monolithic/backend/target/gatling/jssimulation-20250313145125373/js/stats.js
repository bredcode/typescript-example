var stats = {
    type: "GROUP",
name: "All Requests",
path: "",
pathFormatted: "group_missing-name--1146707516",
stats: {
    "name": "All Requests",
    "numberOfRequests": {
        "total": "    1,000",
        "ok": "       35",
        "ko": "      965"
    },
    "minResponseTime": {
        "total": "        0",
        "ok": "    2,980",
        "ko": "        0"
    },
    "maxResponseTime": {
        "total": "   60,016",
        "ok": "   58,397",
        "ko": "   60,016"
    },
    "meanResponseTime": {
        "total": "   14,817",
        "ok": "   30,648",
        "ko": "   14,242"
    },
    "standardDeviation": {
        "total": "   25,446",
        "ok": "   16,471",
        "ko": "   25,528"
    },
    "percentiles1": {
        "total": "        1",
        "ok": "   30,616",
        "ko": "        1"
    },
    "percentiles2": {
        "total": "   24,233",
        "ok": "   45,256",
        "ko": "    8,526"
    },
    "percentiles3": {
        "total": "   60,012",
        "ok": "   56,800",
        "ko": "   60,011"
    },
    "percentiles4": {
        "total": "   60,014",
        "ok": "   58,397",
        "ko": "   60,015"
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
    "count": 35,
    "percentage": 3.5000000000000004
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 965,
    "percentage": 96.5
},
    "meanNumberOfRequestsPerSecond": {
        "total": "    15.62",
        "ok": "     0.55",
        "ko": "    15.08"
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
        "ok": "       35",
        "ko": "      965"
    },
    "minResponseTime": {
        "total": "        0",
        "ok": "    2,980",
        "ko": "        0"
    },
    "maxResponseTime": {
        "total": "   60,016",
        "ok": "   58,397",
        "ko": "   60,016"
    },
    "meanResponseTime": {
        "total": "   14,817",
        "ok": "   30,648",
        "ko": "   14,242"
    },
    "standardDeviation": {
        "total": "   25,446",
        "ok": "   16,471",
        "ko": "   25,528"
    },
    "percentiles1": {
        "total": "        1",
        "ok": "   30,616",
        "ko": "        1"
    },
    "percentiles2": {
        "total": "   24,309",
        "ok": "   45,256",
        "ko": "    3,632"
    },
    "percentiles3": {
        "total": "   60,013",
        "ok": "   56,800",
        "ko": "   60,010"
    },
    "percentiles4": {
        "total": "   60,014",
        "ok": "   58,397",
        "ko": "   60,015"
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
    "count": 35,
    "percentage": 3.5000000000000004
},
    "group4": {
    "name": "failed",
    "htmlName": "failed",
    "count": 965,
    "percentage": 96.5
},
    "meanNumberOfRequestsPerSecond": {
        "total": "    15.62",
        "ok": "     0.55",
        "ko": "    15.08"
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
