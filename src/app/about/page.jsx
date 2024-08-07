import GroupIcon from '@/components/icons/GroupIcon';
import Image from 'next/image';
import React from 'react'

const About = () => {
  return (
    <div className="text-black mt-12 pt-20 pb-12 flex flex-col w-full mx-auto lg:w-[920px] rounded-xl px-4 h-auto">
      <div className="flex gap-4 h-auto items-center pb-2">
        <GroupIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          À propos de nous
        </h1>
      </div>
      <h2 className="pb-12 text-orangy-600">Découvrez notre histoire et notre mission</h2>
      <div className="flex items-center justify-center gap-2">
        <div className="flex-1 text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
          maxime non. A voluptatum ipsa praesentium nulla temporibus eveniet
          voluptatibus, molestias vitae tempore labore incidunt quos dolore, ea
          numquam reiciendis. Aliquam dolores temporibus vero ullam officiis
          impedit facilis excepturi doloremque sunt corrupti ipsa at possimus
          dicta quaerat, quam, omnis rem nobis obcaecati, perspiciatis nemo quo!
          Rem enim quasi quia sapiente nesciunt! Sequi aut quasi quo aliquid
          nostrum incidunt sapiente quisquam provident alias beatae odio facere
          corrupti culpa distinctio cum perferendis inventore reiciendis cumque
          harum blanditiis, hic labore. Unde corporis eius voluptates dolores
          temporibus nam, voluptas aperiam voluptatem odit officia natus
          assumenda porro, similique, minima quos consequuntur ab. Error facere
          dolorum reprehenderit aliquam ducimus qui quae quo. Quia aliquid sint
          dolore doloribus, eaque sunt, excepturi quos ut dolores quaerat vitae
          quae, consequatur iste! Aliquam mollitia deleniti quisquam nisi
          aliquid odit ipsum minus quia vitae nemo dolor, a fuga doloremque
          ullam est porro! Necessitatibus, optio iure. Voluptates dolore
          adipisci ut deleniti cum. Nobis beatae error accusantium rem velit
          nemo, eos dolorum, rerum natus dicta similique magnam modi minima
          totam? Eligendi quisquam quaerat reiciendis ad, temporibus dolores
          labore assumenda, sit repudiandae, doloremque optio incidunt tenetur
          culpa fugit possimus mollitia quia! Voluptas reprehenderit porro
          nesciunt!
        </div>

        <div className="flex-2">
          <Image
            src="/logo_complet.png"
            alt=""
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default About