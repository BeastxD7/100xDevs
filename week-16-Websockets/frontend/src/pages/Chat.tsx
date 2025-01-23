import React from 'react'
const Chat = () => {
  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center items-center flex-col">
      <h1
        className="
  text-white text-xl text-center py-4 font-semibold">
        Chat Room: {localStorage.getItem("roomId")}
      </h1>
      <div className="md:w-1/2 w-[90%] h-1/2 bg-zinc-500 rounded-xl bg-opacity-30 flex flex-col items-center py-3 ">
        <div className="flex flex-col gap-3 justify-start px-4">
          <div className=' bg-white bg-opacity-80 py-2 px-3 w-fit rounded-xl max-w-[90%]'> message</div>
          <div className=' bg-white bg-opacity-80 py-2 px-3 w-fit rounded-xl max-w-[90%]'> Lorem ipsum dolor, sit amet consectetur adipisicing elit.</div>
          <div className=' bg-white bg-opacity-80 py-2 px-3 w-fit rounded-xl max-w-[90%]'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio saepe quod ducimus possimus recusandae hic nobis corrupti omnis accusantium, nemo obcaecati! Vero cumque dolores magni voluptates facere. Labore, ipsa cumque illum similique optio vitae doloribus? Iste, architecto? Exercitationem cupiditate voluptates atque suscipit non accusantium ut omnis, repellendus maxime ratione impedit delectus debitis enim facere alias eum aperiam quidem voluptatibus nemo nobis. Ipsam dignissimos hic quae dolorum. Repudiandae corrupti voluptatem sed sunt quod exercitationem earum ipsam perspiciatis ducimus vero. Ipsa ratione obcaecati vero possimus perferendis sunt accusamus fugit doloribus, at reiciendis modi. Aut temporibus ducimus ipsa, doloremque vero cumque expedita quisquam.</div>

        </div>
      </div>
    </div>
  )
}

export default Chat