const imgs : string[] = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xD1T4cEnAbwmM_kF5qJr8h_kJ85OMTyIoQ&s',
    'https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_1280.png',
    'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'
]

const slideImg = (lengthArray: number, currentIndex: any, action: 'next' | 'previous') => {
    switch(action){
        case 'next':
            if(currentIndex + 1 < lengthArray){
                return currentIndex + 1
            } else {
                return 0
            };
        case 'previous':
            if(currentIndex == 0){
                return lengthArray - 1
            } else {
                return currentIndex - 1
            }
    }
}

export {imgs, slideImg}