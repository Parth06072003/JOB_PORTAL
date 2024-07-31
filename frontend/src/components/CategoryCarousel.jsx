/* eslint-disable react/jsx-key */
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const CategoryCarousel = () => {
    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Graphic Designer",
        "FullStack Developer",
        "Data Science"
    ]
    return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/3 lg-basis-1/3 ">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious  />
                <CarouselNext />
            </Carousel>
    </div>
  )
}

export default CategoryCarousel