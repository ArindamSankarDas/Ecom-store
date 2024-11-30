import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className='bg-gray-100 py-12 md:py-24'>
      <div className='container mx-auto px-4 md:px-20'>
        <div className='max-w-3xl'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            Discover Your Perfect Style
          </h1>
          <p className='text-xl mb-8'>
            Explore our wide range of products and find the perfect match for
            your unique taste.
          </p>
          <Button
            size='lg'
            className='transition-all active:bg-gray-400'
            onClick={() => navigate("shop")}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
