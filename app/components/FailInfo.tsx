interface WinProps {
  words: string[];
  npc: boolean;
}
export default function FailInfo({ words, npc }: WinProps) {
  const winCount = words.filter((word) => word.length !== 0);
  return (
    <div className='p-6 inline-flex flex-col gap-6'>
      <p className='text-sm font-normal'>
        К сожалению твое время вышло!
        <br />
        Твой противник победил!
      </p>
      <div>00:00</div>
      <p>Всего было перечислено городов:{winCount.length} Очень не плохой результат!</p>
      <p>Последний город названный победителем {words[words.length - 1]}</p>
    </div>
  );
}
