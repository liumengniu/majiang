export { };
declare global {
    export namespace IEditor {
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
        export interface IWebview {
            readonly element: HTMLElement;
            readonly port: IMyMessagePort;
            readonly webContentsId: number;
            readonly width: number;
            readonly height: number;

            show(placeHolder: gui.Widget): void;
            load(url: string): void;
        }
        export interface IWebIFrame {
            readonly element: HTMLIFrameElement;
            readonly port: IMyMessagePort;

            load(url: string): void;
            loadUntilReady(url: string): Promise<void>;
            dispose(): void;
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
        export interface ITemplateUtils {
            renderTemplate(content: string, templateArgs?: Record<string, any>, options?: { escape?: boolean, useSingleBracket?: boolean }): string;

            renderTemplateFile(filePath: string, templateArgs?: Record<string, any>, options?: { escape?: boolean, useSingleBracket?: boolean }): void;

            renderTemplateFileAsync(filePath: string, templateArgs?: Record<string, any>, options?: { escape?: boolean, useSingleBracket?: boolean }): Promise<void>;
        }
        export interface IShell {
            // Docs: https://electronjs.org/docs/api/shell

            /**
             * Play the beep sound.
             */
            beep(): void;
            /**
             * Open the given external protocol URL in the desktop's default manner. (For
             * example, mailto: URLs in the user's default mail agent).
             */
            openExternal(url: string, options?: OpenExternalOptions): Promise<void>;
            /**
             * Resolves with a string containing the error message corresponding to the failure
             * if a failure occurred, otherwise "".
             *
             * Open the given file in the desktop's default manner.
             */
            openPath(path: string): Promise<string>;
            /**
             * Resolves the shortcut link at `shortcutPath`.
             *
             * An exception will be thrown when any error happens.
             *
             * @platform win32
             */
            readShortcutLink(shortcutPath: string): ShortcutDetails;
            /**
             * Show the given file in a file manager. If possible, select the file.
             */
            showItemInFolder(fullPath: string): void;
            /**
             * Resolves when the operation has been completed. Rejects if there was an error
             * while deleting the requested item.
             *
             * This moves a path to the OS-specific trash location (Trash on macOS, Recycle Bin
             * on Windows, and a desktop-environment-specific location on Linux).
             */
            trashItem(path: string): Promise<void>;
            /**
             * Whether the shortcut was created successfully.
             *
             * Creates or updates a shortcut link at `shortcutPath`.
             *
             * @platform win32
             */
            writeShortcutLink(shortcutPath: string, operation: 'create' | 'update' | 'replace', options: ShortcutDetails): boolean;
            /**
             * Whether the shortcut was created successfully.
             *
             * Creates or updates a shortcut link at `shortcutPath`.
             *
             * @platform win32
             */
            writeShortcutLink(shortcutPath: string, options: ShortcutDetails): boolean;
        }
        export interface IShaderInfo {
            name: string;
            assetId: string;
        }

        export interface IShaderDb {
            readonly shaders: Record<string, IShaderInfo>;
            readonly version: number;
        }
        export type SettingsLocation = "application" | "project" | "local" | "memory";

        export interface ISettings {
            readonly data: IConfigObject;
            readonly onChanged: IDelegate<(sender: ISettings) => void>;

            sync(): Promise<void>;
            push?(keys?: ReadonlyArray<string>): Promise<void>;
        }

        export interface ISelectResourceDialog extends IDialog {
            show(popupOwner?: gui.Widget, initialValue?: string, assetTypeFilter?: AssetType[], allowInternalAssets?: boolean, customFilter?: string): Promise<void>;
        }
        export interface ISelectNodeDialog extends IDialog {
            show(popupOwner: gui.Widget, typeName: string): Promise<void>;
        }
        export interface ISceneManager extends gui.EventDispatcher {
            readonly sceneView: IWebview;
            readonly onNodeChanged: IDelegate<(node: IMyNode, datapath: ReadonlyArray<string>, value: any, oldValue: any) => void>;

            readonly activeScene: IMyScene;
            readonly sceneReady: boolean;

            openScene(sceneId: string, assetId: string): Promise<void>;
            closeScene(sceneId: string): Promise<void>;
            saveScene(sceneId: string, filePath?: string): Promise<void>;
            setActiveScene(sceneId: string): Promise<void>;
            reloadScene(sceneId: string): Promise<void>;
            getScenes(): Readonly<Record<string, IMyScene>>;
            dispose(): Promise<void>;

            setPlaying(playing: boolean): boolean;
            readonly playing: boolean;
        }
        export interface IResourceManager {
            dispose(): Promise<void>;
            getCachedResourceProps(resId: string): any;
            getResourceProps(resId: string): Promise<any>;
            save(): Promise<void>;
            dispose(): Promise<void>;

            readonly importSettingsHistory: IDataHistory;
            getImportSettings(resId: string): Promise<any>;
            applyImportSettings(): Promise<void>;
            revertImportSettings(): Promise<void>;

            cloneMaterial(asset: IAssetInfo): Promise<IAssetInfo>;
        }

        export interface IRendererInfo {
            projectPath: string;
            projectName: string;
            projectType: string;
            appPath: string;
            userDataPath: string;
            appName: string;
            moduleName: string;
            webRootPath: string;
            unpackedWebRootPath: string;
            isPackaged: boolean;
            serverURL: string;
            serverInfo: { host: string, port: number, securePort: number };
            cliMode: boolean;
        }

        export interface IRendererStartupAction {
            openFile?: string;
            openURL?: string;
            runScript?: string;
            scriptArgs?: string[];
            [index: string]: any;
        }
        export interface IQRCodeDialog extends IDialog {
            show(popupOwner: gui.Widget, url: string): Promise<void>;
        }
        export interface IPropertyFieldCreateResult {
            ui: gui.Widget;
            stretchWidth?: boolean;
            captionDisplay?: "normal" | "hidden" | "none";
            noIndent?: boolean;
        }

        export interface IPropertyField extends gui.TreeNode {
            get parent(): IPropertyField;
            readonly inspector: IDataInspector;

            readonly objType: Readonly<FTypeDescriptor>;
            readonly property: Readonly<FPropertyDescriptor>;
            readonly target: IInspectingTarget;

            watchProps: Array<string>;
            memberProps: Array<FPropertyDescriptor>;

            create(): IPropertyFieldCreateResult;
            makeReadonly(value: boolean): void;
            setHidden(hidden: boolean): void;

            getChildFields(result?: Array<IPropertyField>): Array<IPropertyField>;
            findBrotherField(name: string): IPropertyField;
            findChildField(name: string): IPropertyField;

            getStatus(name: string): any;
            setStatus(name: string, value: any): void;

            displayError(msg: string): void;

            refresh(): void;
        }

        export interface IProjectPanel extends IEditorPanel {
            select(assetId: string, setFocus?: boolean, disableEvent?: boolean): void;
            getSelectedResource(): IAssetInfo;
            getSelectedResources(result?: Array<IAssetInfo>): Array<IAssetInfo>;
            getSelectedFolder(): IAssetInfo;
            getExpandedFolders(result?: Array<string>): Array<string>;
            setExpanedFolders(arr: Array<string>): Promise<void>;
            expand(asset: IAssetInfo): void;
            rename(asset: IAssetInfo): Promise<void>;
            addNew(folder: IAssetInfo, fileName: string, callback: (fileName: string) => void): void;
            createAsset(fileName: string, templateName: string, assetPath?: string, args?: Record<string, string>): Promise<void>;
        }
        export interface IPlist {
            parsePlist(content: string): Record<string, any>;
            buildPlist(obj: Record<string, any>): string;
        }
        export interface IPanelManagerOptions {
            filePath: string,
            createMenu?: boolean,
            layouts: Record<string, {
                mainPanelId: string
            }>
        }

        export interface IPanelManager {
            readonly panelIds: string[];
            readonly lastFocusedPanel: IEditorPanel;

            registerPanel<T extends IEditorPanel>(panelId: string, classType: gui.Constructor<T>, options: IPanelOptions): Promise<T>;
            unregisterPanel(panelId: string): void;
            getPanel<T extends IEditorPanel>(panelId: string, classType?: gui.Constructor<T>): T;
            getPanelsByUsage(usage: string): Array<IEditorPanel>;

            setPanelTitle(panelId: string, title: string): void;
            showPanel(panelId: string): void;
            hidePanel(panelId: string): void;
            isPanelShowing(panelId: string): boolean;
            getActivePanelInGroup(panelId: string): string;

            start(): void;
            dispose(): void;
            saveLayout(filePath?: string): Promise<void>;
            loadLayout(filePath?: string): Promise<void>;
            resetLayout(): Promise<void>;
            switchGroup(groupName: string): void;

            sendMessage(panelId: string, cmd: string, ...args: Array<any>): Promise<any>;
            postMessage(panelId: string, cmd: string, ...args: Array<any>): void;
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
        export type SceneNavToolType = "move" | "orbit" | "orbit_focus" | "zoom" | "obj_move" | "obj_rotate" | "obj_scale" | "obj_transform";
        export interface ICreateNodeOptions {
            setDefaultPos?: boolean,
            fixDupName?: boolean
        };

        export interface IMyScene {
            readonly history: IDataHistory;
            readonly selectionHistory: IDataHistory;
            readonly rootNode: IMyNode;
            readonly rootNode3D: IMyNode;
            readonly prefabRootNode: IMyNode;
            readonly sceneId: string;
            readonly worldType: WorldType;
            readonly asset: IAssetInfo;
            readonly port: IMyMessagePort;

            readonly status: IConfigObject;
            readonly persistStatus: IConfigObject;

            readonly loading: boolean;
            readonly viewerMode: boolean;

            readonly sourceScene?: IMyScene;

            readonly isModified: boolean;
            setModified(): void;

            getSelection(type?: string): ReadonlyArray<any>;
            setSelection(objs: any | any[], type?: string): void;
            readonly selectionType: string;

            getNode(id: string): IMyNode;
            getNodeAsync(id: string): Promise<IMyNode>;
            getTopPrefab(node: IMyNode): Promise<IMyNode>;
            getPrefabId(node: IMyNode): Promise<string>;

            createNode(nodeType: string, props?: Record<string, any>, parentNode?: IMyNode, options?: ICreateNodeOptions): Promise<IMyNode>;
            createNodeByAsset(assetId: string, props?: Record<string, any>, parentNode?: IMyNode, options?: ICreateNodeOptions): Promise<IMyNode>;
            deleteNode(node: IMyNode): any;
            addNode(parentNode: IMyNode, node: IMyNode, index?: number, worldPositionStays?: boolean): Promise<void>;
            /**
             * 在Scene进程执行脚本。可以执行使用了@Laya.regClass或@EditorEnv.regClass装饰的类的静态函数。
             * @param command 
             * @param params 
             */
            runScript(command: string, ...params: any[]): Promise<any>;
            /**
             * 功能和runScript相同，差别在于runScript只将命令发送到编辑状态的场景进程，而runScriptMax会优先发送到播放状态的场景进程。如果场景不在播放状态，则和runScript行为相同。
             * @param command
             * @param params 
             */
            runScriptMax(command: string, ...params: any[]): Promise<any>;
            /**
             * 执行节点或者组件上的一个函数
             * @param nodeId 
             * @param componentId 
             * @param functionName 
             * @param args 
             */
            runNodeScript(nodeId: string, componentId: string, functionName: string, ...args: any[]): Promise<any>;
            runBatch(func: () => void, options?: { noHistory?: boolean, noPush?: boolean }): void;
            findNodes(keyword: string, maxResults?: number): Promise<Array<IMyNode>>;

            addComponent(node: IMyNode, componentType: string): Promise<IMyComponent>;
            removeComponent(node: IMyNode, compId: string): Promise<void>;

            changeNodesType(node: IMyNode, nodeType: string): Promise<void>;

            getNodeChildren(parentNode: IMyNode): Promise<IMyNode[]>;
            getNodeDescendants(parentNode: IMyNode, out?: Array<IMyNode>): Promise<IMyNode[]>;
            syncNode(node: IMyNode): Promise<void>;
            focusNode(node: IMyNode): void;

            syncNodes(nodes?: ReadonlyArray<IMyNode>): Promise<void>;
            copyNodes(): Promise<void>;
            pasteNodes(): Promise<Array<IMyNode>>;
            duplicateNodes(): Promise<Array<IMyNode>>;
            deleteNodes(): void;
            createPrefab(nodeId: string, savePath: string, fileName?: string): Promise<{ asset: IAssetInfo, newNode: IMyNode }>;

            addComponentToNodes(componentType: string): void;

            getResourceProps(resId: string): Promise<any>;

            send(channel: string, ...args: any[]): void;
            invoke(channel: string, ...args: any[]): Promise<any>;
        }
        export const PrefabOverridesKey = Symbol();

        export enum NodeFeatures {
            HasChild = 1,
            RootNode = 2,
            Inactive = 4,
            InPrefab = 8,
            IsPrefab = 16,
            IsPrefabNewAdded = 32,
            IsTopPrefab = 64,
            IsModel = 128,
            Missing = 256,
            HideByEditor = 1024,
            LockByEditor = 2048,
            PrefabMissing = 4096,
        }

        export interface IMyNode {
            readonly id: string;
            readonly props: Record<string, any>;
            readonly icon: string;
            readonly type: string;
            readonly is3d: boolean;
            readonly parent: IMyNode;
            readonly children: Array<IMyNode>;
            readonly childIndex: number;
            name: string;
            ver: number;
            treeVer: number;
            propsVer: number;
            statusVer: number;
            features: number;
            /** 不允许移动，删除 */
            dontDestroy?: boolean;
            /** 不允许增删子节点 */
            dontChangeChildren?: boolean;
            /** 不允许增加组件 */
            noAddComponent?: boolean;

            addChild(node: IMyNode): void;
            isAncestorOf(node: IMyNode): boolean;

            componentIds: ReadonlyArray<string>;
            readonly components: Record<string, IMyComponent>;
            getComponent(type: string, allowDerives?: boolean): IMyComponent;

            readonly prefabId: string;
            [PrefabOverridesKey]?: Array<Array<string>>;
            getPrefabOverrides(key?: string): Array<Array<string>>;

            readonly isRoot: boolean;
            readonly isTopPrefab: boolean;
            readonly inPrefab: boolean;
            hasFeature(feature: number): boolean;
        }

        export interface IMyComponent {
            owner: string;
            id: string;
            type: string;
            readonly props: Record<string, any>;

            inPrefab?: boolean;
            [PrefabOverridesKey]?: Array<Array<string>>;
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
        export interface IMenuItem {
            /**
             * Will be called with `click(menuItemId)` when the menu item
             * is clicked.
             */
            click?: (menuItemId: string) => void;
            /**
             * Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`,
             * `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`,
             * `zoomOut`, `toggleSpellChecker`, `togglefullscreen`, `window`, `minimize`,
             * `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`,
             * 'showSubstitutions', 'toggleSmartQuotes', 'toggleSmartDashes',
             * 'toggleTextReplacement', `startSpeaking`, `stopSpeaking`, `zoom`, `front`,
             * `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `shareMenu`, `recentDocuments`,
             * `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`,
             * `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu` - Define the action
             * of the menu item, when specified the `click` property will be ignored. See
             * roles.
             */
            role?: ('undo' | 'redo' | 'cut' | 'copy' | 'paste' | 'pasteAndMatchStyle' | 'delete' | 'selectAll' | 'reload' | 'forceReload' | 'toggleDevTools' | 'resetZoom' | 'zoomIn' | 'zoomOut' | 'toggleSpellChecker' | 'togglefullscreen' | 'window' | 'minimize' | 'close' | 'help' | 'about' | 'services' | 'hide' | 'hideOthers' | 'unhide' | 'quit' | 'showSubstitutions' | 'toggleSmartQuotes' | 'toggleSmartDashes' | 'toggleTextReplacement' | 'startSpeaking' | 'stopSpeaking' | 'zoom' | 'front' | 'appMenu' | 'fileMenu' | 'editMenu' | 'viewMenu' | 'shareMenu' | 'recentDocuments' | 'toggleTabBar' | 'selectNextTab' | 'selectPreviousTab' | 'mergeAllWindows' | 'clearRecentDocuments' | 'moveTabToNewWindow' | 'windowMenu');
            /**
             * Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.
             */
            type?: ('normal' | 'separator' | 'submenu' | 'checkbox' | 'radio');
            label?: string;
            accelerator?: string;
            /**
             * If false, the menu item will be greyed out and unclickable.
             */
            enabled?: boolean;
            /**
             * If false, the menu item will be entirely hidden.
             */
            visible?: boolean;
            /**
             * Should only be specified for `checkbox` or `radio` type menu items.
             */
            checked?: boolean;
            /**
             * Should be specified for `submenu` type menu items. If `submenu` is specified,
             * the `type: 'submenu'` can be omitted.
             */
            submenu?: IMenuItem[];
            /**
             * Unique within a single menu. If defined then it can be used as a reference to
             * this item by the position attribute.
             */
            id?: string;

            /**
             * 设置菜单项的位置，支持的语法: "first" / "last" / "before ids" / "after ids" / "beforeGroup ids" / "afterGroup ids"
             * 其中"next"表示位置紧跟着上一个定义的菜单项
             * "before"和"beforeGroup"的区别是，"before"是插入到参考菜单项的前面，而"beforeGroup"是插入到参考菜单项前面最近的一个分割线之前。
             * "after"和"afterGroup"的区别是，"after"是插入到参考菜单项的后面，而"afterGroup"是插入到参考菜单项后面最近的一个分割线之后。
             * 在同一个类的扩展定义里，默认是添加到上一个菜单项的后面。如果不在同一个类里，不指定position则默认添加到菜单的最后面。
             * 多个参考菜单项的id值用逗号分隔。
             */
            position?: string;
        }

        export interface ICustomMenuItemOptions extends Pick<IMenuItem, "id" | "label" | "accelerator" | "position"> {
            checkbox?: boolean;
            sepBefore?: boolean;
            sepAfter?: boolean;
            enableTest?: () => boolean;
            visibleTest?: () => boolean;
            checkedTest?: () => boolean;
        }

        export interface IMenuPopupOptions {
            /**
             * Default is the current mouse cursor position. Must be declared if `y` is
             * declared.
             */
            x?: number;
            /**
             * Default is the current mouse cursor position. Must be declared if `x` is
             * declared.
             */
            y?: number;

            /**
             * 可以选择弹出子菜单
             */
            submenu?: string;
        }

        export interface IMenu {
            readonly id: string;
            data: any;

            onClickItem: (itemId: string) => void;

            dispose(): void;

            setItemEnabled(itemId: string, enabled: boolean): void;

            isItemEnabled(itemId: string): boolean;

            setItemVisible(itemId: string, visible: boolean): void;

            setItemChecked(itemId: string, checked: boolean): void;

            isItemChecked(itemId: string): boolean;

            setItemLabel(itemId: string, label: string): void;
            setItems(template: Array<IMenuItem>): void;

            show(callbackThisObj?: any, popupOptions?: IMenuPopupOptions): void;
        }

        export namespace MenuStatic {
            function getById(id: string): IMenu;
            function create(template?: Array<IMenuItem>): IMenu;
            function create(id: string, template?: Array<IMenuItem>): IMenu;
        }

        export interface ILogger {
            log(message?: any, ...optionalParams: any[]): void;
            warn(message?: any, ...optionalParams: any[]): void;
            error(message?: any, ...optionalParams: any[]): void;
            debug(message?: any, ...optionalParams: any[]): void;
        }

        export interface IListInsertionHelper {
            getInsertPos(): { obj: gui.Widget, pos: 'in' | 'above' | 'below' };
        }

        export interface IListHelper {
            readonly onInsert: (index: number, item: any) => void;
            readonly onRemove: (index: number) => void;
            readonly onSwap: (index1: number, index2: number) => void;

            add(): void;
            insert(): void;
            remove(): void;
            moveUp(): void;
            moveDown(): void;
            swapItem(index1: number, index2: number): void;
            updateIndexColumn(from: number, to: number): void;
        }

        export interface ILanguageModule {
            readonly language: string;

            t(name: string, defaultValue?: string): string;
            t(name: string, options: Record<string, any>): string;
            t(name: string, defaultValue: string, options: Record<string, any>): string;
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
        export interface IInspectorLayout {
            accept(item: any): boolean;
            onRender(items: ReadonlyArray<any>, inspectors: IInspectorHelper, componentInspectors: IInspectorHelper): Promise<void>;

            readonly history?: IDataHistory;

            onRevert?(): Promise<void>;
            onApply?(): Promise<void>;
        }
        export interface IInspectorOptions {
            title?: string;
            readonly?: boolean;
            statusStore?: any;
            statusStoreSubId?: string;
            catalogBarStyle?: CatalogBarStyle;
        }

        export interface IInspectorHelper {
            add(target: any, type: string, data: any, options?: IInspectorOptions): void;
            next(): void;

            get isEmpty(): boolean;
            getNodes(): ReadonlyArray<IPropertyField>;
            getInspectors(): ReadonlyArray<IDataInspector>;
            getAllResourceInspectors(result?: Array<IPropertyField>): Array<IPropertyField>;
            show(parent: gui.TreeNode, expanded?: boolean): void;
            hide(): void;
            reset(): void;
        }
        export interface IInspectingTarget {
            readonly datas: Array<any>;
            readonly data: any;
            readonly owner: IPropertyField;

            getValue(): any;
            setValue(value: any): boolean;
            validate(data: any, value: any, prop?: FPropertyDescriptor): boolean;

            getPropertyValue(propName: string): any;
            setPropertyValue(propName: string, value: any): void;

            getProperty(propName: string): Readonly<FPropertyDescriptor>;
        }

        export interface IInputTextDialog extends IDialog {
            show(popupOwner: gui.Widget, title: string, text: string, callback: (text: string) => boolean): Promise<void>;
        }

        export interface IHotkeyManager {
            install(groot: gui.GRoot): void;
            initKeyMap(): void;
            handleKey(character: string, modifiers: string[], eventType: string): void;
            emit(combo: string): void;

            stopPush: boolean;
        }
        export interface IHierarchyPanel extends IEditorPanel {
            getSelectedNode(): IMyNode;
            getSelectedNodes(): Array<IMyNode>;
            getExpandedNodes(): Array<string>;
            setExpandedNodes(arr: Array<string>): void;
            expand(sceneNode: IMyNode): void;
            highlight(sceneNode: IMyNode): void;
        }
        export interface IGUIUtils {
            /**
             * 编辑器默认的背景颜色
             */
            bgColor: gui.Color;
            /**
             * 编辑器默认的分割线颜色
             */
            lineColor: gui.Color;
            /**
             * 编辑器默认的文字颜色
             */
            textColor: gui.Color;

            createButton(autoSize?: boolean): gui.Button;
            createIconButton(flat?: boolean): gui.Button;
            createCheckbox(autoSize?: boolean): gui.Button;
            createIconCheckbox(flat?: boolean): gui.Button;
            createRadio(): gui.Button;
            createComboBox(): gui.ComboBox;
            createTextInput(): TextInput;
            createTextArea(): TextArea;
            createSearchInput(): SearchInput;
            createNumericInput(): NumericInput;
            createColorInput(): ColorInput;
            createGradientInput(): GradientInput;
            createCurveInput(): CurveInput;
            createResourceInput(): ResourceInput;
            createNodeRefInput(): NodeRefInput;
            createProgressBar(): gui.ProgressBar;
            createSlider(): gui.Slider;
            createListItem(): ListItem;
            createIconListItem(): ListItem;
            createCheckboxListItem(): ListItem;
            createCheckboxIconListItem(): ListItem;

            createInspectorPanel(): InspectorPanel;
        }
        export interface IFileTabInfo {
            id: string;
            assetId: string;
            fileType: AssetType;
            isModified: boolean;
            activeTime?: number;
            noClose?: boolean;
        }

        export interface IFileTabBar {

            addTab(tabInfo: IFileTabInfo, insertIndex?: number, activate?: boolean): void;
            removeTab(tabId: string): void;

            getTab(tabId: string): IFileTabInfo;
            getTabAt(index: number): IFileTabInfo;
            findTab(predicate: (tab: IFileTabInfo) => boolean): IFileTabInfo;
            getTabs(): Array<IFileTabInfo>;

            readonly tabCount: number;
            selectedTab: IFileTabInfo;
            selectedIndex: number;
            enableMenu: boolean;

            queryToCloseAllTabs(includeScene?: boolean): Promise<boolean>;
            queryToSaveAllTabs(): Promise<boolean>;
        }
        export interface IExtensionManager {
            get reloading(): boolean;
            reload(forced?: boolean): void;
            createSettings(name: string, location?: SettingsLocation, typeName?: string): void;
            createBuildTarget(name: string, options: IBuildTargetInfo): void;
        }
        export interface IEventTracking {
            start(): void;
            login(id: string): void;
            logout(): void;
            setSuperProperties(data: any): void;
            track(key: string, data: any): void;
            userSet(data: any): void;
        }
        export interface IEditorSingleton {
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
            readonly moduleName: string;
            readonly serverURL: string;
            readonly cliMode: boolean;

            readonly typeRegistry: ITypeRegistry;
            readonly ipc: IIpc;
            readonly assetDb: IAssetDb;
            readonly shaderDb: IShaderDb;
            readonly hotkeyManager: IHotkeyManager;
            readonly panelManager: IPanelManager;
            readonly sceneManager: ISceneManager;
            readonly resourceManager: IResourceManager;
            readonly extensionManager: IExtensionManager;
            readonly accountManager: IAccountManager;
            readonly settingsService: ISettingsService;

            readonly scene: IMyScene;
            readonly appMenu: IMenu;
            readonly workspaceConf: ISettings;
            readonly sceneViewPort: IMyMessagePort;
            readonly beingQuit: boolean;

            readonly shell: IShell;
            readonly clipboard: IClipboard;

            createPanelManager(options: IPanelManagerOptions, placeHolder?: gui.Widget): IPanelManager;
            createSceneManager(program?: string): Promise<ISceneManager>;
            createHotkeyManager(clientMode?: boolean): IHotkeyManager;
            createExtensionManager(): Promise<IExtensionManager>;
            connectAssetDb(): Promise<IAssetDb>;
            connectShaderDb(): Promise<IShaderDb>;
            createSettingsService(): Promise<ISettingsService>;
            createAppMenu(items: Array<IMenuItem>): IMenu;

            getPath(name: CommonPathName): Promise<string>;
            getSettings(name: string, autoSync?: boolean): ISettings;

            getDialog<T extends IDialog>(cls: gui.Constructor<T>): Promise<T>;
            getDialogSync<T extends IDialog>(cls: gui.Constructor<T>): T;
            showDialog<T extends IDialog>(cls: gui.Constructor<T>, popupOwner?: gui.Widget, ...args: any[]): Promise<T>;

            getMenuById(id: string): IMenu;

            showModalWait(view?: gui.Widget): void;
            closeModalWait(view?: gui.Widget): void;

            openFile(filePath: string): void;
            shutdown(): void;

            showMessageBox(options: MessageBoxOptions): Promise<MessageBoxReturnValue>;
            showOpenDialog(title: string, extensionTypeName: string, fileExtension: string, defaultPath?: string): Promise<OpenDialogReturnValue>;
            showOpenDialog(options: OpenDialogOptions): Promise<OpenDialogReturnValue>;
            showOpenFolderDialog(title: string, defaultPath?: string): Promise<OpenDialogReturnValue>;
            showOpenAssetsFolderDialog(title: string, defaultPath?: string): Promise<OpenDialogReturnValue>;
            showSaveDialog(title: string, extensionTypeName: string, fileExtension: string, defaultPath?: string): Promise<SaveDialogReturnValue>;
            showSaveDialog(options: SaveDialogOptions): Promise<SaveDialogReturnValue>;

            alert(msg: string, type?: "none" | "info" | "error" | "question" | "warning"): Promise<void>;
            confirm(msg: string): Promise<boolean>;
            prompt(title?: string, text?: string, multiline?: boolean): Promise<string>;

            showLoading(): Promise<{ label: gui.Widget, pb: gui.ProgressBar }>;

            enableHotkey(...combos: string[]): void;

            checkUpdate(manually?: boolean): void;
            openDevTools(mode?: string, view?: string): void;
            setWindowTitle(title: string): void;
            moveWindowTop(): void;
            reload(): void;
            queryToReload(msg?: string): Promise<void>;
            undo(): void;
            redo(): void;
            clearConsoleMessage(group?: string): void;

            getHistoryDocuments(moduleName?: string): { files: Array<string>, active: number };
            setHistoryDocuments(files: Array<string>, active: number): Promise<void>;

            updateServerURL(useHttps: boolean): void;

            readonly onUpdate: IDelegate<() => void>;
            readonly onAppActivate: IDelegate<() => void>;
            readonly onConsoleMessage: IDelegate<(message: string, level: number, group: string) => void>;
        }

        export interface IEditorFrontEnd {
            onBeginPlay(startupAction: IRendererStartupAction): Promise<void>;
            onBeforeEndPlay?(): Promise<boolean>;
            onEndPlay(passive: boolean): Promise<void>;
            onOpenFile?(filePath: string): void;
        }
        export interface IPanelOptions {
            title?: string;
            icon?: string;
            stretchPriorityX?: number;
            stretchPriorityY?: number;
            allowTabs?: boolean;
            allowClose?: boolean;
            showInMenu?: boolean;
            allowPopup?: boolean;
            autoStart?: boolean;
            location?: "left" | "right" | "top" | "bottom" | "popup";
            hotkey?: string;
            transparent?: boolean;
            help?: string;
            usage?: "common" | "project-settings" | "build-settings" | "preference";
        }

        export interface IEditorPanel {
            readonly panelId: string;
            readonly panelOptions: IPanelOptions;
            readonly contentPane: gui.Widget;

            create(): Promise<void>;

            onStart?(): void;
            onUpdate?(): void;
            onDestroy?(): void;

            onSelectionChanged?(): void;
            onSceneActivate?(scene: IMyScene): void;
            onSceneDeactivate?(scene: IMyScene): void;

            onHotkey?: (combo: string) => boolean;
            onGlobalHotkey?: (combo: string) => boolean;
            onSearch?: (searchKey: string) => void;
            onExtensionReload?: () => void;
        }
        export interface MessageBoxOptions {
            /**
             * Content of the message box.
             */
            message: string;
            /**
             * Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows,
             * `"question"` displays the same icon as `"info"`, unless you set an icon using
             * the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same
             * warning icon.
             */
            type?: string;
            /**
             * Array of texts for buttons. On Windows, an empty array will result in one button
             * labeled "OK".
             */
            buttons?: string[];
            /**
             * Index of the button in the buttons array which will be selected by default when
             * the message box opens.
             */
            defaultId?: number;
            /**
             * Pass an instance of AbortSignal to optionally close the message box, the message
             * box will behave as if it was cancelled by the user. On macOS, `signal` does not
             * work with message boxes that do not have a parent window, since those message
             * boxes run synchronously due to platform limitations.
             */
            signal?: AbortSignal;
            /**
             * Title of the message box, some platforms will not show it.
             */
            title?: string;
            /**
             * Extra information of the message.
             */
            detail?: string;
            /**
             * If provided, the message box will include a checkbox with the given label.
             */
            checkboxLabel?: string;
            /**
             * Initial checked state of the checkbox. `false` by default.
             */
            checkboxChecked?: boolean;
            /**
             * Custom width of the text in the message box.
             *
             * @platform darwin
             */
            textWidth?: number;
            /**
             * The index of the button to be used to cancel the dialog, via the `Esc` key. By
             * default this is assigned to the first button with "cancel" or "no" as the label.
             * If no such labeled buttons exist and this option is not set, `0` will be used as
             * the return value.
             */
            cancelId?: number;
            /**
             * On Windows Electron will try to figure out which one of the `buttons` are common
             * buttons (like "Cancel" or "Yes"), and show the others as command links in the
             * dialog. This can make the dialog appear in the style of modern Windows apps. If
             * you don't like this behavior, you can set `noLink` to `true`.
             */
            noLink?: boolean;
            /**
             * Normalize the keyboard access keys across platforms. Default is `false`.
             * Enabling this assumes `&` is used in the button labels for the placement of the
             * keyboard shortcut access key and labels will be converted so they work correctly
             * on each platform, `&` characters are removed on macOS, converted to `_` on
             * Linux, and left untouched on Windows. For example, a button label of `Vie&w`
             * will be converted to `Vie_w` on Linux and `View` on macOS and can be selected
             * via `Alt-W` on Windows and Linux.
             */
            normalizeAccessKeys?: boolean;
        }

        export interface MessageBoxReturnValue {
            /**
             * The index of the clicked button.
             */
            response: number;
            /**
             * The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.
             */
            checkboxChecked: boolean;
        }

        export interface FileFilter {

            // Docs: https://electronjs.org/docs/api/structures/file-filter

            extensions: string[];
            name: string;
        }

        export interface OpenDialogOptions {
            title?: string;
            defaultPath?: string;
            /**
             * Custom label for the confirmation button, when left empty the default label will
             * be used.
             */
            buttonLabel?: string;
            filters?: FileFilter[];
            /**
             * Contains which features the dialog should use. The following values are
             * supported:
             */
            properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent'>;
            /**
             * Message to display above input boxes.
             *
             * @platform darwin
             */
            message?: string;
            /**
             * Create security scoped bookmarks when packaged for the Mac App Store.
             *
             * @platform darwin,mas
             */
            securityScopedBookmarks?: boolean;
        }

        export interface OpenDialogReturnValue {
            /**
             * whether or not the dialog was canceled.
             */
            canceled: boolean;
            /**
             * An array of file paths chosen by the user. If the dialog is cancelled this will
             * be an empty array.
             */
            filePaths: string[];
            /**
             * An array matching the `filePaths` array of base64 encoded strings which contains
             * security scoped bookmark data. `securityScopedBookmarks` must be enabled for
             * this to be populated. (For return values, see table here.)
             *
             * @platform darwin,mas
             */
            bookmarks?: string[];
        }

        export interface SaveDialogOptions {
            /**
             * The dialog title. Cannot be displayed on some _Linux_ desktop environments.
             */
            title?: string;
            /**
             * Absolute directory path, absolute file path, or file name to use by default.
             */
            defaultPath?: string;
            /**
             * Custom label for the confirmation button, when left empty the default label will
             * be used.
             */
            buttonLabel?: string;
            filters?: FileFilter[];
            /**
             * Message to display above text fields.
             *
             * @platform darwin
             */
            message?: string;
            /**
             * Custom label for the text displayed in front of the filename text field.
             *
             * @platform darwin
             */
            nameFieldLabel?: string;
            /**
             * Show the tags input box, defaults to `true`.
             *
             * @platform darwin
             */
            showsTagField?: boolean;
            properties?: Array<'showHiddenFiles' | 'createDirectory' | 'treatPackageAsDirectory' | 'showOverwriteConfirmation' | 'dontAddToRecent'>;
            /**
             * Create a security scoped bookmark when packaged for the Mac App Store. If this
             * option is enabled and the file doesn't already exist a blank file will be
             * created at the chosen path.
             *
             * @platform darwin,mas
             */
            securityScopedBookmarks?: boolean;
        }

        export interface SaveDialogReturnValue {
            /**
             * whether or not the dialog was canceled.
             */
            canceled: boolean;
            /**
             * If the dialog is canceled, this will be `undefined`.
             */
            filePath?: string;
            /**
             * Base64 encoded string which contains the security scoped bookmark data for the
             * saved file. `securityScopedBookmarks` must be enabled for this to be present.
             * (For return values, see table here.)
             *
             * @platform darwin,mas
             */
            bookmark?: string;
        }
        export interface IDialog<T extends gui.Widget = gui.Widget> {
            readonly id: string;
            name: string;
            saveBounds: boolean;
            resizable: boolean;
            modal: boolean;
            closable: boolean;
            frame: boolean;
            transparent: boolean;
            showType: "none" | "popup" | "dropdown";
            alwaysInFront: boolean;
            title: string;
            readonly features: Record<string, any>;
            result: any;

            get contentPane(): T;
            set contentPane(value: T);

            get popupOwner(): gui.Widget;
            get isShowing(): boolean;

            create(): Promise<void>;
            show(popupOwner?: gui.Widget, ...args: any[]): Promise<void>;
            hide(): void;
            getResult(): Promise<any>;
            dispose(): void;

            get winX(): number;
            get winY(): number;

            get winWidth(): number;
            get winHeight(): number;

            setPos(x: number, y: number): void;
            setSize(w: number, h: number): void;
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
        export interface DataChangeCallback {
            /**
             * @param sender 被监听的对象
             * @param target 正在被修改的对象。它不一定是被监听的对象，也可能是对象下的子对象。
             * @param key 正在修改的属性名称。
             * @param value 属性新的值。
             * @param oldvalue 属性旧的值。
             * @param extInfo 附加信息。如果这是一个数组，表示是数组被截断的内容；如果这是字符串"add"，表示这次修改是对象新增的属性。
             */
            (sender: any, target: any, key: string, value: any, oldvalue: any, extInfo?: any): void;
        }

        export namespace IDataWatcher {
            /**
             * 设置一种类型的监听选项。
             * 
             * @param type 类型。
             * @param isRoot 观察 a = { children: [b] }（a、b都是相同类型） 这种情况，b的修改会通知到a，然后如果b.parent = a，那么a的修改又会传到到b，造成死循环。
             * 这种情况就需要把a的类型设置为isRoot=true，表示这种类型的修改不要再往上传递。
             * @param whiteList 默认会监听所有属性的修改，但如果提供了whiteList，则只监听whiteList里的属性。
             */
            function setOptions(type: any, isRoot?: boolean, whiteList?: Array<string>): void;
            /**
             * 把整个对象转换成可监听的对象
             * 返回一个proxy， 可以用来执行watch
             * @param obj
             * @param deep 是否自动监听子对象，默认为true。
             */
            function watch<T extends Object>(obj: T, deep?: boolean): T;
            function isWatching(obj: any): boolean;
            function getOriginalObj(obj: any): any;

            function getVersion(obj: any): number;
            function addListener(obj: any, cb: DataChangeCallback, target?: any): void;

            function removeListener(obj: any, cb: DataChangeCallback, target?: any): void;

            /**
             * 删除某个对象的所有监听
             * 
             * 可以递归所有的成员
             * 如果某个成员被多个对象引用，只删除当前对象的
             * 
             * @param obj 
             * @param target 
             */
            function clearListeners(obj: any, target?: any, recursive?: boolean): void;

            /**
             * 返回从fromObj到toObj的路径，例如toObj是 {a : { b: { c:1}}}, fromObj是 {c:1}，那么结果是 ["a", "b"]
             * 注意，对象引用可能有多条（link)，我们只返回其中一个。
             * 失败返回null
             */
            function getPath(fromObj: Object, toObj: Object, result?: Array<string>): Array<string>;

            /**
             * 执行一个函数，在此函数里如果有涉及到对任何被监听对象的修改，都不会触发变化回调函数
             * @param callback
             */
            function runUntrace(callback: () => void): void;
        }

        export interface IDataUtils {
            transformDataByType(obj: any, typeDef: FTypeDescriptor): any;

            formatDataByType(data: any, typeDef: FTypeDescriptor): any;

            propTypeEquals(type1: FPropertyType, type2: FPropertyType): boolean;
        }
        export interface IDataInspector {
            readonly id: string;
            readonly catalogs: ReadonlyArray<IPropertyField>;
            readonly target: any;
            readonly targets: ReadonlyArray<any>;
            readonly targetType: FTypeDescriptor;
            readonly fullUpdating: boolean;
            get ownerWidget(): gui.Tree;

            getData(): ReadonlyArray<any>;
            setData(target: any, data?: any, status?: any): void;

            setTitle(value: string): void;
            setReadonly(value: boolean): void;
            getCatalogField(name: string): IPropertyField;
            setCatalogBarStyle(style: CatalogBarStyle): void;

            validateTypes(): boolean;
            runValidators(parentField?: IPropertyField): boolean;
            scrollTo(field: IPropertyField): void;
            setFlag(field: IPropertyField, flag: number, value: boolean, inheritedValue?: boolean): void;

            dispose(): void;
        }
        export interface IVersionTracker {
            savePoint: number;
            isModified: boolean;

            setModified(value: boolean): void;
        }

        export interface IDataHistory {
            readonly onChanged: IDelegate<() => void>;
            readonly processing: boolean;
            readonly canUndo: boolean;
            readonly canRedo: boolean;
            paused: boolean;
            reset(): void;
            undo(): boolean;
            redo(): boolean;

            addChange(target: any, datapath: string | string[], value: any, oldvalue: any, extInfo?: any, transient?: boolean, batchId?: number): number;
            flush(): void;

            trace(obj: any): any;
            untrace(obj: any): void;

            getUndoTargets(): Array<any>;

            runInSingleBatch(callback: () => Promise<void>): Promise<void>;
            runUntrace(callback: () => void): void;
        }
        export interface ICryptoUtils {
            createHash(data: string): string;
            createFileHash(path: string, footer?: string): Promise<string>;

            encryptAES(data: string, key: string): string;

            decryptAES(encrypted: string, key: string): string;
        }
        export interface IConsolePanel extends IEditorPanel {
            log(msg: string, level?: number, group?: string): void;
            clear(): void;
            clearGroup(group: string): void;
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
        export interface IConf {
            set(key: string, value: any): void;
            get(key: string, defaultValue?: any): any;
            dispose(): void;
            save(): void;
        }
        export interface IClipboard {
            // Docs: https://electronjs.org/docs/api/clipboard

            /**
             * An array of supported formats for the clipboard `type`.
             */
            availableFormats(type?: 'selection' | 'clipboard'): string[];
            /**
             * Clears the clipboard content.
             */
            clear(type?: 'selection' | 'clipboard'): void;
            /**
             * Whether the clipboard supports the specified `format`.
             *
             * @experimental
             */
            has(format: string, type?: 'selection' | 'clipboard'): boolean;
            /**
             * Reads `format` type from the clipboard.
             *
             * `format` should contain valid ASCII characters and have `/` separator. `a/c`,
             * `a/bc` are valid formats while `/abc`, `abc/`, `a/`, `/a`, `a` are not valid.
             *
             * @experimental
             */
            read(format: string): string;
            /**
             * * `title` string
             * * `url` string
             *
             * Returns an Object containing `title` and `url` keys representing the bookmark in
             * the clipboard. The `title` and `url` values will be empty strings when the
             * bookmark is unavailable.  The `title` value will always be empty on Windows.
             *
             * @platform darwin,win32
             */
            readBookmark(): ReadBookmark;
            /**
             * Reads `format` type from the clipboard.
             *
             * @experimental
             */
            readBuffer(format: string): Buffer;
            /**
             * The text on the find pasteboard, which is the pasteboard that holds information
             * about the current state of the active application’s find panel.
             *
             * This method uses synchronous IPC when called from the renderer process. The
             * cached value is reread from the find pasteboard whenever the application is
             * activated.
             *
             * @platform darwin
             */
            readFindText(): string;
            /**
             * The content in the clipboard as markup.
             */
            readHTML(type?: 'selection' | 'clipboard'): string;
            /**
             * The image content in the clipboard.
             */
            readImage(type?: 'selection' | 'clipboard'): NativeImage;
            /**
             * The content in the clipboard as RTF.
             */
            readRTF(type?: 'selection' | 'clipboard'): string;
            /**
             * The content in the clipboard as plain text.
             */
            readText(type?: 'selection' | 'clipboard'): string;
            /**
             * Writes `data` to the clipboard.
             */
            write(data: Data, type?: 'selection' | 'clipboard'): void;
            /**
             * Writes the `title` (macOS only) and `url` into the clipboard as a bookmark.
             *
             * **Note:** Most apps on Windows don't support pasting bookmarks into them so you
             * can use `clipboard.write` to write both a bookmark and fallback text to the
             * clipboard.
             *
             * @platform darwin,win32
             */
            writeBookmark(title: string, url: string, type?: 'selection' | 'clipboard'): void;
            /**
             * Writes the `buffer` into the clipboard as `format`.
             *
             * @experimental
             */
            writeBuffer(format: string, buffer: Buffer, type?: 'selection' | 'clipboard'): void;
            /**
             * Writes the `text` into the find pasteboard (the pasteboard that holds
             * information about the current state of the active application’s find panel) as
             * plain text. This method uses synchronous IPC when called from the renderer
             * process.
             *
             * @platform darwin
             */
            writeFindText(text: string): void;
            /**
             * Writes `markup` to the clipboard.
             */
            writeHTML(markup: string, type?: 'selection' | 'clipboard'): void;
            /**
             * Writes `image` to the clipboard.
             */
            writeImage(image: NativeImage, type?: 'selection' | 'clipboard'): void;
            /**
             * Writes the `text` into the clipboard in RTF.
             */
            writeRTF(text: string, type?: 'selection' | 'clipboard'): void;
            /**
             * Writes the `text` into the clipboard as plain text.
             */
            writeText(text: string, type?: 'selection' | 'clipboard'): void;
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

        export namespace IAssetStoreTools {
            function subscribe(resourceId: string): Promise<boolean>;
            function uploadPackage(resourceId: string, filePath: string, uploadProgress?: (loaded: number, total: number) => void, abortToken?: IAbortToken): Promise<void>;
        }
        export interface IAssetPanel {
            getSelectedResource(): IAssetInfo;
            getSelectedResources(result?: Array<IAssetInfo>): Array<IAssetInfo>;
            getSelectedFolder(): IAssetInfo;
            getExpandedFolders(result?: Array<string>): Array<string>;
            setExpanedFolders(arr: Array<string>): void;
            select(assetId: string): Promise<boolean>;
            expand(asset: IAssetInfo): void;
            rename(asset: IAssetInfo): void;
            addNew(folderAsset: IAssetInfo, fileName: string, callback: (fileName: string) => void): void;

            iconScale: number;
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
        export interface IAssetDb {
            readonly onAssetChanged: IDelegate<(assetId: string, assetPath: string, assetType: AssetType, flag: AssetChangedFlag) => void>;
            readonly port: IMyMessagePort;
            getVersionOfType(type: AssetType): number;

            getFolderContent(folderAssetId: string, types?: ReadonlyArray<AssetType>, matchSubType?: boolean, customFilter?: string): Promise<IAssetInfo[]>;
            getAsset(assetIdOrPath: string, allowResourcesSearch?: boolean): Promise<IAssetInfo>;
            getAssetSync(assetIdOrPath: string): IAssetInfo;
            getAssetsInPath(assetId: string): Promise<Array<IAssetInfo>>;

            setMetaData(assetId: string, data: any): Promise<void>;
            setMetaData(...idAndDataArray: any[]): Promise<void>;

            writeFile(filePath: string, source?: string, sourceIsPath?: boolean, allowOverwrite?: boolean): Promise<IAssetInfo>;
            createFileFromTemplate(filePath: string, templateName: string, templateArgs?: Record<string, string>, allowOverwrite?: boolean): Promise<IAssetInfo>;
            createFolder(folderPath: string): Promise<IAssetInfo>;
            getPrefabSourcePath(asset: IAssetInfo): string;

            getFullPath(asset: IAssetInfo): string;
            getURL(asset: IAssetInfo): string;
            toFullPath(assetFile: string): string;
            toURL(assetFile: string): string;

            getAssetInitials(asset: IAssetInfo): string;
            getAssetIcon(asset: IAssetInfo, opened?: boolean, preferBig?: boolean): string;
            getFileIcon(ext: string): string;
            getFolderIcon(name: string): [string, string];
            clearAssetThumbnailCache(assetId: string): void;

            reimport(assets: ReadonlyArray<IAssetInfo>, args?: ReadonlyArray<string>): void;
            unpack(assets: ReadonlyArray<IAssetInfo>): void;

            search(keyword: string, types?: ReadonlyArray<AssetType>, matchSubType?: boolean, customFilter?: string): Promise<Array<IAssetInfo>>;
            filter(assetIds: ReadonlyArray<string>, types?: ReadonlyArray<AssetType>, matchSubType?: boolean, customFilter?: string): Promise<Array<IAssetInfo>>;

            rename(assetId: string, newName: string): Promise<number>;
            move(sourceAssetIds: ReadonlyArray<string>, targetFolderId: string, conflictResolution?: "keepBoth" | "replace"): Promise<void>;
            copy(sourceAssetIds: ReadonlyArray<string>, targetFolderId: string, conflictResolution?: "keepBoth" | "replace"): Promise<void>;
            delete(assets: ReadonlyArray<IAssetInfo>): Promise<void>;

            createTempAsset(fileName: string): Promise<IAssetInfo>;
            refreshFolder(folderAsset: IAssetInfo): void;

            syncI18nSettings(): Promise<void>;

            getAssetTypeByFileExt(ext: string): AssetType[];
        }
        /**
         * 登录用户的信息
         */
        export interface IUserInfo {
            nickname: string;
            headimg: string;
            headletter: string;
            channel: string;
            userId: string;
        }

        /**
         * IDE用户管理器
         */
        export interface IAccountManager {
            /**
             * 当登录用户发生变更时触发
             */
            readonly onAccountChanged: IDelegate<() => void>;

            //用户信息
            readonly userInfo: IUserInfo;
            //用于商店验证的token
            readonly storeToken: string;

            login(): Promise<void>;
        }
        export interface IAbortToken {
            readonly aborted: boolean;
            signal(): void;
            check(): void;
            reset(): void;
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
        export interface ISceneEditor extends IEditorFrontEnd {
            readonly eventTracking: IEventTracking;
            readonly playControls: IPlayControls;

            save(forced?: boolean): Promise<boolean>;
            saveAs(): Promise<boolean>;
            saveAll(): void;
            queryToSaveAll(): Promise<boolean>;
        }
        export interface IPlayControls extends gui.Widget {
            playCurrentScene: boolean;
            useHttps: boolean;

            play(currentOrStartup: boolean, where?: "editor" | "browser" | "emulator"): boolean;
        }
        export class Dialog<T extends gui.Widget = gui.Widget> implements IDialog {
            resizable: boolean;
            modal: boolean;
            closable: boolean;
            frame: boolean;
            transparent: boolean;
            showType: "none" | "popup" | "dropdown";
            alwaysInFront: boolean;
            readonly features: Record<string, any>;
            result: any;
            readonly id: string;
            name: string;
            saveBounds: boolean;
            protected _win: Window;
            protected _groot: gui.GRoot;
            protected _modalWaitLayer: gui.Widget;
            private _contentPane;
            private _popupOwner;
            private _x;
            private _y;
            private _width;
            private _height;
            private _titleStr;
            private _showing;
            private _creatingWin;
            private _blockLayer;
            constructor();
            get contentPane(): T;
            set contentPane(value: T);
            get popupOwner(): gui.Widget;
            get isShowing(): boolean;
            create(): Promise<void>;
            show(popupOwner?: gui.Widget, ...args: any[]): Promise<void>;
            hide(): void;
            getResult(): Promise<any>;
            dispose(): void;
            private createWindow;
            get title(): string;
            set title(value: string);
            get winX(): number;
            get winY(): number;
            get winWidth(): number;
            get winHeight(): number;
            setPos(x: number, y: number): void;
            setSize(w: number, h: number): void;
            protected showModalWait(msg?: string): void;
            protected closeModalWait(): void;
            protected setupModalLayer(color?: gui.Color, msg?: string): void;
            private createModalLayer;
            protected onInit(): void;
            protected onShown(...args: any[]): void;
            protected onHide(): void;
            protected onAction(): void;
            protected onCancel(): void;
            protected handleKeyEvent(evt: gui.Event): void;
        }

        export class EditorPanel implements IEditorPanel {
            panelOptions: IPanelOptions;
            panelId: string;
            protected _panel: gui.Widget;
            protected _modalWaitLayer: gui.Widget;
            create(): Promise<void>;
            get contentPane(): gui.Widget;
            protected showModalWait(msg?: string): void;
            protected closeModalWait(): void;
            protected setupModalLayer(color?: gui.Color, msg?: string): void;
            private createModalLayer;
        }

        export class NodeRefInput extends gui.Label {
            protected _c1: gui.Controller;
            protected _value: IMyNode;
            protected _editable: boolean;
            protected _btnSelect: gui.Widget;
            protected _titleObject: gui.Widget;
            typeName?: string;
            constructor();
            get value(): IMyNode;
            set value(value: IMyNode);
            setValue(data: any): Promise<void>;
            get editable(): boolean;
            set editable(value: boolean);
            private refresh;
            onConstruct(): void;
            private __focusIn;
            private __focusOut;
            private onDragOver;
            private onDrop;
            protected __click(evt: gui.Event): Promise<void>;
            private onHotkey;
            private submit;
        }

        export class NumericInput extends gui.Label {
            min: number;
            max: number;
            private _value;
            private _holder;
            private _lastHolderPos;
            private _textField;
            private _lastScroll;
            private _fractionDigits;
            private _step;
            private _suffix;
            constructor();
            get fractionDigits(): number;
            set fractionDigits(value: number);
            get step(): number;
            set step(value: number);
            get editable(): boolean;
            set editable(value: boolean);
            get suffix(): string;
            set suffix(value: string);
            get value(): number;
            set value(val: number);
            get text(): string;
            set text(value: string);
            onConstruct(): void;
            private __onKeydown;
            private _holderDragStart;
            private _holderDragEnd;
            private _holderDragMove;
            private __click;
            private __focusIn;
            private __focusOut;
            private __onSubmit;
            private __mouseWheel;
        }

        export class ResourceInput extends gui.Label {
            protected _text: string;
            protected _c1: gui.Controller;
            protected _asset: IAssetInfo;
            protected _editable: boolean;
            protected _btnSelect: gui.Widget;
            protected _typeFilter: Array<AssetType>;
            protected _promtText: string;
            protected _titleObject: gui.Widget;
            allowInternalAssets: boolean;
            customFilter: string;
            constructor();
            get text(): string;
            set text(value: string);
            private setAssetId;
            get assetValue(): IAssetInfo;
            set assetValue(value: IAssetInfo);
            get editable(): boolean;
            set editable(value: boolean);
            set typeFilter(value: Array<AssetType>);
            get typeFilter(): Array<AssetType>;
            private refresh;
            onConstruct(): void;
            private __focusIn;
            private __focusOut;
            private onDragOver;
            private onDrop;
            protected __click(evt: gui.Event): void;
            private onHotkey;
            private submit;
        }

        export class ColorInput extends gui.Widget {
            private _colorValue;
            private _color;
            private _color2;
            private _shapeColor;
            private _shapeAlpha;
            private _hasValue;
            private _checkable;
            hideAlpha: boolean;
            constructor();
            get colorValue(): gui.Color;
            set colorValue(value: gui.Color);
            get checkable(): boolean;
            set checkable(value: boolean);
            get hasValue(): boolean;
            set hasValue(value: boolean);
            private drawColor;
            onConstruct(): void;
            private onClickShape;
        }

        export class GradientInput extends gui.Widget {
            private _gradientValue;
            private _shape;
            private _hasValue;
            private _checkable;
            constructor();
            get value(): GradientValue;
            set value(value: GradientValue);
            get checkable(): boolean;
            set checkable(value: boolean);
            get hasValue(): boolean;
            set hasValue(value: boolean);
            onConstruct(): void;
        }

        export class CurveInput extends gui.Widget {
            private static _pointPool;
            private static cleartPoints;
            private static createPoints;
            private _canvas;
            private _hasValue;
            private _checkable;
            private _points;
            private _curPoints;
            private _path;
            curveMin: number;
            curveMax: number;
            maxValue: number;
            minValue: number;
            /**是否返回归一化的数据*/
            isNormalization: boolean;
            maxKeyFrame: number;
            isCurve: boolean;
            isWeight: boolean;
            hideAlpha: boolean;
            constructor();
            get checkable(): boolean;
            set checkable(value: boolean);
            get hasValue(): boolean;
            set hasValue(value: boolean);
            get points(): ReadonlyArray<PathPoint>;
            clearPoints(): void;
            addPoint(): PathPoint;
            setDefaultPoints(): void;
            applyChange(): void;
            private drawCurve;
            onConstruct(): void;
        }

        export class EditableListItem extends ListItem {
            toggleClickCount: number;
            _input: ListItemInput;
            _justGotFocus: boolean;
            _titleObj: gui.TextField;
            private _savedScrollPos;
            constructor();
            get editable(): boolean;
            set editable(value: boolean);
            get textForEdit(): string;
            set textForEdit(value: string);
            get editWithoutFileExt(): boolean;
            set editWithoutFileExt(value: boolean);
            startEditing(): void;
            cancelEditing(): void;
            onConstruct(): void;
            private onClickHandler;
            getFullWidth(): number;
        }

        export class EditableTreeItem extends EditableListItem {
        }

        export class ListItem extends gui.Button {
            private _selectionBar;
            constructor();
            onConstruct(): void;
        }

        export class ListItemInput extends gui.Label {
            toggleClickCount: number;
            textForEdit?: string;
            editWithoutFileExt?: boolean;
            private _c1;
            private _input;
            private _savedText;
            private _savedFileExt;
            constructor();
            get editable(): boolean;
            set editable(value: boolean);
            get editing(): boolean;
            startEditing(): void;
            cancelEditing(): void;
            onConstruct(): void;
            private onFocusInHandler;
            private onClickHandler;
            private onFocusOutHandler;
            private onKeydown;
        }

        export class TextInput extends gui.Label {
            protected _savedText: string;
            protected _textField: gui.TextInput;
            protected _clear: gui.Widget;
            protected _lang: gui.Widget;
            protected _key: gui.TextField;
            protected _textInfo: gui.I18nTextInfo;
            get text(): string;
            set text(value: string);
            get editable(): boolean;
            set editable(value: boolean);
            onConstruct(): void;
            private __keyDown;
            private __focusIn;
            private __focusOut;
            private __textChanged;
            private __clickClear;
            private __clickLang;
            private __clickLangRemove;
        }

        export class TextArea extends gui.Label {
            private _savedText;
            private _textField;
            private _lang;
            private _key;
            private _textInfo;
            get editable(): boolean;
            set editable(value: boolean);
            get text(): string;
            set text(value: string);
            onConstruct(): void;
            private __focusIn;
            private __focusOut;
            private __clickLang;
            private __clickLangRemove;
        }

        export class SearchInput extends TextInput {
            resultList: gui.List;
            onConstruct(): void;
        }

        export class ModalProgress extends gui.Label {
            titleObj: gui.TextField;
            progressBar: gui.ProgressBar;
            cancelButton: gui.Button;
            onConstruct(): void;
            show(parent: gui.Widget): void;
        }

        export class InspectorPanel extends gui.Widget {
            private _tree;
            private _inspectorHelper;
            private _watchDatas;
            private _history;
            private _changes;
            allowUndo: boolean;
            stopTrace: boolean;
            readonly onDataChanged: IDelegate<(sender: any, datapath: string[], value: any, oldvalue: any) => void>;
            constructor();
            onConstruct(): void;
            get history(): IDataHistory;
            resetInspectors(): void;
            inspect(data: any, type: string | FTypeDescriptor, options?: IInspectorOptions): void;
            getInspectors(): ReadonlyArray<IDataInspector>;
            showCatalog(catalog: string): void;
            private _onDataChanged;
            private emitChanges;
            private onHotkey;
        }

        export declare enum FieldStatusFlags {
            Hidden = 0,
            Hidden_UserCall = 1,
            Hidden_MultipleTypes = 2,
            Hidden_MultipleObjects = 3,
            Hidden_NullObject = 4,
            Hidden_Tab = 5,
            Readonly = 6,
            Readonly2 = 7,
            _Max = 8
        }
        export class PropertyField extends gui.TreeNode implements IPropertyField {
            inspector: IDataInspector;
            objType: Readonly<FTypeDescriptor>;
            property: Readonly<FPropertyDescriptor>;
            target: IInspectingTarget;
            watchProps: Array<string>;
            memberProps: Array<FPropertyDescriptor>;
            _inheritedFlag: number;
            _flag: number;
            _readonlyFlag: boolean;
            _hotUpdateTime: number;
            _statusKey: string;
            _stayInvisible: boolean;
            get parent(): IPropertyField;
            create(): IPropertyFieldCreateResult;
            makeReadonly(value: boolean): void;
            refresh(): void;
            getStatus(name: string): any;
            setStatus(name: string, value: any): void;
            setHidden(hidden: boolean): void;
            isFlagSet(flag: number): boolean;
            findBrotherField(name: string): IPropertyField;
            findChildField(name: string): IPropertyField;
            getChildFields(result?: Array<IPropertyField>): Array<IPropertyField>;
            displayError(msg: string): void;
        }

        export class ButtonsField extends PropertyField {
            protected list: gui.List;
            private _hasHotkey;
            create(): IPropertyFieldCreateResult;
            protected addButton(info: string | IPropertyButtonInfo): gui.Widget;
            private onClickButton;
            private handleHotkey;
            refresh(): void;
        }

        export class VecField extends PropertyField {
            protected _input: gui.Widget;
            protected _inputs: Array<NumericInput>;
            protected _members: Array<FPropertyDescriptor>;
            protected _axes: Array<any>;
            create(res?: "Vec2Field" | "Vec3Field" | "Vec4Field"): IPropertyFieldCreateResult;
            protected onSubmit(index: number, num: number): void;
            refresh(): void;
        }
        export class Vec2Field extends VecField {
            create(): IPropertyFieldCreateResult;
        }
        export class Vec3Field extends VecField {
            create(): IPropertyFieldCreateResult;
        }
        export class Vec4Field extends VecField {
            create(): IPropertyFieldCreateResult;
        }


        const DataWatcher: typeof IDataWatcher;
        const DataHistory: new (versionTracker?: IVersionTracker, maxItems?: number) => IDataHistory;
        const ListHelper: new (list: gui.List, indexColumn?: string) => IListHelper;
        const ListInsertionHelper: new (owner: gui.List, transferType: string) => IListInsertionHelper;
        const DataInspector: new (outputType: string) => IDataInspector;
        const InspectorHelper: new () => IInspectorHelper;
        const Menu: typeof MenuStatic;
        const Webview: new () => IWebview;
        const WebIFrame: new () => IWebIFrame;
        const Conf: new (path: string, fileName?: string) => IConf;
        const Delegate: new <T extends (...args: any[]) => any>() => IDelegate<T>;
        const MyMessagePort: (new (port: MessagePort, queueTask?: boolean) => IMyMessagePort) & typeof MyMessagePortStatic;
        const ZipFileW: new (basePath: string) => IZipFileW;
        const ZipFileR: new () => IZipFileR;
        const AssetStoreTools: typeof IAssetStoreTools;
        const EventTracking: new (appId: string, pageShow?: boolean, pageHide?: boolean, showLog?: boolean) => IEventTracking;
        const AbortToken: new () => IAbortToken;
        const BuildTask: { start(platform: string, destPath?: string): void };

        const SelectResourceDialog: new () => ISelectResourceDialog;
        const SelectNodeDialog: new () => ISelectNodeDialog;
        const ColorPickerDialog: new () => IDialog;
        const InputTextDialog: new () => IInputTextDialog;
        const BuildTaskDialog: new () => IDialog;
        const ChooseUploadTargetDialog: new () => IDialog;
        const QRCodeDialog: new () => IQRCodeDialog;
        const utils: ICryptoUtils & INativeTools & IUUIDUtils & IObjectUtils & IUtils & INetUtils & IDataUtils & ITemplateUtils & IPlist;
        const GUIUtils: IGUIUtils;

        function require(id: string): any;

        function inspectorField(name: string): Function;
        function inspectorLayout(type: string): Function;
        function panel(id: string, options?: IPanelOptions): Function;
        function onLoad(target: Object, propertyName: string): void;
        function onUnload(target: Object, propertyName: string): void;
        function menu(name: string, options?: ICustomMenuItemOptions): Function;
    }

    var Editor: IEditor.IEditorSingleton;
    var SceneEditor: IEditor.ISceneEditor;
    var i18n: IEditor.ILanguageModule;
}
