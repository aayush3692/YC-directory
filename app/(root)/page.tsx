import SearchForm from '@/components/SearchForm'
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';


const page = async ({ searchParams }: {
    searchParams: Promise<{ query?: string }>
}) => {
    const query = (await searchParams).query;
    const params = {search: query||null}

    const {data: posts} = await sanityFetch({
        query: STARTUPS_QUERY, params
    }); 

    const session = await auth()
    console.log(session?.id)


    // const post = [{
    //     createdAt: new Date(),
    //     views: 55,
    //     author: {_id: 1, name: 'Adrian'},
    //     _id: 1,
    //     description: 'This is a description',
    //     image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     category:'Robots',
    //     title:"We robots"
    // }]
    return (
        <>
            <section className='w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6'>
                <h1 className='uppercase bg-black px-6 py-3 font-work-sans 
                text-white sm:text-[54px] sm:leading-[64px] text-[36px] 
            leading-[46px] max-w-5xl text-center my-5'>
                    Pitch Your Startup, <br />
                    Connect With Entrepreneurs
                </h1>

                <p className='font-medium text-[20px] text-white max-w-2xl text-center break-words'>
                    Submit Ideas, Vote on Pitches and Get Noticed in virtual competitions.
                </p>

                <SearchForm query={query} />

            </section>

            <section className='px-6 py-10 max-w-7xl mx-auto'>
                <p className='text-4xl'>
                    {query ? `Search results for ${query}` : `All startups`}
                </p>

                <ul className='mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5'>
                    {posts?.length > 0 ? (
                        posts.map((post: StartupTypeCard) => (
                            <StartupCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className='text-black-100 text-sm font-normal'> No startups found</p>


                    )}
                </ul>
            </section>

            <SanityLive/>
        </>
    )
}

export default page
