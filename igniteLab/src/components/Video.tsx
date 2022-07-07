import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react"
import { DefaultUi, Player, Youtube } from "@vime/react"
import { gql, useQuery } from "@apollo/client";

import '@vime/core/themes/default.css'

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String){
    lesson(where: {slug: $slug}) {
      title 
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`

interface GetLessonByQueryResponse {
  lesson: {
    title: string;
    videoId: any;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    }
  }
}

interface VideoProps {
  lessonSlug: string;
}
export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonByQueryResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug,
    }
  })

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={ data?.lesson.videoId } />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              { data?.lesson.title }
            </h1>
            <p className="mt-4 text-gray-200">
              Nesta aula vamos dar início...
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img 
                src={ data?.lesson.teacher.avatarURL } alt=""
                className="h-16 w-16 rounded-full border-2 border-blue-500"  
              />
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {data?.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 texto-sm block">
                  {data?.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a href="" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-400 transition-colors">
              <DiscordLogo size={24}/>
              Comunidade do discord
            </a>
            <a href="" className="p-4 text-sm border bg-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
              <Lightning size={24}/>
              Acesse o desafio
            </a>
          </div>
          <div className="gap-8 mt-20 grid grid-cols-2">
            <a href="bg-gray-700 rounde overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
              <div className="bg-green-700 h-full p-6 flex items-center">
                <FileArrowDown size={40}/>
              </div>
              <div className="py-6 leading-relaxed">
                <strong className="text-2xl"> 
                  Mateiral complementar
                </strong>
                <p className="text-sm text-gray-200 mt-2">
                  Acesse o material complementar para acelerar o seu desenvolvimento
                </p>
              </div>
              <div className="h-full p-6 flex items-center">
                <CaretRight size={24}/>
              </div>
            </a>  
            
            <a href="bg-gray-700 rounde overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
              <div className="bg-green-700 h-full p-6 flex items-center">
                <FileArrowDown size={40}/>
              </div>
              <div className="py-6 leading-relaxed">
                <strong className="text-2xl"> 
                  Wallpapers exclusivos
                </strong>
                <p className="text-sm text-gray-200 mt-2">
                  Baixe walpapers exclusivos do Ignite Lab e personalize a sua máquina
                </p>
              </div>
              <div className="h-full p-6 flex items-center">
                <CaretRight size={24}/>
              </div>
            </a>
          </div>
        </div>
      </div>
      </div>
  )
}