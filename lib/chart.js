const capitalize = require('underscore.string/capitalize');
const co = require('co');
const renderAxisTitles = require('./axis-title');

/**
 * Generate Chart HTML
 * @param  {String} type
 *         bar, line, pie
 * @return {Promise{String}} html
 */
const generate = co.wrap(function * (Chartist, window, type, options, data) {
  type = capitalize(type);
  if (!Chartist[type]) throw new TypeError(`Unsupported chart type: ${type}`);
  const container = window.document.createElement('div');
  const chart = new Chartist[type](container, data, options);
  chart.on('draw', function (context) {
        // First we want to make sure that only do something when the draw event is for bars. Draw events do get fired for labels and grids too.
        console.log(context.type)
        if (context.type === 'line') {
            // With the Chartist.Svg API we can easily set an attribute on our bar that just got drawn
            context.element.attr({
                // Now we set the style attribute on our bar to override the default color of the bar. By using a HSL colour we can easily set the hue of the colour dynamically while keeping the same saturation and lightness. From the context we can also get the current value of the bar. We use that value to calculate a hue between 0 and 100 degree. This will make our bars appear green when close to the maximum and red when close to zero.
                style: 'stroke: skyblue; background-color: skyblue;'
            });
        }
    });
    
  const event = yield new Promise(resolve => chart.on('created', resolve));
  chart.axisX = event.axisX;
  chart.axisY = event.axisY;
  renderAxisTitles(Chartist, chart);
  chart.detach();
  return container.innerHTML;
});

module.exports = generate;
