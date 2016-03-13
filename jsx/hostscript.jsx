
function documentID() {

   return app.activeDocument.name;

}


function padding(y, x,border) {

    y       = typeof y !== 'undefined' ? y : 0;
    x       = typeof x !== 'undefined' ? x : 0;
    border  = typeof border !== 'undefined' ? border : 0;


    var activeLayer = app.activeDocument.activeLayer
    if (!activeLayer.layers || activeLayer.layers.length < 1) {
        alert('Please create a Group with a Text and a Shape');
    } else {
        for (var i = 0; i < activeLayer.layers.length; i++) {
            var layer = activeLayer.layers[i]
            var kind = layer.kind;
            var textBounds = '';
            if (kind === LayerKind.TEXT) {
                layer.textItem.kind = TextType.POINTTEXT

                //layer.textItem.kind = TextType.PARAGRAPHTEXT;
                var textBounds = layer.bounds;
                var textX = textBounds[0].value;
                var textY = textBounds[1].value;
                //Get the height and width of the current layer TEXT
                var textHeight = (textBounds[3].value - textBounds[1].value);
                var textWidth = (textBounds[2].value - textBounds[0].value);
                var nextLayer = activeLayer.layers[i + 1];
                resizeToBounds(nextLayer, (x * 2)  + textWidth + (border *2) , (y * 2) + textHeight   + (border *2), false)

                var buttonBounds = nextLayer.bounds;
                //Calculate Position
                var deltaX = (textX - buttonBounds[0].value)  - (border)
                var deltaY = (textY - buttonBounds[1].value)-  (border)
                //move to calculated position
                nextLayer.translate(deltaX - x , deltaY - y );

            }




        }
    }

}

var promptUser = false;

/**
 * Default resize width (null to disable).
 * @type {Number}
 */
var defWidth = 80;

/**
 * Default resize height (null to disable).
 * @type {Number}
 */
var defHeight = 80;

/**
 * Constrain proportions (keep aspect ratio)?
 * @type {Boolean}
 */
var defConstrain = true;

/**
 * Target width.
 * @type {Number}
 */
var width;

/**
 * Target height.
 * @type {Number}
 */
var height;

/**
 * Constrain proportions?
 * @type {Boolean}
 */
var constrain;

/**
 * Ruler unit type used before executing this script.
 * @type {Number}
 */
var rulerUnits;

/**
 * Resizes the currently active layer.
 * @param  {Number} width Resize width (bounding box).
 * @param  {Number} height Resize height (bounding box).
 * @param  {Number} constrain Constrain proportions (keep aspect ratio)?
 */
function resizeToBounds(layer, width, height, constrain) {
    /**
     * Active layer bounds.
     * @param {UnitValue} layerBounds
     */
    var layerBounds;

    /**
     * Active layer width.
     * @type {Number}
     */
    var layerWidth;

    /**
     * Active layer height.
     * @type {Number}
     */
    var layerHeight;

    /**
     * Width resizing scale (if given).
     * @type {Number}
     */
    var scaleWidth;

    /**
     * Height resizing scale (if given).
     * @type {Number}
     */
    var scaleHeight;

    /**
     * Mutual scale used if proportions should be constrained.
     * @type {Number}
     */
    var scale;

    /**
     * New layer width expressed in percentages compared to the initial width (Photoshop loooooves percentages :'()
     * @type {Number}
     */
    var newWidth;

    /**
     * New layer height expressed in percentages compared to the initial height (did I mention that Photoshop loooooves percentages?)
     * @type {Number}
     */
    var newHeight;

    layerBounds = layer.bounds;
    layerWidth = layerBounds[2].value - layerBounds[0].value;
    layerHeight = layerBounds[3].value - layerBounds[1].value;

    // Resizing scales... At least those which we can calculate...
    if (width) {
        scaleWidth = width / layerWidth;
    }
    if (height) {
        scaleHeight = height / layerHeight;
    }


    if (constrain) {
        // Aspect ratio should be kept during resize (using a mutual scale) and still fit into the target bounding box.
        if (!width || !height) {
            // At least one of the target dimensions is missing, using the available one for scale.
            if (!width) {
                scale = scaleHeight;
            } else {
                scale = scaleWidth;
            }
        } else {
            // Both dimensions are available.
            if (scaleWidth >= scaleHeight) {
                scale = scaleHeight;
            } else {
                scale = scaleWidth;
            }
        }
        newWidth = scale * 100;
        newHeight = scale * 100;
    } else {
        // No aspect ratio constrains set - resizing by width and height (both values are percentages!).
        newWidth = scaleWidth * 100;
        newHeight = scaleHeight * 100;
    }

    // Performing the resize.
    layer.resize(newWidth, newHeight, AnchorPosition.MIDDLECENTER);
}



