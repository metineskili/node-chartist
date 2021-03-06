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
       
        if (context.type === 'line') {
            // With the Chartist.Svg API we can easily set an attribute on our bar that just got drawn
            context.element.attr({
                // Now we set the style attribute on our bar to override the default color of the bar. By using a HSL colour we can easily set the hue of the colour dynamically while keeping the same saturation and lightness. From the context we can also get the current value of the bar. We use that value to calculate a hue between 0 and 100 degree. This will make our bars appear green when close to the maximum and red when close to zero.
                style: 'stroke: skyblue; background-color: skyblue; stroke-width:4px; fill:none;'
            });
        }
    else if (context.type === 'point') {
            // With the Chartist.Svg API we can easily set an attribute on our bar that just got drawn
            context.element.attr({
                // Now we set the style attribute on our bar to override the default color of the bar. By using a HSL colour we can easily set the hue of the colour dynamically while keeping the same saturation and lightness. From the context we can also get the current value of the bar. We use that value to calculate a hue between 0 and 100 degree. This will make our bars appear green when close to the maximum and red when close to zero.
                style: 'stroke: skyblue; background-color: skyblue; stroke-width:10px; stroke-linecap:round'
            });
        }
    else if (context.type === 'grid') {
            // With the Chartist.Svg API we can easily set an attribute on our bar that just got drawn
            context.element.attr({
                // Now we set the style attribute on our bar to override the default color of the bar. By using a HSL colour we can easily set the hue of the colour dynamically while keeping the same saturation and lightness. From the context we can also get the current value of the bar. We use that value to calculate a hue between 0 and 100 degree. This will make our bars appear green when close to the maximum and red when close to zero.
                style: 'stroke:rgba(0, 0, 0, .2); stroke-width:1px; stroke-dasharray:2px;'
            });
        }
    else if (context.type === 'label') {
            // With the Chartist.Svg API we can easily set an attribute on our bar that just got drawn
            context.element.attr({
                // Now we set the style attribute on our bar to override the default color of the bar. By using a HSL colour we can easily set the hue of the colour dynamically while keeping the same saturation and lightness. From the context we can also get the current value of the bar. We use that value to calculate a hue between 0 and 100 degree. This will make our bars appear green when close to the maximum and red when close to zero.
                style: 'text-align:left; fill:rgba(0, 0, 0, .4); color:rgba(0, 0, 0, .4); font-size:.75rem; line-height:1; text-anchor:end'
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
