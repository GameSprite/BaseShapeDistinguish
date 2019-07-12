/****************************************************
 * 屏幕中根据触点绘制图形，收集绘制过程中的数据
 * Edit by : ChenGuanzhou (chenguanzhou@huohua.cn)
 * Create at : 2019-07-12 16:26:32
 *****************************************************/
function Point(position, timeStamp) {
    return { position, timeStamp };
}
cc.Class({
    extends: cc.Component,
    editor: { requireComponent: cc.Graphics },
    onLoad() {
        this.bindMemberVariables();
        this.bindTouchEventHandler();
    },
    bindMemberVariables() {
        this._graphics = this.getComponent(cc.Graphics);
        this._drawedStrokeArray = [];
    },
    bindTouchEventHandler() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd.bind(this));
    },
    onTouchStart(e) {
        this._latestStrokePoints = [];
        const p = this._pInWorld2NodeSpace(e.getLocation());
        this._graphics.moveTo(p.x, p.y);
    },
    onTouchMove(e) {
        if (e.getDelta().mag() < 0.1) {
            return;
        }

        const p = this._pInWorld2NodeSpace(e.getLocation());
        this._latestStrokePoints.push(Point(p, Date.now()));

        this._graphics.lineTo(p.x, p.y);
        this._graphics.stroke();
    },
    onTouchEnd(e) {
        this._drawedStrokeArray.push(this._latestStrokePoints);
    },
    A_ClickCheckBtn() {
        this._graphics.clear();
        this._drawedStrokeArray = [];
    },
    _pInWorld2NodeSpace(worldP) {
        return this.node.convertToNodeSpaceAR(worldP);
    }
});
