import Image from 'next/image';
import type { Metadata } from 'next';
import RulesInfo from './components/RulesInfo';
import { cities } from '@/app/lib/city';
interface ContentProps {
  children: React.ReactNode;
}
export default function Home() {
  return (
    <div className='p-6 inline-flex flex-col gap-6'>
      <p className='text-sm font-normal'>Цель: Назвать как можно больше реальных городов.</p>
      <ul className='ml-6 list-disc text-sm font-normal'>
        <li>Запрещается повторение городов.</li>
        <li>
          Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен
          назвать город на букву стоящую перед ъ или ь знаком.
        </li>
        <li>
          Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается
          проигравшим
        </li>
      </ul>
    </div>
  );
}
