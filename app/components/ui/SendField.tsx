import { cities } from '@/app/lib/city';
import Image from 'next/image';
import { useState } from 'react';
interface SubmitProps {
  words: string[];
  onSubmit: (words: string[]) => void;
  queue: boolean;
  queueSet: (queue: boolean) => void;
  minutes: number;
  setMinutes: (n: number) => void;
  seconds: number;
  setSeconds: (n: number) => void;
}
export default function SendField({
  words,
  onSubmit,
  queue,
  queueSet,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
}: SubmitProps) {
  const [value, setValue] = useState(null || '');
  const [active, setActive] = useState(false);
  function validate(city: string) {
    const validateCity = city.toLowerCase().trim();
    if (!cities.includes(validateCity)) {
      setValue('Треубется название города из списка городов в задании!');
    } else {
      setTimeout(() => {
        setValue('');
      }, 2000);
      if (words.includes(validateCity)) {
        setValue('Такой город уже был!');
        setTimeout(() => {
          setValue('');
        }, 1000);
      } else if (
        words.length > 1 &&
        words[words.length - 1][words[words.length - 1].length - 1] === 'ы' &&
        validateCity[0] === words[words.length - 1][words[words.length - 1].length - 2]
      ) {
        cities.splice(cities.indexOf(validateCity), 1);
        words.push(validateCity);
        onSubmit([...words]);
        setMinutes(1);
        setSeconds(59);
        setValue('');

        return;
      } else if (
        words.length > 1 &&
        words[words.length - 1][words[words.length - 1].length - 1] === 'ь' &&
        validateCity[0] === words[words.length - 1][words[words.length - 1].length - 2]
      ) {
        cities.splice(cities.indexOf(validateCity), 1);
        words.push(validateCity);
        onSubmit([...words]);
        setMinutes(1);
        setSeconds(59);
        setValue('');

        return;
      } else if (cities.indexOf(validateCity)) {
        cities.splice(cities.indexOf(validateCity), 1);
        words.push(validateCity);
        onSubmit([...words]);
        setMinutes(1);
        setSeconds(59);
        setValue('');
        return;
      }
    }
  }
  function validateSend(formData: FormData) {
    const inputFieldText = String(formData.get('city'));

    if (cities.includes(inputFieldText.toLocaleLowerCase())) {
      validate(inputFieldText);
      queueSet(true);
      setActive((prev) => !prev);

      const timerfoo = cities.find((city) => {
        if (
          words[words.length - 1][words[words.length - 1].length - 1] === 'ы' &&
          city[0] === words[words.length - 1][words[words.length - 1].length - 2]
        ) {
          return city;
        } else if (
          words[words.length - 1][words[words.length - 1].length - 1] === 'ь' &&
          city[0] === words[words.length - 1][words[words.length - 1].length - 2]
        ) {
          return city;
        } else if (city[0] !== words[words.length - 1][words[words.length - 1].length - 1]) {
          setValue('Первая буква города, должна быть последней прошлого!');
          setTimeout(() => {
            setValue('');
          }, 1000);
        } else if (cities.indexOf(city)) {
          return city;
        }
      });
      console.log(`${timerfoo}`);
      setValue('');
      setTimeout(() => {
        validate(`${timerfoo}`);
        queueSet(false);
        setActive((prev) => !prev);
      }, 2000);

      //return;
    } else {
      setValue('Треубется название города из списка для задания!');
      setTimeout(() => {
        setValue('');
      }, 1000);
      return;
    }
  }
  return (
    <form action={validateSend} className='flex items-center justify-center flex-col relative'>
      <input
        className='w-[544px] h-12 pl-3 pr-[55px] pt-3.5 pb-[15px] bg-gray-100 rounded-md'
        name='city'
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete='off'
      />
      {active === false ? (
        <button
          className='flex justify-center items-center h-8 w-8 bg-violet-500 rounded-md absolute right-2'
          type='submit'
        >
          <Image src={'/icon-tel.png'} width={20} height={20} alt='telegramm' />
        </button>
      ) : (
        <button
          className='flex justify-center items-center h-8 w-8 bg bg-gray-500 rounded-md absolute right-2'
          type='submit'
          disabled
        >
          <Image src={'/icon-tel.png'} width={20} height={20} alt='telegramm' />
        </button>
      )}
    </form>
  );
}
