export function Center(child: any) {
    return {
        id: "#"+(Math.floor(Math.random() * 1000)).toString() + "CT",
        name: "Center",
        props: {
            child
        }
    }
}