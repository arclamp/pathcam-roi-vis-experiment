console.log('hi');

const canvas = document.getElementById('canvas');
if (!canvas.getContext) {
  throw new Error('canvas not supported in this browser.');
}
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(200 0 0)';
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = 'rgb(0 0 200 / 50%)';
ctx.fillRect(30, 30, 50, 50);
