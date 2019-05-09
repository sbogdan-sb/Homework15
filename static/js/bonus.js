function buildWashGauge (sample) {
    d3.json('/metadata/' + sample).then(dict => {

        var level = dict.WFREQ;

        // Trig to calc meter point
        var degrees = 180 - (level * 20),
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
            x: [0], 
            y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'washes',
            text: level,
            hoverinfo: 'text+name'},
            { values: [10/6, 10/6, 10/6, 10/6, 10/6, 10/6, 10/6, 10/6, 10/6, 90/6],
            rotation: 90,
            text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3',
                    '1-2', '0-1', ''],
            textinfo: 'text',
            textposition:'inside',
            marker: {colors:['rgba(0, 255, 0, .8)', 'rgba(64, 255, 0, .8)', 'rgba(128, 255, 0, .8)',
                            'rgba(190, 255, 0, .8)', 'rgba(255, 255, 0, .8)', 'rgba(255, 190, 0, .8)',
                            'rgba(255, 128, 0, .8)', 'rgba(255, 64, 0, .8)',
                            'rgba(255, 0, 0, .8)', 'rgba(255, 255, 255, 0)']},
            labels: ['8-9', '7-8', '6-7','5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 600,
        width: 550,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);
            })
        }
