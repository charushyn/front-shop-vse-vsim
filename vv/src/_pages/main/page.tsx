import { Slider, Warning, Categories, About, BulkPreview } from "@/widgets/index";

export default function MainPage(){
    return(
        <div className="">
            <Warning></Warning>
            <Slider></Slider>
            {/* <Categories></Categories> */}
            <BulkPreview></BulkPreview>
            <About></About>
        </div>
    )
}