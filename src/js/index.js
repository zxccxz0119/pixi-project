
var appWidth, appHeight;
if (window.innerWidth < 800) {
    appWidth = window.innerWidth;
    appHeight = window.innerHeight;
} else {
    appWidth = 800;
    appHeight = 600;
}
var app = new PIXI.Application(appWidth, appHeight, { backgroundColor: 0x1099bb });
document.getElementById('canvasIssue').appendChild(app.view);

PIXI.loader
    .add('./images/bg2.png')
    .load(init);

function init() {
    var container = new PIXI.Container();
    var dotPosition = [[10, 10], [30, 55], [50, 60], [70, 90], [90, 50]];

    var texture = PIXI.Texture.fromImage('./images/bg2.png');

    var proportion = texture.baseTexture.realWidth / texture.baseTexture.realHeight;
    var imgWidth = app.screen.height * proportion;
    var imgHeight = app.screen.height;


    var bunny = new PIXI.Sprite(texture);
    bunny.height = imgHeight;
    bunny.width = imgWidth;
    container.addChild(bunny);

    for (var i = 0; i < dotPosition.length; i++) {
        var graphics = new PIXI.Graphics();
        var x = imgWidth / 100 * dotPosition[i][0];
        var y = imgHeight / 100 * dotPosition[i][1];
        graphics.lineStyle(0);
        graphics.beginFill(0xFFFF0B, 0.5);
        graphics.drawCircle(x, y, 50);
        graphics.endFill();
        graphics.interactive = true;
        graphics.buttonMode = true;
        graphics
            .on('pointerdown', onClick)
            .on('pointerup', onClickEnd)
            .on('pointerupoutside', onClickEnd)

        container.addChild(graphics);
    }

    container.interactive = true;
    container.buttonMode = true;
    container
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    container.x = 0;
    container.y = 0;

    app.stage.addChild(container);

    function onDragStart(event) {
        this.data = event.data;
        this.dragging = true;
        this.dragPoint = event.data.getLocalPosition(this.parent);
        this.dragPoint.x -= this.x;
        this.dragPoint.y -= this.y;
        // console.log(event);
        console.log('ok')
    }

    function onDragEnd() {
        this.dragging = false;
        this.parentGroup = this.oldGroup;
        this.data = null;
    }

    function onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            var pointX = newPosition.x - this.dragPoint.x;
            var issue = app.screen.width - imgWidth;
            if (pointX > 0) {
                this.x = 0;
            } else if (pointX < issue) {
                this.x = issue;
            } else {
                this.x = pointX;
            }
            // this.x = newPosition.x - this.dragPoint.x;
            // this.y = newPosition.y - this.dragPoint.y;
        }
    }
    function onClick(e) {
        this.alpha = 1.5;
    }
    function onClickEnd(e) {
        this.alpha = 1;
    }

}

