var wrapperNode = document.getElementById('wrapper')
var scrollDownNode = document.querySelector('.scroll-down')
var linkNodes = document.querySelector('.links')

var vh = window.innerHeight

/* STORE SOME KEY LOCATIONS */

/* ~ le fin ~
 * The point where you cannot scroll down any further.
 */
var fin = wrapperNode.clientHeight - vh + linkNodes.clientHeight

function calculateAnimations() {
  return [
    /* animate Ds */
    { range: [-1, fin * 0.5],   selector: ['.d'], type: 'scale', style: 'transform:translateY', from: 0, to: 25, unit: 'px' },
    { range: [fin * 0.5, fin],  selector: ['.d'], type: 'scale', style: 'transform:translateY', from: 25, to: 0, unit: 'px' },
    { range: [fin * 0.4, fin],  selector: ['.d'], type: 'change', style: 'color', to: '#ffb515'},

    /* animate Ss */
    { range: [-1, fin * 0.5],   selector: ['.s'], type: 'scale', style: 'transform:translateY', from: 0, to: 25, unit: 'px' },
    { range: [fin * 0.5, fin],  selector: ['.s'], type: 'scale', style: 'transform:translateY', from: 25, to: 0, unit: 'px' },
    { range: [fin * 0.4, fin],  selector: ['.s'], type: 'change', style: 'color', to: '#1fd1ec'},

    /* animate Ns */
    { range: [-1, fin * 0.5],   selector: '.n', type: 'scale', style: 'transform:scaleX', from: 1, to: 0.5 },
    { range: [-1, fin * 0.5],   selector: '.n', type: 'scale', style: 'transform:scaleY', from: 1, to: 0.5 },
    { range: [fin * 0.5, fin],  selector: '.n', type: 'scale', style: 'transform:scaleX', from: 0.5, to: 1 },
    { range: [fin * 0.5, fin],  selector: '.n', type: 'scale', style: 'transform:scaleY', from: 0.5, to: 1 },
    { range: [fin * 0.3, fin],  selector: '.n', type: 'change', style: 'color', to: '#1fd1ec' },

    /* animate Rs */
    { range: [fin * 0.1, fin],  selector: '.r', type: 'randomizeColor' },

    /* animate Ls */
    { range: [-1, fin * 0.5],   selector: '.l', type: 'scale', style: 'transform:rotateX', from: 0, to: 90, unit: 'deg' },
    { range: [fin * 0.5, fin],  selector: '.l', type: 'scale', style: 'transform:rotateX', from: 90, to: 0, unit: 'deg' },
    { range: [fin * 0.3, fin],  selector: '.l', type: 'change', style: 'color', to: '#8382f9' },

    /* animate Es */
    { range: [fin * 0.3, fin],  selector: '.e', type: 'change', style: 'color', to: '#ff1b9b' },

    /* animate Js */
    { range: [-1, fin * 0.5],   selectors: ['.g', '.j'], type: 'scale', style: 'transform:rotateZ', from: 0, to: 180, unit: 'deg' },
    { range: [fin * 0.5, fin],  selectors: ['.g', '.j'], type: 'scale', style: 'transform:rotateZ', from: 180, to: 360, unit: 'deg' },
    { range: [fin * 0.4, fin],  selectors: ['.g', '.j'], type: 'change', style: 'color', to: '#ff8b1c' },

    /* animate As */
    { range: [-1, fin * 0.5],   selectors: ['.a'], type: 'scale', style: 'transform:rotateZ', from: 0, to: -180, unit: 'deg' },
    { range: [fin * 0.5, fin],  selectors: ['.a'], type: 'scale', style: 'transform:rotateZ', from: -180, to: -360, unit: 'deg' },
    { range: [fin * 0.4, fin],  selectors: ['.a'], type: 'change', style: 'color', to: '#c05bdb' },

    /* animate Os */
    { range: [-1, fin * 0.5],   selectors: ['.o', '.dash'], type: 'scale', style: 'opacity', from: 1, to: 0.1 },
    { range: [fin * 0.5, fin],  selectors: ['.o', '.dash'], type: 'scale', style: 'opacity', from: 0.1, to: 1 },
    { range: [fin * 0.4, fin],  selectors: ['.o', '.dash'], type: 'change', style: 'color', to: '#ff537c' },

    /* animate line */
    { range: [-1, fin],         selector: '.line', type: 'scale', style: 'width', from: 0.01, to: 50, unit: '%' },
    { range: [-1, fin],         selector: '.line', type: 'scale', style: 'opacity', from: 0, to: 1 },

    /* animate arrow */
    { range: [0.6 * fin, fin], selector: '.scroll-down', type: 'scale', style: 'opacity', from: 1, to: 0 },
    { range: [fin - 30, fin],   selector: '.scroll-down', type: 'change', style: 'display', to: 'none' },

    /* animate links */
    { range: [0.8 * fin, fin], selector: '.links', type: 'scale', style: 'opacity', from: 0, to: 1 },
  ]
}

// Instantiate choreographer.
var choreographer = new Choreographer({
  animations: calculateAnimations(),
  customFunctions: {
    randomizeColor: function(data) {
      var chars = '0123456789abcdef'.split('')
      var hex = '#'

      while (hex.length < 7) {
        hex += chars[Math.round(Math.random() * (chars.length - 1))]
      }

      data.node.style.color = hex
    }
  }
})

function animate() {
  var scrollPosition = (wrapperNode.getBoundingClientRect().top - wrapperNode.offsetTop) * -1
  choreographer.runAnimationsAt(scrollPosition)
}

document.body.addEventListener('scroll', animate)

animate()

window.addEventListener('resize', function() {
  choreographer.updateAnimations(calculateAnimations())
})

