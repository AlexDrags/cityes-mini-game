'use client';
import { useState, useEffect } from 'react';
interface WordsProps {
  words: string[];
}
interface IElement {
  desk: HTMLElement;
}
export default function WordsDesk({ words }: WordsProps) {
  useEffect(() => {
    const desk = document.getElementById('desk');
    if (desk instanceof HTMLElement) {
      desk.scrollTop = desk.scrollHeight;
    }
  }, [words]);
  return (
    <div id='desk' className='flex flex-col gap-1 h-80 overflow-x-auto grow pl-2 pr-2'>
      {words.length > 0 &&
        words.map((word, index) => {
          if (index++ % 2 !== 0) {
            return (
              <p className='bg-violet-500 w-max gap-1 rounded self-start' key={index}>
                {word}
              </p>
            );
          } else {
            return (
              <p className='bg-violet-500 w-max gap-1 rounded self-end' key={index}>
                {word}
              </p>
            );
          }
        })}
    </div>
  );
}
