# Asciify

A JavaScript library that turns images into ascii art.

## Demo

Clone this repo and navigate to the `demo` directory in your browser, which contains file input and realtime webcam examples.

## How to use it

All you have to do is `new Asciify(image, options)`. This returns an `Asciify` instance which has the method `asciify()`, which computes and returns the output string.

### `new Asciify(image, options)`

#### `image`

| type | required? | description |
|------|-----------|-------------|
| `Image` or `HTMLCanvasElement` or `HTMLImageElement` or `HTMLVideoElement` | yes | The image to turn into ascii art. |

#### `options`

| type | required? |
|------|-----------|
| `Object` | no |

##### Properties of `options`

| key | type | required? | description | default |
|-----|------|-----------|-------------|---------|
| **`width`** | `Number` | no | The width of the output ascii art in characters. | `100` |
| **`map`** | `String` | no | A string describing which characters maps to which brightness. More about this below. | `Asciify.maps.TEN` |
| **`resolutionY`** | `Number` | no | How much the image should be shrunk vertically to account for output line height | `0.6` |

##### `options.map`

This is a string that defines which character should represent which brightness of the image. This string can be of any length. It starts with lowest brightness and ends with highest brightness.

These are the default maps that Asciify comes with (note the spaces at the ends):

| name | map |
|------|-----|
| `Asciify.maps.TEN` | `"@#%*+=-:. "` |
| `Asciify.maps.FIVE` | `"@=:. "` |
| `Asciify.maps.TWO` | `"@ "` |

## Examples

```javascript
let imageElem = document.getElementById("myimage")
let asc = new Asciify(imageElem, {
    width: 500,
    resolutionY: 1,
    map: " .:-=+*%#@" // inverted colors
})
let asciified = asc.asciify() // output
```

There are a file input example and a realtime webcam example in the `demo` directory.
