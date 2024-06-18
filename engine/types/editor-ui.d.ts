declare module gui {
    interface IUIPackage {
        isPlaying: boolean;
        isPreview: boolean;
        assetDb: IAssetDb;
        i18nProvider: import("i18next").i18n;
        language: string;
        readonly resourceMgr: IResourceManager;
        createWidget<T extends Widget>(url: string, options?: Record<string, any>, errors?: Array<any>): Promise<T>;
        createWidgetSync<T extends Widget>(url: string, options?: Record<string, any>, errors?: Array<any>): T;
        playSound(src: string, volumeScale?: number): void;
    }
    var UIPackage: IUIPackage;
    function setInstance(inst: IUIPackage): void;
    class UIConfig {
        static defaultFont: string;
        static windowModalWaiting: Prefab;
        static globalModalWaiting: Prefab;
        static modalLayerColor: Color;
        static buttonSound: string;
        static buttonSoundVolumeScale: number;
        static horizontalScrollBar: Prefab;
        static verticalScrollBar: Prefab;
        static defaultScrollStep: number;
        static defaultScrollDecelerationRate: number;
        static defaultScrollBarDisplay: number;
        static defaultScrollTouchEffect: boolean;
        static defaultScrollBounceEffect: boolean;
        /**
        * 当滚动容器设置为“贴近ITEM”时，判定贴近到哪一个ITEM的滚动距离阀值。
        */
        static defaultScrollSnappingThreshold: number;
        /**
        * 当滚动容器设置为“页面模式”时，判定翻到哪一页的滚动距离阀值。
        */
        static defaultScrollPagingThreshold: number;
        static popupMenu: Prefab;
        static tooltipsWin: Prefab;
        static defaultTooltipsShowDelay: number;
        static defaultComboBoxVisibleItemCount: number;
        static touchScrollSensitivity: number;
        static touchDragSensitivity: number;
        static clickDragSensitivity: number;
        static bringWindowToFrontOnClick: boolean;
        static frameTimeForAsyncUIConstruction: number;
        static defaultLinkClass: string;
    }
    type EnumDescriptor = {
        name: string;
        value: any;
        extend?: EnumDescriptor;
        [index: string]: any;
    }[] | any[] | Object | string;
    type PropertType = string | Function | Object | [
        PropertType
    ] | [
        "Record",
        PropertType
    ];
    interface PropertyDescriptor {
        /** 属性名称。一般不需要设定。 */
        name: string;
        /**
         * 属性类型。
         * 基础类型有：number,string,boolean,any，注意是使用字符串，不是类型。
         * 复合类型有：数组，使用类似["number"]这样的方式表达；字典，使用类似["Record", "number"]这样的方式表达，第一个元素固定为Record，第二个元素为实际类型。
         * 其他对象类型可以直接使用类名，但要注意该类必须有使用regClass装饰器。也支持枚举类型。枚举类型不需要regClass。
         * 如果不提供type，表示只用于ui样式，没有实际对应数据，和不会序列化
         */
        type: PropertType;
        /** 标题。如果不提供，则使用name。 */
        caption: string;
        /** 提示文字 */
        tips: string;
        /** 属性栏目。为多个属性设置相同的值，可以将它们显示在同一个Inspector栏目内。 */
        catalog: string;
        catalogCaption: string;
        catalogOrder: number;
        /**
         * 编辑这个属性的控件。内置有：number,string,boolean,color,vec2,vec3,vec4,asset
         *
         *      number : 数字输入。
         *      string : 字符串输入。默认为单行输入，如果是多行，需要激活multiline选项。
         *      boolean : 布尔值输入，用于单选框或多选框。
         *      color : 一个颜色框+调色盘+拾色器
         *      vec2 : XY输入的组合
         *      vec3 : XYZ输入的组合
         *      vec4 : XYZW输入的组合
         *      asset : 选择资源
         *
         * 一般来说，不需要设置这个选项，编辑器会自动根据属性类型选择适合的控件，但在某些情况下可以需要强制指定。
         * 例如，如果数据类型是Vector4，但其实它表达的是颜色，用默认编辑Vector4的控件不适合，需要在这里设置为“color”。
         *
         * 显式设置inspector为null，则不会为属性构造inspector。这与hidden设置为true不同。hidden为true是创建但不可见，
         * inspector为null的话则是完全不创建。
         */
        inspector: string;
        /** 隐藏控制:true隐藏，false显示。常用于关联属性的情况。
         * 1. 可以用表达式，通过将条件表达式放到字符串里，获得布尔类型的运算结果，例如"!data.a && !data.b"，表示属性a和属性b均为空时，条件成立（true），隐藏这个属性。
         * 2. 这里的data为当前组件的对象数据，data.a与data.b属性字段的a与b就是指当前组件中的a与b属性值，通过这种方法取到组件对象数据中的属性值，用于条件判断，作用于当前属性是否隐藏。
         */
        hidden: boolean | string;
        /** 只读控制。
         * 1. 可以用表达式，通过将条件表达式放到字符串里，获得布尔类型的运算结果，例如"!data.a && !data.b"，表示属性a和属性b均为空时，条件成立（true），该属性只读。
         * 2. 这里的data为当前组件的对象数据，data.a与data.b属性字段的a与b就是指当前组件中的a与b属性值，通过这种方法取到组件对象数据中的属性值，用于条件判断，作用于当前属性是否隐藏。
         */
        readonly: boolean | string;
        /** 数据检查机制。
         * 1. 将包括表达式的字符串传入，用于判断检查是否符合表达式的条件。符合条件，需要返回报错信息。
         * 2. 使用示例为："if(value == data.a) return '不能与a的值相同'"
         * 其中的value为当前用户在该属性输入的值，data为当前组件的对象数据，data.a是当前组件中的a属性值
         */
        validator: string;
        /** 是否序列化 */
        serializable: boolean;
        /** 属性在不参与序列化时，如果它的数据可能受其他可序列化的属性影响，在这里填写其他属性名称。这通常用于判断预制体属性是否覆盖。*/
        affectBy?: string;
        /** 是否多行文本输入 */
        multiline: boolean;
        /** 是否密码输入 */
        password: boolean;
        /** 如果true或者缺省，文本输入每次输入都提交；否则只有在失焦时才提交 */
        submitOnTyping: boolean;
        /** 输入文本的提示信息 */
        prompt: string;
        /** 定义枚举 */
        enumSource: EnumDescriptor;
        /** 是否反转布尔值。例如当属性值为true时，多选框显示为不勾选。 */
        reverseBool: boolean;
        /** 是否允许null值。默认为true。*/
        nullable: boolean;
        /** 数字的最小值 */
        min: number;
        /** 数字的最大值 */
        max: number;
        /** 数值范围，等同于一次性设置min和max。 */
        range: [
            number,
            number
        ];
        /** 拖动方式改变数值时，每次数值改变的幅度。 */
        step: number;
        /** 小数点后的位数 */
        fractionDigits: number;
        /** 显示为百分比 */
        percentage: boolean;
        /** 对数组类型属性适用。表示数组是固定长度，不允许修改。*/
        fixedLength: boolean;
        /** 对数组类型属性适用。如果不提供，则表示数组允许所有操作，如果提供，则只允许列出的操作。*/
        arrayActions: Array<"append" | "insert" | "delete" | "move">;
        /** 对数组类型属性适用。这里可以定义数组元素的属性 */
        elementProps: Partial<PropertyDescriptor>;
        /** 对颜色类型属性适用。表示是否提供透明度a值的修改。 */
        showAlpha: boolean;
        /** 对颜色类型属性适用。它与default值不同的是，当default是null时，可以用defaultColor定义一个非null时的默认值。*/
        defaultColor: any;
        /** 对颜色类型属性适用。允许显示一个checkbox决定颜色是否为null。 */
        colorNullable: boolean;
        /** 对对象类型属性适用。如果为true，隐藏对象的标题，同时对象下的属性的显示缩进会减少一级。*/
        hideHeader: boolean;
        /** 对对象类型属性适用。对象创建时可以下拉选择一个类型。如果显示设置为null，则禁止菜单。默认是显示一个创建基类的菜单。*/
        createObjectMenu: Array<string>;
        /** 说明此属性是引用一个资源 */
        isAsset?: boolean;
        /** 对资源类型的属性适用。多个资源类型用逗号分隔，例如“Image,Audio"。*/
        assetTypeFilter: string;
        /** 如果属性类型是string，并且进行资源选择时，这个选项决定属性值是资源原始路径还是res://uuid这样的格式。如果是true，则是资源原始路径。默认false。*/
        useAssetPath: boolean;
        /** 对资源类型的属性适用。选择资源时是否允许选择内部资源 */
        allowInternalAssets: boolean;
        /** 显示位置。语法：before xxx/after xxx/first/last。 */
        position: string;
        /** 表示属性是私有属性。私有属性不会显示在Inspector里，但会序列化保存。 */
        "private": boolean;
        /** 增加缩进，单位是层级，不是像素。 */
        addIndent: number;
        /** 表示属性是否允许多选情况下编辑。默认true。 */
        allowMultipleObjects: boolean;
        /** 表示属性不显示在派生类的属性表中 */
        hideInDeriveType: boolean;
        /** 属性改变时额外调用对象的一个函数，这里是函数名称。
         * 函数原型是func(key?:string)。其中key在改变成员内部属性时会传递。
         * 例如改变数据某个元素的内部属性，则key是这个元素的索引。
         */
        onChange: string;
        /** 额外的选项 */
        options: Record<string, any>;
    }
    interface TypeDescriptor {
        /** 标题。如果不提供，则使用name。 */
        caption: string;
        /** 添加到组件菜单。 */
        menu: string;
        /** 图标。*/
        icon: string;
        /** 属性列表 */
        properties: Array<Partial<PropertyDescriptor>>;
        /** 编辑这个类实例的控件 */
        inspector: string;
        /** 额外的选项 */
        options: Record<string, any>;
    }
    class decorator {
        /**
         * 注册一个类型，注册后才能被序列化系统自动保存和载入。
         */
        static regClass(assetId?: string): any;
        /**
         * 设置类型的额外信息。
         * @param info 类型的额外信息
         */
        static classInfo(info?: Partial<TypeDescriptor>): any;
        /**
         * 设置组件可以在编辑器环境中执行完整声明周期。
         */
        static runInEditor(constructor: Function): void;
        /**
         * 使用这个装饰器，可以使属性显示在编辑器属性设置面板上，并且能序列化保存。
         * @param info 属性的类型，如: Number,"number",[Number],["Record", Number]等。或传递对象描述详细信息，例如{ type: "string", multiline: true }。
         */
        static property(info: PropertType | Partial<PropertyDescriptor>): any;
    }
    type TagHandler = (tagName: string, end: boolean, attr: string) => string;
    type UBBParserOptions = {
        linkClass?: string;
        imageWidth?: number;
        imageHeight?: number;
    };
    class UBBParser {
        private _text;
        private _readPos;
        private _options;
        protected _handlers: Record<string, TagHandler>;
        lastColor: string;
        lastSize: string;
        private static _inst;
        static get inst(): UBBParser;
        constructor();
        protected onTag_URL(tagName: string, end: boolean, attr: string): string;
        protected onTag_IMG(tagName: string, end: boolean, attr: string): string;
        protected onTag_B(tagName: string, end: boolean, attr: string): string;
        protected onTag_I(tagName: string, end: boolean, attr: string): string;
        protected onTag_U(tagName: string, end: boolean, attr: string): string;
        protected onTag_Simple(tagName: string, end: boolean, attr: string): string;
        protected onTag_COLOR(tagName: string, end: boolean, attr: string): string;
        protected onTag_FONT(tagName: string, end: boolean, attr: string): string;
        protected onTag_SIZE(tagName: string, end: boolean, attr: string): string;
        protected getTagText(remove?: boolean): string;
        parse(text: string, remove?: boolean, options?: UBBParserOptions): string;
    }
    type Constructor<T = {}> = new (...args: any[]) => T;
    function clamp(value: number, min: number, max: number): number;
    function clamp01(value: number): number;
    function lerp(start: number, end: number, percent: number): number;
    function repeat(t: number, length: number): number;
    function distance(x1: number, y1: number, x2: number, y2: number): number;
    function getBaseName(path: string): string;
    function getPath(url: string): string;
    /**
        * 获取文件名的扩展名，并转换为小写字母。例如"1.abc"将返回abc。
        */
    function getFileExtension(path: string): string;
    /**
     * 更改文件名的扩展名。
     */
    function replaceFileExtension(path: string, newExt: string, excludeDot?: boolean): string;
    /**
     * 格式化相对路径。主要是处理.和..这些情况。
     */
    function normalizeURL(url: string): string;
    function getResURLByUUID(url: string, basePath?: string): string;
    /**
    * 组合相对路径并格式化
    * @param base
    * @param path
    */
    function joinURL(base: string, path: string): string;
    function hookSetter(obj: any, callback: Function, target?: any, ...args: any[]): any;
    function hookSetterAsync(obj: any, callback: Function, target: Widget): any;
    class Timers {
        static deltaTime: number;
        static time: number;
        static frameCount: number;
        static add(delayInMiniseconds: number, repeat: number, callback: Function, target?: any, callbackParam?: any): void;
        static callLater(callback: Function, target?: any, callbackParam?: any): void;
        static callDelay(delay: number, callback: Function, target?: any, callbackParam?: any): void;
        static addUpdate(callback: Function, target?: any, callbackParam?: any): void;
        static has(callback: Function, target?: any): boolean;
        static remove(callback: Function, target?: any): boolean;
        static runCallLater(callback: Function, target?: any): void;
    }
    class Pool<T extends Object> {
        pool: Array<T>;
        _init: (arg0: T, ...argArray: any[]) => void;
        _reset: (arg0: T) => void;
        _ct: new () => T;
        constructor(type: new () => T, init?: (arg0: T) => void, reset?: (arg0: T) => void);
        borrow(...argArray: any[]): T;
        returns(element: T | Array<T>): void;
    }
    class Delegate {
        private _flag;
        private _items;
        constructor();
        add(callback: Function, target?: any, args?: any[]): void;
        once(callback: Function, target?: any, args?: any[]): void;
        remove(callback: Function, target?: any): void;
        clear(): void;
        clearForTarget(target: any): void;
        get count(): number;
        invoke(...args: any[]): void;
    }
    class XMLUtils {
        static decodeString(aSource: string): string;
        static encodeString(str: string): string;
        static getString(attrs: any, attrName: string, defValue?: string): string;
        static getInt(attrs: any, attrName: string, defValue?: number): number;
        static getFloat(attrs: any, attrName: string, defValue?: number): number;
        static getBool(attrs: any, attrName: string, defValue?: boolean): boolean;
    }
    enum XMLTagType {
        Start = 0,
        End = 1,
        Void = 2,
        CDATA = 3,
        Comment = 4,
        Instruction = 5
    }
    class XMLIterator {
        static tagName: string;
        static tagType: XMLTagType;
        static lastTagName: string;
        static source: string;
        static sourceLen: number;
        static parsePos: number;
        static tagPos: number;
        static tagLength: number;
        static lastTagEnd: number;
        static attrParsed: boolean;
        static lowerCaseName: boolean;
        private static _attrs;
        static begin(source: string, lowerCaseName?: boolean): void;
        static nextTag(): boolean;
        static getTagSource(): string;
        static getRawText(trim?: boolean): string;
        static getText(trim?: boolean): string;
        static get attributes(): any;
        static getAttribute(attrName: string): string;
        static parseAttributes(attrs: any): void;
    }
    class XML {
        name: string;
        text: string;
        private _attrs;
        private _children;
        constructor(XmlString?: string);
        get attributes(): Record<string, string>;
        getAttrString(attrName: string, defValue?: string): string;
        getAttrInt(attrName: string, defValue?: number): number;
        getAttrFloat(attrName: string, defValue?: number): number;
        getAttrBool(attrName: string, defValue?: boolean): boolean;
        setAttribute(attrName: string, attrValue: string): void;
        getNode(selector: string): XML;
        elements(selector?: string): Array<XML>;
        parse(aSource: string): void;
        reset(): void;
        stringify(includeHeader?: boolean): string;
        private encode;
    }
    class Window extends Widget {
        bringToFontOnClick: boolean;
        private _contentPane;
        private _modalWaitPane;
        private _closeButton;
        private _dragArea;
        private _contentArea;
        private _frame;
        private _modal;
        private _inited;
        private _loading;
        private _requestingCmd;
        constructor();
        set contentPane(val: Widget);
        get contentPane(): Widget;
        get frame(): Widget;
        get closeButton(): Widget;
        set closeButton(value: Widget);
        get dragArea(): Widget;
        set dragArea(value: Widget);
        get contentArea(): Widget;
        set contentArea(value: Widget);
        show(groot?: GRoot): void;
        hide(): void;
        hideImmediately(): void;
        toggleStatus(): void;
        get isShowing(): boolean;
        get isTop(): boolean;
        get modal(): boolean;
        set modal(val: boolean);
        bringToFront(): void;
        showModalWait(requestingCmd?: number): void;
        protected layoutModalWaitPane(): void;
        closeModalWait(requestingCmd?: number): boolean;
        get modalWaiting(): boolean;
        protected onInit(): Promise<void>;
        protected onShown(): void;
        protected onHide(): void;
        protected doShowAnimation(): void;
        protected doHideAnimation(): void;
        destroy(): void;
        protected closeEventHandler(): void;
        private _onShown;
        private _onHidden;
        private _winTouchBegin;
        private _dragStart;
    }
    class WidgetRef {
        p: Widget;
        private _callback;
        static create(oldVal: WidgetRef, target: Widget, callback: () => void): WidgetRef;
        constructor(val: Widget, callback: () => void);
        destroy(): void;
        private _reload;
    }
    class WidgetPool {
        private _items;
        private _count;
        private _defaultRes;
        private _defaultRuntime;
        private _createOptions;
        constructor();
        clear(): void;
        get count(): number;
        get defaultRes(): Prefab;
        set defaultRes(value: Prefab);
        get defaultRuntime(): Function;
        set defaultRuntime(value: Function);
        getObject(url?: string): Widget;
        returnObject(obj: Widget): void;
    }
    class Widget extends EventDispatcher {
        prefabUrl: string;
        data: any;
        private _id;
        private _name;
        private _bits;
        private _hideFlags;
        private _width;
        private _height;
        private _visible;
        private _visible2;
        private _active;
        private _touchable;
        private _touchThrough;
        private _destroyed;
        private _zOrder;
        private _childrenRenderOrder;
        private _apexIndex;
        private _tooltips;
        private _asGroup;
        private _cursor;
        private _draggable;
        private _dragBounds;
        private _dragSupport;
        private _focusable;
        private _tabStop;
        private _tabStopChildren;
        private _parent;
        private _children;
        private _components;
        private _controllers;
        private _controllerCount;
        private _gears;
        private _relations;
        private _changeList;
        private _forceSizeFlag;
        protected _element: UIElement;
        protected _container: UIElement;
        protected _graphics: IGraphics;
        _extra: IWidgetExtra;
        _giveWidth: number;
        _giveHeight: number;
        sourceWidth: number;
        sourceHeight: number;
        constructor();
        get id(): string;
        get name(): string;
        set name(value: string);
        get hideFlags(): number;
        set hideFlags(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        setPos(xv: number, yv: number): void;
        get left(): number;
        set left(value: number);
        get top(): number;
        set top(value: number);
        setLeftTop(xv: number, yv: number): void;
        center(target?: Widget): this;
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        setSize(wv: number, hv: number, changeByLayout?: boolean): void;
        makeFullSize(target?: Widget): this;
        get scaleX(): number;
        set scaleX(value: number);
        get scaleY(): number;
        set scaleY(value: number);
        setScale(xv: number, yv: number): void;
        get anchorX(): number;
        set anchorX(value: number);
        get anchorY(): number;
        set anchorY(value: number);
        setAnchor(xv: number, yv: number): void;
        get touchable(): boolean;
        set touchable(value: boolean);
        get touchThrough(): boolean;
        set touchThrough(value: boolean);
        get grayed(): boolean;
        set grayed(value: boolean);
        get enabled(): boolean;
        set enabled(value: boolean);
        get rotation(): number;
        set rotation(value: number);
        get alpha(): number;
        set alpha(value: number);
        get visible(): boolean;
        set visible(value: boolean);
        get active(): boolean;
        set active(value: boolean);
        get activeInHierarchy(): boolean;
        get onStage(): boolean;
        get treeNode(): TreeNode;
        get zOrder(): number;
        set zOrder(value: number);
        get childrenRenderOrder(): ChildrenRenderOrder;
        set childrenRenderOrder(value: ChildrenRenderOrder);
        get apexIndex(): number;
        set apexIndex(value: number);
        get tooltips(): string;
        set tooltips(value: string);
        private _rollOver;
        private _rollOut;
        get focusable(): boolean;
        set focusable(value: boolean);
        get tabStop(): boolean;
        set tabStop(value: boolean);
        get tabStopChildren(): boolean;
        set tabStopChildren(value: boolean);
        get focused(): boolean;
        requestFocus(byKey?: boolean): void;
        private _focusEventHandler;
        get cursor(): string;
        set cursor(value: string);
        get text(): string;
        set text(value: string);
        get icon(): string;
        set icon(value: string);
        get element(): UIElement;
        get container(): UIElement;
        get destroyed(): boolean;
        get draggable(): boolean;
        set draggable(value: boolean);
        get nativeDraggable(): boolean;
        set nativeDraggable(value: boolean);
        get dragBounds(): Rect;
        set dragBounds(value: Rect);
        startDrag(pointerId?: number): void;
        stopDrag(): void;
        get dragging(): boolean;
        get relations(): Array<Relation>;
        addRelation(target: Widget, type: RelationType, percent?: boolean): this;
        removeRelation(target: Widget, type: RelationType): this;
        clearRelations(): this;
        get controllers(): Readonly<Record<string, Controller>>;
        get controllerCount(): number;
        addController(name: string, pageCount?: number): Controller;
        getController(name: string): Controller;
        protected _controllersChanged(): void;
        get gears(): Array<Gear<any>>;
        addGear(controller: Controller, propPath: string, props?: Record<number, any>): void;
        destroy(): void;
        protected onStartListeningToType(type: string): void;
        onClick(listener: EventCallback, target?: any): void;
        offClick(listener: EventCallback, target?: any): void;
        localToGlobal(ax?: number, ay?: number, out?: Vec2): Vec2;
        globalToLocal(ax?: number, ay?: number, out?: Vec2): Vec2;
        localToRoot(ax: number, ay: number, out?: Vec2): Vec2;
        rootToLocal(ax: number, ay: number, out?: Vec2): Vec2;
        localToGlobalRect(ax: number, ay: number, aWidth: number, aHeight: number, out?: Rect): Rect;
        globalToLocalRect(ax: number, ay: number, aWidth: number, aHeight: number, out?: Rect): Rect;
        transformRect(ax: number, ay: number, aWidth: number, aHeight: number, targetSpace?: Widget, out?: Rect): Rect;
        hitTest(x: number, y: number): boolean;
        protected createElement(): void;
        protected _sizeChanged(changeByLayout?: boolean): void;
        setLayoutChangedFlag(reason?: LayoutChangedReason): void;
        _setBit(type: number, value: boolean): void;
        _getBit(type: number): boolean;
        hasHideFlag(flag: number): boolean;
        get asGroup(): boolean;
        set asGroup(value: boolean);
        addChild<T extends Widget>(child: T): T;
        addChildAt(child: Widget, index: number): Widget;
        getChildIndex(child: Widget): number;
        getChildAt<T extends Widget>(index: number, classType?: Constructor<T>): T;
        getChild<T extends Widget>(name: string, classType?: Constructor<T>): T;
        findChild<T extends Widget>(name: string, classType?: Constructor<T>): T;
        getChildByPath<T extends Widget>(path: String, classType?: new () => T): T;
        setChildIndex(child: Widget, index: number): Widget;
        setChildIndexBefore(child: Widget, index: number): number;
        private _setChildIndex;
        removeChild(child: Widget, destroy?: boolean): Widget;
        removeChildAt(index: number, destroy?: boolean): Widget;
        removeChildren(beginIndex?: number, endIndex?: number, destroy?: boolean): void;
        removeSelf(): void;
        get children(): ReadonlyArray<Widget>;
        get numChildren(): number;
        get parent(): Widget;
        findRoot(): GRoot;
        isAncestorOf(child: Widget): boolean;
        private prepareActiveChangeList;
        _processActive(active: boolean, fromSetter?: boolean): void;
        _processAddRemove(add: boolean): void;
        _processVisible(): void;
        _processTouchable(): void;
        protected _setGraphics(value: IGraphics): void;
        private updateZOrder;
        getChildrenBounds(recursive?: boolean, ignoreInvisibles?: boolean, ignoreScale?: boolean, out?: Rect): Rect;
        addComponent<T extends Component>(type: new () => T): T;
        getComponent<T extends Component>(type: new () => T): T;
        get components(): ReadonlyArray<Component>;
        protected onAwake(): void;
        protected onEnable(): void;
        protected onDisable(): void;
        protected onDestroy(): void;
        onConstruct(): void;
        onAfterDeserialize(): void;
    }
    interface IWidgetExtra {
    }
    class TreeNode {
        data: any;
        private _parent;
        private _children;
        private _expanded;
        private _level;
        private _indentLevel;
        private _addIndent;
        private _tree;
        private _cell;
        private _indentObj;
        private _resURL;
        private _leafController;
        private _isFolder;
        onExpanded?: (expand: boolean) => void;
        constructor(isFolder?: boolean, resURL?: string, addIndent?: number);
        set expanded(value: boolean);
        get expanded(): boolean;
        get isFolder(): boolean;
        set isFolder(value: boolean);
        get addIndent(): number;
        set addIndent(value: number);
        get parent(): TreeNode;
        get text(): string;
        set text(value: string);
        get icon(): string;
        set icon(value: string);
        get cell(): Widget;
        set cell(value: Widget);
        createCell(tree?: Tree): void;
        get level(): number;
        addChild(child: TreeNode): TreeNode;
        addChildAt(child: TreeNode, index: number): TreeNode;
        removeChild(child: TreeNode): TreeNode;
        removeChildAt(index: number): TreeNode;
        removeChildren(beginIndex?: number, endIndex?: number): void;
        getChildAt(index: number): TreeNode;
        getChildIndex(child: TreeNode): number;
        getPrevSibling(): TreeNode;
        getNextSibling(): TreeNode;
        setChildIndex(child: TreeNode, index: number): void;
        swapChildren(child1: TreeNode, child2: TreeNode): void;
        swapChildrenAt(index1: number, index2: number): void;
        get numChildren(): number;
        get children(): ReadonlyArray<TreeNode>;
        expandToRoot(): void;
        get tree(): Tree;
        _setTree(value: Tree): void;
        private _expandedStateChanged;
        private _cellMouseDown;
        private _clickExpandButton;
    }
    class Tree extends Panel {
        treeNodeRender: (node: TreeNode, obj: any) => void;
        treeNodeWillExpand: (node: TreeNode, expanded: boolean) => void;
        private _indent;
        private _pool;
        private _rootNode;
        _selection: ITreeSelection;
        constructor();
        get selection(): ITreeSelection;
        get clickToExpand(): TreeClickToExpandType;
        set clickToExpand(value: TreeClickToExpandType);
        get rootNode(): TreeNode;
        get indent(): number;
        set indent(value: number);
        get itemTemplate(): Prefab;
        set itemTemplate(value: Prefab);
        get itemPool(): WidgetPool;
        expandAll(folderNode?: TreeNode): void;
        collapseAll(folderNode?: TreeNode): void;
        private createCell;
        private getInsertIndexForNode;
        private getFolderEndIndex;
        private checkChildren;
        private hideFolderNode;
        private removeNode;
    }
    class TextStyle {
        font: string;
        fontSize: number;
        color: number;
        leading: number;
        bold: boolean;
        underline: boolean;
        italic: boolean;
        strikethrough: boolean;
        align: AlignType;
        valign: VAlignType;
        stroke: number;
        strokeColor: number;
        get alignStr(): string;
        get valignStr(): string;
    }
    const AlignNames: string[];
    const VAlignNames: string[];
    type InputElement = HTMLTextAreaElement | HTMLInputElement;
    class TextInput extends Widget {
        static activeInst: TextInput;
        static get isAnyEditing(): boolean;
        private _style;
        private _text;
        private _multiline;
        private _password;
        private _prompt;
        private _maxLength;
        private _maxHeight;
        private _minHeight;
        private _padding;
        private _autoHeight;
        private _updatingSize;
        private _focusEventFlag;
        _input: InputElement;
        constructor(multiline?: boolean);
        get text(): string;
        set text(value: string);
        get title(): string;
        set title(value: string);
        get style(): TextStyle;
        get multiline(): boolean;
        set multiline(value: boolean);
        get password(): boolean;
        set password(value: boolean);
        set editable(value: boolean);
        get editable(): boolean;
        get maxLength(): number;
        set maxLength(value: number);
        get prompt(): string;
        set prompt(value: string);
        get padding(): Array<number>;
        set padding(value: Array<number>);
        get autoHeight(): boolean;
        set autoHeight(value: boolean);
        get maxHeight(): number;
        set maxHeight(value: number);
        get background(): IGraphics;
        set background(value: IGraphics);
        setSelection(start: number, end: number): void;
        private createInputElement;
        private adjustHeight;
        private applyAutoHeight;
        protected applyStyle(): void;
        _processTouchable(): void;
        protected _sizeChanged(changeByLayout?: boolean): void;
    }
    class TextField extends Widget {
        protected _style: TextStyle;
        protected _text: string;
        protected _autoSize: TextAutoSize;
        protected _wrap: boolean;
        protected _html: boolean;
        protected _maxWrapWidth: number;
        protected _span: HTMLSpanElement;
        protected _textWidth: number;
        protected _textHeight: number;
        protected _selectable: boolean;
        protected _ubb: boolean;
        protected _updatingSize: boolean;
        protected _templateVars: Record<string, any>;
        protected _parsedText: string;
        protected _changed: boolean;
        protected _wrapChanged: boolean;
        constructor();
        protected createElement(): void;
        get text(): string;
        set text(value: string);
        get title(): string;
        set title(value: string);
        get templateVars(): Record<string, string>;
        set templateVars(value: Record<string, any> | boolean);
        setVar(name: string, value: any): this;
        get style(): TextStyle;
        set html(value: boolean);
        get html(): boolean;
        set ubb(value: boolean);
        get ubb(): boolean;
        get color(): number;
        set color(value: number);
        get autoSize(): TextAutoSize;
        set autoSize(value: TextAutoSize);
        get wrap(): boolean;
        set wrap(value: boolean);
        get maxWrapWidth(): number;
        set maxWrapWidth(value: number);
        get selectable(): boolean;
        set selectable(value: boolean);
        setLinkStyle(underline: boolean): void;
        get textWidth(): number;
        get textHeight(): number;
        protected markChanged(): void;
        protected applyStyle(): void;
        private typeset;
        private renderText;
        protected _sizeChanged(changeByLayout: boolean): void;
        protected parseTemplate(template: string): string;
    }
    class Slider extends Widget {
        changeOnClick: boolean;
        canDrag: boolean;
        private _hBar;
        private _vBar;
        private _gripButton;
        private _titleWidget;
        private _min;
        private _max;
        private _value;
        private _titleType;
        private _reverse;
        private _wholeNumbers;
        private _barMaxWidth;
        private _barMaxHeight;
        private _barMaxWidthDelta;
        private _barMaxHeightDelta;
        private _clickPos;
        private _clickPercent;
        private _barStartX;
        private _barStartY;
        constructor();
        get titleType(): ProgressTitleType;
        set titleType(value: ProgressTitleType);
        get reverse(): boolean;
        set reverse(value: boolean);
        get wholeNumbers(): boolean;
        set wholeNumbers(value: boolean);
        get min(): number;
        set min(value: number);
        get max(): number;
        set max(value: number);
        get value(): number;
        set value(value: number);
        update(): void;
        private updateWithPercent;
        protected _sizeChanged(): void;
        private _gripTouchBegin;
        private _gripTouchMove;
        private _barTouchBegin;
    }
    class Shape extends Widget {
        get graphics(): IGraphics;
        set graphics(value: IGraphics);
        getGraphics<T extends IGraphics>(classType: Constructor<T>): T;
        drawRect(lineWidth: number, lineColor: Color, fillColor: Color, topLeftRadius?: number, topRightRadius?: number, bottomRightRadius?: number, bottomLeftRadius?: number): SRect;
    }
    class Scroller implements IScroller {
        static draggingInst: Scroller;
        private _owner;
        private _layout;
        private _container;
        private _maskContainer;
        private _dir;
        private _step;
        private _decelerationRate;
        private _barMargin;
        private _barDisplay;
        private _barDisplay2;
        private _barOnLeft;
        private _barFloating;
        private _touchEffect;
        private _touchEffect2;
        private _bouncebackEffect;
        private _bouncebackEffect2;
        private _touchEffectButton;
        private _snapToItem;
        private _mouseWheelDisabled;
        private _pageMode;
        private _inertiaDisabled;
        private _paddingMaskDisabled;
        private _hScrollBarRes;
        private _vScrollBarRes;
        private _footerRes;
        private _headerRes;
        private _vScrollNone;
        private _hScrollNone;
        private _needRefresh;
        private _refreshBarAxis;
        private _xPos;
        private _yPos;
        private _viewSize;
        private _contentSize;
        private _overlapSize;
        private _pageSize;
        private _containerPos;
        private _beginTouchPos;
        private _lastTouchPos;
        private _lastTouchGlobalPos;
        private _velocity;
        private _velocityScale;
        private _lastMoveTime;
        private _isHoldAreaDone;
        private _aniFlag;
        private _loop;
        private _headerLockedSize;
        private _footerLockedSize;
        private _refreshEventDispatching;
        private _dragged;
        private _hover;
        private _lastAutoScroll?;
        private _autoScrollThresold?;
        private _tweening;
        private _tweenTime;
        private _tweenDuration;
        private _tweenStart;
        private _tweenChange;
        private _hScrollBar;
        private _vScrollBar;
        private _header;
        private _footer;
        constructor();
        get owner(): Panel;
        set owner(value: Panel);
        destroy(): void;
        get hScrollBar(): ScrollBar;
        get vScrollBar(): ScrollBar;
        get header(): Widget;
        get footer(): Widget;
        get hScrollBarRes(): Prefab;
        set hScrollBarRes(value: Prefab);
        get vScrollBarRes(): Prefab;
        set vScrollBarRes(value: Prefab);
        get headerRes(): Prefab;
        set headerRes(value: Prefab);
        get footerRes(): Prefab;
        set footerRes(value: Prefab);
        get direction(): ScrollDirection;
        set direction(value: ScrollDirection);
        get barDisplay(): ScrollBarDisplay;
        set barDisplay(value: ScrollBarDisplay);
        get barOnLeft(): boolean;
        set barOnLeft(value: boolean);
        get barFloating(): boolean;
        set barFloating(value: boolean);
        get barMargin(): Array<number>;
        set barMargin(value: Array<number>);
        get bouncebackEffect(): ScrollBounceBackEffect;
        set bouncebackEffect(value: ScrollBounceBackEffect);
        get touchEffect(): ScrollTouchEffect;
        set touchEffect(value: ScrollTouchEffect);
        get touchEffectButton(): number;
        set touchEffectButton(value: number);
        get pageMode(): boolean;
        set pageMode(value: boolean);
        set step(value: number);
        get step(): number;
        get snapToItem(): boolean;
        set snapToItem(value: boolean);
        get inertiaDisabled(): boolean;
        set inertiaDisabled(value: boolean);
        get paddingMaskDisabled(): boolean;
        set paddingMaskDisabled(value: boolean);
        get mouseWheelDisabled(): boolean;
        set mouseWheelDisabled(value: boolean);
        get decelerationRate(): number;
        set decelerationRate(value: number);
        get isDragged(): boolean;
        get percX(): number;
        set percX(value: number);
        setPercX(value: number, ani?: boolean): void;
        get percY(): number;
        set percY(value: number);
        setPercY(value: number, ani?: boolean): void;
        get posX(): number;
        set posX(value: number);
        setPosX(value: number, ani?: boolean): void;
        get posY(): number;
        set posY(value: number);
        setPosY(value: number, ani?: boolean): void;
        get contentWidth(): number;
        get contentHeight(): number;
        get viewWidth(): number;
        get viewHeight(): number;
        setViewSize(width: number, height: number): void;
        get pageX(): number;
        set pageX(value: number);
        get pageY(): number;
        set pageY(value: number);
        setPageX(value: number, ani?: boolean): void;
        setPageY(value: number, ani?: boolean): void;
        get isBottomMost(): boolean;
        get isRightMost(): boolean;
        get scrollingPosX(): number;
        get scrollingPosY(): number;
        scrollTop(ani?: boolean): void;
        scrollBottom(ani?: boolean): void;
        scrollUp(ratio?: number, ani?: boolean): void;
        scrollDown(ratio?: number, ani?: boolean): void;
        scrollLeft(ratio?: number, ani?: boolean): void;
        scrollRight(ratio?: number, ani?: boolean): void;
        scrollTo(target: Widget | Rect | number, ani?: boolean, setFirst?: boolean): void;
        isChildInView(obj: Widget): boolean;
        getFirstChildInView(): number;
        cancelDragging(): void;
        _setDefaultDirection(): void;
        private createVtScrollBar;
        private createHzScrollBar;
        private createHeader;
        private createFooter;
        lockHeader(size: number): void;
        lockFooter(size: number): void;
        _prepareActiveChangeList(active: boolean, out: Array<Widget>): void;
        _shouldCheckOverflow(): number;
        _processClipping(): void;
        _ownerSizeChanged(): void;
        private onSizeChanged;
        _ownerContentSizeChanged(): void;
        _changeContentSizeOnScrolling(deltaWidth: number, deltaHeight: number, deltaPosX: number, deltaPosY: number): void;
        private onContentSizeChanged;
        private posChanged;
        private refresh;
        private refresh2;
        private _touchBegin;
        private _touchMove;
        private _touchEnd;
        private _mouseWheel;
        private _rollOver;
        private _rollOut;
        private _dragOver;
        private updateScrollBarPos;
        _updateScrollBarVisible(): void;
        private updateScrollBarVisible2;
        private _barTweenComplete;
        private getLoopPartSize;
        private loopCheckingCurrent;
        private loopCheckingTarget;
        private loopCheckingTarget2;
        private loopCheckingNewPos;
        private alignPosition;
        private alignByPage;
        private updateTargetAndDuration;
        private updateTargetAndDuration2;
        private fixDuration;
        private startTween;
        private killTween;
        private checkRefreshBar;
        private tweenUpdate;
        private runTween;
    }
    class ScrollBar extends Widget {
        private _gripButton;
        private _arrowButton1;
        private _arrowButton2;
        private _bar;
        private _target;
        private _vertical;
        private _scrollPerc;
        private _fixedGripSize;
        private _dragOffset;
        private _gripDragging;
        constructor();
        setOwner(target: IScroller, vertical: boolean): void;
        setDisplayPerc(value: number): void;
        setScrollPerc(val: number): void;
        get minSize(): number;
        get gripDragging(): boolean;
        get fixedGripSize(): boolean;
        set fixedGripSize(value: boolean);
        private _gripTouchBegin;
        private _gripTouchMove;
        private _gripTouchEnd;
        private _arrowButton1Click;
        private _arrowButton2Click;
        private _barTouchBegin;
    }
    class Relation {
        private _owner;
        private _target;
        private _data;
        private _tx;
        private _ty;
        private _tw;
        private _th;
        constructor();
        get owner(): Widget;
        set owner(value: Widget);
        set target(value: Widget);
        get target(): Widget;
        get data(): Array<number>;
        set data(value: Array<number>);
        add(type: RelationType, percent: boolean): void;
        remove(type: RelationType): void;
        private setTarget;
        private unsetTarget;
        applyOnSelfResized(): void;
        private applyOnPosChanged;
        private applyOnSizeChanged;
        private posChanged;
        private sizeChanged;
        private instReload;
    }
    class ProgressBar extends Widget {
        private _hBar;
        private _vBar;
        private _titleWidget;
        private _min;
        private _max;
        private _value;
        private _titleType;
        private _reverse;
        private _barMaxWidth;
        private _barMaxHeight;
        private _barMaxWidthDelta;
        private _barMaxHeightDelta;
        private _barStartX;
        private _barStartY;
        constructor();
        get titleType(): ProgressTitleType;
        set titleType(value: ProgressTitleType);
        get min(): number;
        set min(value: number);
        get max(): number;
        set max(value: number);
        get value(): number;
        set value(value: number);
        tweenValue(value: number, duration: number): Tweener;
        update(newValue: number): void;
        private setFillAmount;
        protected _sizeChanged(): void;
    }
    class PopupMenu extends EventDispatcher {
        visibleItemCount: number;
        hideOnClickItem: boolean;
        autoSize: boolean;
        protected _content: Widget;
        protected _list: List;
        protected _initWidth: number;
        constructor(res?: Prefab);
        destroy(): void;
        addItem(caption: string, callback?: EventCallback, target?: any): Widget;
        addItemAt(caption: string, index: number, callback?: EventCallback, target?: any): Widget;
        private createItem;
        addSeperator(index?: number): void;
        getItemName(index: number): string;
        setItemText(name: string, caption: string): void;
        setItemVisible(name: string, visible: boolean): void;
        setItemGrayed(name: string, grayed: boolean): void;
        setItemCheckable(name: string, checkable: boolean): void;
        setItemChecked(name: string, checked: boolean): void;
        isItemChecked(name: string): boolean;
        removeItem(name: string): boolean;
        clearItems(): void;
        get itemCount(): number;
        get contentPane(): Widget;
        get list(): List;
        show(target?: Widget, dir?: PopupDirection, parentMenu?: PopupMenu): void;
        hide(): void;
        private _clickItem;
    }
    class PopupManager {
        private _owner;
        private _popupStack;
        private _justClosedPopups;
        private _tooltipWin;
        private _defaultTooltipWin;
        constructor(owner: GRoot);
        showPopup(popup: Widget, target?: Widget, dir?: PopupDirection): void;
        validatePopupPosition(popup: Widget, target: Widget, dir: PopupDirection, offsetX?: number, offsetY?: number): void;
        togglePopup(popup: Widget, target?: Widget, dir?: PopupDirection): boolean;
        hidePopup(popup?: Widget): void;
        get hasAnyPopup(): boolean;
        isPopupJustClosed(popup: Widget): boolean;
        private closePopup;
        showTooltips(msg: string, delay?: number): void;
        showTooltipsWin(tooltipWin: Widget, delay?: number): void;
        private _doShowTooltips;
        hideTooltips(): void;
        checkPopups(): void;
        private _touchBegin;
    }
    class Panel extends Box {
        private _clipping;
        private _scroller;
        protected _selection: ISelection;
        constructor(layoutClass?: Constructor<ILayout>, selectionClass?: Constructor<ISelection>);
        protected createElement(): void;
        get scroller(): IScroller;
        set scroller(value: Scroller);
        get selection(): ISelection;
        get selectionMode(): SelectionMode;
        set selectionMode(value: SelectionMode);
        get selectedIndex(): number;
        set selectedIndex(value: number);
        get clipping(): boolean;
        set clipping(value: boolean);
        _processClipping(): void;
        get viewWidth(): number;
        set viewWidth(value: number);
        get viewHeight(): number;
        set viewHeight(value: number);
        get touchItem(): Widget;
        protected _sizeChanged(changeByLayout?: boolean): void;
        destroy(): void;
    }
    class Loader extends Widget {
        private _src;
        private _align;
        private _valign;
        private _fitMode;
        private _shrinkOnly;
        private _updatingLayout;
        private _content;
        private _srcWidth;
        private _srcHeight;
        private _color;
        constructor();
        get src(): string;
        set src(value: string);
        get icon(): string;
        set icon(value: string);
        get align(): AlignType;
        set align(value: AlignType);
        get valign(): VAlignType;
        set valign(value: VAlignType);
        get fitMode(): LoaderFitMode;
        set fitMode(value: LoaderFitMode);
        get shrinkOnly(): boolean;
        set shrinkOnly(value: boolean);
        get color(): number;
        set color(value: number);
        get texture(): Texture;
        set texture(value: Texture);
        protected loadContent(): Promise<void>;
        protected onLoaded(value: any): void;
        protected clearContent(): void;
        protected updateLayout(): void;
        protected _sizeChanged(): void;
    }
    class List extends Panel {
        itemRenderer: (index: number, item: any) => void;
        itemProvider: (index: number) => string;
        _layout: IListLayout;
        private _pool;
        private _initItemNum;
        private _itemData;
        private _isDemo;
        constructor();
        destroy(): void;
        get layout(): IListLayout;
        get itemTemplate(): Prefab;
        set itemTemplate(value: Prefab);
        get itemPool(): WidgetPool;
        getFromPool(url?: string): Widget;
        returnToPool(obj: Widget): void;
        addItemFromPool(url?: string): Widget;
        removeChildToPoolAt(index: number): void;
        removeChildToPool(child: Widget): void;
        removeChildrenToPool(beginIndex?: number, endIndex?: number): void;
        get numItems(): number;
        set numItems(value: number);
        resizeToFit(itemCount?: number, minSize?: number): void;
        childIndexToItemIndex(index: number): number;
        itemIndexToChildIndex(index: number): number;
        refreshVirtualList(): void;
        setVirtual(): void;
        /**
         * Set the list to be virtual list, and has loop behavior.
         */
        setVirtualAndLoop(): void;
        private _setVirtual;
        onAfterDeserialize(): void;
    }
    class Label extends Widget {
        protected _titleWidget: WidgetRef;
        protected _iconWidget: WidgetRef;
        get title(): string;
        set title(value: string);
        get text(): string;
        set text(value: string);
        get icon(): string;
        set icon(value: string);
        get titleColor(): number;
        set titleColor(value: number);
        get titleFontSize(): number;
        set titleFontSize(value: number);
        get titleWidget(): Widget;
        set titleWidget(val: Widget);
        get iconWidget(): Widget;
        set iconWidget(val: Widget);
        protected _onPartChanged(which: string): void;
        findTextWidget<T extends TextField | TextInput>(): T;
        get background(): IGraphics;
        set background(value: IGraphics);
    }
    class Image extends Widget {
        private _src;
        private _autoSize;
        _graphics: SImage;
        constructor();
        get src(): string;
        set src(value: string);
        get texture(): Texture;
        set texture(value: Texture);
        get borderRadius(): Array<number>;
        set borderRadius(value: Array<number>);
        get radiusIsRatio(): boolean;
        set radiusIsRatio(value: boolean);
        get icon(): string;
        set icon(value: string);
        get autoSize(): boolean;
        set autoSize(value: boolean);
        get tile(): boolean;
        set tile(value: boolean);
        get color(): number;
        set color(value: number);
        protected onLoad(res: Texture, src: string): void;
        protected _sizeChanged(changeByLayout?: boolean): void;
        protected onReload(): void;
    }
    interface IScroller {
        get owner(): Panel;
        set owner(value: Panel);
        get hScrollBar(): ScrollBar;
        get vScrollBar(): ScrollBar;
        get header(): Widget;
        get footer(): Widget;
        get hScrollBarRes(): Prefab;
        set hScrollBarRes(value: Prefab);
        get vScrollBarRes(): Prefab;
        set vScrollBarRes(value: Prefab);
        get headerRes(): Prefab;
        set headerRes(value: Prefab);
        get footerRes(): Prefab;
        set footerRes(value: Prefab);
        get direction(): ScrollDirection;
        set direction(value: ScrollDirection);
        get barDisplay(): ScrollBarDisplay;
        set barDisplay(value: ScrollBarDisplay);
        get barOnLeft(): boolean;
        set barOnLeft(value: boolean);
        get barFloating(): boolean;
        set barFloating(value: boolean);
        get barMargin(): Array<number>;
        set barMargin(value: Array<number>);
        get bouncebackEffect(): ScrollBounceBackEffect;
        set bouncebackEffect(value: ScrollBounceBackEffect);
        get touchEffect(): ScrollTouchEffect;
        set touchEffect(value: ScrollTouchEffect);
        get touchEffectButton(): number;
        set touchEffectButton(value: number);
        get pageMode(): boolean;
        set pageMode(value: boolean);
        set step(value: number);
        get step(): number;
        get snapToItem(): boolean;
        set snapToItem(value: boolean);
        get inertiaDisabled(): boolean;
        set inertiaDisabled(value: boolean);
        get paddingMaskDisabled(): boolean;
        set paddingMaskDisabled(value: boolean);
        get mouseWheelDisabled(): boolean;
        set mouseWheelDisabled(value: boolean);
        get decelerationRate(): number;
        set decelerationRate(value: number);
        get percX(): number;
        set percX(value: number);
        setPercX(value: number, ani?: boolean): void;
        get percY(): number;
        set percY(value: number);
        setPercY(value: number, ani?: boolean): void;
        get posX(): number;
        set posX(value: number);
        setPosX(value: number, ani?: boolean): void;
        get posY(): number;
        set posY(value: number);
        setPosY(value: number, ani?: boolean): void;
        get pageX(): number;
        set pageX(value: number);
        get pageY(): number;
        set pageY(value: number);
        setPageX(value: number, ani?: boolean): void;
        setPageY(value: number, ani?: boolean): void;
        get contentWidth(): number;
        get contentHeight(): number;
        get viewWidth(): number;
        get viewHeight(): number;
        setViewSize(width: number, height: number): void;
        get isBottomMost(): boolean;
        get isRightMost(): boolean;
        get scrollingPosX(): number;
        get scrollingPosY(): number;
        scrollTop(ani?: boolean): void;
        scrollBottom(ani?: boolean): void;
        scrollUp(ratio?: number, ani?: boolean): void;
        scrollDown(ratio?: number, ani?: boolean): void;
        scrollLeft(ratio?: number, ani?: boolean): void;
        scrollRight(ratio?: number, ani?: boolean): void;
        scrollTo(target: Widget | Rect | number, ani?: boolean, setFirst?: boolean): void;
        isChildInView(obj: Widget): boolean;
        getFirstChildInView(): number;
        get isDragged(): boolean;
        cancelDragging(): void;
        lockHeader(size: number): void;
        lockFooter(size: number): void;
        destroy(): void;
    }
    class GRoot extends Widget {
        private _window;
        private _modalLayer;
        private _modalWaitPane;
        private _inputMgr;
        private _popupMgr;
        static get inst(): GRoot;
        static getInst(w: Widget): GRoot;
        constructor(ownerWindow: globalThis.Window);
        get window(): globalThis.Window;
        get inputMgr(): InputManager;
        get touchTarget(): Widget;
        get pointerPos(): Vec2;
        getPointerPos(pointerId?: number, out?: Vec2): Vec2;
        get popupMgr(): PopupManager;
        showWindow(win: Window): void;
        hideWindow(win: Window): void;
        hideWindowImmediately(win: Window): void;
        bringToFront(win: Window): void;
        showModalWait(msg?: string): void;
        closeModalWait(): void;
        closeAllExceptModals(): void;
        closeAllWindows(): void;
        getTopWindow(): Window;
        get modalLayer(): Widget;
        get hasModalWindow(): boolean;
        get modalWaiting(): boolean;
        showPopup(popup: Widget, target?: Widget, dir?: PopupDirection): void;
        togglePopup(popup: Widget, target?: Widget, dir?: PopupDirection): boolean;
        hidePopup(popup?: Widget): void;
        get hasAnyPopup(): boolean;
        adjustModalLayer(): void;
    }
    class DragSupport {
        private _owner;
        private _dragStartPos;
        private _dragTesting;
        static get draggingInst(): Widget;
        constructor(owner: Widget);
        setAutoStart(value: boolean): void;
        start(pointerId: number): void;
        stop(): void;
        private _touchBegin;
        private _touchMove;
        private _touchEnd;
    }
    class ControllerRef {
        private _target;
        private _name;
        private _inst;
        private _inited;
        onChanged: Function;
        constructor(target: Widget, name: string);
        constructor(inst: Controller);
        get target(): Widget;
        get name(): string;
        get inst(): Controller;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        get selectedPage(): string;
        set selectedPage(value: string);
        get previousIndex(): number;
        set oppositeIndex(value: number);
        release(): void;
        validate(): void;
        private _reload;
        private _check;
        private _onChanged;
    }
    class Controller extends EventDispatcher {
        private _selectedIndex;
        private _previousIndex;
        private _pages;
        owner: Widget;
        name: string;
        changing: boolean;
        constructor();
        get pages(): Array<string>;
        set pages(value: Array<string>);
        get numPages(): number;
        set numPages(value: number);
        addPage(name?: string): this;
        get selectedIndex(): number;
        set selectedIndex(value: number);
        get selectedPage(): string;
        set selectedPage(value: string);
        get previousIndex(): number;
        set oppositeIndex(value: number);
    }
    class NodeFlags {
        static ON_STAGE: number;
        static ACTIVE_INHIERARCHY: number;
        static AWAKED: number;
        static ENABLED: number;
        static HAS_ZORDER: number;
        static OBSOLUTE: number;
        static CHECK_ZORDER: number;
        static ESCAPE_LAYOUT: number;
        static DISABLE_CLIPPING: number;
        static FORCE_HIDDEN: number;
        static FORCE_VISIBLE: number;
        static EDITING_NODE: number;
        static HIDE_BY_EDITOR: number;
        static LOCK_BY_EDITOR: number;
        static EDITING_ROOT_NODE: number;
    }
    class HideFlags {
        static HideInHierarchy: number;
        static HideInInspector: number;
        static DontSave: number;
        static HideAndDontSave: number;
    }
    enum ButtonStatus {
        Up = 0,
        Down = 1,
        Over = 2,
        SelectedOver = 3,
        Disabled = 4,
        SelectedDisabled = 5
    }
    enum AlignType {
        Left = 0,
        Center = 1,
        Right = 2,
        None = 3
    }
    enum VAlignType {
        Top = 0,
        Middle = 1,
        Bottom = 2,
        None = 3
    }
    enum LayoutChangedReason {
        Size = 0,
        Pos = 1,
        Visible = 2,
        Hierarchy = 3
    }
    enum ButtonMode {
        Common = 0,
        Check = 1,
        Radio = 2
    }
    enum ButtonDownEffect {
        None = 0,
        Dark = 1,
        Scale = 2
    }
    enum TextAutoSize {
        None = 0,
        Both = 1,
        Height = 2,
        Shrink = 3,
        Ellipsis = 4
    }
    enum LayoutType {
        None = 0,
        SingleColumn = 1,
        SingleRow = 2,
        FlowX = 3,
        FlowY = 4
    }
    enum PageMode {
        None = 0,
        Horizontal = 1,
        Vertical = 2
    }
    enum StretchMode {
        None = 0,
        Stretch = 1,
        ResizeToFit = 2
    }
    enum SelectionMode {
        None = 0,
        Single = 1,
        Multiple = 2,
        MultipleBySingleClick = 3,
        Disabled = 4
    }
    enum LoaderFitMode {
        None = 0,
        Fill = 1,
        Contain = 2,
        Cover = 3,
        CoverWidth = 4,
        CoverHeight = 5
    }
    enum ProgressTitleType {
        Percent = 0,
        ValueAndMax = 1,
        Value = 2,
        Max = 3
    }
    enum ScrollDirection {
        Vertical = 0,
        Horizontal = 1,
        Both = 2
    }
    enum ScrollTouchEffect {
        Default = 0,
        On = 1,
        Off = 2
    }
    enum ScrollBounceBackEffect {
        Default = 0,
        On = 1,
        Off = 2
    }
    enum ScrollBarDisplay {
        Default = 0,
        Always = 1,
        OnOverflow = 2,
        OnScroll = 3,
        OnOverflowAndScroll = 4,
        Hidden = 5
    }
    enum ChildrenRenderOrder {
        Ascent = 0,
        Descent = 1,
        Arch = 2
    }
    enum PopupDirection {
        Auto = 0,
        Up = 1,
        Down = 2
    }
    enum TreeClickToExpandType {
        None = 0,
        SingleClick = 1,
        DoubleClick = 2
    }
    enum RelationType {
        Width = 1,
        Height = 2,
        Left_Left = 3,
        Left_Center = 4,
        Left_Right = 5,
        Center_Center = 6,
        Right_Left = 7,
        Right_Center = 8,
        Right_Right = 9,
        Top_Top = 10,
        Top_Middle = 11,
        Top_Bottom = 12,
        Middle_Middle = 13,
        Bottom_Top = 14,
        Bottom_Middle = 15,
        Bottom_Bottom = 16,
        LeftExt_Left = 17,
        LeftExt_Right = 18,
        RightExt_Left = 19,
        RightExt_Right = 20,
        TopExt_Top = 21,
        TopExt_Bottom = 22,
        BottomExt_Top = 23,
        BottomExt_Bottom = 24,
        Size = 100,
        Pos = 101,
        CenterAndMiddle = 102
    }
    class ComboBox extends Label {
        popupDirection: PopupDirection;
        visibleItemCount: number;
        private _items;
        private _icons;
        private _values;
        private _dropdownRes;
        private _itemsUpdated;
        private _selectedIndex;
        private _buttonController;
        private _selectedController;
        private _dropdown;
        private _list;
        private _down;
        private _over;
        constructor();
        get items(): string[];
        set items(value: string[]);
        get icons(): string[];
        set icons(value: string[]);
        get values(): string[];
        set values(value: string[]);
        get selectedIndex(): number;
        set selectedIndex(val: number);
        get value(): string;
        set value(val: string);
        get dropdownRes(): Prefab;
        set dropdownRes(value: Prefab);
        get dropdown(): Widget;
        get selectedController(): ControllerRef;
        set selectedController(value: ControllerRef);
        destroy(): void;
        updateList(): void;
        private createDropdown;
        protected _controllersChanged(): void;
        private _selectChanged;
        protected setState(page: number): void;
        protected setCurrentState(): void;
        protected showDropdown(): void;
        private _updateDropDown;
        private _popupWinClosed;
        private _clickItem;
        private _rollover;
        private _rollout;
        private _mousedown;
        private _mouseup;
    }
    const ButtonPageAlternatives: Record<number, ButtonStatus>;
    class Button extends Label {
        private _mode;
        private _selected;
        private _titleStr;
        private _iconStr;
        private _selectedTitleStr;
        private _selectedIconStr;
        private _sound;
        private _soundVolumeScale;
        private _buttonController;
        private _selectedController;
        private _selectedPage;
        private _changeStateOnClick;
        private _downEffect;
        private _downEffectValue;
        private _downScaled;
        private _down;
        private _over;
        constructor();
        destroy(): void;
        get title(): string;
        set title(value: string);
        get selectedTitle(): string;
        set selectedTitle(value: string);
        get icon(): string;
        set icon(value: string);
        get selectedIcon(): string;
        set selectedIcon(value: string);
        get downEffect(): ButtonDownEffect;
        set downEffect(value: ButtonDownEffect);
        get downEffectValue(): number;
        set downEffectValue(value: number);
        get sound(): string;
        set sound(val: string);
        get soundVolumeScale(): number;
        set soundVolumeScale(value: number);
        get selected(): boolean;
        set selected(value: boolean);
        get mode(): ButtonMode;
        set mode(value: ButtonMode);
        get selectedController(): ControllerRef;
        set selectedController(value: ControllerRef);
        get selectedPage(): number;
        set selectedPage(value: number);
        get changeStateOnClick(): boolean;
        set changeStateOnClick(value: boolean);
        get touchable(): boolean;
        set touchable(value: boolean);
        fireClick(downEffect?: boolean, clickCall?: boolean): void;
        protected setState(page: ButtonStatus): void;
        protected setCurrentState(): void;
        protected _controllersChanged(): void;
        protected _onPartChanged(which: string): void;
        private _selectChanged;
        private _rollover;
        private _rollout;
        private _btnTouchBegin;
        private _btnTouchEnd;
        private _removeFromStage;
        private _click;
        private _rightClick;
    }
    class Box extends Widget {
        protected _layout: ILayout;
        constructor(layoutClass?: Constructor<ILayout>);
        get layout(): ILayout;
        get background(): IGraphics;
        set background(value: IGraphics);
        setLayoutChangedFlag(reason?: LayoutChangedReason): void;
        protected _sizeChanged(changeByLayout?: boolean): void;
    }
    class TreeSelection extends Selection implements ITreeSelection {
        _owner: Tree;
        private _clickToExpand;
        get clickToExpand(): TreeClickToExpandType;
        set clickToExpand(value: TreeClickToExpandType);
        getSelectedNode(): TreeNode;
        getSelectedNodes(out?: Array<TreeNode>): Array<TreeNode>;
        selectNode(node: TreeNode, scrollItToView?: boolean): void;
        unselectNode(node: TreeNode): void;
        handleClick(item: Button, evt: Event): void;
        handleArrowKey(dir: number): number;
    }
    class Selection implements ISelection {
        scrollItemToViewOnClick: boolean;
        allowSelectByRightClick: boolean;
        protected _owner: Panel;
        protected _mode: SelectionMode;
        protected _lastIndex: number;
        protected _triggerFocusEvents: boolean;
        protected _keyEvent: string;
        constructor(owner: Panel);
        get mode(): SelectionMode;
        set mode(value: SelectionMode);
        get index(): number;
        set index(value: number);
        get(out?: number[]): number[];
        add(index: number, scrollItToView?: boolean): void;
        remove(index: number): void;
        clear(): void;
        protected clearExcept(g: Widget): void;
        selectAll(): void;
        selectReverse(): void;
        enableFocusEvents(enabled: boolean): void;
        private handleFocus;
        handleClick(item: Button, evt: Event): void;
        enableArrowKeyNavigation(enabled: boolean, keySelectEvent?: string): void;
        private _keydown;
        handleArrowKey(dir: number): number;
    }
    class ListSelection extends Selection {
        _owner: List;
        _layout: ListLayout;
        constructor(owner: List);
        get index(): number;
        set index(value: number);
        get(out?: number[]): number[];
        add(index: number, scrollItToView?: boolean): void;
        remove(index: number): void;
        clear(): void;
        protected clearExcept(g: Widget): void;
        selectAll(): void;
        selectReverse(): void;
        handleClick(item: Button, evt: Event): void;
        handleArrowKey(dir: number): number;
    }
    interface ITreeSelection extends ISelection {
        get clickToExpand(): TreeClickToExpandType;
        set clickToExpand(value: TreeClickToExpandType);
        getSelectedNode(): TreeNode;
        getSelectedNodes(out?: Array<TreeNode>): Array<TreeNode>;
        selectNode(node: TreeNode, scrollItToView?: boolean): void;
        unselectNode(node: TreeNode): void;
    }
    interface ISelection {
        mode: SelectionMode;
        scrollItemToViewOnClick: boolean;
        index: number;
        get(out?: number[]): number[];
        add(index: number, scrollItToView?: boolean): void;
        remove(index: number): void;
        clear(): void;
        selectAll(): void;
        selectReverse(): void;
        enableFocusEvents(enabled: boolean): void;
        handleClick(item: Widget, evt: Event): void;
        enableArrowKeyNavigation(enabled: boolean, keySelectEvent?: string): void;
        handleArrowKey(dir: number): number;
    }
    class ListLayout extends Layout {
        _owner: List;
        _virtual: boolean;
        _loop: boolean;
        _realNumItems: number;
        _lineItemCnt: number;
        _lineItemCnt2: number;
        _items: Array<ItemInfo>;
        private _numItems;
        private _itemSize;
        private _firstIndex;
        private _changed;
        private _eventLocked;
        private _itemInfoVer;
        private _itemSizes;
        private _offsetX;
        private _offsetY;
        get numItems(): number;
        set numItems(value: number);
        get itemSize(): Vec2;
        set itemSize(value: Vec2);
        childIndexToItemIndex(index: number): number;
        itemIndexToChildIndex(index: number): number;
        private shouldSnapToNext;
        getSnappingPosition(xValue: number, yValue: number, xDir: number, yDir: number, resultPoint?: Vec2): Vec2;
        getRectByItemIndex(index: number): Rect;
        setChangedFlag(reason?: LayoutChangedReason): void;
        refresh(force?: boolean): void;
        refreshVirtualList(): void;
        private _refreshVirtualList;
        private _scrolled;
        private getIndexOnPos1;
        private getIndexOnPos2;
        private getIndexOnPos3;
        private handleScroll;
        private handleScroll1;
        private handleScroll2;
        private handleScroll3;
    }
    interface ItemInfo {
        width: number;
        height: number;
        obj?: Widget;
        flag: number;
        selected?: boolean;
    }
    class Layout implements ILayout {
        protected _owner: Box;
        protected _type: LayoutType;
        protected _rows: number;
        protected _columns: number;
        protected _rowGap: number;
        protected _columnGap: number;
        protected _stretchX: StretchMode;
        protected _stretchY: StretchMode;
        protected _pageMode: PageMode;
        protected _layoutChanged: boolean;
        protected _padding: Array<number>;
        protected _align: AlignType;
        protected _valign: VAlignType;
        protected _foldInvisibles: boolean;
        protected _stretchParamsX: Array<StretchParam>;
        protected _stretchParamsY: Array<StretchParam>;
        protected _minChildSize: number;
        protected _childSizeChangedFlag: boolean;
        protected _contentWidth: number;
        protected _contentHeight: number;
        protected _refreshing: boolean;
        _disabled: boolean;
        constructor(owner: Box);
        get type(): LayoutType;
        set type(value: LayoutType);
        get rows(): number;
        set rows(value: number);
        get columns(): number;
        set columns(value: number);
        get rowGap(): number;
        set rowGap(value: number);
        get columnGap(): number;
        set columnGap(value: number);
        get padding(): Array<number>;
        set padding(value: Array<number>);
        get align(): AlignType;
        set align(value: AlignType);
        get valign(): VAlignType;
        set valign(value: VAlignType);
        get stretchX(): StretchMode;
        set stretchX(value: StretchMode);
        get stretchY(): StretchMode;
        set stretchY(value: StretchMode);
        get stretchParamsX(): Array<StretchParam>;
        get stretchParamsY(): Array<StretchParam>;
        get foldInvisibles(): boolean;
        set foldInvisibles(value: boolean);
        get minChildSize(): number;
        set minChildSize(value: number);
        get pageMode(): PageMode;
        set pageMode(value: PageMode);
        /**
         * dir正数表示右移或者下移，负数表示左移或者上移
         */
        getSnappingPosition(xValue: number, yValue: number, xDir: number, yDir: number, resultPoint?: Vec2): Vec2;
        setChangedFlag(reason?: LayoutChangedReason): void;
        refresh(force?: boolean): void;
        get viewWidth(): number;
        set viewWidth(value: number);
        get viewHeight(): number;
        set viewHeight(value: number);
        get contentWidth(): number;
        get contentHeight(): number;
        setContentSize(aw: number, ah: number): void;
        resizeToFit(childCount?: number, minSize?: number): void;
        protected applyNone(): void;
        private applyFlowX;
        private applyFlowY;
        protected getLayoutChildren(data: TempData): number;
        protected checkStretchParams(src: Array<StretchParam>, data: TempData): StretchParam[];
        protected handleStrecth(size: number, count: number, gap: number, params: Array<StretchParam>, sourceSizes: Array<number>, outSizes?: Array<number>): void;
        protected static refreshAllLayouts(caller?: Widget): void;
    }
    class TempData {
        children: Array<Widget>;
        invisibles: Array<number>;
        invisibleCnt: number;
        stretchParams: Array<StretchParam>;
        posx: Array<number>;
        posy: Array<number>;
        width: Array<number>;
        swidth: Array<number>;
        height: Array<number>;
        sheight: Array<number>;
    }
    interface IListLayout extends ILayout {
        get numItems(): number;
        set numItems(value: number);
        get itemSize(): Vec2;
        set itemSize(value: Vec2);
        childIndexToItemIndex(index: number): number;
        itemIndexToChildIndex(index: number): number;
        getRectByItemIndex(index: number): Rect;
        refreshVirtualList(): void;
    }
    interface ILayout {
        get type(): LayoutType;
        set type(value: LayoutType);
        get rows(): number;
        set rows(value: number);
        get columns(): number;
        set columns(value: number);
        get rowGap(): number;
        set rowGap(value: number);
        get columnGap(): number;
        set columnGap(value: number);
        /**
         * [UP，RIGHT，DOWN，LEFT]
         */
        get padding(): Array<number>;
        set padding(value: Array<number>);
        get align(): AlignType;
        set align(value: AlignType);
        get valign(): VAlignType;
        set valign(value: VAlignType);
        get stretchX(): StretchMode;
        set stretchX(value: StretchMode);
        get stretchY(): StretchMode;
        set stretchY(value: StretchMode);
        get stretchParamsX(): Array<StretchParam>;
        get stretchParamsY(): Array<StretchParam>;
        get foldInvisibles(): boolean;
        set foldInvisibles(value: boolean);
        get minChildSize(): number;
        set minChildSize(value: number);
        get pageMode(): PageMode;
        set pageMode(value: PageMode);
        get viewWidth(): number;
        set viewWidth(value: number);
        get viewHeight(): number;
        set viewHeight(value: number);
        get contentWidth(): number;
        set contentWidth(value: number);
        get contentHeight(): number;
        set contentHeight(value: number);
        /**
         * dir正数表示右移或者下移，负数表示左移或者上移
         */
        getSnappingPosition(xValue: number, yValue: number, xDir: number, yDir: number, resultPoint?: Vec2): Vec2;
        resizeToFit(childCount?: number, minSize?: number): void;
        setChangedFlag(reason?: LayoutChangedReason): void;
        refresh(force?: boolean): void;
    }
    class GearTweenConfig {
        enabled: boolean;
        easeType: EaseType;
        duration: number;
        delay: number;
    }
    class GearNumber extends Gear<number> {
        protected _isColor: boolean;
        protected doTween(obj: any, key: string, oldValue: number, newValue: number): void;
    }
    class GearHexColor extends GearNumber {
        constructor();
    }
    class GearDisplay extends Gear<boolean> {
        private _pages;
        private _flag;
        private _condition;
        constructor();
        get pages(): Array<number>;
        set pages(value: Array<number>);
        get condition(): number;
        set condition(value: number);
        get delay(): number;
        set delay(value: number);
        protected doTween(obj: any, key: string, oldValue: boolean, newValue: boolean): void;
        protected getValue(page: number): boolean;
        static check(owner: Widget): boolean;
    }
    class GearColor extends Gear<Color> {
        protected doTween(obj: any, key: string, oldValue: Color, newValue: Color): void;
    }
    class Gear<T> {
        protected _owner: Widget;
        protected _controller: ControllerRef;
        protected _propPath: string;
        protected _tween: GearTweenConfig;
        protected _tweener: Tweener;
        values: Record<number, T>;
        static disableAllTweenEffect: boolean;
        constructor();
        get owner(): Widget;
        set owner(value: Widget);
        get controller(): ControllerRef;
        set controller(value: ControllerRef);
        get propPath(): string;
        set propPath(value: string);
        get tween(): GearTweenConfig;
        set tween(value: GearTweenConfig);
        protected onChanged(disableTween?: boolean): void;
        protected getValue(page: number): T;
        protected doTween(obj: any, key: string, oldValue: T, newValue: T): void;
        private runGear;
    }
    class GearString extends Gear<string> {
    }
    class GearBool extends Gear<boolean> {
    }
    type TweenCallback = (tweener: Tweener) => void;
    class Tweener {
        _target: any;
        _propType: any;
        _killed: boolean;
        _paused: boolean;
        private _delay;
        private _duration;
        private _breakpoint;
        private _easeType;
        private _easeOvershootOrAmplitude;
        private _easePeriod;
        private _repeat;
        private _yoyo;
        private _timeScale;
        private _snapping;
        private _userData;
        private _path;
        private _onUpdate;
        private _onStart;
        private _onComplete;
        private _onUpdateCaller;
        private _onStartCaller;
        private _onCompleteCaller;
        private _startValue;
        private _endValue;
        private _value;
        private _deltaValue;
        private _valueSize;
        private _started;
        private _ended;
        private _elapsedTime;
        private _normalizedTime;
        constructor();
        setDelay(value: number): this;
        get delay(): number;
        setDuration(value: number): this;
        get duration(): number;
        setBreakpoint(value: number): this;
        setEase(value: number): this;
        setEasePeriod(value: number): this;
        setEaseOvershootOrAmplitude(value: number): this;
        setRepeat(repeat: number, yoyo?: boolean): this;
        get repeat(): number;
        setTimeScale(value: number): this;
        setSnapping(value: boolean): this;
        setTarget(value: any, propType?: any): this;
        get target(): any;
        setPath(value: GPath): this;
        setUserData(value: any): this;
        get userData(): any;
        onUpdate(callback: TweenCallback, target?: any): this;
        onStart(callback: TweenCallback, target?: any): this;
        onComplete(callback: TweenCallback, target?: any): this;
        get startValue(): TweenValue;
        get endValue(): TweenValue;
        get value(): TweenValue;
        get deltaValue(): TweenValue;
        get normalizedTime(): number;
        get completed(): boolean;
        get allCompleted(): boolean;
        setPaused(paused: boolean): this;
        /**
         * seek position of the tween, in seconds.
         */
        seek(time: number): void;
        kill(complete?: boolean): void;
        _to(start: number, end: number, duration: number): this;
        _to2(start: number, start2: number, end: number, end2: number, duration: number): this;
        _to3(start: number, start2: number, start3: number, end: number, end2: number, end3: number, duration: number): this;
        _to4(start: number, start2: number, start3: number, start4: number, end: number, end2: number, end3: number, end4: number, duration: number): this;
        _toColor(start: number, end: number, duration: number): this;
        _shake(startX: number, startY: number, amplitude: number, duration: number): this;
        _init(): void;
        _reset(): void;
        _update(dt: number): void;
        private update;
        private callStartCallback;
        private callUpdateCallback;
        private callCompleteCallback;
    }
    class TweenValue {
        x: number;
        y: number;
        z: number;
        w: number;
        get color(): number;
        set color(value: number);
        getField(index: number): number;
        setField(index: number, value: number): void;
        reset(): void;
    }
    class TweenManager {
        static __init__(): void;
        static createTween(): Tweener;
        static isTweening(target: any, propType?: any): boolean;
        static killTweens(target: any, completed?: boolean, propType?: any): boolean;
        static getTween(target: any, propType?: any): Tweener;
        static update(): void;
    }
    class Tween {
        static catchCallbackExceptions: boolean;
        static to(start: number, end: number, duration: number): Tweener;
        static to2(start: number, start2: number, end: number, end2: number, duration: number): Tweener;
        static to3(start: number, start2: number, start3: number, end: number, end2: number, end3: number, duration: number): Tweener;
        static to4(start: number, start2: number, start3: number, start4: number, end: number, end2: number, end3: number, end4: number, duration: number): Tweener;
        static toColor(start: number, end: number, duration: number): Tweener;
        static delayedCall(delay: number): Tweener;
        static shake(startX: number, startY: number, amplitude: number, duration: number): Tweener;
        static isTweening(target: any, propType?: any): Boolean;
        static kill(target: any, complete?: boolean, propType?: any): void;
        static getTween(target: any, propType?: any): Tweener;
    }
    enum CurveType {
        CRSpline = 0,
        Bezier = 1,
        CubicBezier = 2,
        Straight = 3
    }
    class PathPoint {
        x: number;
        y: number;
        control1_x: number;
        control1_y: number;
        control2_x: number;
        control2_y: number;
        curveType: number;
        static newPoint(x: number, y: number, curveType: number): PathPoint;
        static newBezierPoint(x: number, y: number, control1_x: number, control1_y: number): PathPoint;
        static newCubicBezierPoint(x: number, y: number, control1_x: number, control1_y: number, control2_x: number, control2_y: number): PathPoint;
        clone(): PathPoint;
    }
    class GPath {
        private _segments;
        private _points;
        private _fullLength;
        constructor();
        get length(): number;
        create2(pt1: PathPoint, pt2: PathPoint, pt3?: PathPoint, pt4?: PathPoint): void;
        create(points: Array<PathPoint>): void;
        private createSplineSegment;
        clear(): void;
        getPointAt(t: number, out?: Vec2): Vec2;
        get segmentCount(): number;
        getAnchorsInSegment(segmentIndex: number, points?: Array<Vec2>): Array<Vec2>;
        getPointsInSegment(segmentIndex: number, t0: number, t1: number, points?: Array<Vec2>, ts?: Array<number>, pointDensity?: number): Array<Vec2>;
        getAllPoints(points?: Array<Vec2>, ts?: Array<number>, pointDensity?: number): Array<Vec2>;
        private onCRSplineCurve;
        private onBezierCurve;
    }
    enum EaseType {
        Linear = 0,
        SineIn = 1,
        SineOut = 2,
        SineInOut = 3,
        QuadIn = 4,
        QuadOut = 5,
        QuadInOut = 6,
        CubicIn = 7,
        CubicOut = 8,
        CubicInOut = 9,
        QuartIn = 10,
        QuartOut = 11,
        QuartInOut = 12,
        QuintIn = 13,
        QuintOut = 14,
        QuintInOut = 15,
        ExpoIn = 16,
        ExpoOut = 17,
        ExpoInOut = 18,
        CircIn = 19,
        CircOut = 20,
        CircInOut = 21,
        ElasticIn = 22,
        ElasticOut = 23,
        ElasticInOut = 24,
        BackIn = 25,
        BackOut = 26,
        BackInOut = 27,
        BounceIn = 28,
        BounceOut = 29,
        BounceInOut = 30,
        Custom = 31
    }
    function evaluateEase(easeType: number, time: number, duration: number, overshootOrAmplitude: number, period: number): number;
    class Vec2 {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        set(x: number, y: number): this;
        reset(): this;
        distance(x: number, y: number): number;
        toString(): string;
        normalize(): void;
        copy(Vec2: Vec2): Vec2;
        clone(): Vec2;
        equals(another: Vec2): boolean;
    }
    class StretchParam {
        ratio: number;
        priority: number;
        min: number;
        max: number;
        fixed: boolean;
        setRatio(value: number): this;
        setPriority(value: number): this;
        setLimit(min: number, max: number): this;
        setFixed(): this;
    }
    class Rect {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        set(x: number, y: number, width: number, height: number): void;
        setMinMax(xMin: number, yMin: number, xMax: number, yMax: number): void;
        get position(): Vec2;
        get size(): Vec2;
        get xMin(): number;
        set xMin(value: number);
        get xMax(): number;
        set xMax(value: number);
        get yMin(): number;
        set yMin(value: number);
        get yMax(): number;
        set yMax(value: number);
        intersection(another: Rect, out?: Rect): Rect;
        intersects(another: Rect): boolean;
        union(another: Rect, out?: Rect): Rect;
        extend(x: number, y: number): void;
        contains(x: number | Vec2, y?: number): boolean;
        copy(source: Rect): void;
        clone(): Rect;
        equals(another: Rect): boolean;
    }
    class Color {
        static CLEAR: Readonly<Color>;
        static RED: Readonly<Color>;
        static GREEN: Readonly<Color>;
        static BLUE: Readonly<Color>;
        static YELLOW: Readonly<Color>;
        static GRAY: Readonly<Color>;
        static BLACK: Readonly<Color>;
        static WHITE: Readonly<Color>;
        r: number;
        g: number;
        b: number;
        a: number;
        static hexToString(rgb: number): string;
        static stringToHex(str: string): number;
        constructor(str: string);
        constructor(r?: number, g?: number, b?: number, a?: number);
        copy(source: Color): this;
        clone(): Color;
        getHex(): number;
        toString(): string;
        getStyleString(): string;
        parse(src: number | string): void;
    }
    class InputManager {
        touchScreen: boolean;
        electron: boolean;
        private _pointers;
        private _touchTarget;
        private _pointerPos;
        private _touchCount;
        private _rollOverChain;
        private _rollOutChain;
        private _lastPointerId;
        private _nextCursor;
        private _focus;
        private _nextFocus;
        private _focusOutChain;
        private _focusInChain;
        private _focusHistory;
        private _dragging;
        constructor(root: GRoot);
        get pointerPos(): Vec2;
        get touchTarget(): Widget;
        get touchCount(): number;
        getPointerPos(pointerId?: number, out?: Vec2): Vec2;
        addCaptor(pointerId: number, target: EventDispatcher): void;
        removeCaptor(target: EventDispatcher): void;
        cancelClick(pointerId?: number): void;
        private onKeydown;
        private onKeyup;
        private setLastInput;
        private handlePointer;
        private clickTest;
        private handleWheel;
        private handleContextMenu;
        private getPointer;
        private handleRollOver;
        private setLastPointer;
        onClickLink(event: Event, href: string): void;
        get focus(): Widget;
        validateFocus(container: Widget, child: Widget): void;
        setFocus(newFocus: Widget, byKey?: boolean): void;
        private onFocusRemoving;
        private checkNextFocus;
        private onWindowBlur;
    }
    const lastFocus: unique symbol;
    class InputInfo {
        x: number;
        y: number;
        mouseWheelDelta: number;
        pointerId: number;
        button: number;
        clickCount: number;
        holdTime: number;
        shiftKey: boolean;
        altKey: boolean;
        ctrlKey: boolean;
        commandKey: boolean;
        keyCode: string;
        key: string;
        get isDblClick(): boolean;
        get isRightButton(): boolean;
        get ctrlOrCmdKey(): boolean;
    }
    type EventCallback = (evt: Event) => void;
    class EventDispatcher {
        private _listeners;
        constructor();
        on(type: EventType, callback: EventCallback, target?: any, capture?: boolean): void;
        on(type: string, callback: EventCallback, target?: any, capture?: boolean): void;
        off(type: EventType, callback: EventCallback, target?: any, capture?: boolean): void;
        off(type: string, callback: EventCallback, target?: any, capture?: boolean): void;
        offAll(type?: EventType, capture?: boolean): void;
        offAll(type?: string, capture?: boolean): void;
        offAllCaller(target: any): void;
        hasListener(type: EventType, capture?: boolean): boolean;
        hasListener(type: string, capture?: boolean): boolean;
        emit(type: EventType, data?: any): boolean;
        emit(type: string, data?: any): boolean;
        bubbleEvent(type: string, data?: any): void;
        protected onStartListeningToType(type: string): void;
        private getDelegate;
    }
    var EventPool: Pool<Event>;
    type EventType = "pointer_down" | "pointer_up" | "pointer_move" | "click" | "right_click" | "roll_over" | "roll_out" | "mouse_wheel" | "key_down" | "key_up" | "added_to_stage" | "removed_from_stage" | "pos_changed" | "size_changed" | "content_size_changed" | "controllers_changed" | "changed" | "focus_in" | "focus_out" | "drag_start" | "drag_move" | "drag_end" | "drop" | "native_dragstart" | "native_dragover" | "native_dragend" | "native_dragleave" | "native_drop" | "scroll" | "scroll_end" | "pull_down_release" | "pull_up_release" | "click_item" | "click_link" | "submit" | "play_end" | "gear_stop" | "popup" | "instance_reload";
    class Event {
        data: any;
        static readonly _lastInput: InputInfo;
        constructor();
        get type(): string;
        get target(): EventDispatcher;
        get sender(): Widget;
        get initiator(): Widget;
        get originalTarget(): HTMLElement;
        get input(): Readonly<InputInfo>;
        stopPropagation(): void;
        preventDefault(): void;
        capturePointer(): void;
        get isDefaultPrevented(): boolean;
    }
    class UIElement extends HTMLDivElement {
        owner: Widget;
        _x: number;
        _y: number;
        _width: number;
        _height: number;
        _alpha: number;
        _grayed: boolean;
        _finalGrayed: boolean;
        _touchable: boolean;
        _touchThrough: boolean;
        _touchFlag: number;
        _scaleX: number;
        _scaleY: number;
        _rot: number;
        _anchorX: number;
        _anchorY: number;
        _transformDirty: boolean;
        static create(): UIElement;
        constructor();
        get name(): string;
        set name(value: string);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        setPos(x: number, y: number): void;
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        setSize(wv: number, hv: number): void;
        get anchorX(): number;
        set anchorX(value: number);
        get anchorY(): number;
        set anchorY(value: number);
        setAnchor(xv: number, yv: number): void;
        get scaleX(): number;
        set scaleX(value: number);
        get scaleY(): number;
        set scaleY(value: number);
        setScale(xv: number, yv: number): void;
        get rotation(): number;
        set rotation(value: number);
        get alpha(): number;
        set alpha(value: number);
        get visible(): boolean;
        set visible(value: boolean);
        get grayed(): boolean;
        set grayed(value: boolean);
        appendChild<T extends Node>(node: T): T;
        insertBefore<T extends Node>(node: T, child: Node): T;
        removeSelf(): void;
        globalToLocal(x: number, y: number, out?: Vec2): Vec2;
        localToGlobal(x: number, y: number, out?: Vec2): Vec2;
        get clipping(): boolean;
        set clipping(value: boolean);
        get touchable(): boolean;
        set touchable(value: boolean);
        get touchThrough(): boolean;
        set touchThrough(value: boolean);
        private updateGrayed;
        private updatePointerEvents;
        private updateTransform;
        clearBackgroundStyle(): void;
        static addStyles(doc: Document): void;
    }
    const defaultInputPadding: Array<number>;
    class SRect extends SGraphics {
        protected _lineWidth: number;
        protected _lineColor: Color;
        protected _fillColor: Color;
        protected _lineStyle: string;
        protected _radius: Array<number>;
        protected _ratio: boolean;
        constructor(lineWidth?: number, lineColor?: Color, fillColor?: Color);
        get lineWidth(): number;
        set lineWidth(value: number);
        get lineColor(): Color;
        set lineColor(value: Color);
        get fillColor(): Color;
        set fillColor(value: Color);
        get lineStyle(): string;
        set lineStyle(value: string);
        /**
        * [TL，TR，BR，BL]
        */
        get borderRadius(): Array<number>;
        set borderRadius(value: Array<number>);
        get radiusIsRatio(): boolean;
        set radiusIsRatio(value: boolean);
        get color(): number;
        set color(value: number);
        protected onRender(style: CSSStyleDeclaration): void;
    }
    class SLine extends SGraphics {
        protected _color: Color;
        protected _style: string;
        constructor(color?: Color, style?: string);
        get color(): Color;
        set color(value: Color);
        get style(): string;
        set style(value: string);
        protected onRender(style: CSSStyleDeclaration): void;
    }
    class SImage extends SGraphics {
        protected _tex: Texture;
        protected _tile: boolean;
        protected _radius: Array<number>;
        protected _ratio: boolean;
        protected _color: number;
        constructor(src?: Texture);
        get texture(): Texture;
        set texture(value: Texture);
        private onTextureReload;
        get tile(): boolean;
        set tile(value: boolean);
        get borderRadius(): Array<number>;
        set borderRadius(value: Array<number>);
        get radiusIsRatio(): boolean;
        set radiusIsRatio(value: boolean);
        get color(): number;
        set color(value: number);
        protected onDestroy(): void;
        protected onRender(style: CSSStyleDeclaration): void;
    }
    class SGraphics implements IGraphics {
        protected sizeSensitive: boolean;
        protected empty: boolean;
        protected _owner: UIElement;
        get owner(): UIElement;
        set owner(value: UIElement);
        refresh(bySizeChanged?: boolean): void;
        protected refreshNow(): void;
        private _draw;
        protected adjustContentBox(offsetX: number, offsetY: number): void;
        protected onRender(style: CSSStyleDeclaration): void;
        protected onDestroy(): void;
    }
    class SEllipse extends SRect {
        protected onRender(style: CSSStyleDeclaration): void;
    }
    interface IGraphics {
        owner: UIElement;
        refresh(): void;
    }
    class TranslationsLoader implements IResourceLoader {
        load(task: ILoadTask): Promise<Translations>;
    }
    type I18nTextInfo = {
        sid?: string;
        key?: string;
        text: string;
    };
    class Translations extends Resource {
        private _id;
        private _t;
        private _lngs;
        private _fallbackLng;
        static _allInsts: Map<string, Translations>;
        static getById(id: string): Translations;
        static create(id: string, fallbackLng?: string): Translations;
        static translate(text: string, options?: Record<string, any>): string;
        static decodeI18nText(text: string, out?: I18nTextInfo): I18nTextInfo;
        static encodeI18nText(info: I18nTextInfo, newText?: string): string;
        protected constructor(id: string, fallbackLng?: string);
        get id(): string;
        setContent(lng: string, content: any): this;
        t(name: string, defaultValue?: string): string;
        t(name: string, options: Record<string, any>): string;
        t(name: string, defaultValue: string, options: Record<string, any>): string;
        protected onDestroy(): void;
    }
    class TextureLoader implements IResourceLoader {
        load(task: ILoadTask): Promise<Texture>;
    }
    class Texture extends Resource {
        sizeGrid: Array<number>;
        svgSize: Array<number>;
        source: HTMLImageElement | ImageBitmap;
        formattedUrl: string;
        constructor();
        get width(): number;
        get height(): number;
    }
    const TypedArrayClasses: Record<string, any>;
    class SerializeUtil {
        static isDeserializing: boolean;
        static hasProp(...keys: string[]): boolean;
        errors: Array<string>;
        getNodeByRef: (id: string | string[]) => Widget;
        getNodeData: (node: Widget) => any;
        basePath: string;
        decodeObj(data: any, obj?: any): any;
        decodeObjBounds(data: any, obj: Widget): void;
        decodeObjSome(data: any, obj: any, includeKeys: Array<string>): void;
        decodeObjWithFilter(data: any, obj: any, excludeKeys: Set<string>): void;
        private _decode;
        static bakeOverrideData(overrideData: any): Record<string, any[]>;
        static applyOverrideData(nodeData: any, overrideDataMap: Record<string, Array<any>>): any;
    }
    class ResourceManager implements IResourceManager {
        static readonly extMap: {
            [ext: string]: Array<TypeMapEntry>;
        };
        static readonly typeMap: {
            [type: string]: TypeMapEntry;
        };
        static downloader: Downloader;
        static registerLoader(exts: string[], cls: new () => IResourceLoader, type?: string): void;
        baseUrl: string;
        baseUrls: Record<string, string>;
        version: Record<string, string>;
        debug: boolean;
        retryNum: number;
        retryDelay: number;
        maxLoader: number;
        loadedMap: {
            [url: string]: Array<any>;
        };
        preLoadedMap: {
            [url: string]: any;
        };
        private _loadings;
        private _queue;
        private _downloadings;
        constructor();
        get loading(): boolean;
        load(url: string | ILoadURL | (string | Readonly<ILoadURL>)[], type?: string, onProgress?: ProgressCallback): Promise<any>;
        load(url: string | ILoadURL | (string | Readonly<ILoadURL>)[], options?: Readonly<ILoadOptions>, onProgress?: ProgressCallback): Promise<any>;
        fetch<K extends keyof ContentTypeMap>(url: string, contentType: K, onProgress?: ProgressCallback, options?: Readonly<ILoadOptions>): Promise<ContentTypeMap[K]>;
        private queueToDownload;
        private download;
        private completeItem;
        getURLInfo(url: string, type?: string): URLInfo;
        warnFailed(url: string, err?: any, initiatorUrl?: string): void;
        warn(msg: string, err?: any): void;
        getRes(url: string, type?: string): any;
        cacheRes(url: string, data: any, type?: string): void;
        clearRes(url: string, checkObj?: any): void;
        forEachResource(callback: (res: Resource) => void): void;
        cancelLoad(url: string | string[]): void;
        private _cancelLoad;
        formatURL(url: string, base?: string): string;
        clearUnusedResources(): void;
        private destroyUnusedResources;
    }
    type TypeMapEntry = {
        typeId: number;
        loaderType: new () => IResourceLoader;
    };
    interface URLInfo {
        ext: string;
        typeId: number;
        main: boolean;
        loaderType: new () => IResourceLoader;
    }
    class Resource extends EventDispatcher implements IResource {
        protected _ref: number;
        protected _obsolute: boolean;
        protected _destroyed?: boolean;
        url: string;
        uuid: string;
        lock: boolean;
        get destroyed(): boolean;
        get obsolute(): boolean;
        set obsolute(value: boolean);
        get refCount(): number;
        protected constructor();
        isCreateFrom(url: string): boolean;
        addRef(count?: number): void;
        removeRef(count?: number): void;
        clearRef(): void;
        protected onDestroy(): void;
        destroy(): void;
    }
    class PrefabParser {
        static parse(data: any, basePath?: string, options?: Record<string, any>, errors?: Array<any>): Widget;
        static collectResourceLinks(data: any, basePath: string): (string | ILoadURL)[];
    }
    class PrefabLoader implements IResourceLoader {
        load(task: ILoadTask): Promise<Prefab>;
    }
    class Prefab extends Resource {
        static parserAPI: IPrefabParserAPI;
        protected _deps: Array<IResource>;
        data: any;
        basePath: string;
        constructor(data: any, basePath?: string, deps?: Array<IResource>);
        create<T extends Widget>(options?: Record<string, any>, errors?: Array<any>): T;
        get deps(): ReadonlyArray<IResource>;
        addDep(res: IResource): void;
        addDeps(resArr: Array<IResource>): void;
        protected onDestroy(): void;
        get obsolute(): boolean;
        set obsolute(value: boolean);
        private onDepObsolute;
    }
    interface ILoadTask {
        readonly type: string;
        readonly url: string;
        readonly formattedUrl: string;
        readonly uuid: string;
        readonly ext: string;
        readonly manager: IResourceManager;
        readonly obsoluteInst: IResource;
        readonly options: Readonly<ILoadOptions>;
        readonly progress: IBatchProgress;
    }
    interface IResourceLoader {
        load(task: ILoadTask): Promise<IResource>;
    }
    interface ILoadOptions {
        type?: string;
        priority?: number;
        group?: string;
        cache?: boolean;
        ignoreCache?: boolean;
        noRetry?: boolean;
        silent?: boolean;
        blob?: ArrayBuffer;
        initiator?: ILoadTask;
        [key: string]: any;
    }
    interface ILoadURL extends ILoadOptions {
        url: string;
    }
    interface ContentTypeMap {
        "text": string;
        "json": any;
        "xml": XML;
        "arraybuffer": ArrayBuffer;
        "image": HTMLImageElement | ImageBitmap;
        "sound": HTMLAudioElement;
    }
    interface IResourceManager {
        baseUrl: string;
        baseUrls: Record<string, string>;
        version: Record<string, string>;
        debug: boolean;
        retryNum: number;
        retryDelay: number;
        maxLoader: number;
        loadedMap: {
            [url: string]: Array<any>;
        };
        preLoadedMap: {
            [url: string]: any;
        };
        get loading(): boolean;
        load(url: string | ILoadURL | (string | Readonly<ILoadURL>)[], type?: string, onProgress?: ProgressCallback): Promise<any>;
        load(url: string | ILoadURL | (string | Readonly<ILoadURL>)[], options?: Readonly<ILoadOptions>, onProgress?: ProgressCallback): Promise<any>;
        load(url: string | ILoadURL | (string | Readonly<ILoadURL>)[], arg1?: string | Readonly<ILoadOptions>, onProgress?: ProgressCallback): Promise<any>;
        fetch<K extends keyof ContentTypeMap>(url: string, contentType: K, onProgress?: ProgressCallback, options?: Readonly<ILoadOptions>): Promise<ContentTypeMap[K]>;
        cancelLoad(urls: string | string[]): void;
        getRes(url: string, type?: string): any;
        cacheRes(url: string, res: IResource, type?: string): void;
        clearRes(url: string, checkObj?: IResource): void;
        formatURL(url: string, base?: string): string;
        forEachResource(callback: (res: IResource) => void): void;
    }
    interface IResource {
        url: string;
        uuid: string;
        lock: boolean;
        get destroyed(): boolean;
        get obsolute(): boolean;
        set obsolute(value: boolean);
        get refCount(): number;
        isCreateFrom(url: string): boolean;
        addRef(count?: number): void;
        removeRef(count?: number): void;
        clearRef(): void;
        destroy(): void;
    }
    interface IPrefabParserAPI {
        /**收集资源链接 */
        collectResourceLinks: (data: any, basePath: string) => (string | ILoadURL)[];
        /**解析 */
        parse: (data: any, basePath?: string, options?: Record<string, any>, errors?: Array<any>) => Widget;
    }
    interface IAssetDb {
        UUID_to_URL_sync(uuid: string): string;
        UUID_to_URL(uuid: string): Promise<string>;
        URL_to_UUID(url: string): Promise<string>;
        formatURL(url: string): string;
        getMeta(url: string, uuid: string): Promise<any>;
        getI18nSettingsURL(id: string): string;
    }
    class Downloader {
        common(owner: any, url: string, originalUrl: string, contentType: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
        image(owner: any, url: string, originalUrl: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
        imageWithBlob(owner: any, data: ArrayBuffer, originalUrl: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
        audio(owner: any, url: string, originalUrl: string, onProgress: (progress: number) => void, onComplete: (data: any, error?: string) => void): void;
    }
    class ClassUtils {
        static classRegistry: Record<string, Function>;
        static runtimeRegistry: Record<string, Function>;
        static regClass(name: string, cls: Function): void;
        static getClass(name: string): Function;
        static regRuntime(url: string, cls: Function): void;
        static getRuntime(url: string): Function;
    }
    type ProgressCallback = (progress: number) => void;
    interface IBatchProgress {
        readonly itemCount: number;
        createCallback(weight?: number): ProgressCallback;
        update(index: number, progress: number): void;
    }
    class BatchProgress implements IBatchProgress {
        private _callback;
        private _items;
        private _weights;
        private _progress;
        constructor(callback: ProgressCallback);
        get itemCount(): number;
        reset(): void;
        createCallback(weight?: number): ProgressCallback;
        update(index: number, value: number): void;
    }
    class AssetDb implements IAssetDb {
        static uuidMap: Record<string, string>;
        static urlMap: Record<string, string>;
        static metaMap: Record<string, any>;
        static i18nUrlMap: Record<string, string>;
        UUID_to_URL_sync(uuid: string): string;
        UUID_to_URL(uuid: string): Promise<string>;
        URL_to_UUID(url: string): Promise<string>;
        formatURL(url: string): string;
        getMeta(url: string, uuid: string): Promise<any>;
        getI18nSettingsURL(id: string): string;
    }
    class ComponentDriver {
        static readonly onUpdates: Set<Component>;
        static readonly onLateUpdates: Set<Component>;
        static readonly toStarts: Set<Component>;
        static readonly toDestroys: Set<Component>;
        static callStart(): void;
        static callUpdate(): void;
        static callLateUpdate(): void;
        static callDestroy(): void;
        static add(comp: Component): void;
        static remove(comp: Component): void;
    }
    class Component {
        private _hideFlags;
        private _enableState;
        _status: number;
        owner: Widget;
        _enabled: boolean;
        _extra: IComponentExtra;
        runInEditor: boolean;
        scriptPath: string;
        get hideFlags(): number;
        set hideFlags(value: number);
        constructor();
        hasHideFlag(flag: number): boolean;
        get enabled(): boolean;
        set enabled(value: boolean);
        get awaked(): boolean;
        get destroyed(): boolean;
        destroy(): void;
        onAdded(): void;
        onAwake(): void;
        onEnable(): void;
        onStart?(): void;
        onUpdate?(): void;
        onLateUpdate?(): void;
        onDisable(): void;
        onDestroy(): void;
    }
    interface IComponentExtra {
    }
}
