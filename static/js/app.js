function buildMetadata(sample) {

    // Use `d3.json` to fetch the metadata for a sample
    d3.json('/metadata/' + sample).then(dict => {
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var metadataPanel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");
    var metadataList = metadataPanel.append("ul");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(dict).forEach(item => {
        metadataList.append("li").text(item[0] + ' : ' + item[1]);
    });

  });
   
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json('/samples/' + sample).then(dict => {
      var pieTrace = {
        "values" : dict.sample_values.slice(0,10),
        "labels" : dict.otu_ids.slice(0,10),
        "hovertext" : dict.otu_labels.slice(0,10),
        "hoverinfo" : "text",
        "type" : "pie"
      };

      var pieLayout = {  
        height : 500,
        width : 500,
        margin : {'l': 0, 'r': 100, 't': 0, 'b': 0},
      };

      Plotly.newPlot("pie", [pieTrace], pieLayout);

      var bubbleTrace = {
        x: dict.otu_ids,
        y: dict.sample_values,
        text: dict.otu_labels,
        mode: 'markers',
        marker: {
          size: dict.sample_values,
          sizemode: 'area',
          sizeref: 2.0 * Math.max(parseInt(dict.sample_values)) / (150**2),
          color: dict.otu_ids
        }
      };

      var bubbleLayout = {
        autosize : false,
        height : 500,
        width : 1500
      };
      Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
    });

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    buildWashGauge(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  buildWashGauge(newSample);
}

// Initialize the dashboard
init();
