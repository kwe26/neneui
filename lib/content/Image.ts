import { Alignment, AssetImage, BoxFit, CircularProgressIndicator, FilterQuality, ImageRepeat, SizedBox } from "../widgets";

export interface ImageProps {
    path: string,
    width?: number,
    height?: number,
    scale?: number,
    color?: string,
    repeat?: ImageRepeat,
    fit?: BoxFit,
    alignment?: Alignment,
    filterQuality? : FilterQuality,
    loadingWidget?: any,
    errorWidget? : any
}

export function Image(id: string, {
    path = AssetImage(""),
    width = 0,
    height = 0,
    scale = 1.0,
    color = "#000000",
    repeat = ImageRepeat.noRepeat,
    fit = BoxFit.none,
    alignment = Alignment.center,
    filterQuality = FilterQuality.none,
    loadingWidget = CircularProgressIndicator('#fImageLoading', {}),
    errorWidget = SizedBox('#fImageError', {})
}: ImageProps) {
    return {
        name: "Image",
        id,
        props: {
            path,
            width,
            height,
            scale,
            color,
            repeat,
            fit,
            alignment,
            filterQuality,
            loadingWidget,
            errorWidget
        }
    }
}