
import Image from "next/image";
import Link from "next/link";
// import ImageSlider from "./components/ImageSlider";


export default function Home() {
  return (
    <main>
  <div className='w-10/12 container mx-auto py-7'>
        <div className='grid grid-cols-1 items-center  lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-16  py-10 lg:py-14'>
           <div  className='space-y-8 order-2 lg:order-1'>
            <h1 className='text-3xl lg:text-5xl text-center lg:text-start'>Manage your Task on  <span className='text-purple-800'>TaskDuty</span></h1>
            <p className='text-center lg:text-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nostrum recusandae maiores. Veniam illo ratione voluptas, nemo adipisci quidem accusamus obcaecati voluptate laboriosam inventore eligendi! Accusamus quidem earum iure corrupti?</p>
            <div className='flex justify-center lg:justify-start'>
            <Link href="/alltask" className='w-40 animate-bounce font-bold text-white text-center bg-[#9553d6] rounded-md p-3'>Go to My Tasks</Link>
            </div>
           </div>
           <div className='order-1 lg:order-2'>
           <Image className='w-full h-full animate-pulse' src="/slideOne.svg" alt='image slide' width={100} height={100}/>
            
           </div>
        </div>
    </div>
    </main>
  );
}
