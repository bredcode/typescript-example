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
        "ok": "    1,617",
        "ko": "        0"
    },
    "maxResponseTime": {
        "total": "   60,019",
        "ok": "   59,468",
        "ko": "   60,019"
    },
    "meanResponseTime": {
        "total": "   13,089",
        "ok": "   31,012",
        "ko": "   12,439"
    },
    "standardDeviation": {
        "total": "   24,344",
        "ok": "   16,982",
        "ko": "   24,323"
    },
    "percentiles1": {
        "total": "        1",
        "ok": "   30,969",
        "ko": "        1"
    },
    "percentiles2": {
        "total": "       16",
        "ok": "   46,227",
        "ko": "       14"
    },
    "percentiles3": {
        "total": "   60,013",
        "ok": "   57,846",
        "ko": "   60,013"
    },
    "percentiles4": {
        "total": "   60,018",
        "ok": "   59,468",
        "ko": "   60,016"
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
        "ok": "    1,617",
        "ko": "        0"
    },
    "maxResponseTime": {
        "total": "   60,019",
        "ok": "   59,468",
        "ko": "   60,019"
    },
    "meanResponseTime": {
        "total": "   13,089",
        "ok": "   31,012",
        "ko": "   12,439"
    },
    "standardDeviation": {
        "total": "   24,344",
        "ok": "   16,982",
        "ko": "   24,323"
    },
    "percentiles1": {
        "total": "        1",
        "ok": "   30,969",
        "ko": "        1"
    },
    "percentiles2": {
        "total": "       16",
        "ok": "   46,227",
        "ko": "       15"
    },
    "percentiles3": {
        "total": "   60,013",
        "ok": "   57,846",
        "ko": "   60,013"
    },
    "percentiles4": {
        "total": "   60,018",
        "ok": "   59,468",
        "ko": "   60,016"
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
