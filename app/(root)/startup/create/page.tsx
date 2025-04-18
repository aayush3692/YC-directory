import StartupForm from '@/components/StartupForm'
import React from 'react'

const page = () => {
    return (
        <>
            <section className='w-full bg-[#EE2B69] min-h-[530px] flex
            justify-center items-center flex-col py-10 px-6;'>
                <h1 className='uppercase bg-black px-6 py-3 font-work-sans font-extrabold
    text-white sm:text-[54px] 
    sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5'>Submit your Startup</h1>
            </section>

            <StartupForm/>
        </>
    )
}

export default page
