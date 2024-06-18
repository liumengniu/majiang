export { };
declare global {
    export namespace IEditorEnv {
        export interface ITextureToolOptions {
            abortToken?: IAbortToken;
            tempPath?: string;
            targetPlatform?: RuntimePlatformType[];
            progressCallback?: (progress: number) => void;
        }

        export interface ITextureFileWithFormat {
            file: string;
            ext: string;
            format: number;
        }

        export interface ITexturePlatformSettings {
            format?: string;
            quality?: number;
        }

        export interface ITextureSettings {
            /**
             * 0-default, 1-lightmap, 2-sprite texture
             */
            textureType?: number;
            /**
             * 0-2D, 1-Cube
             */
            textureShape?: number;
            sRGB?: boolean;
            alphaChannel?: boolean;
            generateMipmap?: boolean;
            fadeOutEnable?: boolean;
            anisoLevel?: number;
            premultiplyAlpha?: boolean;
            /**
             * 0-repeat, 1-clamp, 2-mirrored
             */
            wrapMode?: number;
            /**
             * 0-nearest, 1-linear, 2-cubic
             */
            filterMode?: number;
            readWrite?: boolean;
            hdrEncodeFormat?: number;
            sizeGrid?: Array<number>;
            stateNum?: number;
            /**
             * 0-none, 1-x, 2-y
             */
            flip?: number;
            /**
             * 0-none, 1-left, 2-right
             */
            rotate?: number;
            /**
             * 0-none, 1-nearest, 2-larger, 3-smaller
             */
            npot?: number;
            textureData?: number;
            framesLayout?: boolean;
            mipmapCoverageIBL?: boolean;
            cubemapSize?: number;
            cubemapFileMode?: string;
            fadeOutMipmap?: { x: number, y: number };
            mipmapFilter?: number;
            extendFilter?: number;
            platformDefault?: {
                /** 0-RGBA 1-RGB 10-CompressedFormat */
                format?: number,
                quality?: number
            };
            platformPC?: ITexturePlatformSettings;
            platformAndroid?: ITexturePlatformSettings;
            platformIOS?: ITexturePlatformSettings;
        }

        export interface ITextureConfig {
            /** 0-default, 1-lightmap, 2-sprite */
            type: number;
            sRGB: boolean;
            /** 0-default, 1-cube */
            shape?: number;
            wrapMode: number;
            filterMode: number;
            anisoLevel: number;
            readWrite: boolean;
            mipmap: boolean;
            pma: boolean;
            hdrEncodeFormat: number;
            sizeGrid?: number[];
            stateNum?: number;
            platforms: Record<string, number>;
            files: Array<ITextureFileWithFormat>;
        }

        export namespace TextureTool {
            function run(srcFilePath: string, destFilePrefix: string, config: ITextureSettings, options?: ITextureToolOptions): Promise<ITextureConfig>;
        }
        export interface ITexturePackerOptions extends IMaxRectsPackingOptions {
            trimImage?: boolean;
            scale?: number;
        }

        export interface IAtlasFrame {
            frame: {
                idx: number;
                x: number;
                y: number;
                w: number;
                h: number;
            },
            sourceSize: {
                w: number;
                h: number;
            },
            spriteSourceSize: {
                x: number,
                y: number
            }
        }

        export interface ITexturePackerResult {
            frames: Record<string, IAtlasFrame>;
            images: Array<{ name: string, width: number, height: number }>;
        }

        export namespace ITexturePacker {
            function pack(sourceFiles: string[], outTexturePath: string, options?: ITexturePackerOptions): Promise<ITexturePackerResult>;
        }
        export interface IEncodeObjOptions {
            writeType?: boolean,
            eliminateDefaults?: boolean,
            getNodeRef?: (node: Laya.Node) => string | string[],

            forceType?: string;
        }

        export interface IDecodeObjOptions {
            outErrors?: Array<string>;
            strictTypeCheck?: boolean;
            getNodeByRef?: (id: string | string[]) => Laya.Node;
            getNodeData?: (node: Laya.Node) => any;
        }

        export namespace ISerializeUtil {
            const isDeserializing: boolean;

            function encodeObj(obj: any, receiver?: any, options?: IEncodeObjOptions): any;

            function encodeProperty(prop: FPropertyDescriptor, obj: any, options?: IEncodeObjOptions): any;

            function decodeObj(data: any, receiver?: any, type?: string, options?: IDecodeObjOptions): any;
        }
        export interface IScriptTool {
            minifyJsFile(filePath: string, mangleOptions?: { keep_fnames?: boolean, keep_classnames?: boolean }): Promise<void>;
            babelTransform(filePath: string, presets?: string): Promise<void>;
        }
        export interface ISceneManager {
            readonly onSelectionChanged: IDelegate<() => void>;
            readonly onSceneActivated: IDelegate<(currentScene: IMyScene, previousScene: IMyScene) => void>;

            activeScene: IMyScene;
            readonly scenes: ReadonlyArray<IMyScene>;
        }

        export interface IResourceManager {
            saveResources(): void;
            readonly dirtyResources: Set<string>;

            setProps(obj: any, datapath: string[], value: any): Promise<boolean>;
            getProps(obj: any, changes?: Array<any>, excludeUnserializable?: boolean): boolean;
        }
        export interface IPrefabI18nString {
            obj: any;
            prop: string;
            text: string;
        }

        export interface IPrefabAnalyseOptions {
            getDeps?: boolean;
            getI18nStrings?: boolean;
        }

        export interface IPrefabAnalyseResult<ProvidedOptions extends IPrefabAnalyseOptions> {
            deps: Array<IAssetLinkInfo> | (ProvidedOptions['getDeps'] extends false ? never : undefined);
            i18nStrings: Array<IPrefabI18nString> | (ProvidedOptions['getI18nStrings'] extends false ? never : undefined);
        }

        export interface IPrefabDataAnalyzer {
            analyse<T extends IPrefabAnalyseOptions>(asset: IAssetInfo, options: T): Promise<IPrefabAnalyseResult<T>>;
            analyseRaw<T extends IPrefabAnalyseOptions>(sourceData: any, isWidget: boolean, options: T): Promise<IPrefabAnalyseResult<T>>;
            getContent(asset: IAssetInfo): Promise<any>;
            getNodeMap(asset: IAssetInfo): Promise<Record<string, any>>;

        }
        export interface IOffscreenRenderSubmit {
            readonly renderTarget: Laya.Sprite;
            readonly bgColor: Laya.Color;
            onPreRender(): void;
            onPostRender(): void;
            onComplete: (bitmap: ImageBitmap, contentWidth: number, contentHeight: number) => void;
        }

        export interface IOffscreenRenderer {
            readonly width: number;
            readonly height: number;

            submit(target: IOffscreenRenderSubmit): void;
            destroy(): void;
        }

        export interface IOffscreenRenderScene {
            readonly scene3D: Laya.Scene3D;
            readonly camera: Laya.Camera;
            readonly light: Laya.Sprite3D;

            readonly plane: Laya.Sprite3D;
            readonly obj: Laya.Sprite3D;
            readonly holder: Laya.Sprite3D;

            readonly cameraControls: ICameraControls;

            focusDistanceRatio: number;

            destroy(): void;

            resetCameraTransform(): void;

            focusNode(): void;

            setSkyMaterial(mat: Laya.Material): void;

            rotate(x: number, y: number): void;

            changeShape(shape: string): Promise<void>;
        }

        export interface IMyScene extends gui.EventDispatcher {
            readonly id: string;
            readonly asset: IAssetInfo;
            readonly port: IMyMessagePort;
            readonly selection: ReadonlyArray<IMyNode>;
            readonly allNodes: Map<string, WeakRef<IMyNode>>;
            readonly topLevelSelection: ReadonlyArray<IMyNode>;
            readonly modified: boolean;
            readonly viewerMode: boolean;

            readonly loading: boolean;
            readonly rootNode2D: IMyNode;
            readonly rootNode3D: IMyNode;
            readonly prefabRootNode: IMyNode;
            readonly worldType: WorldType;

            readonly status: IConfigObject;

            readonly openedBoxChain: ReadonlyArray<IMyNode>;
            readonly openedBox: IMyNode;
            openBox(box: IMyNode): void;
            closeBox(): void;
            findBox(node: IMyNode): IMyNode;
            isBox(node: IMyNode): boolean;
            validateScene(): void;

            setModified(): void;

            addSelection(target: IMyNode, ctrlKey?: boolean): void;
            setSelection(nodes: IMyNode[]): void;
            removeSelection(node: IMyNode): void;
            clearSelection(): void;
            readonly has3DSelection: boolean;

            getNodeById(id: string): IMyNode;
            findNodes(keyword: string, maxResults?: number): Array<any>;

            addNode(parentNode: IMyNode, node: IMyNode, index?: number): void;
            removeNode(node: IMyNode): void;
            instantiatePrefab(assetId: string, nodeProps: Record<string, any>, parentNode: IMyNode, options: ICreateNodeOptions): Promise<IMyNode>;
            unpackPrefab(prefabNode: IMyNode, deep?: boolean): Promise<void>;

            setProps(obj: IMyNode | IMyComponent, datapath: string[], value: any, isData?: boolean): Promise<boolean>;
            getProps(obj: IMyNode | IMyComponent, changes?: Array<any>, excludeUnserializable?: boolean): boolean;

            createPrefab(node: IMyNode, savePath: string, fileName?: string): Promise<IAssetInfo>;

            recordObject(node: any, ...propNames: string[]): void;
            setObjectChanged(obj: IMyNode | IMyComponent, ...datapaths: (string[] | string)[]): void;
            writeRuntime(): void;

            runScript(name: string, ...args: any[]): Promise<any>;
            runNodeScript(target: IMyNode | IMyComponent, methodName: string, ...args: any[]): Promise<any>;
        }
        export interface IMyNodeExtra {
            id?: string;
            type?: string;
            selected?: boolean;
            isTopPrefab?: boolean;
            scene?: IMyScene;
        }

        export interface IMyNode {
            hideFlags: number;
            name: string;
            readonly parent: IMyNode;
            readonly destroyed: boolean;
            readonly numChildren: number;

            getChildAt(index: number): IMyNode;
            isAncestorOf(node: IMyNode): boolean;
            hasHideFlag(flag: number): boolean;

            _setBit(type: number, value: boolean): void;
            _getBit(type: number): boolean;

            _extra: IMyNodeExtra;
        }

        export interface IMyComponent {
            readonly owner: IMyNode;
            hideFlags: number;
            enabled: boolean;
        }
        export interface IRectangle {
            width: number;
            height: number;
            x: number;
            y: number;
            allowRotation?: boolean;
            index?: number;
            tag?: number;
            data?: any;

            oversized?: boolean;
            rotated?: boolean;
        }

        export interface IBin<T extends IRectangle> {
            width: number;
            height: number;
            freeRects: IRectangle[];
            rects: T[];
            tag?: number;
        }

        export enum MaxRectsPackingLogic {
            MaxArea = 0,
            MaxEdge = 1
        }

        /**
         * Options for MaxRect Packer
         * @property {boolean} smart Smart sizing packer (default is true)
         * @property {boolean} pot use power of 2 sizing (default is true)
         * @property {boolean} square use square size (default is false)
         * @property {boolean} allowRotation allow rotation packing (default is false)
         * @property {boolean} tag allow auto grouping based on `rect.tag` (default is false)
         * @property {boolean} exclusiveTag tagged rects will have dependent bin, if set to `false`, packer will try to put tag rects into the same bin (default is true)
         * @property {boolean} border atlas edge spacing (default is 0)
         * @property {MaxRectsPackingLogic} logic MAX_AREA or MAX_EDGE based sorting logic (default is MAX_EDGE)
         * @export
         * @interface Option
         */
        export interface IMaxRectsPackingOptions {
            smart?: boolean,
            pot?: boolean,
            square?: boolean,
            allowRotation?: boolean,
            tag?: boolean,
            exclusiveTag?: boolean,
            border?: number,
            logic?: MaxRectsPackingLogic
        }

        export interface IMaxRectsPacker<T extends IRectangle> {
            readonly bins: IBin<T>[];

            /**
             * Add a bin/rectangle object with data to packer
             * @param {number} width of the input bin/rectangle
             * @param {number} height of the input bin/rectangle
             * @param {*} data custom data object
             */
            add(width: number, height: number, data: any): T;
            /**
             * Add a bin/rectangle object extends IRectangle to packer
             * @template T Generic type extends IRectangle interface
             * @param {T} rect the rect object add to the packer bin
             */
            add(rect: T): T;
            /**
             * Add an Array of bins/rectangles to the packer.
             *
             * `Javascript`: Any object has property: { width, height, ... } is accepted.
             *
             * `Typescript`: object shall extends `MaxrectsPacker.IRectangle`.
             *
             * note: object has `hash` property will have more stable packing result
             *
             * @param {T[]} rects Array of bin/rectangles
             */
            addArray(rects: T[]): void;
            /**
             * Reset entire packer to initial states, keep settings
             */
            reset(): void;
            /**
             * Stop adding new element to the current bin and return a new bin.
             *
             * note: After calling `next()` all elements will no longer added to previous bins.
             *
             * @returns {number}
             */
            next(): number;

            /**
             * Return current functioning bin index, perior to this wont accept any new elements
             *
             * @readonly
             * @type {number}
             */
            get currentBinIndex(): number;

            /**
             * Return all rectangles in this packer
             *
             * @readonly
             * @type {T[]}
             */
            get rects(): T[];
        }
        export interface ILiveServer {
            readonly host: string;
            readonly port: number;
            readonly securePort: number;
            readonly url: string;
            serveAnywhere(webRootPath: string): Promise<string>;
        }
        export interface IIcoEncoder {
            encode(imageBuffers: Array<Buffer | ArrayBuffer>): Buffer;
        }
        export namespace II18nUtils {
            function collectStrings(defAssetId: string): Promise<void>;
            function syncTranslations(defAssetId: string): Promise<void>;
        }
        export interface IHierarchyWriterOptions {
            getNodeRef?: (node: Laya.Node) => string | string[];
            noHeader?: boolean;
        }

        export namespace IHierarchyWriter {
            function write(node: Laya.Node, options?: IHierarchyWriterOptions): any;
            function writeMultiple(nodes: ReadonlyArray<Laya.Node>, props?: any, options?: IHierarchyWriterOptions): any;
            function writeScene(scene2D: Laya.Scene, scene3D: Laya.Scene3D): any;
            function collectResources(node: Laya.Node, out?: Set<any>): Set<any>;
        }
        export interface IHandle {
            get valueChanged(): boolean;
        }

        export interface IBoxHandle extends IHandle {
            position: Laya.Vector3;
            size: Laya.Vector3;
        }

        export interface ICapsuleHandle extends IHandle {
            position: Laya.Vector3;
            radius: number;
            height: number;
        }

        export interface ICylinderHandle extends IHandle {
            position: Laya.Vector3;
            upRadius: number;
            downRadius: number;
            height: number;
        }

        export namespace IHandles {
            const cubeMesh: Laya.Mesh;
            const quadMesh: Laya.Mesh;
            const sphereMesh: Laya.Mesh;
            const arrowZMesh: Laya.Mesh;
            const planeMesh: Laya.Mesh;

            const meshMaterial: Laya.Material;
            const lineMaterial: Laya.Material;
            const dottedLineMaterial: Laya.Material;

            const line: Laya.PixelLineSprite3D;

            /**
             * 
             * @param position 
             */
            function positionMoveHandle(position: Laya.Vector3): Laya.Vector3;

            /**
             * 方向移动操作组件
             * @param direction 移动方向
             * @param position 初始位置
             * @param size 组件绘制大小
             * @param color 颜色
             * @returns 修改后的位置
             */
            function directionMoveHandle(direction: Laya.Vector3, position: Laya.Vector3, size: number, color?: Laya.Color): Laya.Vector3;

            /**
             * 
             * @param direction 
             * @param position 
             * @param size 
             * @param color 
             */
            function directionMoveQuadHandle(direction: Laya.Vector3, position: Laya.Vector3, size: number, color?: Laya.Color): Laya.Vector3;

            /**
             * 
             * @param direction1 
             * @param direction2 
             * @param position 
             * @param size 
             * @param color 
             */
            function planeMoveHandle(direction1: Laya.Vector3, direction2: Laya.Vector3, position: Laya.Vector3, size: number, color?: Laya.Color): Laya.Vector3;

            /**
             * 
             * @param position 
             * @param targetVertex 
             * @param size 
             * @param color 
             */
            function worldMoveHandle(position: Laya.Vector3, targetVertex: boolean, size: number, color?: Laya.Color): Laya.Vector3;

            /**
             * 缩放操作组件
             * @param scale 初始缩放值 
             * @param position 组件绘制位置
             * @param rotation 组件绘制旋转 (同时改变操作方向)
             * @param size 组件绘制大小
             * @param color 颜色
             * @returns 修改后缩放值
             */
            function directionScaleHandle(scale: number, position: Laya.Vector3, rotation: Laya.Quaternion, size: number, color?: Laya.Color): number;

            /**
             * 半径操作组件
             * @param radius 输入半径
             * @param position 位置
             * @param rotation 旋转
             * @param color 颜色
             * @returns 返回半径
             */
            function radiusHandle(radius: number, position: Laya.Vector3, rotation?: Laya.Quaternion, color?: Laya.Color): number;

            /**
             * 圆锥操作组件
             * @param rotation 圆锥旋转
             * @param topPosition 圆锥顶点位置
             * @param angle 圆锥角度
             * @param range 圆锥高度
             * @param color 线段颜色
             * @returns x: 圆锥角度 y: 圆锥高度
             */
            function coneHandle(rotation: Laya.Quaternion, topPosition: Laya.Vector3, angle: number, range: number, color?: Laya.Color): Laya.Vector2;

            /**
             * 绘制线段
             * @param start 线段起点
             * @param end 线段终点
             * @param color 线段颜色
             */
            function drawLine(start: Laya.Vector3, end: Laya.Vector3, color?: Laya.Color): void;

            function drawDottedLine(start: Laya.Vector3, end: Laya.Vector3, color?: Laya.Color): void;

            /**
             * 绘制线框圆
             * @param center 圆心位置
             * @param radius 半径
             * @param normal 垂直于圆平面的法线方向
             * @param color 线段颜色
             */
            function drawWireCircle(center: Laya.Vector3, radius: number, normal: Laya.Quaternion | Laya.Vector3, color?: Laya.Color, angle?: number): void;

            /**
            * 编辑线盒子
            * @param center 位置
            * @param size   大小
            * @param color 线段颜色
            * @param rotation 旋转
            */
            function drawBox(center: Laya.Vector3, size: Laya.Vector3, color?: Laya.Color, rotation?: Laya.Quaternion): void;

            /**
            * 编辑线盒子
            * @param center 位置
            * @param size   大小
            * @param color 线段颜色
            * @param rotation 旋转
            */
            function editBox(center: Laya.Vector3, size: Laya.Vector3, color?: Laya.Color, rotation?: Laya.Quaternion, isCenter?: boolean): IBoxHandle;

            /**
            * 绘制线胶囊体
            * @param center 位置
            * @param size   大小
            * @param color 线段颜色
            * @param rotation 旋转
            */
            function drawCapsule(center: Laya.Vector3, radius: number, height: number, color?: Laya.Color, rotation?: Laya.Quaternion): void;

            /**
             * 编辑胶囊体
             * @param center 位置
             * @param radius 半径
             * @param height 高度
             * @param color 线段颜色
             * @param rotation 旋转
             */
            function editCapsule(center: Laya.Vector3, radius: number, height: number, color?: Laya.Color, rotation?: Laya.Quaternion): ICapsuleHandle;

            /**
             * 绘制半球
             * @param center 位置
             * @param size   大小
             * @param color 线段颜色
             * @param rotation 旋转
             */
            function drawHemiSphere(center: Laya.Vector3, radius: number, color?: Laya.Color, rotation?: Laya.Quaternion): void;

            /**
            * 绘制球体
            * @param center 位置
            * @param size   大小
            * @param color 线段颜色
            */
            function drawSphere(center: Laya.Vector3, radius: number, color?: Laya.Color): void;

            /**
             * 绘制圆柱体
             * @param center 位置
             * @param radius 半径
             * @param height 高度
             * @param color 线段颜色
             * @param rotation 旋转
             */
            function drawCylinder(center: Laya.Vector3, upRadius: number, downRadius: number, height: number, color?: Laya.Color, rotation?: Laya.Quaternion): void;

            /**
             * 编辑圆柱体
             * @param center 位置
             * @param radius 半径
             * @param height 高度
             * @param color 线段颜色
             * @param rotation 旋转
             */
            function editCylinder(center: Laya.Vector3, upRadius: number, downRadius: number, height: number, color?: Laya.Color, rotation?: Laya.Quaternion, editorConfig?: any): ICylinderHandle;
            /**
             * 绘制线矩行
             * @param rotation 矩形旋转
             * @param center 矩形位置
             * @param width 宽
             * @param height 高
             * @param color 线段颜色
             */
            function drawWirePlane(rotation: Laya.Quaternion, center: Laya.Vector3, width: number, height: number, color?: Laya.Color, spread?: number): void;

            /**
            * 绘制线椭圆
            * @param rotation 椭圆旋转
            * @param center 椭圆位置
            * @param width 宽
            * @param height 高
            * @param color 线段颜色
            */
            function drawEllipse(rotation: Laya.Quaternion, center: Laya.Vector3, width: number, height: number, color?: Laya.Color, spread?: number): Laya.Vector2;

            /**
             * 绘制 billboard
             * @param position 位置
             * @param size 绘制大小
             * @param color 颜色
             */
            function drawBillboard(position: Laya.Vector3, size: number, color?: Laya.Color): void;

            /**
             * 绘制 立方体
             * @param position 位置
             * @param rotation 旋转
             * @param size 绘制大小
             * @param color 颜色
             */
            function drawCube(position: Laya.Vector3, rotation: Laya.Quaternion, size: number, color?: Laya.Color): void;

            /**
             * 
             * @param mesh 
             * @param position 
             * @param rotation 
             * @param scale 
             * @param color 
             */
            function drawMesh(mesh: Laya.Mesh, position?: Laya.Vector3, rotation?: Laya.Quaternion, scale?: Laya.Vector3, color?: Laya.Color): void;

            /**
             * 
             * @param mesh 
             * @param position 
             * @param rotation 
             * @param scale 
             * @param color 
             */
            function drawMeshLine(mesh: Laya.Mesh, position?: Laya.Vector3, rotation?: Laya.Quaternion, scale?: Laya.Vector3, color?: Laya.Color): void;

            /**
             * 
             * @param factory 
             * @param args 
             */
            function drawCustom<T extends any[]>(factory: (...args: T) => HandleDrawBase, ...args: T): void;
        }
        export namespace IHandleUtils {

            /**
             * 获取鼠标坐标
             */
            const mousePosition: Readonly<Laya.Vector2>;

            /**
             * 计算还原透视缩放
             * @param position 
             */
            function getHandleSize(position: Laya.Vector3): number;

            /**
             * 
             * @param x 
             * @param y 
             * @param sp 
             * @param outPosition 
             */
            function getVertexPositionformSp(x: number, y: number, sp: Laya.Sprite3D, outPosition: Laya.Vector3): boolean;
        }
        export namespace IGizmos3D {

            /**
             * Gizmos icon
             * @param position 图标位置
             * @param iconTexUrl icon 图片资源路径
             */
            function drawIcon(position: Laya.Vector3, iconTexUrl: string, color?: Laya.Color): void;

            /**
             * Gizmos line
             * @param from 线段起点
             * @param to 线段终点
             * @param color 线段颜色
             */
            function drawLine(from: Laya.Vector3, to: Laya.Vector3, color?: Laya.Color): void;

            /**
             * Gizmos wire box
             * @param center 中心点
             * @param size 立方体尺寸
             * @param color 线段颜色
             */
            function drawWireBox(center: Laya.Vector3, size: Laya.Vector3, color?: Laya.Color): void;

            /**
             * Gizmos wire sphere
             * @param center 中心点
             * @param radius 半径
             * @param color 线段颜色
             */
            function drawWireSphere(center: Laya.Vector3, radius: number, color?: Laya.Color): void;

            /**
             * Gizmos bound frustum
             * @param frustum 截锥体
             * @param color 线段颜色
             */
            function drawBoundFrustum(frustum: Laya.BoundFrustum, color?: Laya.Color): void;

            /**
             * Gizmos bound box
             * @param bBox 
             * @param color 
             */
            function drawBoundBox(bBox: Laya.BoundBox, color?: Laya.Color): void;

            /**
             * Gizmos Mesh
             * @param mesh 绘制 模型 mesh
             * @param subMeshIndex 绘制 submesh 索引， -1 为全部绘制
             * @param position 模型位置
             * @param rotation 模型旋转
             * @param scale 模型缩放
             */
            function drawMesh(mesh: Laya.Mesh, subMeshIndex: number, position?: Laya.Vector3, rotation?: Laya.Quaternion, scale?: Laya.Vector3, color?: Laya.Color): void;

        }
        export interface IGraphicsEditingInfo {
            node: IMyNode;
            comp: IMyComponent;
            propPath: Array<string>;
        }

        export namespace IGizmos2D {
            const editingGraphics: Readonly<IGraphicsEditingInfo>;
            const allowObjectAction: boolean;

            function getManager(node: IMyNode): IGizmosManager;
            function switchEditingGraphics(node: IMyNode, comp?: IMyComponent, propPath?: Array<string>): void;
        }

        export interface StrokeData {
            color?: string;
            width?: number;
            opacity?: number;
            linecap?: string;
            linejoin?: string;
            miterlimit?: number;
            dasharray?: string;
            dashoffset?: number;
        }

        export interface FillData {
            color?: string
            opacity?: number
            rule?: string
        }

        export interface IGizmosManager {
            readonly owner: IMyNode;

            createRect(width: number, height: number): IGizmoRect;
            createCircle(radius: number): IGizmoCircle;
            createPolygon(easyTouch?: boolean): IGizmoPolygon;
            createEllipse(rx: number, ry: number): IGizmoEllipse;
            createPath(easyTouch?: boolean): IGizmoPath;
            createText(text?: string): IGizmoText;
            createHandle(shape: "rect" | "circle", size: number, fill: FillData | string, stroke?: StrokeData | string, cursor?: string): IGizmoHandle;
            createHandleGroup(shape: "rect" | "circle", size: number, fill: FillData | string, stroke?: StrokeData | string, cursor?: string): IGizmoHandleGroup;

            localToGlobal(x: number, y: number, out?: gui.Vec2): gui.Vec2;
            globalToLocal(x: number, y: number, out?: gui.Vec2, targetSpace?: IMyNode): gui.Vec2;
        }

        export interface IGizmoElement {
            readonly owner: IGizmosManager;
            readonly node: SVGElement;
            tag: string;

            readonly onDragStart: IDelegate<(evt: MouseEvent) => void>;
            readonly onDragMoving: IDelegate<(evt: MouseEvent, dx: number, dy: number) => void>;
            readonly onDragEnd: IDelegate<(evt: MouseEvent) => void>;
            readonly onClick: IDelegate<(evt: MouseEvent) => void>;
            readonly onDblClick: IDelegate<(evt: MouseEvent) => void>;

            get x(): number;
            get y(): number;

            get visible(): boolean;
            set visible(value: boolean);

            get touchable(): boolean;
            set touchable(value: boolean);

            get direction(): number;
            set direction(value: number);

            get cursor(): string;
            set cursor(value: string);

            setLocalPos(x: number, y: number): this;
            setPos(x: number, y: number): this;
            setSize(width: number, height: number): this;

            stroke(value: StrokeData | string): this;
            fill(value: FillData | string): this;

            setData(name: string, value: any): this;
            getData(name: string): any;
        }

        export interface IGizmoHandle extends IGizmoElement {
        }

        export interface IGizmoHandleGroup extends IGizmoElement {
            readonly onHandleDragStart: IDelegate<(handle: IGizmoHandle, evt: MouseEvent) => void>;
            readonly onHandleDragMoving: IDelegate<(handle: IGizmoHandle, evt: MouseEvent, dx: number, dy: number) => void>;
            readonly onHandleDragEnd: IDelegate<(handle: IGizmoHandle, evt: MouseEvent) => void>;
            readonly onHandleClick: IDelegate<(handle: IGizmoHandle, evt: MouseEvent) => void>;
            readonly onHandleDblClick: IDelegate<(handle: IGizmoHandle, evt: MouseEvent) => void>;

            get array(): ReadonlyArray<IGizmoHandle>;

            add(): IGizmoHandle;
            remove(handle: IGizmoHandle): void;
            clear(): void;
        }

        export interface IGizmoRect extends IGizmoElement {
        }

        export interface IGizmoCircle extends IGizmoElement {
            setLocalRadius(value: number): this;
            setRadius(value: number): this;
        }

        export interface IGizmoEllipse extends IGizmoElement {
            setLocalRadius(rx: number, ry: number): this;
            setRadius(rx: number, ry: number): this;
        }

        export interface IGizmoPolygon extends IGizmoElement {
            readonly points: Array<number>;
            refresh(): void;
        }

        export interface IGizmoPath extends IGizmoElement {
            relativeCoords: boolean;

            moveTo(x: number, y: number): this;
            lineTo(x: number, y: number): this;
            cubicCurveTo(x: number, y: number, x2: number, y2: number): this;
            cubicCurveTo(x: number, y: number, x1: number, y1: number, x2: number, y2: number): this;
            quadCurveTo(x: number, y: number): this;
            quadCurveTo(x: number, y: number, x1: number, y1: number): this;
            quadCurveTo(x: number, y: number, x1?: number, y1?: number): this;

            resetPath(): this;
            refresh(): void;
        }

        export interface IGizmoText extends IGizmoElement {
            setFontProp(prop: string, value: string | number): this;
            setText(text: string): this;
        }
        export interface IGameScene extends IMyScene {
            readonly selection: ReadonlyArray<Laya.Node>;
            readonly allNodes: Map<string, WeakRef<Laya.Node>>;
            readonly topLevelSelection: ReadonlyArray<Laya.Node>;

            readonly nodesSet_gizmo: Set<Laya.Node>;
            readonly nodesSet_cameras: Set<Laya.Camera>;

            readonly rootNode2D: Laya.Scene;
            readonly rootNode3D: Laya.Scene3D;
            readonly prefabRootNode: Laya.Sprite | Laya.Sprite3D;

            readonly openedBoxChain: ReadonlyArray<Laya.Sprite>;
            readonly openedBox: Laya.Sprite;

            getNodeById(id: string): Laya.Node;
        }
        export type IFileContent = {
            nameSuffix?: string;
            weight?: number;
            numParallelTasks?: number;
        } & ({
            type: "text";
            data: string;
        } | {
            type: "json";
            data: any;
        } | {
            type: "xml";
            data: gui.XML;
        } | {
            type: "arraybuffer";
            data: ArrayBuffer;
        } | {
            type: "bytes";
            data: Uint8Array;
        } | {
            type: "filePath";
            data: string;
        } | {
            type: "autoAtlas";
            data: IAutoAtlasInfo;
        } | {
            type: "custom";
            data: any;
            transformer: (owner: IAssetExportInfo, data: any) => IFileContent;
        });

        export enum AssetExportConfigType {
            Texture = 0,
            Atlas = 1,
            Shader = 2,
            RenderTexture = 3
        }

        export interface IAssetLinkInfo {
            obj: any;
            prop: string;
            url: string;

            /** 是否绝对路径，
             * 如果是，则输出路径为完整路径（从web根目录开始）；
             * 如果否，则输出路径为相对于引用资源的路径。
             * 默认为false
             */
            absolutePath?: boolean;
        }

        export interface IAssetExportDepInfo {
            target: IAssetInfo;
            data: any;
            key: string;
            absolutePath?: boolean;
        }

        export interface IAssetExportInfo {
            asset: IAssetInfo;
            contents: Array<IFileContent>;
            outPath: string;
            deps?: Array<IAssetExportDepInfo>;
            config?: Record<string, any>;
            remote?: boolean;
        }

        export interface IAutoAtlasConfig {
            trimImage: boolean;
            maxWidth: number;
            maxHeight: number;
            padding: number;
            pot: boolean;
            scale: number;
        }

        export interface ITextureInAutoAtlasInfo {
            asset: IAssetInfo;
            meta: sharp.Metadata;
            config: any;
            outPath: string;
        }

        export interface IAutoAtlasInfo {
            name: string;
            prefix: string;
            config: IAutoAtlasConfig;
            textures: Array<ITextureInAutoAtlasInfo>;
        }

        export interface ISubpackageInfo {
            path: string;
            mainScript?: IAssetInfo;
            remote?: boolean;
            remoteUrl?: string;
            autoLoad?: boolean;
        }

        export interface IExportAssetToolOptions {
            baseUrl?: string;
            runtimePlatforms?: RuntimePlatformType[];
            allowTextureCompressedFormat?: boolean;
            keepTextureSourceFile?: boolean;
            useSafeFileExtensions?: boolean;
            exportAutoAtlas?: boolean;
            subpackages?: Array<ISubpackageInfo>;
            classIdTransformer?: IClassIdTransformer;
            logger?: ILogger;
        }

        export interface IOutFileInfo {
            filePath?: string;
            ext?: string;
            config?: any;
            noFile?: boolean;
            noHash?: boolean;
            hash?: string;
            minify?: boolean;
            keepNamesOnMinify?: boolean;
        }

        export interface IExportAssetTool {
            readonly fileExtensionOverrides: Record<string, string>;

            get items(): Map<IAssetInfo, IAssetExportInfo>;

            setAssets(assets: Iterable<IAssetInfo>, progressCallback?: (value: number) => void, abortToken?: IAbortToken): Promise<void>;
            write(outputPath: string, outFiles?: Map<string, IOutFileInfo>, progressCallback?: (value: number) => void, abortToken?: IAbortToken): Promise<void>;
        }
        export interface IEditorEnvSingleton {
            readonly projectPath: string;
            readonly projectName: string;
            readonly projectType: string;
            readonly appPath: string;
            readonly userDataPath: string;
            readonly assetsPath: string;
            readonly webRootPath: string;
            readonly unpackedWebRootPath: string;

            readonly isPackaged: boolean;
            readonly isForeground: boolean;
            readonly started: boolean;

            readonly ipc: IIpc;
            readonly assetMgr: IAssetManager;
            readonly liveServer: ILiveServer;
            readonly codeBuilder: ICodeBuilder;
            readonly sceneManager: ISceneManager;
            readonly resourceManager: IResourceManager;
            readonly navigationManager: INavigationManager;
            readonly d3Manager: ID3Manager;
            readonly port: IMyMessagePort;
            readonly scene: IGameScene;
            readonly uiRoot: Laya.Sprite;
            readonly buildManager: IBuildManager;

            readonly onUpdate: IDelegate<() => void>;
            readonly onAppActivate: IDelegate<() => void>;

            readonly playerSettings: ISettings;
            readonly editorSettings: ISettings;
            readonly sceneViewSettings: ISettings;

            readonly clipboard: IClipboard;

            getPath(name: CommonPathName): Promise<string>;
            getSettings(name: string, autoSync?: boolean): ISettings;

            sendMessageToPanel(panelId: string, cmd: string, ...args: Array<any>): Promise<any>;
            postMessageToPanel(panelId: string, cmd: string, ...args: Array<any>): Promise<void>;
            runUIScript(command: string, ...params: any[]): Promise<any>;

            alert(msg: string, type?: "none" | "info" | "error" | "question" | "warning"): Promise<void>;

            openDevTools(): void;
            clearConsoleMessage(group?: string): void;

            invalidateFrame(): void;
        }
        export interface ID3Manager {
            readonly sceneCamera: Laya.Camera;
            readonly cameraControls: ICameraControls;
            readonly sceneRT: Laya.RenderTexture;

            invalidateGizmos(): void;
            setRefreshRate(value: "on-demand" | "realtime"): void;
            transformCtrlMode(mode: SceneNavToolType): void;

            /**
             * 拾取场景内对象
             * @returns 
             */
            getSpriteUnderMouse(x: number, y: number): Laya.Sprite3D;
            getLookDirectionPos(pos: Laya.Vector3, dir: Laya.Vector3): Readonly<Laya.Vector4>;
            getSpritesInRect(x: number, y: number, width: number, height: number, result: Laya.Node[]): void;
        }
        export namespace ICreateAssetUtil {
            /**
             * @param node
             * @param path 在assets中的相对路径
             */
            function createPrefab(node: Laya.Node, path: string, textureImporter?: Record<string, any>): Promise<IAssetInfo>;

            /**
             * @param scene
             * @param path 在assets中的相对路径
             */
            function createScene(scene: Laya.Scene, path: string, textureImporter?: Record<string, any>): Promise<IAssetInfo>;

            /**
             * @param mat
             * @param path 在assets中的相对路径
             */
            function createMaterial(mat: Laya.Material, path: string, textureImporter?: Record<string, any>): Promise<IAssetInfo>;

            /**
             * @param mesh
             * @param path 在assets中的相对路径
             */
            function createMesh(mesh: Laya.Mesh, path: string): Promise<IAssetInfo>;

            /**
             * @param tex
             * @param path 在assets中的相对路径
             */
            function createTexture(tex: Laya.Texture | Laya.BaseTexture, path: string, textureImporter?: Record<string, any>): Promise<IAssetInfo>;

            /**
             * 将模型源文件解包到指定路径
             * @param modelAsset 模型源文件
             * @param outputPath 输出路径，是绝对路径
             */
            function unpackModel(modelAsset: IAssetInfo, outputPath: string): Promise<void>;

            function writeAnimationClip(clip: Laya.AnimationClip): ArrayBuffer;

            function writeAnimationClip2D(clip: Laya.AnimationClip2D): ArrayBuffer;

            function writeMaterial(mat: Laya.Material): ArrayBuffer;

            function writeMesh(mesh: Laya.Mesh): ArrayBuffer;

            function writeTexture(tex: Laya.Texture | Laya.BaseTexture, filter: number): ArrayBuffer;
        }
        export interface IJsPluginInfo {
            asset: IAssetInfo;
            type: number;
            allowLoadInEditor: boolean;
            allowLoadInRuntime: boolean;
            autoLoad: boolean;
            scriptElement: HTMLElement;
            loadOrder: number;
            minifyOnPublish: boolean;
            keepNames: boolean;
        }

        export interface IScriptBundleDefinition {
            enabled: boolean;
            asset: IAssetInfo;
            globalName: string;
            allowLoadInEditor: boolean;
            allowLoadInRuntime: boolean;
            autoLoad: boolean;
            loadOrder: number;
            entries: string[];
            includeAllFiles: boolean;
        }

        export interface IClassIdTransformer {
            (classId: string): string;
        }

        export enum RebuildReason {
            Code = 1,
            JsPlugin = 2,
            BundleDef = 4
        }

        export interface ICodeBuildOptions {
            minify?: boolean;
            keepNames?: boolean;
            sourcemap?: boolean;
            classIdTransformer?: IClassIdTransformer;
            logger?: ILogger;
        }

        export interface ICodeBuilder {
            readonly busy: boolean;
            get started(): boolean;

            start(): Promise<void>;
            rebuild(reason?: number): void;
            flushChanges(): Promise<void>;

            getJsPlugins(): ReadonlyMap<string, IJsPluginInfo>;
            getScriptBundleDefs(): ReadonlyMap<string, IScriptBundleDefinition>;

            findFunction(name: string): Function;

            buildRelease(outDir: string, outputAssets: { has(asset: IAssetInfo): boolean }, options?: ICodeBuildOptions): Promise<Array<string>>;
            buildScriptBundle(defAsset: IAssetInfo, outDir: string, options?: ICodeBuildOptions): Promise<Array<string>>;
        }
        export enum OrthographicMode {
            Orthographic_XZ,
            Orthographic_XY,
            Orthographic_YZ,
            None
        }

        export interface ICameraControls {
            zoomScale: number;
            transformScale: number;

            get camera(): Laya.Camera;

            get orthographicMode(): OrthographicMode;
            set orthographicMode(value: OrthographicMode);

            get perspectiveFov(): number;
            set perspectiveFov(value: number);

            get orthographic(): boolean;
            set orthographic(value: boolean);

            get size(): number;
            set size(value: number);

            set rotation(value: Laya.Quaternion);
            get rotation(): Laya.Quaternion;

            get cameraDistance(): number;
            get cameraPostion(): Readonly<Laya.Vector3>;

            /**
             * 聚焦点
             */
            get focusPosition(): Laya.Vector3;

            /**
             * normalized right
             */
            get normalizedRight(): Laya.Vector3;

            /**
             * normalized up
             */
            get normalizedUp(): Laya.Vector3;

            /**
             * normalized forward
             */
            get normalizedForward(): Laya.Vector3;

            update(): void;

            /**
             * 设置相机焦点
             * @param focus 
             */
            setFocusPosition(pos: Laya.Vector3, distance?: number, isanim?: boolean): void;
            lookAtDirection(direction: Laya.Quaternion): void;
            lookAt(point: Laya.Vector3, direction: Laya.Quaternion, newSize: number, ortho: boolean): void;

            /**
             * 获得当前焦距的序列化数据
             */
            getFocusData(): any;
            /**
             * 设置焦距的序列化数据
             */
            setFocusData(data: any, isanim?: boolean): void;

            /**
             * 获取屏幕空间坐标生成射线
             * @param x 
             * @param y 
             */
            getScreenRay(x: number, y: number): Readonly<Laya.Ray>;

            /**
             * 可托外的射线
             * @param pos 
             * @param camera 
             * @param out 
             */
            caculateCursorRay(pos: Laya.Vector2, camera: Laya.Camera, out: Laya.Ray): void;

            /**
             * 
             * @param position 
             * @param out 
             */
            getScreenPosition(position: Laya.Vector3, out: Laya.Vector4): boolean;

            /**
             * 镜头放大缩小
             * @param distance 相机朝向方向推进距离
             */
            zoom(distance: number): void;

            translate(distanceX: number, distanceY: number, distanceZ: number): void;
            flyMove(distanceX: number, distanceY: number, distanceZ: number, isshift: boolean): void;
            resetMotion(): void;

            /**
             * 绕 坐标轴 旋转
             * @param axis 
             * @param angle 
             */
            rotateFromAxis(axis: Laya.Vector3, angle: number, lockPivot?: boolean): void;

            /**
             * 偏航角旋转 (左右)
             * 旋转轴固定为 Scene up 向量 (0, 1, 0)
             * @param angle 旋转角度
             */
            rotateYaw(angle: number, lockPivot?: boolean): void;
            /**
             * 俯仰角旋转 (上下)
             * @param angle 
             */
            rotatePicth(angle: number, lockPivot?: boolean): void;


            /**
             * 绕聚焦点 偏航角旋转 (左右)
             * @param angle 旋转角度
             */
            focusRotateYaw(angle: number): void;

            /**
             * 绕聚焦点 俯仰角旋转 (上下)
             * @param angle 旋转角度
             */
            focusRotatePicth(angle: number): void;

            focusNode(node: Laya.Sprite3D): void;
            previewFocusNode(node: Laya.Sprite3D, distanceRatio: number): void;

            setCameraTransform(data: any): void;
            getCameraTransform(): any;
        }
        export interface IBuildTask {
            readonly name: string;
            readonly platform: string;
            readonly config: IBuildConfig;
            readonly platformConfig: any;
            readonly playerSettings: any;
            readonly destPath: string;
            readonly resourcePath: string;
            readonly remotePkgPath: string;
            readonly buildTemplatePath: string;
            readonly projectBuildTemplatePath: string;
            readonly abortToken: IAbortToken;
            readonly exports: IBuildExports;
            readonly logger: ILogger;

            readonly status: BuildTaskStatus;
            waitForCompletion(): Promise<BuildTaskStatus>;
            terminate(success: boolean): void;

            /**
             * 合并配置文件，配置文件可能的位置有
             * 1. 如果是内置发布目标，是IDE内置的发布模版目录；如果是插件增加的发布目录，是插件指定的发布模版目录。
             * 2. 项目下的build-templates目录。
             * 这个方法会将找到的所有配置文件合并在一起，如果有提供overrides参数，也会写入到配置文件中。
             * @param filePath 配置文件路径，是相对于task.destPath的路径。
             * @param overrides 
             */
            mergeConfigFile(filePath: string, overrides?: any): void;

            /**
             * 在模版目录中查找文件，模版目录可能有两个：
             * 1. 如果是内置发布目标，是IDE内置的发布模版目录；如果是插件增加的发布目录，是插件指定的发布模版目录。
             * 2. 项目下的build-templates目录。
             * @param filePath 
             */
            findFileInBuildTemplate(filePath: string): string;

            /**
             * 
             * @param filePath 
             */
            findFileInLib(filePath: string): string;

            setProgressTitle(text: string): void;
            addProgress(value: number): void;
            setProgress(value: number): void;
        }

        export interface IOutSubpackageInfo {
            path: string;
            remoteUrl?: string;
            autoLoad?: boolean;
            hash?: string;
        }

        export interface IBuildExports {
            indexJS: string;
            libs: Array<string>;
            bundles: Array<string>;
            subpackages: Array<IOutSubpackageInfo>;
            miniGameSubPackages: Array<{ name: string, root: string }>;
            files: Map<string, IOutFileInfo>;
        }

        export interface IBuildPlugin {
            /**
             * 构建任务初始化时。可以在这个事件里修改config和platformConfig等配置。
             * @param task 
             */
            onSetup?(task: IBuildTask): Promise<void>;

            /**
             * 构建任务开始。可以在这个事件里在初始化目标目录的结构，或者进行必要的检查和安装等。
             * @param task
             */
            onStart?(task: IBuildTask): Promise<void>;

            /**
             * 正在收集需要发布的资源。assets集合是系统根据依赖、resources目录规则等所有有效的规则收集的所有需要发布的资源对象，你可以额外向集合添加资源对象。
             * @param task 
             * @param assets 
             */
            onCollectAssets?(task: IBuildTask, assets: Set<IAssetInfo>): Promise<void>;

            /**
             * 正在导出资源。exportInfoMap包含了导出资源的信息，包括保存的位置等信息。可以修改outPath自定义资源的输出位置。
             * @param task 
             * @param exportInfoMap 
             */
            onBeforeExportAssets?(task: IBuildTask, exportInfoMap: Map<IAssetInfo, IAssetExportInfo>): Promise<void>;

            /**
             * 脚本导出完成。如果开发者需要对生成的代码进行修改，可以在这个事件里处理。
             * @param task
             */
            onExportScripts?(task: IBuildTask): Promise<void>;

            /**
             * 导出资源完成。如果开发者需要添加自己的文件，或者及进行压缩等操作，可以在这个事件里处理。
             * @param task 
             * @param exportInfoMap 
             */
            onAfterExportAssets?(task: IBuildTask): Promise<void>;

            /**
             * 构建已经完成，可以在这个事件生成一些清单文件，配置文件等。
             */
            onCreateManifest?(task: IBuildTask): Promise<void>;

            /**
             * 如果有原生的构建流程，在这里处理。
             * @param task 
             */
            onCreatePackage?(task: IBuildTask): Promise<void>;

            /**
             * 构建任务完成事件。
             * @param task 
             */
            onEnd?(task: IBuildTask): Promise<void>;
        }

        export enum BuildTaskStatus {
            Running,
            Success,
            Failed
        }

        export namespace BuildTaskStatic {
            function start(platform: string): IBuildTask;
            function start(platform: string, destPath: string): IBuildTask;
            function start(platform: string, ...tempPlugins: Array<IBuildPlugin>): IBuildTask;
            function start(platform: string, destPath: string, ...tempPlugins: Array<IBuildPlugin>): IBuildTask;
        }
        export interface IBuildManager {
            getTargetInfo(platform: string): IBuildTargetInfo;
            getPlugins(platform: string, tempPlugins?: Array<IBuildPlugin>): Array<IBuildPlugin>;
            addPlugin(platform: string, cls: new () => IBuildPlugin, piority?: number): void;
            removeAllPlugins(): void;
        }
        export interface IBuildConfig {
            name: string;
            useCompressedEngine: boolean;
            minifyJS: boolean;
            sourcemap: boolean;
            startupScene: string;
            includedScenes: Array<string>;
            alwaysIncluded: Array<string>;
            copyBinFiles: boolean;
            ignoreFilesInBin: Array<string>;
            enableVersion: boolean;
            enableSubpackages: boolean;
            subpackages: Array<ISubpackageInfo>;
            resourcePath: string;
            useSafeFileExtensions: boolean;
            fileExtensionOverrides: Record<string, string>;
            runtimePlatforms: RuntimePlatformType[];
            allowTextureCompressedFormat: boolean;
            keepTextureSourceFile: boolean;
            engineLibs: Array<string>;
            runHandler: { serve: string, open?: string, QRCode?: string },
            /**
             * 匹配列表内名字的文件或者目录如果已存在于发布目录内，不会在发布初始化时被清除。
             * 注意：不能使用通配符，名字是完全匹配。
             * 注意：路径是相对于destPath
             * 例如：["folder", "abc.js"]
             */
            keepFilesDuringCleaning: Array<string>;
            /**
             * 设定多个文件名匹配字符串，被匹配的文件不会从发布模版目录(build-templates)拷贝到发布目标目录。
             * 注意：使用glob的模式匹配。
             * 注意：路径是相对于destPath
             */
            ignoreFilesInBuildTemplate: Array<string>;
            /**
             * 小游戏分包入口的脚本名称，默认为game.js。有些平台可能是main.js。
             */
            subpackageGameJsName: string;
        }
        export interface IAssetProcessor {
            onPreprocessImage?(assetImporter: IImageAssetImporter): void | Promise<void>;
            onPreprocessAsset?(assetImporter: IAssetImporter): void | Promise<void>;

            onPostprocessImage?(assetImporter: IImageAssetImporter): void | Promise<void>;
            onPostprocessAsset?(assetImporter: IAssetImporter): void | Promise<void>;
        }
        export interface IAssetManager {
            readonly allAssets: Readonly<Record<string, IAssetInfo>>;
            readonly customAssetFilters: Record<string, IAssetFilter>;
            readonly onAssetChanged: IDelegate<(asset: IAssetInfo, flag: AssetChangedFlag) => void>;

            getAllAssetsInDir(folderAsset: IAssetInfo, types?: ReadonlyArray<AssetType>, customFilter?: string): Array<IAssetInfo>;

            readonly resourceDirs: Readonly<Set<IAssetInfo>>;
            getAllAssetsInResourceDir(types?: ReadonlyArray<AssetType>, customFilter?: string): Array<IAssetInfo>;

            getChildrenAssets(folderAsset: IAssetInfo, types: ReadonlyArray<AssetType>, matchSubType?: boolean, customFilter?: string): IAssetInfo[];
            findAssets(keyword: string, types?: ReadonlyArray<AssetType>, matchSubType?: boolean, customFilter?: string, limit?: number): IAssetInfo[];
            filterAssets(assetIds: ReadonlyArray<string>, types?: ReadonlyArray<AssetType>, matchSubType?: boolean, customFilter?: string): IAssetInfo[];

            getAsset(idOrPath: string, allowResourcesSearch?: boolean): IAssetInfo;
            getAssetsByType(types?: ReadonlyArray<AssetType>, matchSubType?: boolean): Array<IAssetInfo>;

            createFileAsset(filePath: string, metaData?: any, allowOverwrite?: boolean): IAssetInfo;
            createFolderAsset(folderPath: string): IAssetInfo;

            getShader(shaderName: string): IAssetInfo;
            getAllShaders(): Record<string, IAssetInfo>;
            setAssetIsShader(asset: IAssetInfo, shaderName: string): void;

            getI18nSettings(id: string): IAssetInfo;
            getAllI18nSettings(forGUI?: boolean): Record<string, IAssetInfo>;

            getAssetTypeByFileExt(ext: string): AssetType[];

            setMetaData(asset: IAssetInfo, data: any): Promise<void>;

            getFullPath(asset: IAssetInfo): string;
            toFullPath(assetFile: string): string;

            getPrefabSourcePath(asset: IAssetInfo): string;

            importAsset(asset: IAssetInfo, args?: ReadonlyArray<string>): void;
            unpackModel(asset: IAssetInfo): Promise<void>;
            flushChanges(): Promise<void>;
        }
        export interface IAssetImporter {
            readonly asset: IAssetInfo;
            readonly parentAsset: IAssetInfo;
            readonly subAssets: ReadonlyArray<ISubAssetInfo>;
            readonly assetFullPath: string;
            readonly isNewAsset: boolean;
            readonly metaData: Record<string, any>;
            readonly settings: Record<string, any>;
            readonly importArgs: ReadonlyArray<string>;
            readonly subAssetLocation: string;
            readonly tempPath: string;

            handleImport(): Promise<void>;

            clearLibrary(): void;
            createSubAsset(fileName: string, id?: string): ISubAssetInfo;
            createAsset(filePath: string, metaData?: any): IAssetInfo;
            setIsShader(shaderName: string, typeDef: FTypeDescriptor): void;
            getAssetPathById(assetId: string): string;
            findAsset(filePath: string): IAssetInfo;
            /**
             * @param progress 0-100的值
             */
            setProgress(progress: number): void;
        }

        export interface IImageAssetImporter extends IAssetImporter {
            readonly settings: ITextureSettings;
        }

        export type FEnumDescriptor = {
            name: string,
            value: any,
            extend?: FEnumDescriptor,
            [index: string]: any,
        }[] | any[] | string;

        export type WorldType = "2d" | "3d" | "gui" | null;
        export type FPropertyType = string | [FPropertyType] | ["Record", FPropertyType];

        export interface FPropertyDescriptor {
            /** 属性名称 */
            name: string;
            /** 
             * 属性类型。
             * 基础类型有：number,string,boolean,any
             * 复合类型有：数组，使用类似[number]这样的方式表达；字典，使用类似["Record", number]这样的方式表达，第一个元素固定为Record，第二个元素为实际类型。
             * 其他名称为在typeRegistry注册的类型。
             * 如果不提供type，表示只用于ui展示，没有实际对应数据。
             */
            type?: FPropertyType;

            /** 该属性在原型中的初始值。这个值也用于序列化时比较，如果相同则不序列化这个属性，所以必须保证这里设置的值就是类中变量的初始值。*/
            default?: any;

            /** 标题。如果不提供，则使用name。 */
            caption?: string;
            /** 可以设定是否隐藏标题 */
            captionDisplay?: "normal" | "hidden" | "none";

            /** 提示文字 */
            tips?: string;

            /** 属性栏目。为多个属性设置相同的值，可以将它们显示在同一个Inspector栏目内。*/
            catalog?: string;
            /**属性栏目的帮助 */
            catalogHelp?: string;
            /* 栏目标题。不提供则直接使用栏目名称。 */
            catalogCaption?: string;
            /* 栏目的显示顺序，数值越小显示在前面。不提供则按属性出现的顺序。*/
            catalogOrder?: number;

            /**
             * 编辑这个属性的控件。内置有：number,string,boolean,color,vec2,vec3,vec4,asset
             * 
             *      number : 数字输入。
             *      string : 字符串输入。默认为单行输入，如果是多行，需要激活multiline选项。
             *      boolean : 多选框。
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
            inspector?: string;

            /** 隐藏控制。
             * 可以用表达式，支持的语法有：
             * 1. 字符串。例如"!data.a && !data.b"，表示属性a和属性b均为空时，隐藏这个属性。隐含的变量有两个，data为当前数据，field为IPropertyField接口。
             * 2. 函数。函数原型为func(data:any, field:IPropertyField)。
             */
            hidden?: boolean | string | Function;
            /** 只读控制。可以用表达式，参考隐藏控制。 */
            readonly?: boolean | string | Function;

            /** 数据检查机制。
             * 可以用表达式，支持的语法有：
             * 1. 字符串。例如"data.a"， 如果data.a是一个字符串，表示验证不通过，这个字符串作为错误提示信息显示；如果是其他值，则表示验证通过。
             *    隐含的变量有三个，data为当前数据，value为当前用户输入的值，field为IPropertyField接口。
             * 2. 函数。函数原型为func(data:any, value:any, field:IPropertyField):any。
             *    如果返回值是一个字符串，表示验证不通过，这个字符串作为错误提示信息显示；如果是其他值，则表示验证通过。
             */
            validator?: string | Function;
            /** 是否允许数据为空值。
             * 可以用表达式，返回true或者false的结果。函数原型为func(data:any, value:any, field:IPropertyField):boolean。
             */
            required?: boolean | string | Function;

            /** 是否序列化 */
            serializable?: boolean;
            /** 属性在不参与序列化时，如果它的数据可能受其他可序列化的属性影响，在这里填写其他属性名称。这通常用于判断预制体属性是否覆盖。*/
            affectBy?: string;

            /** 是否多行文本输入 */
            multiline?: boolean;
            /** 是否密码输入 */
            password?: boolean;
            /** 如果true，文本输入每次输入都提交；否则只有在失焦时才提交（默认行为）。 */
            submitOnTyping?: boolean;
            /** 如果是文本类型，是输入文本的提示信息；如果是布尔类型，是多选框的标题。 */
            prompt?: string;
            /** 字符串类型适用，表示文本支持多国语言输出 */
            multiLanguage?: boolean;

            /** 提供数据源显示一个下拉框去改变属性的值 */
            enumSource?: FEnumDescriptor;
            /** 当数据源为空时，隐藏这个属性 */
            hideIfEnumSourceEmpty?: boolean;

            /** 是否反转布尔值。例如当属性值为true时，多选框显示为不勾选。 */
            reverseBool?: boolean;

            /** 是否允许null值。默认为true。*/
            nullable?: boolean;

            /** 数字的最小值 */
            min?: number,
            /** 数字的最大值 */
            max?: number,
            /** 数值范围，等同于一次性设置min和max。 */
            range?: [number, number];
            /** 拖动方式改变数值时，每次数值改变的幅度。 */
            step?: number;
            /** 小数点后的位数 */
            fractionDigits?: number;
            /** 显示为百分比 */
            percentage?: boolean;

            /** 对数组类型属性适用。表示数组是固定长度，不允许修改。*/
            fixedLength?: boolean;
            /** 对数组类型属性适用。如果不提供，则表示数组允许所有操作，如果提供，则只允许列出的操作。*/
            arrayActions?: Array<"append" | "insert" | "delete" | "move">;
            /** 对数组类型属性适用。这里可以定义数组元素的属性 */
            elementProps?: Partial<FPropertyDescriptor>;

            /** 对字典类型属性适用。表示字典适用指定的固定的key值集合。 */
            fixedKeys?: Array<string>;

            /** 对颜色类型属性适用。表示是否提供透明度a值的修改。对于字符串或者Color类型的属性，默认为true；对于number类型的属性，默认为false */
            showAlpha?: boolean;
            /** 对颜色类型属性适用。它与default值不同的是，当default是null时，可以用defaultColor定义一个非null时的默认值。*/
            defaultColor?: any;
            /** 对颜色类型属性适用。允许显示一个checkbox决定颜色是否为null。 */
            colorNullable?: boolean;

            /** 对对象类型属性适用。如果为true，隐藏对象的标题，同时对象下的属性的显示缩进会减少一级。*/
            hideHeader?: boolean;
            /** 对对象类型属性适用。对象创建时可以下拉选择一个类型。如果显式置为null，则禁止菜单。默认是显示一个创建基类的菜单。使用“ClassName*”这样的格式表示ClassName的所有扩展类*/
            createObjectMenu?: Array<string> | Function;
            /** 对对象类型属性适用。表示这个属性类型有类似结构体的行为特性，即总是作为一个整体使用。
             * 例如，obj对象的某个属性b的值是a1，a1是T类型的实例，且T类型的structLike为true，那么当a1的属性改变时，编辑器将同时调用obj.b = a1。
             * 默认为false。
             */
            structLike?: boolean;

            /** 说明此属性是引用一个资源 */
            isAsset?: boolean;
            /** 对资源类型的属性适用。多个资源类型用逗号分隔，例如“Image,Audio"。可用值参考editor/public/IAssetInfo.ts*/
            assetTypeFilter?: string;
            /** 如果属性类型是string，并且进行资源选择时，这个选项决定属性值是资源原始路径还是res://uuid这样的格式。如果是true，则是资源原始路径。默认false。*/
            useAssetPath?: boolean;
            /** 对资源类型的属性适用。选择资源时是否允许选择内部资源 */
            allowInternalAssets?: boolean;
            /** 对资源类型的属性适用。可以设置一个自定义的过滤器。过滤器需要先通过EditorEnv.assetMgr.customAssetFilters注册。 */
            customAssetFilter?: string;

            /** 对类型是Node或者Component的属性适用。如果不为null，当在实际运行环境里执行反序列化时，引用对象不再实例化，而是将它的序列化数据原样保存到指定的属性中。*/
            toTemplate?: string;

            /** 表示属性是否可写。默认是true。设置为false则属性为只读。 */
            writable?: boolean;

            /** 显示位置。语法：before xxx/after xxx/first/last。 */
            position?: string;

            /** 增加缩进，单位是层级，不是像素。 */
            addIndent?: number;

            /** 子属性默认折叠状态 */
            collapsed?: boolean;

            /** 表示属性是私有属性。私有属性不会显示在Inspector里，但会序列化保存。 与inspector:null不同，private的数据不会从场景进程传递到UI进程。*/
            "private"?: boolean;

            /** 如果为true，序列化时属性必定写入。否则会与默认值比较，相同则不写入。*/
            forceWriteDefault?: boolean;

            /** 如果为true，预制体实例根节点在序列化属性时，不管是否有覆盖，都会写入该属性。也同时意味着这个属性不会出现在覆盖列表中 **/
            forceWriteInPrefabRoot?: boolean;

            /** 表示属性是否允许多选情况下编辑。默认true。 */
            allowMultipleObjects?: boolean;

            /** 表示属性不显示在派生类的属性表中 */
            hideInDeriveType?: boolean;

            /** 属性改变时额外调用对象的一个函数，这里是函数名称。
             * 函数原型是func(key?:string)。其中key在改变成员内部属性时会传递。
             * 例如改变数据某个元素的内部属性，则key是这个元素的索引。 
             */
            onChange?: string;

            /** 额外的选项 */
            options?: Record<string, any>;
        }

        export type CatalogBarStyle = "normal" | "hidden" | "transparent";

        export interface FTypeDescriptor {
            /** 类型名称。 */
            name: string;
            /**帮助文档url地址 */
            help?: string;
            /** 标题。如果不提供，则使用name。 */
            caption?: string;
            /** 添加到组件菜单。 */
            menu?: string;
            /** 图标。*/
            icon?: string;
            /** 脚本的路径 */
            scriptPath?: string;
            /** 是否资源类型 */
            isAsset?: boolean;
            /** 表示这个类型有类似结构体的行为特性，即总是作为一个整体使用。
             * 例如，obj对象的某个属性b的值是a1，a1是T类型的实例，且T类型的structLike为true，那么当a1的属性改变时，编辑器将同时调用obj.b = a1。
             * 默认为false。
             */
            structLike?: boolean;
            /** 基类 */
            base?: string;
            /** 默认值。这个值只在面板中使用，它指从界面上创建对象时赋予属性的初始值。*/
            init?: any;
            /** 属性列表 */
            properties: Array<FPropertyDescriptor>;
            /** 编辑这个类实例的控件 */
            inspector?: string;
            /** 是否引擎符号。如果是引擎符号，则不勾选翻译引擎符号时，不会应用本地化翻译。*/
            isEngineSymbol?: boolean;

            /** 对资源类型的属性适用。多个资源类型用逗号分隔，例如“Image,Audio"。可用值参考editor/public/IAssetInfo.ts。 */
            assetTypeFilter?: string;

            /** 对Component适用，是否允许在Editor执行 */
            runInEditor?: boolean;
            /** 对Component适用，当AddComponent时同时添加依赖的Component */
            requireComponents?: Array<string>;
            /** 对Component使用，为true时，表示隐藏设置enable和屏蔽Remove Component功能。 */
            noRemoveComponent?: boolean;
            /** 对Component使用，表示这个组件允许挂载的节点类型。默认null */
            worldType?: WorldType;
            /** 对Component使用，如果为true，并且定义了menu属性，则这个组件还会显示在层级面板的新建对象菜单上。 */
            inHierarchyMenu?: boolean;

            /** 栏目样式 */
            catalogBarStyle?: CatalogBarStyle;

            /** 额外的选项 */
            options?: Record<string, any>;
        }

        export interface IPropertyButtonInfo {
            name?: string;
            caption?: string;
            tips?: string;
            event?: string;
            runScript?: string;
            runNodeScript?: string;
            sceneHotkey?: string;
        }
        export enum AssetType {
            Unknown = 0,
            Folder,
            Image,
            Scene,
            Prefab,
            Material,
            Mesh,
            Model,
            TypeScript,
            JavaScript,
            ShaderScript,
            WebAssembly,
            ScriptBundleDefinition,
            Json,
            Text,
            XML,
            Binary,
            BitmapFont,
            TTFFont,
            Audio,
            Video,
            Shader,
            ShaderBlueprint,
            ShaderBlueprintFunction,
            AnimationClip,
            AnimationClip2D,
            AnimationController,
            AnimationController2D,
            Cubemap,
            AvatarMask,
            LightingSettings,
            RenderTexture,
            Atlas,
            AtlasConfig,
            Skeleton,
            Spine,
            GUIPrefab,

            FairyGUIPackage,
            LensFlareData,
            Texture2DArray,

            SVGImage,
            I18nSettings
        }

        export enum AssetFlags {
            Readonly = 1,
            SubAsset = 2,
            Composite = 4,
            Internal = 256,
            Memory = 512,
            NoDbCache = 1024,
            Hidden = 2048,
            Temp = 4096
        }

        export enum AssetChangedFlag {
            Modified = 0,
            New = 1,
            Deleted = 2,
            Moved = 3
        }

        export enum AssetScriptType {
            None = 0,
            Runtime = 1,
            Scene = 2,
            Editor = 4,
            Javascript = 8
        }

        export interface IAssetInfo {
            id: string;
            name: string;
            fileName: string;
            file: string;
            ext: string;
            type: AssetType;
            ver: number;
            parentId: string;
            hasChild?: boolean;
            flags: number;
            scriptType: AssetScriptType;
            children?: ReadonlyArray<IAssetInfo>;
        }

        export interface ISubAssetInfo {
            readonly id: string;
            readonly fileName: string;
            readonly fullPath: string;
        }

        export interface IAssetFilter {
            (asset: IAssetInfo): boolean;
        }
        export interface IConf {
            set(key: string, value: any): void;
            get(key: string, defaultValue?: any): any;
            dispose(): void;
            save(): void;
        }
        export interface IConfigObject {
            [index: string]: any,

            get(key: string, defaultValue?: any): any;
            getNumber(key: string, defaultValue?: number): number;
            getBool(key: string, defaultValue?: boolean): boolean;
            getSection(key: string): IConfigObject;
            set(key: string, value: any): void;
            delete(key: string): void;
            clear(): void;
            copyFrom(data: any): void;
        }
        export interface ICryptoUtils {
            createHash(data: string): string;
            createFileHash(path: string, footer?: string): Promise<string>;

            encryptAES(data: string, key: string): string;

            decryptAES(encrypted: string, key: string): string;
        }

        export interface IDelegate<T extends (...args: any[]) => any> {
            executor: (method: Function, thisArg: any, ...args: any[]) => void;

            add(callback: T, target?: any): void;
            once(callback: T, target?: any): void;
            remove(callback: T, target?: any): void;

            clear(): void;
            clearForTarget(target: any): void;
            clearFor(test: (target: any, callback: T) => boolean): void;
            readonly count: number;
            invoke(...args: Parameters<T>): void;
        }
        export type CommonPathName = 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe'
            | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps';

        export interface IIpc {
            invoke(channel: string, ...args: any[]): Promise<any>;
            on(channel: string, listener: (event: Event, ...args: any[]) => void): void;
            once(channel: string, listener: (event: Event, ...args: any[]) => void): void;
            postMessage(channel: string, message: any, transfer?: MessagePort[]): void;
            removeAllListeners(channel: string): void;
            removeListener(channel: string, listener: (...args: any[]) => void): void;
            send(channel: string, ...args: any[]): void;
            sendSync(channel: string, ...args: any[]): any;
            sendTo(webContentsId: number, channel: string, ...args: any[]): void;
            sendToHost(channel: string, ...args: any[]): void;
        }
        export interface ILanguageModule {
            readonly language: string;

            t(name: string, defaultValue?: string): string;
            t(name: string, options: Record<string, any>): string;
            t(name: string, defaultValue: string, options: Record<string, any>): string;
        }
        export namespace MyMessagePortStatic {
            function requestFromHost(queueTask?: boolean): Promise<IMyMessagePort>;
            function connectService(serviceName: string, subscribe?: boolean, ...args: any[]): IMyMessagePort;
        }

        export interface IMyMessagePort {
            readonly onClose: IDelegate<() => void>;
            logHandlerMissing: boolean;

            start(): void;
            close(): void;

            handle(channel: string, func: (...args: any[]) => Promise<any> | any, target?: any, noAwait?: boolean): void;
            send(channel: string, ...args: any[]): void;
            transfer(channel: string, transfer: Transferable[], ...args: any[]): void;
            invoke(channel: string, ...args: any[]): Promise<any>;
            callHandler(channel: string, ...args: any[]): Promise<any>;
        }
        export type ExecResult = { code: number, error: string, output: string };
        export type ExecProgressCallback = (output: string, part: string) => void;

        export interface IExecOptions {
            cwd?: string;
            progressCallback?: ExecProgressCallback;
            abortToken?: IAbortToken;
            shell?: boolean;
            env?: Record<string, string>;
            stringEncoding?: string;
            throwIfNonZeroExitCode?: boolean;
            throwIfAborted?: boolean;
        };

        export interface INativeTools {
            exec(command: string, args: ReadonlyArray<string>, options: IExecOptions): Promise<ExecResult>;
            exec(command: string, args: ReadonlyArray<string>, progressCallback?: ExecProgressCallback, abortToken?: IAbortToken): Promise<ExecResult>;

            runTool(toolName: string, args: ReadonlyArray<string>, options: IExecOptions): Promise<ExecResult>;
            runTool(toolName: string, args: ReadonlyArray<string>, progressCallback?: ExecProgressCallback, abortToken?: IAbortToken): Promise<ExecResult>;

            execCli(cliName: string, args: ReadonlyArray<string>, options?: IExecOptions): Promise<ExecResult>;
            installCli(pkgName: string | string[], options?: IExecOptions): Promise<ExecResult>;

            formatOutpathArg(path: string): string;

            formatInFileArg(path: string, tempPath?: string): Promise<string>;
            openCodeEditor(filePath: string): void;

            openBrowser(url: string): void;
            getStringEncoding(): Promise<string>;
        }
        export interface IFetchResponseTypeMap {
            "text": string;
            "json": any;
            "arraybuffer": ArrayBuffer;
        }

        export interface IFetchOptions<K> {
            method?: string;
            query?: Record<string, string>;
            body?: Record<string, any> | URLSearchParams | FormData | ArrayBuffer;
            headers?: Record<string, string>;
            responseType?: K,
            username?: string,
            password?: string,
            downloadProgress?: (loaded: number, total: number) => void;
            uploadProgress?: (loaded: number, total: number) => void;
            abortToken?: IAbortToken;
        }

        export interface INetUtils {
            httpRequest<K extends keyof IFetchResponseTypeMap>(url: string, options?: IFetchOptions<K>): Promise<IFetchResponseTypeMap[K]>;
            downloadFileToBuffer(url: string, progress?: (receivedLength: number, contentLength: number) => void, abortToken?: IAbortToken): Promise<ArrayBuffer>;
            downloadFile(url: string, localPath: string, progress?: (receivedLength: number, contentLength: number) => void): Promise<void>;
            getIPAddress(): string;
        }

        export interface IObjectUtils {

            /**
             * 把一个obj变成{}, 由于是proxy，且可能被别人引用了，不能直接赋值
             * @param obj 
             */
            clearObj(obj: any): void;

            deepCloneObj(obj: any): void;

            mergeObjs(target: any, source: any, override?: boolean): void;

            setDataByPath(obj: any, datapath: ReadonlyArray<string>, pathIndex: number, value: any, forceCreate?: boolean): boolean;

            deleteDataByPath(obj: any, datapath: string[], pathIndex: number): boolean
            getDataByPath(obj: any, datapath: ReadonlyArray<string>, pathLen?: number): any;
            isEmptyObj(obj: any): boolean;

            /**
             * 比较两个数组是否相等。元素比较直接用的!==。
             */
            arrayEquals(a: ReadonlyArray<any>, b: ReadonlyArray<any>): boolean;
            /**
             * 如果a包含b，返回true
             */
            arrayStartsWith(a: ReadonlyArray<any>, b: ReadonlyArray<any>): boolean;

            /**
             * 比较两个对象是否相等。元素比较直接用的!==。
             */
            objEquals(a: any, b: any): boolean;

            /**
             * 复制一个对象的属性到另一个对象，使两个对象的属性完全相同。与Object.assign不同的是，它会先删除目标对象在source中不存在的属性。
             * @param target 
             * @param source 
             * @returns 目标对象
             */
            assignObject(target: any, source: any): any;
        }
        export type SettingsLocation = "application" | "project" | "local" | "memory";

        export interface ISettings {
            readonly data: IConfigObject;
            readonly onChanged: IDelegate<(sender: ISettings) => void>;

            sync(): Promise<void>;
            push?(keys?: ReadonlyArray<string>): Promise<void>;
        }

        export const ShaderTypePrefix = "Shader.";
        export type DefaultValueComparator = (value: any) => boolean;
        export type TypeMenuItem = { type: FTypeDescriptor, assetId?: string, label: string, icon: string, order: number };
        export type PropertyTestFunctions = { hiddenTest: Function, readonlyTest: Function, validator: Function, requiredTest: Function };

        export interface ITypeRegistry {
            readonly types: Readonly<Record<string, FTypeDescriptor>>;
            readonly version: number;
            readonly onUserTypesChanged: IDelegate<() => void>;

            nodeTypeName: string;
            componentTypeName: string;

            addTypes(types: Array<FTypeDescriptor>): void;
            removeTypes(names: Array<string>): void;
            setUserTypesChanged(): void;

            getDerivedTypes(type: FTypeDescriptor): Array<FTypeDescriptor>;
            getRequireComponents(type: string): Array<string>;
            getNodeMenuItems(type: WorldType): Record<string, Array<TypeMenuItem>>;
            getComponentMenuItems(type: WorldType, inHierarchyMenu?: boolean): Record<string, Array<TypeMenuItem>>;
            sortMenuItems(col: Array<TypeMenuItem>): void;
            findScriptByPath(path: string): FTypeDescriptor;

            isType3d(type: string): boolean;
            isDerivedOf(type: string, baseType: string): boolean;
            isNodeType(type: string): boolean;
            isTypeDeprecated(type: FTypeDescriptor): boolean;

            getTypeCaption(type: string | FTypeDescriptor, noSplit?: boolean): string;
            getTypeIcon(type: string | FTypeDescriptor): string;
            getPropCaption(type: FTypeDescriptor, prop: FPropertyDescriptor): string;
            getPropTips(type: FTypeDescriptor, prop: FPropertyDescriptor, showPropertyName?: boolean): string;
            getNodeBaseType(type: string): string;

            getAllPropsOfType(type: FTypeDescriptor): Readonly<Record<string, FPropertyDescriptor>>;
            getInitProps(typeDef: FTypeDescriptor): any;
            getDefaultValue(typeDef: FTypeDescriptor, includePrivate?: boolean): any;
            getPropDefaultValue(prop: FPropertyDescriptor): any;
            getPropTestFunctions(prop: FPropertyDescriptor): PropertyTestFunctions;
            getDefaultValueComparators(typeDef: FTypeDescriptor): Readonly<Record<string, DefaultValueComparator>>;

            getPropertyByPath(type: FTypeDescriptor, datapath: ReadonlyArray<string>, out?: FPropertyDescriptor[]): FPropertyDescriptor[];
        }
        export interface IUtils {

            readJson(filePath: string, silient?: boolean): any | null;

            readJsonAsync(filePath: string, silient?: boolean): Promise<any>;

            readJson5(filePath: string): any | null;

            writeJson(filePath: string, content: any, space?: string | number): void;
            writeJsonAsync(filePath: string, content: any, space?: string | number): Promise<void>;

            readFirstNBytes(filePath: string, bytesCount: number): Promise<Buffer>;

            isObject(obj: any): boolean;

            parseFeatures(features: string): Record<string, string>;

            toFixedPro(n: number, fractionDigits: number): string;

            splitCamelCase(str: string): string;

            getTempBaseDir(): string;

            mkTempDir(subDir?: string): string;

            joinPaths(...paths: string[]): string;

            copyFile(src: string, dest: string): Promise<void>;

            rmDirSync(path: string): void;

            rmSync(path: string): void;

            /**
             * source是一个文件夹路径，将source文件夹内的内容全部拷贝到destDir里。
             */
            copyDir(source: string, destDir: string, options?: { autoRename?: boolean, regenerateUUID?: boolean }): Promise<void>;
            /*
             * source是一个文件夹路径，将source文件夹内的内容全部移到到destDir里。
            */
            moveDir(source: string, destDir: string, options?: { autoRename?: boolean }): Promise<void>;

            /**
             * 如果source是一个文件，将source拷贝到destDir里，如果source是文件夹路径，将source文件夹内的内容全部拷贝到destDir里。 
             */
            copyFileOrDir(source: string, destDir: string, options?: { autoRename?: boolean }): Promise<void>;

            /**
             * source是一个文件夹，将source文件夹内符合规则的文件拷贝到destDir里。 
             */
            copyFiles(source: string, pattern: string, destDir: string, options?: { dot?: boolean, ignore?: string | Array<string> }): Promise<void>;

            fileExists(filePath: string): Promise<boolean>;
            getNewFilePath(path: string, name: string): string;

            resolveConflictFileName(path: string, name: string, connectorSymbol?: string): Promise<string>;
            resolveConflictFileNameSync(path: string, name: string, connectorSymbol?: string): string;

            /**
             * 替换字符串中不合法的文件名字符（同时满足Windows和Mac）
             * @param fileName
             * @param replaceChar 如果不指定，默认为"_"
             */
            sanitizeFileName(fileName: string, replaceChar?: string): string;

            addHashToFileName(filename: string, hash: string): string;

            sleep(ms: number): Promise<void>;

            until(predicate: () => boolean, timeoutInMs?: number): Promise<void>;

            escapeRegExp(str: string): string;

            loadLib(src: string): Promise<void>;

            calculate(str: string): number;

            simplifyHtml(source: string, ignoreWhiteSpace?: boolean): string;
            serializeXML(xmlDoc: XMLDocument): string;
            findXMLElement(col: NodeListOf<Node> | HTMLCollection, predicate: (node: Element) => boolean): Element;

            deleteFiles(folder: string, ignores?: Iterable<string>): Promise<void>;

            addToSet(set: Set<any>, elements: Iterable<any>): void;

            formatBytes(bytes: number): string;
            getTimeAgo(time: number, includeTime?: boolean): string;
            getNowStr(): string;

            formatAsJsVariable(str: string): string;

            runTasks<T, T2>(datas: Array<T2> | Iterable<T2> & { size?: number }, numParallelTasks: number | ((numTasks: number) => boolean), taskFunc: (data: T2, index: number) => T | Promise<T>, abortToken?: IAbortToken): Promise<T[]>;
            runAllTasks<T, T2>(datas: Array<T2> | Iterable<T2> & { size?: number }, numParallelTasks: number | ((numTasks: number) => boolean), taskFunc: (data: T2, index: number) => T | Promise<T>, abortToken?: IAbortToken): Promise<PromiseSettledResult<T>[]>;
            printPromiseResult(rets: Iterable<PromiseSettledResult<any>>): void;
        }
        export interface IUUIDUtils {
            genUUID(): string;
            genShortId(size?: number): string;
            isUUID(str: string): boolean;

            compressUUID(uuid: string): string;
            decompressUUID(str: string): string;
        }
        export interface IZipFileW {
            excludeNames: Array<string>;
            addFile(realPath: string, entryPath?: string): void;
            addFolder(realPath: string, entryPath?: string, pattern?: string, ignore?: string[]): void;
            addBuffer(entryPath: string, buf: string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView>, encoding?: string): void;
            save(filePath: string, progressCallback?: (progress: number) => void, abortToken?: IAbortToken): Promise<void>;
        }

        export interface IZipFileR {
            open(filePath: string): Promise<void>;
            open(buf: ArrayBuffer): Promise<void>;
            getEntries(): Array<string>;
            hasEntry(entryName: string): boolean;
            extract(entryName: string, savePath: string): Promise<void>;
            extractAll(savePath: string, progressCallback?: (progress: number) => void, abortToken?: IAbortToken): Promise<void>;
            close(): void;
        }
        export interface IAbortToken {
            readonly aborted: boolean;
            signal(): void;
            check(): void;
            reset(): void;
        }
        export interface IBuildTargetInfo {
            caption?: string;
            inspector?: string;
            templatePath?: string;
            settingsName?: string;
        }

        export enum RuntimePlatformType {
            PC = 0,
            Android = 1,
            IOS = 2,
        }

        export interface ILogger {
            log(message?: any, ...optionalParams: any[]): void;
            warn(message?: any, ...optionalParams: any[]): void;
            error(message?: any, ...optionalParams: any[]): void;
            debug(message?: any, ...optionalParams: any[]): void;
        }
        export interface ITemplateUtils {
            renderTemplate(content: string, templateArgs?: Record<string, any>, options?: { escape?: boolean, useSingleBracket?: boolean }): string;

            renderTemplateFile(filePath: string, templateArgs?: Record<string, any>, options?: { escape?: boolean, useSingleBracket?: boolean }): void;

            renderTemplateFileAsync(filePath: string, templateArgs?: Record<string, any>, options?: { escape?: boolean, useSingleBracket?: boolean }): Promise<void>;
        }
        export class CustomEditor {
            readonly owner: Laya.Node;
            readonly comp: Laya.Component;
            onAwake?(): void;
            onChildChanged?(): void;
            onSizeChanged?(): void;
            onOpenBox?(): void;
            onCloseBox?(): void;
            onSelected?(): void;
            onUnSelected?(): void;
            onSceneGUI?(): void;
            /**
             * 绘制始终显示的 gizmos
             */
            onDrawGizmos?(): void;
            /**
             * 仅在对象被选中时绘制的 gizmos
             */
            onDrawGizmosSelected?(): void;
        }

        export class HandleDrawBase extends Command {
            protected pickColor: Laya.Vector4;
            protected drawCmd: Laya.Command;
            constructor();
            setPickColor(pickColor: Laya.Vector4): void;
            recover(): void;
            destroy(): void;
        }

        export class HandleBaseLine extends HandleDrawBase {
            private _isDotted;
            _dotScale: number;
            _dotTotalSize: number;
            _dotSize: number;
            constructor(dotted?: boolean);
            addLine(line: Laya.PixelLineSprite3D): void;
            run(): void;
            recover(): void;
            destroy(): void;
        }


        const Conf: new (path: string, fileName?: string) => IConf;
        const Delegate: new <T extends (...args: any[]) => any>() => IDelegate<T>;
        const MyMessagePort: (new (port: MessagePort, queueTask?: boolean) => IMyMessagePort) & typeof MyMessagePortStatic;
        const Gizmos2D: typeof IGizmos2D;
        const Gizmos: typeof IGizmos3D;
        const Handles: typeof IHandles;
        const HandleUtils: typeof IHandleUtils;
        const ZipFileW: new (basePath: string) => IZipFileW;
        const ZipFileR: new () => IZipFileR;
        const AbortToken: new () => IAbortToken;
        const utils: ICryptoUtils & INativeTools & IUUIDUtils & IObjectUtils & IUtils & INetUtils & ITemplateUtils & IPlist & IScriptTool;
        const CreateAssetUtil: typeof ICreateAssetUtil;
        const HierarchyWriter: typeof IHierarchyWriter;
        const SerializeUtil: typeof ISerializeUtil;
        const ExportAssetTool: new (options?: IExportAssetToolOptions) => IExportAssetTool;
        const PrefabDataAnalyzer: new () => IPrefabDataAnalyzer;
        const MaxRectsPacker: new <T extends IRectangle>(width: number, height: number, padding: number, options?: IMaxRectsPackingOptions) => IMaxRectsPacker<T>;
        const TexturePacker: typeof ITexturePacker;
        const OffscreenRenderer: new (width: number, height: number) => IOffscreenRenderer;
        const OffscreenRenderScene: new () => IOffscreenRenderScene;
        const CameraControls: new (camera: Laya.Camera) => ICameraControls;
        const IcoEncoder: new () => IIcoEncoder;
        const i18nUtils: typeof II18nUtils;
        const BuildTask: typeof BuildTaskStatic;
        const PropsKey: Symbol;

        function require(id: string): any;

        function onLoad(target: Object, propertyName: string): void;
        function onUnload(target: Object, propertyName: string): void;

        function customEditor(target: Laya.Node | Laya.Component): Function;
        /**
         * 注册一个构建插件
         * @param platform 应用的目标平台
         * @param piority 执行优先级。数字越大，越先执行
         */
        function regBuildPlugin(platform: string, piority?: number): Function;
        /**
         * 注册一个资源处理器
         */
        function regAssetProcessor(): Function;
        function regClass(): Function;
    }

    var EditorEnv: IEditorEnv.IEditorEnvSingleton;
}
