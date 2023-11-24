import { cities } from '@/app/lib/city';
import { setConfig } from 'next/config';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const spliceCity = (city: string, cityes: string[], stateWordsArr: string[]) => {
  stateWordsArr.push(city);
  cityes.splice(cityes.indexOf(city), 1);
};

const resetTimer = (
  // city: string,
  // stateWordsArr: string[],
  resMin: (n: number) => void,
  resSec: (n: number) => void,
  resFtimer: (n: number) => void,
  resStr: (str: string) => void
) => {
  // stateWordsArr.push(city);
  resMin(1);
  resSec(59);
  resFtimer(118);
  resStr('');
};

interface SubmitProps {
  words: string[];
  onSubmit: (words: string[]) => void;
  queue: boolean;
  queueSet: (queue: boolean) => void;
  minutes: number;
  setMinutes: (n: number) => void;
  seconds: number;
  setSeconds: (n: number) => void;
  finishTimer: number;
  setFinishTimer: (n: number) => void;
  mode: boolean;
  setMode: (prev: boolean) => void;
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
  finishTimer,
  setFinishTimer,
  mode,
  setMode,
}: SubmitProps) {
  const [value, setValue] = useState(null || '');
  const [active, setActive] = useState(false);
  const [stop, setStop] = useState(false);

  useEffect(() => {}, [active, setActive, queue, queueSet]);

  function validate(city: string) {
    const validateCity = city.toLowerCase().trim();
    if (validateCity === 'undefined') {
      queueSet(true);
      setActive((prev) => !prev);
      setTimeout(() => {
        setMinutes(0);
        setSeconds(0);
        setFinishTimer(0);
        setStop((prev) => !prev);
      }, 2000);
    } else if (!cities.includes(validateCity)) {
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
        spliceCity(validateCity, cities, words);
        resetTimer(setMinutes, setSeconds, setFinishTimer, setValue);
        // cities.splice(cities.indexOf(validateCity), 1);
        // words.push(validateCity);
        // onSubmit([...words]);
        // setMinutes(1);
        // setSeconds(59);
        // setFinishTimer(118);
        // setValue('');
        return;
      } else if (
        words.length > 1 &&
        words[words.length - 1][words[words.length - 1].length - 1] === 'ь' &&
        validateCity[0] === words[words.length - 1][words[words.length - 1].length - 2]
      ) {
        spliceCity(validateCity, cities, words);
        resetTimer(setMinutes, setSeconds, setFinishTimer, setValue);
        //cities.splice(cities.indexOf(validateCity), 1);
        // words.push(validateCity);
        // onSubmit([...words]);
        // setMinutes(1);
        // setSeconds(59);
        // setFinishTimer(118);
        // setValue('');
        return;
      } else if (words.length > 1 && validateCity[0] !== words[words.length - 1][words[words.length - 1].length - 1]) {
        setValue('Первая буква города, должна быть последней прошлого!');
        setTimeout(() => {
          setValue('');
        }, 1000);
      } else if (cities.indexOf(validateCity)) {
        spliceCity(validateCity, cities, words);
        resetTimer(setMinutes, setSeconds, setFinishTimer, setValue);
        //cities.splice(cities.indexOf(validateCity), 1);
        // words.push(validateCity);
        // onSubmit([...words]);
        // setMinutes(1);
        // setSeconds(59);
        // setFinishTimer(118);
        // setValue('');
        return;
      }
    }
  }
  function timerfoo() {
    const nameCity = cities.find((city) => {
      if (cities.length === 0) {
        //setValue('Треубется название города из списка городов в задании!');

        return 'false';
      } else {
        setTimeout(() => {
          setValue('');
        }, 2000);
        if (words.includes(city)) {
          setValue('Такой город уже был!');
          setTimeout(() => {
            setValue('');
          }, 1000);
        } else if (
          words.length > 1 &&
          words[words.length - 1][words[words.length - 1].length - 1] === 'ы' &&
          city[0] === words[words.length - 1][words[words.length - 1].length - 2]
        ) {
          queueSet(false);
          //setActive((prev) => !prev);
          return city;
        } else if (
          words.length > 1 &&
          words[words.length - 1][words[words.length - 1].length - 1] === 'ь' &&
          city[0] === words[words.length - 1][words[words.length - 1].length - 2]
        ) {
          queueSet(false);
          //setActive((prev) => !prev);
          return city;
        } else if (words.length > 1 && city[0] !== words[words.length - 1][words[words.length - 1].length - 1]) {
          setValue('Первая буква города, должна быть последней прошлого!');
          setTimeout(() => {
            setValue('');
          }, 1000);
        } else if (cities.indexOf(city)) {
          queueSet(false);
          //setActive((prev) => !prev);
          return city;
        }
      }
    });

    console.log(typeof `${nameCity}`);

    validate(`${nameCity}`);
    // queueSet(false);
    setActive((prev) => !prev);

    return;
  }

  function validateSend(formData: FormData) {
    const city = `${formData.get('city')}`.toLowerCase().trim();
    if (cities.length === 0) {
      setMinutes(0);
      setSeconds(0);
      setFinishTimer(0);
      setStop((prev) => !prev);
      return;
    } else if (words.includes(city)) {
      setValue('Такой город уже был!');
      setTimeout(() => {
        setValue('');
      }, 1000);
    } else if (!cities.includes(city)) {
      setValue('Треубется название города из списка городов в задании!');
    } else if (
      words.length > 1 &&
      words[words.length - 1][words[words.length - 1].length - 1] === 'ы' &&
      city[0] === words[words.length - 1][words[words.length - 1].length - 2]
    ) {
      validate(`${city}`);
      queueSet(true);
      setActive((prev) => !prev);
      setValue('Ожидаем ответа соперника...');
      setTimeout(() => {
        timerfoo();
      }, 2000);
      return;
    } else if (
      words.length > 1 &&
      words[words.length - 1][words[words.length - 1].length - 1] === 'ь' &&
      city[0] === words[words.length - 1][words[words.length - 1].length - 2]
    ) {
      validate(`${city}`);
      queueSet(true);
      setActive((prev) => !prev);
      setValue('Ожидаем ответа соперника...');
      setTimeout(() => {
        timerfoo();
      }, 2000);
      return;
    } else if (words.length > 1 && city[0] !== words[words.length - 1][words[words.length - 1].length - 1]) {
      setValue('Первая буква города, должна быть последней прошлого!');
      setTimeout(() => {
        setValue('');
      }, 1000);
    } else if (cities.indexOf(city)) {
      validate(`${city}`);
      queueSet(true);
      setActive((prev) => !prev);
      setValue('Ожидаем ответа соперника...');
      setTimeout(() => {
        timerfoo();
      }, 2000);
      return;
    }

    // setValue('Ожидаем ответа соперника...');
    // setTimeout(() => {
    //   timerfoo();
    // }, 2000);

    console.log(cities.length);
    console.log(words);
    // if (queue === false) {
    //console.log(`${nameCity()}`);

    // validate(`${nameCity()}`);
    // queueSet(true);
    //setActive((prev) => !prev);
    // console.log(cities.length);
    return;

    //console.log(words);

    //console.log(`${comp}`);

    //return;
    // words.push(`${formData.get('city')}`);
    //onSubmit([...words]);

    //console.log(`${formData.get('city')}`);
    //cities.splice(cities.indexOf(`${formData.get('city')}`), 1);
    // if (cities.includes(inputFieldText.toLocaleLowerCase())) {
    //   validate(inputFieldText);
    //   queueSet(true);
    //   setActive((prev) => !prev);
    // }
    // setMinutes(0);
    // setSeconds(0);
    // setFinishTimer(0);
    //setMode(!mode);
    //return;
    //  cities.find((city) => {
    // if (city[0] !== words[words.length - 1][words[words.length - 1].length - 1]) {
    //   console.log('NPC loos, becouse cityes in array end..');

    //   setMinutes(0);
    //   setSeconds(0);
    //   setFinishTimer(0);
    //   setStop((prev) => !prev);
    //   //return;
    // }
    // else {
    //   if (
    //     words[words.length - 1][words[words.length - 1].length - 1] === 'ы' &&
    //     city[0] === words[words.length - 1][words[words.length - 1].length - 2]
    //   ) {
    //     return city;
    //   } else if (
    //     words[words.length - 1][words[words.length - 1].length - 1] === 'ь' &&
    //     city[0] === words[words.length - 1][words[words.length - 1].length - 2]
    //   ) {
    //     return city;
    //   } else if (city[0] !== words[words.length - 1][words[words.length - 1].length - 1]) {
    //     setValue('Первая буква города, должна быть последней прошлого!');
    //     setTimeout(() => {
    //       setValue('');
    //     }, 1000);
    //   } else if (cities.indexOf(city)) {
    //     return city;
    //   }
    //   if (city[0] !== words[words.length - 1][words[words.length - 1].length - 1]) {
    //     console.log('NPC loos, becouse cityes in array end..');
    //     setMinutes(0);
    //     setSeconds(0);
    //     setFinishTimer(0);
    //     setStop((prev) => !prev);
    //     return;
    //   }
    //   // }
    // });
    // if (city[0] !== words[words.length - 1][words[words.length - 1].length - 1])
    // if (stop === false) {
    //   // setMinutes(0);
    //   // setSeconds(0);
    //   // setFinishTimer(0);
    //   console.log('loos', finishTimer);
    //   console.log(`${timerfoo}`);

    //   return;
    // } else {
    //   //console.log(`${timerfoo}`);
    //   setValue('Ожидаем ответа соперника...');
    //   setTimeout(() => {
    //     setValue('');
    //     validate(`${timerfoo}`);
    //     words.push(`${timerfoo}`);
    //     onSubmit([...words]);
    //     // queueSet(false);
    //     // setActive((prev) => !prev);
    //   }, 2000);
    // }
    //return;
    // }
    // else {
    //   setValue('Треубется название города из списка для задания!');
    //   setTimeout(() => {
    //     setValue('');
    //   }, 1000);
    //   return;
    // }
  }

  function actionFoo(formData: FormData) {
    validateSend(formData);

    setValue('Ожидаем ответа соперника...');
    setTimeout(() => {
      timerfoo();
    }, 2000);

    return;
  }
  return (
    <form action={validateSend} className='flex items-center justify-center flex-col relative'>
      <input
        className='w-full min-w-320 max-w-xl h-12 pl-3 pr-[55px] pt-3.5 pb-[15px] bg-gray-100 rounded-md'
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
