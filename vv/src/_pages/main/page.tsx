import { Slider, Warning, Products, About, BulkPreview } from "@/widgets/index";

export default function MainPage(){
    return(
        <div className="">
            <Warning></Warning>
            <Slider></Slider>
            <Products></Products>
            <About></About>
            <BulkPreview></BulkPreview>
        </div>
    )
}