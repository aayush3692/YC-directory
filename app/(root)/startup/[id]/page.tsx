import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client'
import React, { Suspense } from 'react'
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit()

export const experimental_ppr = true;
//startup/123
const page = async ({params}: {params: Promise<{id: string}> }) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY,  {id} );
    const parseContent = md.render(post?.pitch || '');

    if(!post) return notFound();
    return (
        <>
            <section className='w-full bg-[#EE2B69] min-h-[530px] flex 
            justify-center items-center flex-col py-10 px-6'>
                <p className='bg-[#FBE843] px-6 py-3 font-work-sans 
                font-bold rounded-sm uppercase relative tag-tri'>
                    {formatDate(post?._createdAt)}
                </p>

                <h1 className='uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5
                '>{post.title}</h1>
                <p className='font-medium text-[20px] text-white 
                max-w-2xl text-center break-words '>
                    {post.description}
                </p>
            </section>

            <section className='px-6 py-10 max-w-7xl mx-auto'>
                <img src={post.image} alt="thumbnail" 
                className='w-full h-auto rounded-xl'/>

                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex justify-between items-center gap-5 '>
                        <Link
                        href={`user/${post.author?._id}`}
                        className='flex gap-2 items-center mb-3'>
                            <Image
                                src={post.author?.image}
                                alt='avatar'
                                width={64}
                                height={64}
                                className='rounded-full drop-shadow-lg'
                            />

                            <div >
                                <p className='font-medium text-[20px] text-black'>{post.author.name}</p>
                                <p className='font-medium text-[16px] text-black'>
                                    {post.author.username}</p> 
                            </div>
                        </Link>

                        <p className='category-tag'>{post.category}</p>
                    </div>

                    <h3 className='text-30-bold'>Pitch Details</h3>
                    {
                        parseContent ? (
                            <article className='prose max-w-4xl font-work-sans break-all'
                                dangerouslySetInnerHTML={{__html: parseContent}}>
                            </article>
                        ) : (
                            <p className='no-result'>No pitch details available</p>
                        )
                    }
                    
                    </div> 

                    <hr className='border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto'></hr>

                    <Suspense fallback={<Skeleton  
                    className = 'bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3'/>} >
                        <View id={id}/>
                    </Suspense>
            </section>
            
        </>
    )
}

export default page
