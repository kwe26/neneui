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

export function AssetImage(img: string){
    return "local+" + img;
}

export function NetworkImage(img: string){
    return "web+" + img;
}

export interface setVarProps{
    variable: string,
    value: string
}

export function setVar({
    variable = "",
    value = ""
}: setVarProps){
    return {
        var: variable,
        val: value
    }
}

export enum PromptMode {
    dialog = "dialog",
    popup = "popup"
}

export enum DateFormat {
    dmmyyyy = "dmmyyyy",
    yyyyMMdd = "yyyyMMdd"
}

export enum NavigationBarAlignment{
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

export enum NavigationLabelType{
    none = "none",
    selected = "selected",
    all = "all",
    tootlip = "tootlip",
    expanded = "expanded"
}

export * from "./TextStyle"
export * from "./BoxDecoration"
export * from "./Actions"
export * from "./BoxConstraints"
export * from "./Variable"
export * from "./Iconify";
export * from "./TextEditingController"
export * from "./Compare"
export * from "./Frame"