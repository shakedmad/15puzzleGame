import {React} from 'react'; 
import {Image, Container} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import './carousel.css';

const images = [
    {id: 1,
    imgLink: './images/miriRegev/miri/d7a8d792d791-d79ed799d7a8d799-1.jpg',
    title: 'Miri Regev'},
    {id: 2,
    imgLink: '/images/download.jpg',
    title: 'Shabbat Shalom'},
    {id: 3,
    imgLink: '/images/ep-air-fryer-grilled-cheese-vpmf-mediumSquareAt3X.jpg',
    title: 'Toast'}
];

export default function CarouselCard(props) {
  function handleImageClick(image) {
      props.imageChosen(image);
  }

  const slides = images.map((imgaee) => (
    <Carousel.Slide key={imgaee.imgLink} >
      <Image id={imgaee.title} onClick={() => handleImageClick(imgaee)} src={imgaee.imgLink} />
    </Carousel.Slide>
  ));
  
  return (
    <Container size="60%" > 
      <Carousel className='carousel' slideGap="md" slideSize="100%" align="start" slidesToScroll={1} controlSize={20} height="100%" maw={300} mx="xs" withIndicators loop dragFree>
        {slides}
      </Carousel>
    </Container>
  );
};