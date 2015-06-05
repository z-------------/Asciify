# asciify

A JavaScript library that turns images into ascii art.

## Demo

Clone this repo and navigate to the `demo` directory in your browser, where you will find file input and webcam examples.

## How to use it

asciify is actually really easy to use. All you have to do is call `asciify.asciify(image)`, with other options optional.

### `asciify.asciify(image, options)`

#### `image`

| type | optional? | description |
|------|-----------|-------------|
| `Image` or `HTMLImageElement` or `HTMLCanvasElement` | no | The image to turn into ascii art. |

#### `options`

| type | optional? |
|------|-----------|
| `Object` | yes |

##### Properties of `options`

| key | type | optional? | description | default |
|-----|------|-----------|-------------|---------|
| **`width`** | `Number` | yes | The width of the output ascii art in characters. | `100` |
| **`map`** | `String` | yes | A string describing which characters maps to which brightness. More about this below. | `asciify.maps.TEN` |
| **`resolutionY`** | `Number` | yes | How much the image should be shrinked vertically to account for output line height | `0.6` |

##### `options.map`

This is a string that defines which character should represent which brightness of the image. This string can be of **any length**. It **starts with lowest brightness** and **ends with highest brightness**.

For example, these are a few of the default maps that asciify comes with (note the spaces at the ends):

| name | map |
|------|-----|
| `asciify.maps.TEN` | `"@#%*+=-:. "` |
| `asciify.maps.FIVE` | `"@=:. "` |
| `asciify.maps.TWO` | `"@ "` |

## Examples

```javascript
var imageElem = document.querySelector("#myimage");
var asciified = asciify.asciify(imageElem, {
    width: 500,
    resolutionY: 1,
    map: " .:-=+*%#@" // inverted colors
});
```