export enum MainAxis {
    start = "start",
    center = "center",
    end = "end",
    spaceBetween = "spaceBetween",
    spaceAround = "spaceAround",
    spaceEvenly = "spaceEvenly"
}

export enum TextDirection {
    "ltr" = "ltr",
    "rtl" = "rtl"
}

export enum Direction {
    Horizontal = "horizontal",
    Vertical = "vertical"
}

export enum BreadcrumbSeparator {
    arrowSeparator = "arrowSeparator",
    slashSeparator = "slashSeparator"
}

export enum ScrollPhysics {
    Scroll = "scroll",
    NeverScroll = "never_scroll",
}

export enum ImageRepeat {
    repeat = "repeat",
    repeatX = "repeatX",
    repeatY = "repeatY",
    noRepeat = "noRepeat"   
}

export enum BoxFit {
    fill = "fill",
    contain = "contain",
    cover = "cover",
    fitWidth = "fitWidth",
    fitHeight = "fitHeight",
    none = "none"
}

export enum Alignment {
    bottomCenter = "bottomCenter",
    bottomLeft = "bottomLeft",
    bottomRight = "bottomRight",
    center = "center",
    centerLeft = "centerLeft",
    centerRight = "centerRight",
    topCenter = "topCenter",
    topLeft = "topLeft",
    topRight = "topRight"
}

export enum FilterQuality {
    none = "none",
    low = "low",
    medium = "medium",
    high = "high"
}

export enum ButtonType {
    Normal = "normal",
    Primary = "primary",
    Secondary = "secondary",
    Success = "success",
    Danger = "danger",
    Info = "info",
    Warning = "warning"
}

export enum ButtonDensity {
    compact = "compact",
    dense = "dense",
    normal = "normal",
    comfortable = "comfortable",
    icon = "icon"
}

export enum ButtonShape {
    circle = "circle",
    rectangle = "rectangle"
}

export enum FontWeight {
    bold = "bold",
    w100 = "w100",
    w200 = "w200",
    w300 = "w300",
    w400 = "w400",
    w500 = "w500",
    w600 = "w600",
    w700 = "w700",
    w800 = "w800",
    w900 = "w900"
}

export enum Colors {
    red = "red",
    blue = "blue",
    green = "green",
    black = "black",
    white = "white",
    violet = "violet"
}

export enum TextDecoration {
    none = "none",
    lineThrough = "lineThrough",
    overline = "overline",
    underline = "underline"
}

export enum FontStyle {
    normal = "normal",
    italic = "italic"
}

export enum TextOverflow {
    clip = "clip",
    fade = "fade",
    ellipsis = "ellipsis",
    visible = "visible"
}

export enum InputType {
    text = "text",
    number = "number",
    phone = "phone",
    password = "password",
    twitter = "twitter"
}

export enum TextAlign {
    left = "left",
    right = "right",
    center = "center",
    justify = "justify",
    start = "start",
    end = "end"
}

export enum CrossAxis {
    start = "start",
    center = "center",
    end = "end",
    stretch = "stretch"
}

export enum Axis {
    horizontal = "horizontal",
    vertical = "vertical"
}

export enum FlexFit {
    tight = "tight",
    loose = "loose"
}

export enum PromptMode {
    dialog = "dialog",
    popup = "popover"
}

export enum DateFormat {
    ddmmyyyy = "ddmmyyyy",
    yyyyMMdd = "yyyyMMdd",
    dd_mm_yyy = "dd-mm-yyyy",
    millisecondsSinceEpoch = "millisecondsSinceEpoch"
}

export enum NavigationBarAlignment {
    start = "start",
    center = "center",
    end = "end",
    spaceBetween = "spaceBetween",
    spaceAround = "spaceAround",
    spaceEvenly = "spaceEvenly"
}

export enum NavigationLabelPosition {
    start = "start",
    end = "end",
    top = "top",
    bottom = "bottom"
}

export enum NavigationLabelType {
    none = "none",
    selected = "selected",
    all = "all",
    tootlip = "tootlip",
    expanded = "expanded"
}

export enum AxisAlignmentDirectional {
    center = "center",
    end = "end",
    start = "start"
}

export enum ChatBubbleType {
    plain = "plain",
    sharpCorner = "sharpCorner",
    tail = "tail"
}

export enum Action {
    SHOW_TOAST = "show_toast",
    NAVIGATE = "navigate",
    NAVIGATE_PUSH_REPLACE = "navigate_pushreplace",
    NAVIGATE_POP = "pop",
    HIDE = "hide",
    SHOW = "show",
    DEBUG = "daikon",
    DIALOG = "dialog",
    SUBMIT = "submit",
    SET_VAR = "setvar",
    JAVASCRIPT = "js",
    PROPS = "props",
    LAUNCH_URL = "launch_url",
    SELECT_FILE = "select_file"
}

export interface WidgetNode {
    id?: string;
    name: string;
    props?: Record<string, any>;
}

export function AssetImage(img: string) {
    return "local+" + img;
}

export function NetworkImage(img: string) {
    return "web+" + img;
}

export function MemoryImage(variable: string) {
    return "memory+" + variable;
}

export interface LaunchURLProps {
    url: string;
    noLaunch?: any;
}

export function LaunchURL({ url, noLaunch }: LaunchURLProps) {
    return { url, noLaunch };
}

