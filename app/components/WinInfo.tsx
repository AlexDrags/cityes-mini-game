interface WinProps {
  words: string[];
  npc: boolean;
}
export default function WinInfo({ words, npc }: WinProps) {
  const winCount = words.filter((word) => word.length !== 0);
  return (
    <div className='p-6 inline-flex flex-col gap-6  text-center'>
      <p className='text-sm font-normal'>
        Поздравляем тебя с победой!
        <br />
        Твой противник не вспомнил нужный город!
      </p>
      <div className='text-green-500 text-3xl font-medium'>00:00</div>
      <p>Всего было перечислено городов:{winCount.length} Очень не плохой результат!</p>
      <p>Последний город названный победителем {words[words.length - 1]}</p>
    </div>
  );
}
