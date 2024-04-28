import cover_1 from '../assets/covers/cover_1.jpg';
import cover_2 from  '../assets/covers/cover_2.jpg';
import cover_3 from  '../assets/covers/cover_3.jpg';
import cover_4 from  '../assets/covers/cover_4.jpg';
import cover_5 from  '../assets/covers/cover_5.jpg';
import cover_6 from  '../assets/covers/cover_6.jpg';
import cover_7 from  '../assets/covers/cover_7.jpg';
import cover_8 from  '../assets/covers/cover_8.jpg';
import cover_9 from  '../assets/covers/cover_9.jpg';
import cover_10 from '../assets/covers/cover_10.jpg';
import cover_11 from '../assets/covers/cover_11.jpg';
import cover_12 from '../assets/covers/cover_12.jpg';
import cover_13 from '../assets/covers/cover_13.jpg';
import cover_14 from '../assets/covers/cover_14.jpg';
import cover_15 from '../assets/covers/cover_15.jpg';
import cover_16 from '../assets/covers/cover_16.jpg';
import cover_17 from '../assets/covers/cover_17.jpg';
import cover_18 from '../assets/covers/cover_18.jpg';
import cover_19 from '../assets/covers/cover_19.jpg';
import cover_20 from '../assets/covers/cover_20.jpg';
import cover_21 from '../assets/covers/cover_21.jpg';
import cover_22 from '../assets/covers/cover_22.jpg';
import cover_23 from '../assets/covers/cover_23.jpg';
import cover_24 from '../assets/covers/cover_24.jpg';




const images = [
    cover_1, cover_2, cover_3, cover_4, cover_5,
    cover_6, cover_7, cover_8, cover_9, cover_10,
    cover_11, cover_12, cover_13, cover_14, cover_15,
    cover_16, cover_17, cover_18, cover_19, cover_20,
    cover_21, cover_22, cover_23, cover_24
  ];
  
  // Function to get a random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  export default getRandomImage