export interface setVarProps {
    variable: string;
    value: any;
}

export function setVar({ variable = "", value = "" }: setVarProps) {
    return {
        var: variable,
        val: value
    };
}

export function SelectFile({
    types = "jpg,png",
    title = "Select Image",
    variable = "fileImage"
}) {
    return {
        types,
        title,
        variable
    };
}

export function DoAction(action: Action, data: any) {
    return {
        action,
        data
    };
}

export class EdgeInsets {
    left: number;
    right: number;
    top: number;
    bottom: number;

    private constructor(left: number, top: number, right: number, bottom: number) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    static all(value: number): EdgeInsets {
        return new EdgeInsets(value, value, value, value);
    }

    static fromLTRB(left: number, top: number, right: number, bottom: number): EdgeInsets {
        return new EdgeInsets(left, top, right, bottom);
    }
}

export class DateTime {
    timestamp: number;

    private constructor(timestamp: number) {
        this.timestamp = timestamp;
    }

    static now(): DateTime {
        return new DateTime(Date.now());
    }

    static from(day: number, month: number, year: number): DateTime {
        return new DateTime(new Date(year, month - 1, day).getTime());
    }
}

export interface TextStyleProps {
    height?: number;
    fontSize?: number;
    fontWeight?: FontWeight;
    color?: string;
    decoration?: TextDecoration;
    fontStyle?: FontStyle;
}

export function TextStyle({
    height = 1.0,
    fontSize = 14,
    fontWeight = FontWeight.w400,
    color = Colors.black,
    decoration = TextDecoration.none,
    fontStyle = FontStyle.normal
}: TextStyleProps = {}) {
    return {
        height,
        fontSize,
        fontWeight,
        color,
        decoration,
        fontStyle
    };
}

export interface BoxDecorationProps {
    color?: string;
    image?: string;
    radius?: number;
    borderColor?: string;
    borderWidth?: number;
}

export function BoxDecoration({
    color = "#FFFFFF",
    image = "none",
    radius = 1,
    borderColor = "#FFFFFF",
    borderWidth = 1
}: BoxDecorationProps = {}) {
    return {
        color,
        image,
        radius,
        borderColor,
        borderWidth
    };
}

export interface BoxConstraintsProps {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}

export function BoxConstraints({
    minHeight = 0.0,
    maxHeight = Infinity,
    minWidth = 0.0,
    maxWidth = Infinity
}: BoxConstraintsProps = {}) {
    return {
        name: "BoxConstraints",
        props: {
            minHeight,
            maxHeight,
            minWidth,
            maxWidth
        }
    };
}

export interface VariableProps {
    template: string;
    variable: string;
}

export function Var({
    template = "Hello {%1} {%2}",
    variable = "default,defaultb"
}: VariableProps) {
    return {
        template,
        variable
    };
}

export interface IconifyProps {
    size?: number;
    prefix?: string;
}

export function Iconify(name: string, { size = 24, prefix = "material-symbols" }: IconifyProps = {}) {
    return {
        name: "Iconify",
        props: {
            icon: prefix + "/" + name,
            size
        }
    };
}

export interface TextEditingControllerProps {
    value?: string;
}

export function TextEditingController({ value = "" }: TextEditingControllerProps = {}) {
    return {
        name: "TextEditingController",
        props: {
            value
        }
    };
}

export function Empty(): WidgetNode {
    return {
        id: "#" + (Math.floor(Math.random() * 1000)).toString() + "A",
        name: "Empty"
    };
}

export interface CompareProps {
    fi: string;
    ifEqualTo: string;
    then: any;
    or?: any;
}

export function Compare({
    fi = "noIf",
    ifEqualTo = "noIf",
    then = Empty(),
    or = Empty()
}: CompareProps) {
    return {
        name: "Compare",
        props: {
            fi,
            ifEqualTo,
            then,
            or
        }
    };
}

export interface FrameProps {
    framePath: string;
}

export function Frame(id: string, { framePath = "/ui/main" }: FrameProps) {
    return {
        id,
        name: "Frame",
        props: {
            framePath
        }
    };
}

export interface NewPropsProps {
    id: string;
    props: any;
}

export function NewProps({ id, props }: NewPropsProps) {
    return {
        id,
        props: props.props
    };
}

export interface ForEachInterface {
    varToForEach: string;
    namespaceVar: string;
    child: any;
}

export function ForEach(id: string, {
    varToForEach = "",
    namespaceVar = "",
    child = Empty()
}: ForEachInterface) {
    return {
        id,
        name: "ForEach",
        props: {
            varToForEach,
            namespaceVar,
            child
        }
    };
}

export interface FormSubmitActionProps {
    variables: string[];
    varNames: string[];
    fileVariable?: string[];
    fileNames?: string[];
    headers?: Record<string, string>;
    callbackPath: string;
}

export function FormSubmitAction({
    variables = [],
    varNames = [],
    fileVariable = [],
    fileNames = [],
    headers = {},
    callbackPath = "/ui/callA"
}: FormSubmitActionProps) {
    if (variables.length === varNames.length) {
        return {
            variables,
            varNames,
            headers,
            fileNames,
            fileVariable,
            callbackPath
        };
    } else {
        throw new Error('Variables and Variable Names must be Specified Respectively.');
    }
}
