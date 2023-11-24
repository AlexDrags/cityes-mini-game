interface ButtonProps {
  onClick: (prev: boolean) => void;
  mode: boolean;
  setMinutes: (n: number) => void;
  setSeconds: (n: number) => void;
  setFinishTimer: (n: number) => void;
  words: string[];
  onSubmit: (words: string[]) => void;
}
export default function StartButton({
  onClick,
  mode,
  setMinutes,
  setSeconds,
  setFinishTimer,
  words,
  onSubmit,
}: ButtonProps) {
  return (
    <button
      className='min-w-max w-32 h-10 justify-center items-center gap-2.5 inline-flex x-4 py-2 bg-violet-600 rounded text-white text-base font-medium self-center hover:bg-slate-400 hover:text-black'
      type='button'
      onClick={() => {
        onSubmit(['']);
        setMinutes(1);
        setSeconds(59);
        setFinishTimer(118);
        onClick(!mode);
      }}
    >
      Начать игру
    </button>
  );
}
