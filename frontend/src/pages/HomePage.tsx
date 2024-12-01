import { Link } from "react-router-dom";
import { Card, CardContent } from "@components/ui/card";

import HeroSection from "@components/HeroSection/HeroSection";
import ProductGrid from "@components/ProductGrid/ProductGrid";

import featuredData from "@lib/data.json";
import ProductCard from "@components/ProductCard/ProductCard";

const HomePage = () => {
  const { featuredCategories, featuredProducts } = featuredData;

  return (
    <main className='flex-1 pb-10'>
      <HeroSection />
      <section className='py-12'>
        <div className='container mx-auto px-4 lg:px-20'>
          <h2 className='text-3xl font-bold mb-8'>Featured Categories</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {featuredCategories.map((category) => (
              <Link key={category.name} to={`/shop/${category.name}`}>
                <Card>
                  <CardContent className='p-4'>
                    <div className='aspect-square relative mb-4'>
                      <img
                        src={category.thumbnail}
                        alt={category.name}
                        className='object-cover rounded-md'
                      />
                    </div>
                    <h3 className='font-medium text-center'>{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='px-10'>
        <h2 className='text-3xl font-bold mb-5'>Featured Products</h2>
        <ProductGrid>
          {featuredProducts.map((productItem) => (
            <ProductCard
              itemId={productItem.id}
              itemCategory={productItem.category}
              itemPic={productItem.thumbnail}
              itemPrice={productItem.price}
              itemTitle={productItem.title}
            />
          ))}
        </ProductGrid>
      </section>
    </main>
  );
};
export default HomePage;
