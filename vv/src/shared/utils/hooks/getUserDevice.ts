export const getUserDevice = (px: number) => {
    if(px < 599){
        return 'm'
    } else if(599 < px && px < 1023){
        return 't'
    } else {
        return 'd'
    }
}