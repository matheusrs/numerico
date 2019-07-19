const DIGITS = 6
// var options = {
//     chart: {
//         type: 'line',
//         stacked: false,
//         height: 400,
//         zoom: {
//             type: 'x',
//             enabled: true,
//             autoScaleYaxis: true
//         },
//         toolbar: {
//             show: true,
//             tools: {
//                 download: true,
//                 selection: true,
//                 zoom: true,
//                 zoomin: true,
//                 zoomout: true,
//                 pan: true,
//                 // reset: false | '<img src="/static/icons/reset.png" width="20">',
//                 customIcons: []
//             },
//             autoSelected: 'zoom'
//         },
//         markers: {
//             size: 0,
//         },
//     },
//     yaxis: {
//         labels: {
//             formatter: (value) => { return value },
//         },
//     },
//     
//     series: [{
//         name: 'sales',
//         data: []
//     }],
//     xaxis: {
//         categories: []
//     }
// }

var options = {
    chart: {
        type: 'line',
        height: 350,
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            tools: {
                pan: false,
                reset: false
            },            
            autoSelected: 'zoom'
        }
    },
    dataLabels: {
        enabled: false
    },
    series: [{
        name: 'Raíz Encontrada',
        data: []
    }],
    markers: {
        size: 0,
    },
    title: {
        align: 'left'
    },
    yaxis: {
        labels: {
            formatter: (value) => { return value.toFixed(2) },
        },
        title: {
            text: 'Raíz'
        },
    },
    xaxis: {
        type: 'numeric',
        title: {
            text: 'N'
        },
    },
    tooltip: {
        x: {
            formatter: (value) => { return value },
        },
        y: {
            formatter: (value) => { return value },
        },
    },
}

var chart = new ApexCharts(document.querySelector("#chart"), options);
var accordion = new Accordion({
    element: "accordion",    // ID of the accordion container
    openTab: 1,              // [optional] Accordion tab to start opened with. All tabs closed if not set.
});
chart.render();