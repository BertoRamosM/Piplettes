import React from 'react'
import Button from '../Button'

const Hero = () => {
  return (
    <section className="dark:text-gray-800">
      <div className="container mx-auto flex flex-col items-pretty px-4 text-pretty md:px-10 lg:px-32 xl:max-w-3xl pb-20">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Quisquam necessita vel
          <span className="dark:text-magenta-600">laborum doloribus</span>
          delectus
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">
          Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab
          amet vero eaque explicabo!
        </p>
        <div className="flex flex-wrap justify-center">
          <Button text={"Get Started"}></Button>
           
          <button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-900 dark:border-gray-300 cursor-pointer">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero