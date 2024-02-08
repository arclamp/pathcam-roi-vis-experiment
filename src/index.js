const canvas = document.getElementById('canvas');
if (!canvas.getContext) {
  throw new Error('canvas not supported in this browser.');
}
const ctx = canvas.getContext('2d');

async function loadData() {
  const response = await fetch('/roi_data.json');
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();
  console.log('rawData', data);

  // Determine the bounds of the data.
  const initBounds = {
    x0: Infinity,
    x1: -Infinity,
    y0: -Infinity,
    y1: Infinity,
  };
  const bounds = data.map((e) => ({
    x0: e.visibleArea.bl.x,
    x1: e.visibleArea.br.x,
    y0: e.visibleArea.bl.y,
    y1: e.visibleArea.tl.y,
  })).reduce((acc, cur) => ({
    x0: Math.min(acc.x0, cur.x0),
    x1: Math.max(acc.x1, cur.x1),
    y0: Math.max(acc.y0, cur.y0),
    y1: Math.min(acc.y1, cur.y1),
  }), initBounds);

  console.log('bounds', bounds);

  // Statically map the data into the canvas dimensions.
  const xSquish = canvas.width / (bounds.x1 - bounds.x0)
  const ySquish = canvas.height / (bounds.y1 - bounds.y0)

  const transformX = (x) => (x - bounds.x0) * xSquish;
  const transformY = (y) => (y - bounds.y0) * ySquish;

  mappedData = data.map((e) => ({
    x: transformX(e.visibleArea.bl.x),
    y: transformY(e.visibleArea.bl.y),
    w: transformX(e.visibleArea.br.x - e.visibleArea.bl.x),
    h: transformX(e.visibleArea.bl.y - e.visibleArea.tl.y),
  }));

  console.log('mapped data', mappedData);

  return mappedData;
}

function draw() {
  ctx.fillStyle = 'rgb(200 0 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgb(0 0 200 / 50%)';
  ctx.fillRect(30, 30, 50, 50);
}

(async () => {
  draw();

  const data = await loadData();
})();
