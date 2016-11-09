var outlines, length, styles, keyframes, svg, del, dur, animationDuration;

outlines = document.getElementsByClassName("a");

//set duration + delay for individual components
dur = 800;
del = 300;

styles = [];

for (var i = 0; i < outlines.length; i++) {
  curLength = outlines[i].getTotalLength();
  
  styles.push(
    {
      class: '.a:nth-child(' + (i + 1) + ')',
      keyframesName: 'drawline-' + (i + 1),
      strokeDashOffset: curLength,
      duration: dur + "ms",
      delay: del * i + "ms"
    }
  );
}

animationDuration = styles.length * del + (dur - del) - 300; // some overlapping (300ms) between transitions

function generateStyles() {
  var output = '';
  for (var y = 0; y < styles.length; y++) {
    console.log(styles[y].class);
    output += "@keyframes " + styles[y].keyframesName;
    output += "{from {stroke-dashoffset: " + styles[y].strokeDashOffset + ";}";
    output += "to {stroke-dashoffset: 0;}}";
    output += "@-webkit-keyframes " + styles[y].keyframesName;
    output += "{from {stroke-dashoffset: " + styles[y].strokeDashOffset + ";}";
    output += "to {stroke-dashoffset: 0;}}";
    output += styles[y].class;
    output += "{stroke-dasharray: " + styles[y].strokeDashOffset +";";
    output += "stroke-dashoffset: " + styles[y].strokeDashOffset +";";
    output += "-webkit-animation: " + styles[y].duration + " " + styles[y].keyframesName + " ease-out " + styles[y].delay + " forwards;";
    output += "animation: " + styles[y].duration + " " + styles[y].keyframesName + " ease-out " + styles[y].delay + " forwards;}";
  }
  return output;
}

keyframes = document.getElementById('keyframes');

svg = document.getElementById('svg');


setTimeout(function() {svg.classList.add('active');},  animationDuration);
keyframes.innerHTML = generateStyles();

