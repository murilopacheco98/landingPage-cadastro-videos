import { CheckCircle, Lock} from 'phosphor-react';
import { isPast, format } from 'date-fns';
import { Link, useParams } from 'react-router-dom'
import ptBR from 'date-fns/locale/pt-BR';
import classNames from 'classNames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

const isLessonAvailable = false

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(props.availableAt)
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  })

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className='group'>
      <span>
        {props.availableAt.toString()}
      </span>
      <div 
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',
         {'bg-green-500': isActiveLesson })}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
          <span className={classNames("text-sm font-medium flex items-center gap-2", {
            'text-white': isActiveLesson,
            'text-blue-500': !isActiveLesson
          })}>
            <CheckCircle size={20} />
            Conteúdo liberado
          </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Em breve
            </span>
          )}
          <span className={classNames("text-xs rounded px-2 py-[2px] text-white border font-bold",{
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
          })}>
            {props.type === "live" ? 'AO VIVO' : 'Aula prática'}
          </span>
        </header>
        <strong className={classNames('mt-5 block',
        {'text-white': isActiveLesson,
        'text-gray-200': !isActiveLesson}
        )}>
          {props.title}
          </strong>
      </div>
    </Link>
)}